import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsByCategory } from "./Products";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [productMessage, setProductMessage] = useState("");

  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const months = [
    { value: "1", name: "Janeiro" },
    { value: "2", name: "Fevereiro" },
    { value: "3", name: "Março" },
    { value: "4", name: "Abril" },
    { value: "5", name: "Maio" },
    { value: "6", name: "Junho" },
    { value: "7", name: "Julho" },
    { value: "8", name: "Agosto" },
    { value: "9", name: "Setembro" },
    { value: "10", name: "Outubro" },
    { value: "11", name: "Novembro" },
    { value: "12", name: "Dezembro" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const savedClients = JSON.parse(localStorage.getItem("clients")) || [];
    const savedProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    setOrders(savedOrders);
    setClients(savedClients);
    setProducts(savedProducts);
  }

  if (!user) {
    return (
      <main>
        <div className="page-inner-content simple-page">
          <div className="empty-box">
            <p>Faça login como administrador para acessar esta página.</p>
            <Link to="/login">Ir para login</Link>
          </div>
        </div>
      </main>
    );
  }

  if (user.role !== "ADMIN") {
    return (
      <main>
        <div className="page-inner-content simple-page">
          <div className="empty-box">
            <p>Acesso permitido apenas para administrador.</p>
          </div>
        </div>
      </main>
    );
  }

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("pt-MZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function getOrderMonthNumber(order) {
    if (order.purchaseMonthNumber) {
      return Number(order.purchaseMonthNumber);
    }

    if (order.createdAt) {
      const date = new Date(order.createdAt);

      if (!isNaN(date.getTime())) {
        return date.getMonth() + 1;
      }
    }

    return null;
  }

  function getOrderDate(order) {
    if (order.purchaseDateFormatted) {
      return order.purchaseDateFormatted;
    }

    if (order.createdAt) {
      const date = new Date(order.createdAt);

      if (!isNaN(date.getTime())) {
        return date.toLocaleString("pt-PT");
      }
    }

    return "Data não identificada";
  }

  function getOrderMonthName(order) {
    if (order.purchaseMonth) {
      return order.purchaseMonth;
    }

    const monthNumber = getOrderMonthNumber(order);

    if (!monthNumber) return "Mês não identificado";

    const month = months.find((item) => Number(item.value) === monthNumber);

    return month ? month.name : "Mês não identificado";
  }

  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  function handleProductChange(e) {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  }

  function addProduct(e) {
    e.preventDefault();

    if (
      !productForm.name ||
      !productForm.category ||
      !productForm.price ||
      !productForm.stock
    ) {
      setProductMessage("Preencha nome, categoria, preço e stock.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productForm.name,
      category: productForm.category,
      price: productForm.price,
      stock: Number(productForm.stock),
      images: productForm.image ? [productForm.image] : [],
      image:
        productForm.image ||
        "https://placehold.co/600x400/eaf6ff/0f172a?text=Produto",
      description:
        productForm.description || "Produto eletrónico disponível para venda.",
      createdAt: new Date().toISOString(),
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));

    setProductForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });

    setProductMessage(
      "Produto adicionado com sucesso! Ele já aparece na página Produtos e no Stock."
    );

    setTimeout(() => {
      setProductMessage("");
    }, 4000);
  }

  function deleteProduct(productId, productType) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja eliminar este produto?"
    );

    if (!confirmDelete) return;

    if (productType === "admin") {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );

      setProducts(updatedProducts);
      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
    } else {
      const savedDeletedIds =
        JSON.parse(localStorage.getItem("deletedProductIds")) || [];

      if (!savedDeletedIds.includes(productId)) {
        const updatedDeletedIds = [...savedDeletedIds, productId];

        localStorage.setItem(
          "deletedProductIds",
          JSON.stringify(updatedDeletedIds)
        );
      }
    }

    setProductMessage(
      "Produto eliminado com sucesso! Ele saiu da página Produtos e do Stock."
    );

    setTimeout(() => {
      setProductMessage("");
      loadData();
    }, 1000);
  }

  function deleteClient(clientId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja apagar esta conta de cliente?"
    );

    if (!confirmDelete) return;

    const updatedClients = clients.filter((client) => client.id !== clientId);

    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
  }

  const totalSales = orders.reduce((sum, order) => {
    return sum + Number(order.total || 0);
  }, 0);

  const deliveredOrders = orders.filter(
    (order) => order.status === "Entregue"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pendente"
  ).length;

  const inProgressOrders = orders.filter(
    (order) => order.status === "Em andamento"
  ).length;

  const deletedProductIds =
    JSON.parse(localStorage.getItem("deletedProductIds")) || [];

  const defaultProducts = productsByCategory
    .flatMap((categoryGroup) =>
      categoryGroup.products.map((product) => ({
        ...product,
        category: categoryGroup.category,
        stock: product.stock || 10,
        type: "default",
      }))
    )
    .filter((product) => !deletedProductIds.includes(product.id));

  const allStockProducts = [
    ...defaultProducts,
    ...products.map((product) => ({
      ...product,
      type: "admin",
    })),
  ];

  const lowStockProducts = allStockProducts.filter(
    (product) => Number(product.stock) <= 5
  ).length;

  const selectedMonthOrders = selectedMonth
    ? orders.filter((order) => {
        return getOrderMonthNumber(order) === Number(selectedMonth);
      })
    : [];

  const selectedMonthTotal = selectedMonthOrders.reduce((sum, order) => {
    return sum + Number(order.total || 0);
  }, 0);

  const selectedMonthName =
    months.find((month) => month.value === selectedMonth)?.name || "";

  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h2>MEGA</h2>
          <span>Admin</span>
        </div>

        <button
          className={activeMenu === "dashboard" ? "active" : ""}
          onClick={() => setActiveMenu("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activeMenu === "pedidos" ? "active" : ""}
          onClick={() => setActiveMenu("pedidos")}
        >
          Pedidos
        </button>

        <button
          className={activeMenu === "estatisticas" ? "active" : ""}
          onClick={() => setActiveMenu("estatisticas")}
        >
          Estatísticas mensais
        </button>

        <button
          className={activeMenu === "adicionar-produto" ? "active" : ""}
          onClick={() => setActiveMenu("adicionar-produto")}
        >
          Adicionar produto
        </button>

        <button
          className={activeMenu === "stock" ? "active" : ""}
          onClick={() => setActiveMenu("stock")}
        >
          Stock e produtos
        </button>

        <button
          className={activeMenu === "clientes" ? "active" : ""}
          onClick={() => setActiveMenu("clientes")}
        >
          Clientes
        </button>
      </aside>

      <section className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1>Painel do Administrador</h1>
            <p>
              Bem-vindo, <strong>{user.name}</strong>
            </p>
          </div>
        </div>

        {activeMenu === "dashboard" && (
          <div className="admin-panel">
            <h2>Resumo geral</h2>

            <div className="admin-stats">
              <div className="stat-card">
                <h3>{orders.length}</h3>
                <p>Total de pedidos</p>
              </div>

              <div className="stat-card">
                <h3>{formatMoney(totalSales)} MZN</h3>
                <p>Total vendido</p>
              </div>

              <div className="stat-card">
                <h3>{pendingOrders}</h3>
                <p>Pedidos pendentes</p>
              </div>

              <div className="stat-card">
                <h3>{inProgressOrders}</h3>
                <p>Em andamento</p>
              </div>

              <div className="stat-card">
                <h3>{deliveredOrders}</h3>
                <p>Entregues</p>
              </div>

              <div className="stat-card">
                <h3>{allStockProducts.length}</h3>
                <p>Total de produtos no stock</p>
              </div>

              <div className="stat-card">
                <h3>{lowStockProducts}</h3>
                <p>Produtos com baixo stock</p>
              </div>

              <div className="stat-card">
                <h3>{clients.length}</h3>
                <p>Clientes cadastrados</p>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "pedidos" && (
          <div className="admin-panel">
            <h2>Pedidos dos clientes</h2>

            {orders.length === 0 ? (
              <div className="empty-box">
                <p>Ainda não existem pedidos registados.</p>
              </div>
            ) : (
              <div className="admin-orders-grid">
                {orders.map((order) => (
                  <div className="admin-order-small-card" key={order.id}>
                    <div className="admin-order-small-top">
                      <div>
                        <h3>Pedido #{order.id}</h3>
                        <small>{getOrderDate(order)}</small>
                      </div>

                      <span
                        className={`status ${order.status
                          .replace(" ", "-")
                          .toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="admin-order-small-info">
                      <p>
                        <strong>Cliente:</strong> {order.clientName}
                      </p>

                      <p>
                        <strong>Email:</strong> {order.clientEmail}
                      </p>

                      <p>
                        <strong>Mês:</strong> {getOrderMonthName(order)}
                      </p>

                      <p>
                        <strong>Entrega:</strong> {order.deliveryAddress}
                      </p>

                      <p>
                        <strong>Total:</strong> {formatMoney(order.total)} MZN
                      </p>
                    </div>

                    <div className="admin-order-status-small">
                      <label>Estado:</label>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Entregue">Entregue</option>
                      </select>
                    </div>

                    <details className="admin-order-details-small">
                      <summary>Ver produtos do pedido</summary>

                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            <span>{item.name}</span>
                            <strong>Qtd: {item.quantity}</strong>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeMenu === "estatisticas" && (
          <div className="admin-panel">
            <h2>Estatísticas de venda por mês</h2>

            <div className="month-filter-box">
              <label>Selecionar mês:</label>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Escolha um mês</option>

                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>

            {!selectedMonth ? (
              <div className="empty-box">
                <p>Selecione um mês para ver as vendas.</p>
              </div>
            ) : (
              <>
                <div className="admin-stats monthly-selected-stats">
                  <div className="stat-card">
                    <h3>{selectedMonthOrders.length}</h3>
                    <p>Vendas em {selectedMonthName}</p>
                  </div>

                  <div className="stat-card">
                    <h3>{formatMoney(selectedMonthTotal)} MZN</h3>
                    <p>Total vendido em {selectedMonthName}</p>
                  </div>

                  <div className="stat-card">
                    <h3>{selectedMonthName}</h3>
                    <p>Mês selecionado</p>
                  </div>
                </div>

                {selectedMonthOrders.length === 0 ? (
                  <div className="empty-box">
                    <p>Não existem vendas em {selectedMonthName}.</p>
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Pedido</th>
                          <th>Cliente</th>
                          <th>Email</th>
                          <th>Data</th>
                          <th>Mês</th>
                          <th>Estado</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {selectedMonthOrders.map((order) => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.clientName}</td>
                            <td>{order.clientEmail}</td>
                            <td>{getOrderDate(order)}</td>
                            <td>{getOrderMonthName(order)}</td>
                            <td>{order.status}</td>
                            <td>{formatMoney(order.total)} MZN</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeMenu === "adicionar-produto" && (
          <div className="admin-panel">
            <h2>Adicionar produto</h2>

            {productMessage && (
              <div className="admin-success-message">{productMessage}</div>
            )}

            <form className="admin-product-form" onSubmit={addProduct}>
              <input
                type="text"
                name="name"
                placeholder="Nome do produto"
                value={productForm.name}
                onChange={handleProductChange}
              />

              <input
                type="text"
                name="category"
                placeholder="Categoria"
                value={productForm.category}
                onChange={handleProductChange}
              />

              <input
                type="text"
                name="price"
                placeholder="Preço. Ex: 15.000,00"
                value={productForm.price}
                onChange={handleProductChange}
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={productForm.stock}
                onChange={handleProductChange}
              />

              <input
                type="text"
                name="image"
                placeholder="Link da imagem do produto"
                value={productForm.image}
                onChange={handleProductChange}
              />

              <textarea
                name="description"
                placeholder="Descrição do produto"
                value={productForm.description}
                onChange={handleProductChange}
              ></textarea>

              <button type="submit">Adicionar produto</button>
            </form>
          </div>
        )}

        {activeMenu === "stock" && (
          <div className="admin-panel">
            <h2>Stock e produtos</h2>

            {productMessage && (
              <div className="admin-success-message">{productMessage}</div>
            )}

            {allStockProducts.length === 0 ? (
              <div className="empty-box">
                <p>Nenhum produto disponível no sistema.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Categoria</th>
                      <th>Preço</th>
                      <th>Stock</th>
                      <th>Origem</th>
                      <th>Estado do stock</th>
                      <th>Ação</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allStockProducts.map((product) => (
                      <tr key={`${product.type}-${product.id}`}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price} MZN</td>
                        <td>{product.stock}</td>
                        <td>
                          {product.type === "admin"
                            ? "Adicionado pelo admin"
                            : "Produto padrão"}
                        </td>
                        <td>
                          {Number(product.stock) <= 5 ? (
                            <span className="stock-low">Baixo</span>
                          ) : (
                            <span className="stock-ok">Disponível</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="danger-btn"
                            onClick={() =>
                              deleteProduct(product.id, product.type)
                            }
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeMenu === "clientes" && (
          <div className="admin-panel">
            <h2>Clientes cadastrados</h2>

            {clients.length === 0 ? (
              <div className="empty-box">
                <p>Nenhum cliente cadastrado.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Data de cadastro</th>
                      <th>Ação</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.createdAt}</td>
                        <td>
                          <button
                            className="danger-btn"
                            onClick={() => deleteClient(client.id)}
                          >
                            Apagar conta
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;
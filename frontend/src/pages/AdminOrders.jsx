import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (!user) {
    return (
      <main>
        <div className="page-inner-content simple-page">
          <div className="empty-box">
            <p>Faça login como administrador para gerir os pedidos.</p>
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
    return Number(value).toLocaleString("pt-MZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  return (
    <main>
      <div className="page-inner-content simple-page">
        <h3 className="sec-titulo">Gestão de Pedidos</h3>
        <div className="sbtitulo-underline"></div>

        {orders.length === 0 ? (
          <div className="empty-box">
            <p>Ainda não existem pedidos registados.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <h3>Pedido #{order.id}</h3>

                  <span
                    className={`status ${order.status
                      .replace(" ", "-")
                      .toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <p>
                  <strong>Cliente:</strong> {order.clientName}
                </p>

                <p>
                  <strong>Email:</strong> {order.clientEmail}
                </p>

                <p>
                  <strong>Data:</strong> {order.createdAt}
                </p>

                <p>
                  <strong>Local de entrega:</strong> {order.deliveryAddress}
                </p>

                <p>
                  <strong>Total:</strong> {formatMoney(order.total)} MZN
                </p>

                <h4>Produtos:</h4>

                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} — Quantidade: {item.quantity}
                    </li>
                  ))}
                </ul>

                <div className="admin-status">
                  <label>Estado da entrega:</label>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminOrders;
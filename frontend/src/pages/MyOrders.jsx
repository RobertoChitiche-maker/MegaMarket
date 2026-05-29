import { Link } from "react-router-dom";

function MyOrders() {
  const user = JSON.parse(localStorage.getItem("user"));

  const months = [
    { value: 1, name: "Janeiro" },
    { value: 2, name: "Fevereiro" },
    { value: 3, name: "Março" },
    { value: 4, name: "Abril" },
    { value: 5, name: "Maio" },
    { value: 6, name: "Junho" },
    { value: 7, name: "Julho" },
    { value: 8, name: "Agosto" },
    { value: 9, name: "Setembro" },
    { value: 10, name: "Outubro" },
    { value: 11, name: "Novembro" },
    { value: 12, name: "Dezembro" },
  ];

  if (!user) {
    return (
      <main>
        <div className="page-inner-content simple-page">
          <div className="empty-box">
            <p>Faça login para ver os seus pedidos.</p>
            <Link to="/login">Ir para login</Link>
          </div>
        </div>
      </main>
    );
  }

  if (user.role !== "CLIENTE") {
    return (
      <main>
        <div className="page-inner-content simple-page">
          <div className="empty-box">
            <p>Esta página é apenas para clientes.</p>
          </div>
        </div>
      </main>
    );
  }

  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const orders = allOrders.filter((order) => order.userId === user.id);

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("pt-MZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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

    if (order.purchaseMonthNumber) {
      const month = months.find(
        (item) => item.value === Number(order.purchaseMonthNumber)
      );

      return month ? month.name : "Mês não identificado";
    }

    if (order.createdAt) {
      const date = new Date(order.createdAt);

      if (!isNaN(date.getTime())) {
        return date.toLocaleString("pt-PT", {
          month: "long",
          year: "numeric",
        });
      }
    }

    return "Mês não identificado";
  }

  return (
    <main>
      <div className="page-inner-content simple-page">
        <h3 className="sec-titulo">Meus Pedidos</h3>
        <div className="sbtitulo-underline"></div>

        {orders.length === 0 ? (
          <div className="empty-box">
            <p>Ainda não existem pedidos para esta conta.</p>
          </div>
        ) : (
          <div className="client-orders-grid">
            {orders.map((order) => (
              <div className="client-order-card" key={order.id}>
                <div className="client-order-top">
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

                <div className="client-order-info">
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

                <details className="client-order-details">
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
    </main>
  );
}

export default MyOrders;
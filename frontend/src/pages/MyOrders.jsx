import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = savedOrders
      .filter(
        (order) =>
          Number(order.userId) === Number(user.id) ||
          order.clientEmail === user.email
      )
      .sort((a, b) => Number(b.id) - Number(a.id));

    setOrders(userOrders);
  }, []);

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

  if (user.role === "ADMIN") {
    return (
      <main>
        <div className="page-inner-content simple-page">
          <div className="empty-box">
            <p>Administrador deve ver pedidos no painel administrativo.</p>
            <Link to="/admin">Ir para painel admin</Link>
          </div>
        </div>
      </main>
    );
  }

  if (user.role !== "CLIENT" && user.role !== "CLIENTE") {
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

  return (
    <main>
      <div className="page-inner-content simple-page">
        <h3 className="sec-titulo">Meus Pedidos</h3>
        <div className="sbtitulo-underline"></div>

        {orders.length === 0 ? (
          <div className="empty-box">
            <p>Ainda não existem pedidos nesta conta.</p>
            <small>Finalize uma compra para ela aparecer aqui.</small>
            <br />
            <Link to="/produtos">Ver produtos</Link>
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
                    className={`status ${String(order.status || "Pendente")
                      .replace(" ", "-")
                      .toLowerCase()}`}
                  >
                    {order.status || "Pendente"}
                  </span>
                </div>

                <div className="client-order-info">
                  <p>
                    <strong>Cliente:</strong> {order.clientName || user.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.clientEmail || user.email}
                  </p>

                  {order.purchaseMonth && (
                    <p>
                      <strong>Mês:</strong> {order.purchaseMonth}
                    </p>
                  )}

                  <p>
                    <strong>Entrega:</strong>{" "}
                    {order.deliveryAddress || "Não informado"}
                  </p>

                  <p>
                    <strong>Total:</strong> {formatMoney(order.total)} MZN
                  </p>
                </div>

                <details className="client-order-details">
                  <summary>Ver produtos do pedido</summary>

                  <ul>
                    {(order.items || []).map((item) => (
                      <li key={item.id}>
                        <span>{item.name}</span>
                        <strong>Qtd: {item.quantity || 1}</strong>
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
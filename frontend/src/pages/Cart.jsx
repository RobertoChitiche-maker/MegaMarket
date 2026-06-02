import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  function formatPriceToNumber(price) {
    if (typeof price === "number") return price;

    return Number(
      String(price)
        .replace("MZN", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    );
  }

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("pt-MZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function getPurchaseMonth(date) {
    return date.toLocaleString("pt-PT", {
      month: "long",
      year: "numeric",
    });
  }

  function saveCart(updatedCart) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Number(item.quantity || 1) + 1 }
        : item
    );

    saveCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              Number(item.quantity || 1) > 1
                ? Number(item.quantity || 1) - 1
                : 1,
          }
        : item
    );

    saveCart(updatedCart);
  }

  const total = cart.reduce((sum, item) => {
    const price = formatPriceToNumber(item.price);
    return sum + price * Number(item.quantity || 1);
  }, 0);

  function handleFinishClick() {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      setMessage("Para finalizar a compra, primeiro faça login.");
      return;
    }

    if (currentUser.role === "ADMIN") {
      setMessage("Administrador não pode finalizar compras como cliente.");
      return;
    }

    if (currentUser.role !== "CLIENT" && currentUser.role !== "CLIENTE") {
      setMessage("Conta inválida para finalizar compra.");
      return;
    }

    setMessage("");
    setShowDeliveryForm(true);
  }

  function finishOrder(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      setMessage("Para finalizar a compra, primeiro faça login.");
      return;
    }

    if (currentUser.role === "ADMIN") {
      setMessage("Administrador não pode finalizar compras como cliente.");
      return;
    }

    if (currentUser.role !== "CLIENT" && currentUser.role !== "CLIENTE") {
      setMessage("Conta inválida para finalizar compra.");
      return;
    }

    if (cart.length === 0) {
      setMessage("O carrinho está vazio.");
      return;
    }

    if (!deliveryAddress.trim()) {
      setMessage("Informe o local de entrega.");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const purchaseDate = new Date();

    const newOrder = {
      id: Date.now(),
      userId: currentUser.id,
      clientName: currentUser.name,
      clientEmail: currentUser.email,
      items: cart,
      total,
      deliveryAddress: deliveryAddress.trim(),
      status: "Pendente",
      createdAt: purchaseDate.toISOString(),
      purchaseDateFormatted: purchaseDate.toLocaleString("pt-PT"),
      purchaseMonth: getPurchaseMonth(purchaseDate),
      purchaseMonthNumber: purchaseDate.getMonth() + 1,
      purchaseYear: purchaseDate.getFullYear(),
    };

    const updatedOrders = [...savedOrders, newOrder];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    localStorage.removeItem("cart");

    setCart([]);
    setDeliveryAddress("");
    setShowDeliveryForm(false);
    setMessage(
      `Compra finalizada com sucesso! Compra realizada em ${newOrder.purchaseMonth}.`
    );

    window.dispatchEvent(new Event("cartUpdated"));
  }

  return (
    <main>
      <div className="page-inner-content cart-page">
        <h3 className="sec-titulo">Carrinho de Compras</h3>
        <div className="sbtitulo-underline"></div>

        {message && <div className="success-message">{message}</div>}

        {message.toLowerCase().includes("login") && (
          <div className="login-warning">
            <Link to="/login">Ir para login</Link>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="empty-box">
            <p>O carrinho está vazio.</p>
            <small>Adicione produtos para continuar a compra.</small>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={
                      item.image ||
                      (item.images && item.images.length > 0
                        ? item.images[0]
                        : "https://placehold.co/300x300/e5e7eb/111827?text=Produto")
                    }
                    alt={item.name}
                  />

                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p>{item.price} MZN</p>
                  </div>

                  <div className="cart-actions">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total: {formatMoney(total)} MZN</h2>

              <div>
                <button onClick={clearCart}>Limpar carrinho</button>
                <button onClick={handleFinishClick}>Finalizar compra</button>
              </div>
            </div>

            {showDeliveryForm && (
              <form className="delivery-form" onSubmit={finishOrder}>
                <h2>Local de Entrega</h2>

                <textarea
                  placeholder="Ex: Bairro, rua, casa, ponto de referência..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                ></textarea>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowDeliveryForm(false)}
                  >
                    Cancelar
                  </button>

                  <button type="submit">Confirmar compra</button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;
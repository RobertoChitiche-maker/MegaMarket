import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((total, item) => {
      return total + Number(item.quantity || 1);
    }, 0);

    setCartCount(totalItems);
  }

  function loadUser() {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    window.dispatchEvent(new Event("authUpdated"));

    navigate("/login");
  }

  useEffect(() => {
    updateCartCount();
    loadUser();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("authUpdated", loadUser);
    window.addEventListener("storage", loadUser);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("authUpdated", loadUser);
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const isClient = user?.role === "CLIENT" || user?.role === "CLIENTE";
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className={`navbar ${showMenu ? "show-menu" : ""}`}>
      <div className="header-inner-content">
        <Link to="/" className="logo">
          ROBERTO<span>MARKET</span>
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/">Casa</Link>
            </li>

            <li>
              <Link to="/produtos">Produtos</Link>
            </li>

            {isClient && (
              <li>
                <Link to="/myorders">Meus Pedidos</Link>
              </li>
            )}

            {isAdmin && (
              <li>
                <Link to="/admin">Painel Admin</Link>
              </li>
            )}

            <li>
              <Link to="/sobre">Sobre</Link>
            </li>

            <li>
              <Link to="/contacto">Contacto</Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/registo">Registo</Link>
                </li>
              </>
            ) : (
              <li>
                <button className="logout-btn" onClick={logout}>
                  Sair
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div className="nav-icon-container">
          <Link to="/carrinho" className="cart-link">
            <ShoppingCart size={30} color="white" />

            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          <Menu
            size={30}
            color="white"
            className="menu-button"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
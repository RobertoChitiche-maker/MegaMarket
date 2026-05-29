import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      form.email === "roberto.chitiche@gmail.com" &&
      form.password === "2341"
    ) {
      const adminUser = {
        id: 1,
        name: "Administrador",
        email: "roberto.chitiche@gmail.com",
        role: "ADMIN",
      };

      localStorage.setItem("token", "admin-token-megamarket");
      localStorage.setItem("user", JSON.stringify(adminUser));

      window.dispatchEvent(new Event("authUpdated"));

      navigate("/admin");
      return;
    }

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.dispatchEvent(new Event("authUpdated"));

      navigate("/meus-pedidos");
    } catch (error) {
      const localUsers = JSON.parse(localStorage.getItem("clients")) || [];

      const foundUser = localUsers.find(
        (user) => user.email === form.email && user.password === form.password
      );

      if (foundUser) {
        const clientUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: "CLIENTE",
        };

        localStorage.setItem("token", "client-token-megamarket");
        localStorage.setItem("user", JSON.stringify(clientUser));

        window.dispatchEvent(new Event("authUpdated"));

        navigate("/meus-pedidos");
      } else {
        setMessage("Email ou senha inválidos.");
      }
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Entrar</h1>
            <p>
              Clientes podem acompanhar pedidos. O administrador pode gerir
              vendas, produtos, stock e entregas.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Digite o seu email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                name="password"
                placeholder="Digite a sua senha"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Entrar
            </button>

            {message && <p className="auth-message">{message}</p>}

            <p className="auth-switch">
              Ainda não tem conta? <Link to="/registo">Criar conta</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
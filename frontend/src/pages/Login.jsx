import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email ou senha inválidos.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authUpdated"));

      setMessage("Login realizado com sucesso!");

      setTimeout(() => {
        if (data.user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 700);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Entrar</h1>
          <p>Acesse a sua conta RobertoMarket.</p>
        </div>

        {message && <div className="auth-message">{message}</div>}

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

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-switch">
          Ainda não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
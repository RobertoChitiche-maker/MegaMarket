import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    if (!form.name || !form.email || !form.password) {
      setMessage("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      window.dispatchEvent(new Event("authUpdated"));

      setMessage("Conta criada com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
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
          <h1>Criar conta</h1>
          <p>Registe-se para comprar no MegaMarket.</p>
        </div>

        {message && <div className="auth-message">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome completo</label>
            <input
              type="text"
              name="name"
              placeholder="Digite o seu nome"
              value={form.name}
              onChange={handleChange}
            />
          </div>

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
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="auth-switch">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
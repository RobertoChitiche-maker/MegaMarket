import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
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

    if (!form.name || !form.email || !form.password) {
      setMessage("Preencha todos os campos.");
      return;
    }

    const savedClients = JSON.parse(localStorage.getItem("clients")) || [];

    const clientExists = savedClients.find(
      (client) => client.email === form.email
    );

    if (clientExists) {
      setMessage("Este email já está cadastrado.");
      return;
    }

    const newClient = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: "CLIENTE",
      createdAt: new Date().toLocaleString("pt-PT"),
    };

    const updatedClients = [...savedClients, newClient];

    localStorage.setItem("clients", JSON.stringify(updatedClients));

    try {
      await api.post("/auth/register", form);
    } catch (error) {
      console.log("Cadastro guardado localmente.");
    }

    setMessage("Conta criada com sucesso. Agora já pode fazer login.");

    setForm({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Criar conta</h1>
            <p>
              Registe-se no MegaMarket para comprar produtos e acompanhar o
              estado das suas entregas.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nome completo</label>
              <input
                type="text"
                name="name"
                placeholder="Digite o seu nome completo"
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
                placeholder="Crie uma senha"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Criar conta
            </button>

            {message && <p className="auth-message">{message}</p>}

            <p className="auth-switch">
              Já tem conta? <Link to="/login">Entrar</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Register;
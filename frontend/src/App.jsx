import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registo" element={<Register />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/meus-pedidos" element={<MyOrders />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
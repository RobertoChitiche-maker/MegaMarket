import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/*
  Mantemos esta exportação vazia para não quebrar outros ficheiros
  que ainda importam productsByCategory.
  A página de produtos agora mostra APENAS produtos da base de dados.
*/
export const productsByCategory = [];

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao carregar produtos.");
      }

      const normalizedProducts = data.map((product) => ({
        ...product,
        price: String(product.price),
        stock: Number(product.stock || 0),
        images: product.image ? [product.image] : [],
        image:
          product.image ||
          `https://placehold.co/600x400/eaf6ff/0f172a?text=${encodeURIComponent(
            product.name
          )}`,
        description:
          product.description || "Produto disponível para venda no MegaMarket.",
      }));

      setProducts(normalizedProducts);
    } catch (error) {
      setMessage(error.message || "Erro ao carregar produtos.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) => {
    const productName = product.name || "";
    const productCategory = product.category || "";

    return (
      productName.toLowerCase().includes(search.toLowerCase()) ||
      productCategory.toLowerCase().includes(search.toLowerCase())
    );
  });

  const productsByDatabaseCategory = filteredProducts.reduce((acc, product) => {
    const categoryName = product.category || "Produtos";

    const existingCategory = acc.find((item) => item.category === categoryName);

    if (existingCategory) {
      existingCategory.products.push(product);
    } else {
      acc.push({
        category: categoryName,
        products: [product],
      });
    }

    return acc;
  }, []);

  return (
    <main>
      <div className="page-inner-content">
        <h3 className="sec-titulo">Todos os Produtos</h3>
        <div className="sbtitulo-underline"></div>

        <p className="products-intro">
          Explore os produtos disponíveis no RobertoMarket. Esta página mostra
          apenas os produtos cadastrados na base de dados.
        </p>

        <div className="product-search-box">
          <input
            type="text"
            placeholder="Pesquisar produto pelo nome ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && <button onClick={() => setSearch("")}>Limpar</button>}
        </div>

        {loading && (
          <div className="empty-box">
            <p>Carregando produtos da base de dados...</p>
          </div>
        )}

        {!loading && message && (
          <div className="empty-box">
            <p>{message}</p>
            <button onClick={loadProducts}>Tentar novamente</button>
          </div>
        )}

        {!loading && !message && products.length === 0 && (
          <div className="empty-box">
            <p>Nenhum produto cadastrado na base de dados.</p>
            <small>
              Entre no painel administrador e cadastre produtos para aparecerem
              aqui.
            </small>
          </div>
        )}

        {!loading &&
          !message &&
          products.length > 0 &&
          productsByDatabaseCategory.length === 0 && (
            <div className="empty-box">
              <p>Nenhum produto encontrado com esse nome.</p>
              <small>
                Tente pesquisar por outro nome ou limpe o campo de pesquisa.
              </small>
            </div>
          )}

        {!loading &&
          !message &&
          productsByDatabaseCategory.map((categoryGroup) => (
            <section
              className="product-category-section"
              key={categoryGroup.category}
            >
              <h2 className="category-title">{categoryGroup.category}</h2>

              <div className="cls cls-4">
                {categoryGroup.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </main>
  );
}

export default Products;
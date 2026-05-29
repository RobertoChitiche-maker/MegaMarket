import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const featuredProducts = [
  {
    id: 1,
    name: "Combo Gamer",
    price: "4.000,00",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&auto=format&fit=crop",
    description:
      "Conjunto gamer com teclado, mouse, headset e acessórios modernos para jogos.",
  },
  {
    id: 2,
    name: "Placa Gráfica RTX",
    price: "19.500,00",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop",
    description:
      "Placa gráfica poderosa para jogos, edição de vídeo e aplicações de alto desempenho.",
  },
  {
    id: 3,
    name: "Joystick PS5",
    price: "6.500,00",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop",
    description:
      "Controle moderno com design ergonómico, precisão e excelente experiência de jogo.",
  },
  {
    id: 4,
    name: "Cadeira Gamer",
    price: "22.999,00",
    image:
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&auto=format&fit=crop",
    description:
      "Cadeira confortável para longas sessões de estudo, trabalho ou jogos.",
  },
];

function Home() {
  return (
    <>
      <header>
        <div className="header-inner-content">
          <div className="header-botton-side">
            <div className="header-botton-side-left">
              <h2>De um novo estilo ao seu trabalho</h2>

              <p>
                Encontre aparelhos eletrónicos modernos, acessórios e
                equipamentos tecnológicos para facilitar o seu dia a dia.
              </p>

              <Link to="/produtos">
                <button>Ver Agora &#8594;</button>
              </Link>
            </div>

            <div className="header-botton-side-right">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop"
                alt="Computador moderno"
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div>
          <div className="page-inner-content">
            <h3 className="sec-titulo">Produtos em destaque</h3>
            <div className="sbtitulo-underline"></div>

            <div className="cls cls-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="gray-background">
          <div className="header-inner-content">
            <div className="header-botton-side exclusive-container">
              <div className="header-botton-side-left">
                <h2 className="opt">Smart Band 4</h2>

                <p className="tpss">
                  Produto exclusivo com tela AMOLED, brilho ajustável e design
                  moderno para acompanhar o seu estilo de vida.
                </p>

                <Link to="/produtos">
                  <button>Ver Agora &#8594;</button>
                </Link>
              </div>

              <div className="header-botton-side-right">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop"
                  alt="Smartwatch"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="page-inner-content" id="sobre">
          <div className="testimonials">
            <div className="testimonial">
              <p>"</p>
              <p>
                Uma das melhores lojas online, moderna, simples e fácil de usar.
              </p>
              <br />
              <p className="rate">★★★★★</p>
              <br />
              <p>Roberto Chitiche</p>
            </div>

            <div className="testimonial">
              <p>"</p>
              <p>
                Interface bonita e navegação simples. Recomendo para comprar
                eletrónicos.
              </p>
              <br />
              <p className="rate">★★★★★</p>
              <br />
              <p>Elton Binala</p>
            </div>

            <div className="testimonial">
              <p>"</p>
              <p>Loja simples, rápida e com boa organização dos produtos.</p>
              <br />
              <p className="rate">★★★★★</p>
              <br />
              <p>Ico Fernando</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
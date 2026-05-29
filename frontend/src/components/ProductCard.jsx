import { useState } from "react";

function ProductCard({ product }) {
  const imageList = product.images || [product.image];
  const [imageIndex, setImageIndex] = useState(0);

  function addToCart() {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = savedCart.find((item) => item.id === product.id);

    let updatedCart;

    if (productExists) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...savedCart,
        {
          ...product,
          image: imageList[imageIndex],
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function handleImageError() {
    if (imageIndex < imageList.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  }

  return (
    <div className="product-container">
      <img
        src={imageList[imageIndex]}
        alt={product.name}
        onError={handleImageError}
      />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.price} MZN</p>
        <p className="starts">★★★★★</p>
      </div>

      <div className="hover-contentt">
        <p>{product.description}</p>
        <button onClick={addToCart}>Adicionar ao carrinho</button>
      </div>
    </div>
  );
}

export default ProductCard;
import { useState } from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import GlobalStyles from "./my-styled-components/GlobalStyles";
import { IProduct } from "./types";
import { ICartItem } from "./types";

function App() {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const product: IProduct = {
    id: 1,
    companyTitle: "Sneaker Company",
    productTitle: "Fall Limited Edition Sneakers",
    productDescription:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: 250,
    salePercentage: 50,
    images: [
      "/images/image-product-1.jpg",
      "/images/image-product-2.jpg",
      "/images/image-product-3.jpg",
      "/images/image-product-4.jpg",
    ],
  };

  return (
    <>
      <GlobalStyles />
      <Header cart={cart} setCart={setCart} />
      <Product product={product} setCart={setCart} cart={cart} />
    </>
  );
}

export default App;

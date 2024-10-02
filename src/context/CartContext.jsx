import { useContext, createContext, useState } from 'react';
import data from "../../data.json"
const carttestContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(data);//this is just added here to
  // be used throught the code 
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) =>
    setCartItems([
      ...cartItems,
      {
        name: product.name,
        thumbnail: product.image.thumbnail,
        price: product.price,
        quantity: 1,
      },
    ]);

  const isProductInCart = (productName) =>
    cartItems.findIndex((item) => item.name === productName) !== -1;

  const totalCartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalOrderPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const getCartItem = (productName) =>
    cartItems.find((item) => item.name === productName);


  const incrementQuantity = (productName) =>
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.name === productName) item.quantity++;
        return item;
      })
    );

  const decrementQuantity = (productName) =>
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.name === productName && item.quantity > 1) item.quantity--;
        return item;
      })
    );


  const handleRemoveCartItem = (itemName) =>
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== itemName)
    );

  return (
    <carttestContext.Provider
      value={{
        addItemToCart, products, isProductInCart, setCartItems,
        totalCartItemsCount, totalOrderPrice, incrementQuantity, decrementQuantity, getCartItem
        , handleRemoveCartItem, cartItems,
      }}>
      {children}
    </carttestContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(carttestContext);
  if (!context) {
    throw new Error("useCartContext must be called within CartProvider.");
  }
  return context;
};

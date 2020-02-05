//Geting item from shopping cart----------------------

const getCart = async () => {
  const url = "http://localhost:8000/api/cart";

  let response = await fetch(url, { method: "GET" });
  let object = await response.json();

  return object;
};
export default getCart;

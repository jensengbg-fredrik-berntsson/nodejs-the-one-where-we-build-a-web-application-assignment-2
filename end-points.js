const {
  getItemList,
  getCart,
  addToCart,
  removeItem
} = require("./database.js");
const express = require("express");
const app = express();

app.use(express.static("public"));

//Adding items to index.html
app.post("/api/products", async (request, response) => {
  let message = {
    success: true,
    message: "New item added"
  };
  const { name, price, imgurl } = request.query;
  const data = await addNewProduct(name, price, imgurl);
  message.data = data[res.length - 1];
  return response.send(message);
});

//Get itemlist--------------------------------------------------
app.get("/api/products", (request, response) => {
  response.json(getItemList());
  return response;
});

app.post("/api/cart", async (request, response) => {
  const { name } = request.query;
  const data = await addToCart(name);
  let message = {
    success: true,
    message: "Item added to cart"
  };
  if (typeof data == "string" || data instanceof String) {
    message = {
      succses: false,
      message: "Item already in your cart"
    };
  } else if (data === false) {
    message = {
      succses: false,
      message: "Item not found"
    };
  }
  message.data = data[data.length - 1];

  return response.send(message);
});

//Get shoppingcart--------------------------------------------------
app.get("/api/cart", (request, response) => {
  response.json(getCart());
  return response;
});

app.delete("/api/cart", async (request, response) => {
  const { name } = request.query;
  const data = await removeItem(name);

  if (typeof data == "string" || data instanceof String) {
    message = {
      success: false,
      message: "Item not found"
    };
  } else {
    message = {
      success: true,
      message: "Item removed"
    };
  }
  message.data = data[response.lenght - 1];
  return response.send(message);
});

module.exports = app;

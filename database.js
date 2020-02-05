const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

//Database defaults-----------------------------------------------
exports.initiateDatabase = () => {
  const items = database.has("products").value();
  const shoppingCart = database.has("cart").value();

  if (!items) {
    database.defaults({ products: [], cart: [] }).write();
  }

  if (!shoppingCart) {
    database.defaults({ products: [], cart: [] }).write();
  }
};

//Get items from products-----------------------------------------
const getItemList = () => {
  const response = database.get("products").value();
  return response;
};

//Add to cart-----------------------------------------------------
addToCart = async name => {
  const checkCart = await database
    .get("cart")
    .find({ name })
    .value();
  if (checkCart) {
    let message = "";

    return message;
  } else {
    let data = await database
      .get("products")
      .find({ name })
      .value();

    if (data) {
      data = await database
        .get("cart")
        .push(data)
        .write();
      return data;
    } else {
      message = false;

      return message;
    }
  }
};

//Get cart--------------------------------------------------------
const getCart = () => {
  const response = database.get("cart").value();
  return response;
};

//Delete item from cart--------------------------------------------
removeItem = async name => {
  const checkCart = await database
    .get("cart")
    .find({ name })
    .value();

  if (checkCart) {
    let response = await database
      .get("cart")
      .remove({ name })
      .write();
    return response;
  } else {
    response = "";

    return response;
  }
};

exports.getItemList = getItemList;
exports.getCart = getCart;
exports.addToCart = addToCart;
exports.removeItem = removeItem;

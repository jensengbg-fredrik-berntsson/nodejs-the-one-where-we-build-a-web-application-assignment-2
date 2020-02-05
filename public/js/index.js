import getCart from "./getCart.js";

// Getting products from product list-------------------------------
async function getproducts() {
  const url = "http://localhost:8000/api/products";

  let response = await fetch(url, { method: "GET" });
  console.log(response);
  let object = await response.json();
  console.log(object);
  return object;
}
// Getting item items from cart

//To change the button text when the item already is in cart
async function changeButton(products) {
  let cartItem = await getCart();

  for (let i = 0; i < products.length; i++) {
    let test = cartItem.find(data => data.name == products[i].name);

    if (test) {
      const NAME = test.name;
      const buttontext = document.getElementById(NAME);
      buttontext.innerHTML = "In cart";
      buttontext.disable = true;
    }
  }
}

//Showing the items in array
async function productArray() {
  let products = await getproducts();

  const range = document.getElementById("option");

  for (let i = 0; i < products.length; i++) {
    const newArticle = document.createElement("article");
    const newImage = document.createElement("img");
    const newTitle = document.createElement("h3");
    const newP = document.createElement("p");
    const newBtn = document.createElement("button");
    newArticle.className = "knifes";
    newImage.className = "knifeimg";
    newTitle.className = "header";
    newP.className = "price";
    newBtn.className = "addbutton";
    newBtn.id = products[i].name;

    range.appendChild(newArticle);
    newArticle.appendChild(newImage);
    newArticle.appendChild(newTitle);
    newArticle.appendChild(newP);
    newArticle.appendChild(newBtn);

    newImage.src = products[i].imgurl;
    newTitle.innerHTML = products[i].name;
    newP.innerHTML = "$ " + products[i].price;
    newBtn.innerHTML = "Add to cart";
  }
  changeButton(products);
  console.log(products);
}

//------------------------------------------------------------------------------

//Adding item to cart from poduct list--------------

async function addItem(name) {
  const url = "http://localhost:8000/api/cart";
  fetch(url + "?name=" + name, {
    method: "POST"
  });
  const buttontext = document.getElementById(name);
  buttontext.innerHTML = "In cart";
}

const findItem = e => {
  const item = e.target;
  const product = item.parentElement;
  const name = product.childNodes[1].innerText;
  // console.log(name);
  addItem(name);
};

document.addEventListener("click", function(e) {
  if (e.target.className == "addbutton") {
    findItem(e);
  }
});

// console.log(data);

productArray();

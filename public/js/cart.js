import getCart from "./getCart.js";

async function cartArray() {
  let response = await getCart();
  let cart = await response;

  const chosen = document.getElementById("choosed");
  const pricetotal = document.getElementById("cost");
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const newArticle = document.createElement("article");
    const newImage = document.createElement("img");
    const newTitle = document.createElement("h3");
    const newP = document.createElement("p");
    const newBtn = document.createElement("button");

    newArticle.className = "cartdiv";
    newImage.className = "cartimg";
    newTitle.className = "cartheader";
    newP.className = "cartprice";
    newBtn.className = "removebutton";

    chosen.appendChild(newArticle);
    newArticle.appendChild(newImage);
    newArticle.appendChild(newTitle);
    newArticle.appendChild(newP);
    newArticle.appendChild(newBtn);

    newImage.src = cart[i].imgurl;
    newTitle.innerHTML = cart[i].name;
    newP.innerHTML = "$ " + cart[i].price;
    newBtn.innerHTML = "Remove";

    total += parseFloat(cart[i].price);
  }
  total = "$ " + total.toString();
  pricetotal.innerHTML = total;
}

//---------------------------------------------------------

//Deleting item from shopping cart--------------------------------------

async function deleteItem(name) {
  const url = "http://localhost:8000/api/cart";
  fetch(url + "?name=" + name, {
    method: "DELETE"
  });
  setTimeout(() => {
    refreshPage();
  }, 250);
}
function refreshPage() {
  location.reload(true);
}

const findItem = e => {
  const item = e.target;
  const product = item.parentElement;
  const name = product.childNodes[1].innerText;
  console.log(name);
  deleteItem(name);
};

document.addEventListener("click", function(e) {
  if (e.target.className == "removebutton") {
    findItem(e);
  }
});
cartArray();

const loadProducts = () => {
  fetch('https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR21LLwD-gQA62TqVrlpPRiypygXHFEcIpIZ6tbBmz1luCnP5lXc1JtkOIE')
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p class="fw-bold "> 
      <ul class="d-flex stars pl-4">
     <span class="fw-bold me-2"> Rating:</span>
     <li><i class="fas fa-star styles"></i></li>
     <li><i class="fas fa-star styles"></i></li>
     <li><i class="fas fa-star styles"></i></li>
     <li><i class="fas fa-star styles"></i></li>
     <li><i class="far fa-star"></i></li>
      (${product.rating.rate})
    </ul>
    </p>
     <p class="fw-bold">Total Rating: <i class="fas fa-user text-primary"></i> ${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-dark">add to cart</button>
      <button id="details-btn" class="btn btn-warning">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
var count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const priceFix = total.toFixed(2)
  document.getElementById(id).innerText = parseFloat(priceFix);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  const taxFix = value.toFixed(2)
  document.getElementById(id).innerText = parseFloat(taxFix);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  let grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  const grandTotalFix = grandTotal.toFixed(2)
   document.getElementById('total').innerText = grandTotalFix;
 
};
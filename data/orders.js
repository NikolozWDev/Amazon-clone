import { products, loadProducts } from "./products.js";
import { paymentSummary } from "../scripts/paymentSummary.js";
import { cart } from "./cart.js";
import { moneyProblem } from "../scripts/utils1.js";
export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function orderPush(varorder) {
    orders.unshift(varorder);
    saveOrder();
};

function saveOrder() {
    localStorage.setItem('orders', JSON.stringify(orders));
};

async function generateOrdersHTML() {
  await loadProducts();
  const orderProduct = orders[0].products;


  for (let i = 0; i < products.length; i++) {
    for(let j = 0; j < orderProduct.length; j++) {
        if(products[i].id === orderProduct[j].productId) {
            orderProduct[j].product = products[i];
        };
    };
  };


  let html1 = ``;
  let html2 = ``;
  let sumTotal = 0;
  for (let i = 0; i < orderProduct.length; i++) {
    const item = orderProduct[i];
    const product = item.product;
    sumTotal += product.priceCents * item.quantity;


    html1 += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${new Date(item.estimatedDeliveryTime).toDateString()}
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
    html2 = `
                <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${moneyProblem(sumTotal)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
    `
  }

  document.querySelector('#producter').innerHTML = html1;
  document.querySelector('#productorderer').innerHTML = html2;
  let i20 = 0;
  let sum = 0;
  while(i20 < cart.length) {
    sum += cart[i20].quantity;
    i20++;
  };
  document.querySelector('.cart-quantity').innerHTML = sum;
}
window.addEventListener('DOMContentLoaded', generateOrdersHTML);
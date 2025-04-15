import { products, loadProducts } from "./products.js";
import { paymentSummary } from "../scripts/paymentSummary.js";
import { cart } from "./cart.js";
import { moneyProblem } from "../scripts/utils1.js";
import { clicked } from "../scripts/checkout.js";
import { saveClick } from "../scripts/checkout.js";
import { saveToStorage } from "./cart.js";


export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function orderPush(varorder) {
    orders.unshift(varorder);
    saveOrder();
};

function saveOrder() {
    localStorage.setItem('orders', JSON.stringify(orders));
};

export async function generateOrdersHTML() {
  await loadProducts();

  const ordersGrid = document.querySelector('.orders-grid');
  ordersGrid.innerHTML = '';

  for (let i = 0; i < clicked; i++) {
    const order = orders[i];
    const orderProducts = order.products;


    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < orderProducts.length; j++) {
        if (products[i].id === orderProducts[j].productId) {
          orderProducts[j].product = products[i];
        }
      }
    }

    let html1 = '';
    let html2 = '';
    let sumTotal = 0;

    for (let i = 0; i < orderProducts.length; i++) {
      const item = orderProducts[i];
      const product = item.product;
      sumTotal += product.priceCents * item.quantity;

      html1 += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-delivery-date">Arriving on: ${new Date(item.estimatedDeliveryTime).toDateString()}</div>
          <div class="product-quantity">Quantity: ${item.quantity}</div>
          <button class="buy-again-button button-primary" data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">Track package</button>
          </a>
        </div>
      `;
    }

    html2 = `
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${new Date(order.orderTime).toDateString() || 'Unknown Date'}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${moneyProblem(sumTotal)}</div>
        </div>
      </div>
      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id || 'Unknown ID'}</div>
      </div>
    `;

    const orderHTML = `
      <div class="order-container">
        <div class="order-header">${html2}</div>
        <div class="order-details-grid">${html1}</div>
      </div>
    `;

    ordersGrid.innerHTML += orderHTML;
  }


  let sum = 0;
  for (let item of cart) {
    sum += item.quantity;
  }
  document.querySelector('.cart-quantity').innerHTML = sum;


  // buy it again
  let allBuy = document.querySelectorAll('.buy-again-button');
  let i = 0;
  while(i < allBuy.length) {
    allBuy[i].addEventListener('click', (event) => {
      let button = event.currentTarget;
      let idTruck = event.currentTarget.dataset.productId;
      let found = false;

      for(let j = 0; j < cart.length; j++) {
        if(idTruck === cart[j].productId) {
            cart[j].quantity += 1;
            found = true;
            break;
        }
      }
          if(!found) {
            cart.push(
              {
                productId: idTruck,
                quantity: 1,
              },
            );
          }
      saveToStorage();
      MVCcart();
      button.innerHTML = `Added !`;
      setTimeout(() => {
        button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
        `
      }, 1000)
      console.log(cart);
    });
    i++;
  };
  function MVCcart() {
    let sumCart = 0
    for(let i = 0; i < cart.length; i++) {
      sumCart += cart[i].quantity;
    }
    document.querySelector('.cart-quantity').innerHTML = sumCart;
  }
  MVCcart();
}

window.addEventListener('DOMContentLoaded', generateOrdersHTML);
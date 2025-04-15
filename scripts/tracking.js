import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { generateOrdersHTML } from "../data/orders.js";
import { loadProducts } from "../data/products.js";

generateOrdersHTML();

async function generateTracking() {
    await loadProducts();

    let url = new URL(window.location.href);
    let productMeId = url.searchParams.get('productId');


    for(let i = 0; i < products.length; i++) {
        if(products[i].id === productMeId) {
            productMeId = products[i];
        };
    };


    const productId = url.searchParams.get('productId');
    const orderId = url.searchParams.get('orderId');
    const order = orders.find(order => order.id === orderId);
    const item = order.products.find(item => item.productId === productId);


    let generateHTML = ``;
        generateHTML = `
                <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div class="product-info">
          ${productMeId.name}
        </div>

        <div class="product-info">
          Quantity: ${item.quantity}
        </div>

        <img class="product-image" src="${productMeId.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
        `;

    document.querySelector('.order-tracking').innerHTML = generateHTML;


    // cart total calculation
    let sumTotalCart = 0;
    let i22 = 0;
    while(i22 < cart.length) {
        sumTotalCart += cart[i22].quantity
        i22++;
    };
    document.querySelector('.cart-quantity').innerHTML = sumTotalCart;


};
window.addEventListener('DOMContentLoaded', generateTracking);
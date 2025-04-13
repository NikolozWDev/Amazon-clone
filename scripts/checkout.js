import { orderSummary } from "./orderSummary.js";
import { paymentSummary } from "./paymentSummary.js";
import { cartOOP } from "../data/cart-oop.js";
import { cartOOP2 } from "../data/cart-oop.js";
import { Cart } from "../data/cart-oop.js";
import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";



// Promise.all([
//     new Promise((resolve) => {
//         loadProducts(() => {
//             resolve('value1');
//         });
//     }),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     }),
    
// ]).then((values) => {
//     console.log(values)
//     orderSummary();
//     paymentSummary();
// });


async function loadPage() {
    try {
        console.log('page Loaded');
        await loadProducts();
        await loadCart();
    } catch(error) {
        console.log(error);
    };
    orderSummary();
    paymentSummary();
    return 'value is it loaded'
  };
  
  loadPage().then((value) => {
    console.log(`next steps . . . ${value}`);
  });


//     loadProducts().then(() => {
//         loadCart()}).then(() => {
//     orderSummary();
//     paymentSummary();
// });



// loadProducts(() => {
//     orderSummary();
//     paymentSummary();
// });


// Object-Oriented-Programming

cartOOP.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add')
console.log(cartOOP);
console.log(cartOOP2);
console.log(cartOOP instanceof Cart);
console.log(cartOOP2 instanceof Cart);
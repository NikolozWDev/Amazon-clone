import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOption } from "../data/deliveryOptions.js";
import { moneyProblem } from "./utils1.js";
import { orderPush } from "../data/orders.js";
import { orders } from "../data/orders.js";
import { loadProducts } from "../data/products.js";
import { clicked } from "./checkout.js";
import { saveClick } from "./checkout.js";

export async function paymentSummary() {
  await loadProducts();
    let productCents = 0;
    let i17 = 0;
    let htmlpro = ``;
    while (i17 < cart.length) {
        let cartItem = cart[i17];

        function getProduct(productId) {  
            let matchingProduct = null;
        
            let i8 = 0;
            while (i8 < products.length) {
                if (products[i8].id === productId) {
                    matchingProduct = products[i8];
                }
                i8++;
            }
            return matchingProduct;
        }

            let totalQuantity2 = 0;
            let i4 = 0;
          while (i4 < cart.length) {
          totalQuantity2 += cart[i4].quantity;
          i4++;
      
}

        const product = getProduct(cartItem.productId);
        productCents += product.priceCents * cartItem.quantity;

        let shippingCents = 0;

        cart.forEach(cartItem => {
            let selectedDeliveryOption = localStorage.getItem(`selectedDeliveryOption-${cartItem.productId}`);
            if (selectedDeliveryOption !== null) {
                let deliveryOptionIndex = Number(selectedDeliveryOption);
                shippingCents += deliveryOption[deliveryOptionIndex].deliveryPrice;
            }
        });
        let totalBeforeTaxCents = productCents + shippingCents;
        let taxCents = totalBeforeTaxCents * 0.10;
        let orderTotalCents = totalBeforeTaxCents + taxCents;



        htmlpro = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity2}):</div>
            <div class="payment-summary-money">$${moneyProblem(productCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
             <div class="payment-summary-money">$${moneyProblem(shippingCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneyProblem(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${moneyProblem(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${moneyProblem(orderTotalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        `;


        i17++;
    }
    document.querySelector('.mainpro').innerHTML = htmlpro;



    // place order button
    document.querySelector('.js-place-order').addEventListener('click', async () => {

      document.querySelector('.js-place-order').classList.add('jspractice')
      setTimeout(() => {
        document.querySelector('.js-place-order').classList.remove('jspractice')
      }, 5000)

      saveClick()
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            cart: cart,
          })
        });
        const order = await response.json();
        orderPush(order);
        console.log(order)
        console.log(cart)

      } catch {
        console.log('Error')
      }


      localStorage.removeItem('cart');
      window.location.href = 'orders.html'
      console.log(clicked)

    })
    
};
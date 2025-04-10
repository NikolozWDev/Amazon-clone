import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOption } from "../data/deliveryOptions.js";
import { moneyProblem } from "./utils1.js";

export function paymentSummary() {
    let productCents = 0;
    let i17 = 0;
    let htmlpro = ``;
    while (i17 < cart.length) {
        let cartItem = cart[i17];

        function getProduct(productsId) {  
            let matchingProduct = null;
        
            let i8 = 0;
            while (i8 < products.length) {
                if (products[i8].id === productsId) {
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

        const product = getProduct(cartItem.productsId);
        productCents += product.priceCents * cartItem.quantity;

        let shippingCents = 0;

        cart.forEach(cartItem => {
            let selectedDeliveryOption = localStorage.getItem(`selectedDeliveryOption-${cartItem.productsId}`);
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;


        i17++;
    }
    document.querySelector('.mainpro').innerHTML = htmlpro;
};
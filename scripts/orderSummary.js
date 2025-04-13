
import { cart, removeCart, saveToStorage, } from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyProblem } from './utils1.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';   // export default
import { deliveryOption } from '../data/deliveryOptions.js';
import { paymentSummary } from './paymentSummary.js';

export function orderSummary() {

let i5 = 0;
let htmlsr = ``;
while(i5 < cart.length) {

  const productIds = cart[i5].productId;
  const matchingProduct = getProduct(productIds);

  function getProduct(productIds) {
    let matchingProduct = null;

    let i8 = 0;
    while(i8 < products.length) {
      if(products[i8].id === productIds) {
        matchingProduct = products[i8];
      };
      if(matchingProduct) {
        matchingProduct.quantity = Number(matchingProduct.quantity) + 1;
      };
      
      i8++;
    };
    return matchingProduct;
  };


  let cartProduct = null;
  let i9 = 0;
  while (i9 < cart.length) {
    if (cart[i9].productId === productIds) {
      cartProduct = cart[i9];
      break;
    }
    i9++;
  }
  

function calItem() {
    let cartItems = 0;

    let i11 = 0;
    while(i11 < cart.length) {
      cartItems += cart[i11].quantity;
      i11++;
    };

    if(cartItems === 1) {
    document.querySelector('#items').innerHTML = `${cartItems} item`;
    } else {
    document.querySelector('#items').innerHTML = `${cartItems} items`;
  };

  }
  calItem();




    const htmlp2 = `
          <div class="cart-item-container" id="container">
          <div class="delivery-date" id="delivery-date-${matchingProduct.id}">
            Delivery date: ${dayjs().format('dddd, MMMM D')}
          </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${moneyProblem(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label-${matchingProduct.id}">${cartProduct.quantity}</span>
                  </span>
                  

                  

                  <span class="span1-${matchingProduct.id}">

                  <span id="updateid" class="update-quantity-link link-primary updateclass" data-product-id="${matchingProduct.id}">
                    Update
                  </span
                  >
            </span>


                  <span class="span2-${matchingProduct.id}">

                  
                  <span class="items-container-${matchingProduct.id} items-div">
            <input class="quantity-input-${matchingProduct.id}" style="width: 30px;">
            <span class="save-quantity-link link-primary save-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</span>
            </span>


            </span>




                  <span id="deletejs" class="delete-quantity-link link-primary deletejs2" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionF(matchingProduct)}
              </div>
            </div>
          </div>
    `

    htmlsr += htmlp2;

    i5++;
};
document.querySelector('#primary-sectionjs').innerHTML = htmlsr;



function deliveryOptionF(matchingProduct) {
  let htmlp3 = ``;
  let i16 = 0;

  while (i16 < deliveryOption.length) {
    let today = dayjs();
    let deliveryDate = today.add(deliveryOption[i16].deliveryDay, 'days');
    let dataString = deliveryDate.format('dddd, MMMM D');

    let isChecked = deliveryOption[i16].deliveryPrice === 0 ? 'checked' : '';

    let deliveryPriceText = deliveryOption[i16].deliveryPrice === 0 
      ? 'FREE Shipping' 
      : `$${formatCurrency(deliveryOption[i16].deliveryPrice)} - Shipping`;

    htmlp3 += `
      <div class="delivery-option">
        <input type="radio" ${isChecked} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" value="${i16}">
        <div>
          <div class="delivery-option-date">${dataString}</div>
          <div class="delivery-option-price">${deliveryPriceText}</div>
        </div>
      </div>
    `;
    i16++;
  }

  return htmlp3;
}

// Event listener to handle radio selection and save to localStorage
function handleDeliverySelection(matchingProduct) {
  const radios = document.querySelectorAll(`input[name="delivery-option-${matchingProduct.id}"]`);
  radios.forEach(radio => {
    radio.addEventListener('change', (event) => {
      const selectedOption = event.target.value;
      localStorage.setItem(`selectedDeliveryOption-${matchingProduct.id}`, selectedOption);

      // Update delivery date based on selection
      let today = dayjs();
      let deliveryDate = today.add(deliveryOption[selectedOption].deliveryDay, 'days');
      const formattedDate = deliveryDate.format('dddd, MMMM D');

      // Update the delivery date on the page
      const deliveryDateElement = document.querySelector(`#delivery-date-${matchingProduct.id}`);
      deliveryDateElement.textContent = `Delivery Date: ${formattedDate}`;
    });
  });
}

// On page load, restore selected delivery option from localStorage
window.onload = function() {
  cart.forEach((cartItem) => {
    const matchingProduct = products.find(product => product.id === cartItem.productId);
    if (matchingProduct) {
      let selectedOption = localStorage.getItem(`selectedDeliveryOption-${matchingProduct.id}`);
      if (selectedOption !== null) {
        const radioToSelect = document.querySelector(`input[name="delivery-option-${matchingProduct.id}"][value="${selectedOption}"]`);
        if (radioToSelect) {
          radioToSelect.checked = true;

          let today = dayjs();
          let deliveryDate = today.add(deliveryOption[selectedOption].deliveryDay, 'days');
          const formattedDate = deliveryDate.format('dddd, MMMM D');

          // Update the delivery date on the page
          const deliveryDateElement = document.querySelector(`#delivery-date-${matchingProduct.id}`);
          deliveryDateElement.textContent = `Delivery Date: ${formattedDate}`;
        }
      }

      // Initialize the event listener for delivery option change
      handleDeliverySelection(matchingProduct);
    }
  });
};



function formatCurrency(amount) {
  return (amount.toFixed(2)) / 100;
}





function updateBF() {
let updateButtons = document.querySelectorAll('.updateclass');
let i12 = 0;
while(i12 < updateButtons.length) {

  let link1 = updateButtons[i12];
  link1.addEventListener('click', () => {
    let linkpro = link1.dataset.productId;
    let itemContainer = document.querySelector(`.items-container-${linkpro}`);
    itemContainer.classList.add('prepareitems');
    document.querySelector(`.span1-${linkpro}`).classList.add('span1js');
    document.querySelector(`.span2-${linkpro}`).classList.add('span2js');
    document.querySelector(`.quantity-label-${linkpro}`).classList.add('span3js');
  });

  i12++;
};
}
updateBF();

function updateBF2() {
let updateSave = document.querySelectorAll('.save-quantity-link');
let i14 = 0;
while (i14 < updateSave.length) {
  let saveButton = updateSave[i14];
  saveButton.addEventListener('click', () => {
    let productId = saveButton.dataset.productId;


    let newQuantity = document.querySelector(`.quantity-input-${productId}`).value;

    let i15 = 0;
    while(i15 < cart.length) {
      if(cart[i15].productId === productId) {
        cart[i15].quantity = Number(newQuantity);
        break;
      };
      i15++;
    };
    if(Number(newQuantity) >= 1 && Number(newQuantity) <= 1000) {
    document.querySelector(`.quantity-label-${productId}`).innerText = newQuantity;
  }
   else {
    document.querySelector(`.quantity-label-${productId}`).innerHTML = `<span style="color: red; font-size: 14px">Only numbers!</span>`;
    setTimeout(() => {
      document.querySelector(`.quantity-label-${productId}`).innerHTML = `<span style="color: orange; font-size: 14px">Try again</span>`;
    }, 1000);
    setTimeout(() => {
      document.querySelector(`.quantity-label-${productId}`).innerHTML = 1;
      saveToStorage();
    }, 2000);
  };
    

    document.querySelector(`.span1-${productId}`).classList.remove('span1js');
    document.querySelector(`.span2-${productId}`).classList.remove('span2js');
    document.querySelector(`.quantity-label-${productId}`).classList.remove('span3js');
    let itemContainer = document.querySelector(`.items-container-${productId}`);
    itemContainer.classList.remove('prepareitems');

    paymentSummary()
    function calItem() {
      let cartItems = 0;
  
      let i11 = 0;
      while(i11 < cart.length) {
        cartItems += cart[i11].quantity;
        i11++;
      };
  
      document.querySelector('#items').innerHTML = `${cartItems} items`;
    }
    calItem();

    saveToStorage();
  });
  i14++;
};
}
updateBF2();
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateBF2();
  }
});





let deleteb = document.querySelectorAll('.deletejs2');
let i9 = 0;
while(i9 < deleteb.length) {
let button = deleteb[i9]

  deleteb[i9].addEventListener('click', () => {
    let productIdPro = button.dataset.productId
    removeCart(productIdPro);
    
    let mainContainer = button.closest('#container');
    mainContainer.remove();

    paymentSummary();
    function calItem() {
      let cartItems = 0;
  
      let i11 = 0;
      while(i11 < cart.length) {
        cartItems += cart[i11].quantity;
        i11++;
      };
  
      document.querySelector('#items').innerHTML = `${cartItems} items`;
    }
    calItem();

    saveToStorage();

  });

  i9++;
};

}

console.log(dayjs().subtract(10, 'days').format('dddd, MMMM D'));
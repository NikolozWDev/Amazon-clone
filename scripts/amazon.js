import { cart, saveToStorage, } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { moneyProblem } from './utils1.js';
import { deliveryOption } from '../data/deliveryOptions.js';
import { Product } from '../data/products.js';



async function loadPage2() {
  await loadProducts();
  loadRenderFunction();
};

loadPage2();

//   loadProducts()
//   .then(() => {
//   loadRenderFunction();
// });



function loadRenderFunction() {

let htmlc = ``;
function getRating() { return `src="images/ratings/rating-${products[i1].rating.stars * 10}.png">`}
function getMoney() { return `$${moneyProblem(products[i1].priceCents)}` }

let i1 = 0;
while(i1 < products.length) {

     htmlc += `
    
            <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products[i1].image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products[i1].name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              ${getRating()}
            <div class="product-rating-count link-primary">
              ${products[i1].rating.count}
            </div>
          </div>

          <div class="product-price">
            ${getMoney()}
          </div>

          <div class="product-quantity-container">
            <select id="valres-${products[i1].id}" class="pro555">
              <option id="val1" selected value="1">1</option>
              <option id="val2" value="2">2</option>
              <option id="val3" value="3">3</option>
              <option id="val4" value="4">4</option>
              <option id="val5" value="5">5</option>
              <option id="val6" value="6">6</option>
              <option id="val7" value="7">7</option>
              <option id="val8" value="8">8</option>
              <option id="val9" value="9">9</option>
              <option id="val10" value="10">10</option>
            </select>
          </div>

          ${products[i1].extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <div id="mainaddjs-${products[i1].id}" class="mainadd">
          <img class="addimg" src="images/checkmark.png">
          <p class="cart-add">Added</p>
          </div>

          <button id="addcartjs" class="add-to-cart-button button-primary" data-product-id="${products[i1].id}">
            Add to Cart
          </button>
        </div>
    
    `;

    i1++;

};

document.querySelector('#maindiv').innerHTML = htmlc;



// search bar

const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('input', () => {
  let i4 = 0;
  let htmlc = ``
  while(i4 < products.length) {
  
    if (
      products[i4].name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
      ( Array.isArray(products[i4].keywords) && products[i4].keywords.length > 1 &&
      ( products[i4].keywords[1].toLowerCase().includes(searchBar.value.toLowerCase()) ||
      products[i4].keywords[2].toLowerCase().includes(searchBar.value.toLowerCase()) ||
      products[i4].keywords[3].toLowerCase().includes(searchBar.value.toLowerCase())
    ) 
    )
    )   

     {
  
      htmlc += `
      
              <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${products[i4].image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${products[i4].name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${products[i4].rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${products[i4].rating.count}
              </div>
            </div>
  
            <div class="product-price">
              $${moneyProblem(products[i4].priceCents)}
            </div>
  
            <div class="product-quantity-container">
              <select id="valres-${products[i4].id}" class="pro555">
                <option id="val1" selected value="1">1</option>
                <option id="val2" value="2">2</option>
                <option id="val3" value="3">3</option>
                <option id="val4" value="4">4</option>
                <option id="val5" value="5">5</option>
                <option id="val6" value="6">6</option>
                <option id="val7" value="7">7</option>
                <option id="val8" value="8">8</option>
                <option id="val9" value="9">9</option>
                <option id="val10" value="10">10</option>
              </select>
            </div>
  
            ${products[i4].extraInfoHTML()}
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <div id="mainaddjs-${products[i4].id}" class="mainadd">
            <img class="addimg" src="images/checkmark.png">
            <p class="cart-add">Added</p>
            </div>
  
            <button id="addcartjs" class="add-to-cart-button button-primary" data-product-id="${products[i4].id}">
              Add to Cart
            </button>
          </div>
      
      `;
      
    }
  
    i4++;
  };
  
    document.querySelector('#maindiv').innerHTML = htmlc
    mainFunctions();

})


mainFunctions()
// main functions
function mainFunctions() {

let totalQuantity = 0;
function totalQuantityShow() {
  let totalQuantity = 0;
  let i4 = 0;
  while (i4 < cart.length) {
      totalQuantity += cart[i4].quantity;
      i4++;
  }
  document.querySelector('#cartquantity').innerHTML = totalQuantity;
  localStorage.setItem('cartquantity', totalQuantity);
  
}
totalQuantityShow();


// This is Add cart logic (includes: save product id ; save quantity)

let elements = document.querySelectorAll('#addcartjs');

const addCartEffect = (cartpusher) => {
  let addedvar = document.querySelector(`#mainaddjs-${cartpusher}`);

  if (!addedvar) return;

  addedvar.classList.add('mainjsadd');

  clearTimeout(addedvar.timeoutpro);

  addedvar.timeoutpro = setTimeout(() => {
    addedvar.classList.remove('mainjsadd');
  }, 1000);
};


let i2 = 0;
while(i2 < elements.length) {


    elements[i2].addEventListener('click', (event) => {

        let cartpusher = event.currentTarget.dataset.productId;
        addCartEffect(cartpusher);
        
        let i3 = 0;
  let found = false;
  while(i3 < cart.length) {

  if(cart[i3].productId === cartpusher) {
    cart[i3].quantity += 1;
    found = true;
    break;
  };

  i3++;
};


  if(!found) {
    cart.push(
      {
        productId: cartpusher,
        quantity: 1,
      },
    );
  };

  let selectedQuantity = document.querySelector(`#valres-${cartpusher}`).value;
  cart[i3].quantity += parseInt(selectedQuantity) - 1;


    

        console.log(totalQuantity);
        console.log(cart);

        

        saveToStorage();
        totalQuantityShow();

    });

    i2++;

    window.addEventListener('load', () => {
      let savedQuantity = localStorage.getItem('cartquantity');
      document.querySelector('#cartquantity').innerText = savedQuantity ? savedQuantity : 0;
      totalQuantityShow();
    });
};

}


};








// dark mode

let dmjs = document.querySelector('#dm-js');
let dmjs2 = document.querySelector('#dm-js2');

// Function to toggle dark mode
function toggleDarkMode() {
  dmjs.classList.toggle('dmpro');
  dmjs2.classList.toggle('dmpro2');
  document.querySelector('#bodydark').classList.toggle('bodydarkstyle');

  document.querySelectorAll('.product-container').forEach(element => {
    element.classList.toggle('dark-mode-style');
  });
  document.querySelectorAll('.add-to-cart-button').forEach(element2 => {
    element2.classList.toggle('dark-mode-style2');
  });
  document.querySelectorAll('.pro555').forEach(element3 => {
    element3.classList.toggle('dark-mode-style3');
  });
  document.querySelectorAll('.product-image').forEach(element4 => {
    element4.classList.toggle('dark-mode-style4');
  });

  // Save mode state in localStorage
  const isDarkMode = document.querySelector('#bodydark').classList.contains('bodydarkstyle');
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Click event for dark mode toggle
dmjs.addEventListener('click', toggleDarkMode);
window.addEventListener('load', () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    toggleDarkMode(); // ჩართავს dark mode-ს, თუ შენახულია
  }
});






const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString());


const object1 = {
  a: 2,
  // b: this.a        <--- this will be undefind. syntax error
};


function func1() {
  console.log(this);
};
func1();              // <--- undefind
func1.call('.call is a method');      // <--- method



const object2 = {
  method: () => {
    console.log(this);
  },
};
console.log(object2.method());   // <--- undefind
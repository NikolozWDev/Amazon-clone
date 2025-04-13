
// function, which helps to clean messy code ( object-oriented-programming | cart )
export class Cart {

    cartItems = undefined || [];
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
    };

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart(productId) {
        let found = false;
        let i3 = 0;

        while (i3 < this.cartItems.length) {
            if (this.cartItems[i3].productId === productId) {
                this.cartItems[i3].quantity += 1;
                found = true;
                break;
            }
            i3++;
        }

        if (!found) {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
            });
            i3 = this.cartItems.length - 1;
        }

        let selectedQuantityElement = document.querySelector(`#valres-${productId}`);
        if (selectedQuantityElement) {
            let selectedQuantity = parseInt(selectedQuantityElement.value);
            this.cartItems[i3].quantity += isNaN(selectedQuantity) ? 0 : selectedQuantity - 1;
        }

        this.saveToStorage();
        // totalQuantityShow();
    };

    removeCart(productId) {
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        this.saveToStorage();
    };


};


   
   // carts, which will be different carts
   export const cartOOP = new Cart('cart-oop');
   export const cartOOP2 = new Cart('cart-business');

//    cartOOP.localStorageKey = 'cart-oop';
//    cartOOP2.localStorageKey = 'cart-business';
   
   
   
   
   // out of carts ! ! ! !
   
   // Page load event to safely manipulate the cart quantity element
   window.addEventListener('DOMContentLoaded', () => {
       let savedQuantity = localStorage.getItem('cartquantity');
       let cartQuantityElement = document.querySelector('#cartquantity');
       
       // Make sure the element exists before manipulating it
       if (cartQuantityElement) {
           cartQuantityElement.innerText = savedQuantity ? savedQuantity : 0;
           totalQuantityShow();
       }
   });
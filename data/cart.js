
export let cart = JSON.parse(localStorage.getItem('cart')) || [];





export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
};





export let removeCart = (productfromid) => {
    let newcart = [];

    let i10 = 0;
    while(i10 < cart.length) {
        if(cart[i10].productId !== productfromid) {
            newcart.push(cart[i10]);
        };
        i10++;
    };
    cart = newcart;

    saveToStorage();
};



export async function loadCart() {

  const response = await fetch('https://supersimplebackend.dev/cart')
  console.log(response);

};
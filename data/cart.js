
export let cart = JSON.parse(localStorage.getItem('cart')) || [];





export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
};





export let removeCart = (productfromid) => {
    let newcart = [];

    let i10 = 0;
    while(i10 < cart.length) {
        if(cart[i10].productsId !== productfromid) {
            newcart.push(cart[i10]);
        };
        i10++;
    };
    cart = newcart;

    saveToStorage();
};



export function loadCart() {

  const promise = fetch('https://supersimplebackend.dev/cart').then((response) => {
    console.log(response);
  });

  return promise;

};
const productList = document.querySelector('.product-list');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
////////////////////////////////////
const orderModal = document.querySelector('.order-modal');
const confirmOrder = document.querySelector('.confirm-order');
///////////////////////////////////////////////
const confirmedItems = document.querySelector('.confirmed-items');
const confirmedTotal = document.querySelector('.confirmed-total');
const newOrder = document.querySelector('.new-order');



let cart = [];
//////////////////////
//load product
////////////////////

fetch('./data.json')
.then(response => response.json())
.then(data => {
    console.log(data);

    data.forEach(product => {
        // console.log(product);
      const card = document.createElement('div');
        
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image.desktop}" alt="${product.name}">
              
              <p>${product.catagory}</p>
              <h2>${product.name}</h2>
              <p>$${product.price.toFixed(2)}</p>
              <button>Add To Cart</button>
    `;
       const button = card.querySelector('button');

       button.addEventListener('click', () => {
        const existItem = cart.find(item => item.product.name === product.name);

        if(existItem){
            existItem.quantity++;
        }else{
            cart.push({
                product: product,
                quantity: 1
            });
        }
        // cart.push(product);
        renderCart();
        console.log(cart);
    });

         productList.appendChild(card);
    });
});
//////////////////////
//display
//////////////////////

function renderCart(){
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <h3>${item.product.name}</h3>
            <button class="decrease">-</button>
            <p>Quantity: ${item.quantity}</p>
            <button class="increase">+</button>
            <button class="remove">Remove</button>
            <p>$${(item.product.price*item.quantity).toFixed(2)}</p>
            `;
const decrease = cartItem.querySelector('.decrease');
const increase = cartItem.querySelector('.increase');
const remove = cartItem.querySelector('.remove');

decrease.addEventListener('click' , () => {
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(cartItem => cartItem !== item);
    }
    renderCart();
});
increase.addEventListener('click' , () => {
    item.quantity++;
    renderCart();
});
////////////////////////////////
//remove
///////////////
remove.addEventListener('click', () => {
  cart = cart.filter(cartItem => cartItem !== item);
  renderCart();
});

///////////////////////////////
//total
/////////////////////////
total += item.product.price * item.quantity;
        cartItems.appendChild(cartItem);
    });
    cartTotal.textContent = `total : $${total.toFixed(2)}`;
}

////////////////////////////
//confirm 
///////////////////////////
confirmOrder.addEventListener('click', () => {
  if (cart.length === 0)
     return;


  confirmedItems.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    total += item.product.price * item.quantity;

    const confirmedItem = document.createElement('div');

    confirmedItem.innerHTML = `
      <p>${item.product.name} × ${item.quantity}</p>
      <p>$${(item.product.price * item.quantity).toFixed(2)}</p>
    `;

    confirmedItems.appendChild(confirmedItem);
  });

  confirmedTotal.textContent =` Total: $${total.toFixed(2)}`;
  orderModal.classList.remove('hidden');
});

newOrder.addEventListener('click', () => {
  cart = [];
  renderCart();
  orderModal.classList.add('hidden');
});


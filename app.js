////////////////////////////////////// Dark Mode ///////////////////////////////////////////////
let darkMode = localStorage.getItem('darkMode')
const darkModeBtn = document.querySelector('.darkmode')
const enableDarkMode = () => {

  document.body.classList.add('darkmode')
  localStorage.setItem('darkMode', 'enabled')
  darkModeBtn.innerHTML = 'light_mode'
}

const disableDarkMode = () => {

  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null)
  darkModeBtn.innerHTML = 'dark_mode'
}
if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeBtn.onclick = ()  => {
  darkMode = localStorage.getItem('darkMode');
  darkMode !== 'enabled' ? enableDarkMode() : disableDarkMode()
}


////////////////////////////////// Search Bar /////////////////////////////////////
const searchBarBtn = document.querySelector('.searchbar-btn')
const searchBar = document.querySelector('.searchbar')
searchBarBtn.onclick = () => {
  searchBar.classList.toggle('active')
}




///////////////////////////////////// Shoping Cart //////////////////////////////////////////////
const shoppingCartBtn = document.querySelector('.shopping-cart-btn')
const shoppingCart = document.querySelector('.shopping-cart')

shoppingCartBtn.onclick = () => {
  shoppingCart.classList.toggle('active')
}

let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('.shopping-cart');
const cartSumPrice = document.querySelector('.total-cost');
const products = document.querySelectorAll('.card');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	rounded =  sum.toFixed(2);
    return rounded
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
            <div class="product">
				<div class="item-info">
                    <div class="img"><img src="${product.image}"></div>
                    <div class="name">${product.name}</div>
                    <div class="cost">$${product.basePrice}</div>
				</div>
                <div class="controls">
                    <div class="quantity"><div class="decrement" data-id=${product.id}>-</div><div>${product.count}</div><div class="increment" data-id=${product.id}>+</div></div>
                    <div class="remove-btn" onclick="removeItem(${product.id})"><span class="material-icons">
delete
</span></div>
                </div>
            </div>`
                
		});
		parentElement.innerHTML = result.join('');
		cartSumPrice.innerHTML = '$' + countTheSumPrice();


	}
	else {
		parentElement.innerHTML = '<h4>Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '$0.00';
	}
}

function removeItem(product) { // 2
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product) {
            productsInCart.splice(i,1);
        }
    }
    updateShoppingCartHTML();
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
            
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('add-to-cart__btn')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.product__name').innerHTML;
			const productPrice = item.querySelector('.price').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('increment');
	const isMinusButton = e.target.classList.contains('decrement');
	if (isPlusButton || isMinusButton) {

		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();
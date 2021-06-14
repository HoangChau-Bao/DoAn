if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  // updateCartTotal();
  var removeCartItemButton = document.getElementsByClassName('remove-product');
  console.log(removeCartItemButton);
  for (var i = 0; i < removeCartItemButton.length; i++) {
    var button = removeCartItemButton[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  var addToCartButton = document.getElementsByClassName('add-to-cart');
  for (var i = 0; i < addToCartButton.length; i++) {
    var button = addToCartButton[i];
    button.addEventListener('click', addToCartClicked);
  }
  var cartElement = $(document).find('.cart-item');
  if (cartElement.length > 0) {
    renderCart();
  }
}

function renderCart() {
  //addItemToCart('vivo',1000000,'http://localhost:3000/img/undefinedvivo%20y12.jpg');
  var cartItemList = JSON.parse(localStorage.getItem('cartItemList'));
  console.log(cartItemList);
  for (var i = 0; i < cartItemList.length; i++) {
    addItemToCart(
      cartItemList[i].title,
      parseInt(cartItemList[i].price),
      cartItemList[i].imageSrc,
    );
  }
  updateCartTotal();
}

function checkOutClicked() {
  alert('Thank you!');
  var cartItems = document.getElementsByClassName('cart-item')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('name')[0].innerText;
  var price = shopItem
    .getElementsByClassName('price')[0]
    .innerText.replaceAll('Giá:', '')
    .replaceAll(',', '')
    .replaceAll(' VNĐ', '');
  var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src;
  console.log(title, price, imageSrc);
  addItemToLocalStorage(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
  var price = price.toLocaleString('current');
  var cartRow = document.createElement('div');
  cartRow.classList.add('product');
  var cartItems = document.getElementsByClassName('cart-item')[0];
  var cartRowContents = `<div class="product-image">
            <img src="${imageSrc}">
        </div>
        <div class="product-details">
                <div class="product-title">${title}</div>
                <p class="product-description">Decription of this product</p>
                </div>
        <div class="product-price">${price}</div>
            <div class="product-quantity">
                <input class="quantity" type="number" value="1" min="1">
            </div>
        <div class="product-removal">
            <button class="remove-product" type="button">
                Remove
            </button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);
  cartRow
    .getElementsByClassName('remove-product')[0]
    .addEventListener('click', removeCartItem);
  document
    .getElementsByClassName('checkout')[0]
    .addEventListener('click', checkOutClicked);
}

function addItemToLocalStorage(title, price, imageSrc) {
  //test local storage
  var flag = true;
  var cartItem = { title: title, price: price, imageSrc: imageSrc };
  var cartItemList = JSON.parse(localStorage.getItem('cartItemList'));
  if (cartItemList == null) {
    cartItemList = [];
  }
  for (var i = 0; i < cartItemList.length; i++) {
    console.log(i, cartItemList[i].title);
    if (cartItemList[i].title == title && cartItemList[i].price == price) {
      flag = false;
      break;
    } else {
      flag = true;
    }
  }
  if (flag == true) {
    cartItemList.push(cartItem);
    // Put the object into storage
    localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
  } else {
    alert('Đã có sản phẩm này trong giỏ hàng !');
  }

  // Retrieve the object from storage
  var retrievedCartItems = localStorage.getItem('cartItemList');

  console.log('retrievedObject: ', JSON.parse(retrievedCartItems));
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value || input.value <= 0)) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('shopping-cart')[0];
  var cartRows = cartItemContainer.getElementsByClassName('product');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('product-price')[0];
    var quantityy = cartRow.getElementsByClassName('product-quantity')[0];
    var quantityElement = quantityy.getElementsByClassName('quantity')[0];
    var price = parseFloat(priceElement.innerText.replaceAll('.', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName(
    'totals-value',
  )[0].innerText = total.toLocaleString('current');
}

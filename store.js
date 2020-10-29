if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready(){
    var removeItems= document.getElementsByClassName('btn-danger1');
    
    for (var i=0; i<removeItems.length; i++){
        var button = removeItems[i]
        button.addEventListener('click',removeCartItem)
    }
    
    var addtoCartButtons = document.getElementsByClassName('buynow-btn')
    for (var i=0; i<addtoCartButtons.length; i++){
        var addbtn = addtoCartButtons[i];
        addbtn.addEventListener('click',addtocartClicked)
    }
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
    document.getElementsByClassName('btn-purchase1')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
    alert('Thank You for your purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked= event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i=0; i<cartRows.length;i++){
        var cartRow= cartRows[i]
        var priceele= cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceele.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function addtocartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var item = shopItem.getElementsByClassName('title-item')[0].innerText
    var item_price_full = shopItem.getElementsByClassName('item-select1')[0]
    var item_price = item_price_full.innerText.slice(6,11)
    var imgsrc = shopItem.getElementsByClassName('item-image-size')[0].src
    addItemtoCart(item,item_price,imgsrc)
    updateCartTotal()
}

function addItemtoCart(item,price,image){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for ( var i = 0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == item){
            alert('This item already exists in the cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" height="100">
        <span class="cart-item-title">${item}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
        <button class="btn1 btn-danger1" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger1')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    
}

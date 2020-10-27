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
    
    document.getElementsByClassName('btn-purchase1')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
    alert('Thank You for your purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updatecartTotal()
}

function removeCartItem(event){
    var buttonClicked= event.target
    buttonClicked.parentElement.parentElement.remove()
    updatecartTotal()
}


function updatecartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i=0; i<cartRows.length;i++){
        var cartRow= cartRows[i]
        var priceele= cartRow.getElementsByClassName('cart-price')[0]
        var price = parseFloat(priceele.innerText.replace('$',''))
        total = total + (price) 
    }
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
    updatecartTotal()
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
    <select class="cart-quantity-input">
    <option >250 grams</option>
    <option>500 grams</option>
    <option>750 grams</option>
    <option>1000 grams</option>
    </select>
        <button class="btn1 btn-danger1" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger1')[0].addEventListener('click',removeCartItem)
    
}

var selection = document.getElementsByClassName("item-select");

selection.onchange = function(event){
  var rc = event.target.options[event.target.selectedIndex].dataset.rc;
  console.log("rc: " + rc);
};
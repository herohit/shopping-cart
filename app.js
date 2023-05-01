const addToCart = document.querySelectorAll('.btn');
const cartCount = document.querySelector('span');
const allCard = document.querySelectorAll('.card');
const openCart =document.querySelector('.cart');
const viewcart =document.querySelector('.viewcart');
const closeCart =document.querySelector('.cross');
const blackdiv=document.querySelector('.blackdiv');
const table = document.querySelector('#cartItems');
const body = document.body;
let counter=0;
cartCount.innerText=counter;

// close cart button
closeCart.addEventListener("click",()=>{
    viewcart.classList.remove("active");
    blackdiv.classList.remove('active');
    body.classList.remove('no-scroll');
})

// button to view the cart
openCart.addEventListener('click',()=>{
    viewcart.classList.add("active");
    blackdiv.classList.add("active");
    body.classList.add('no-scroll');

    
})


// button to add items to cart
addToCart.forEach((item,index)=>{
    item.addEventListener('click', (event) =>{
        addCart(item,index);
    });
})



// function to add items to the cart
function addCart(item,index){


    
    let desc =item.parentNode;
    let card = allCard[index];
    let imageSrc = card.querySelector('img').src;
    let price = desc.querySelector("p").innerText;
    let title = card.querySelector('.item-title h2').innerText;

    //check for duplicate item in cart
    let CartItemTitle = table.querySelectorAll('.item-title');
    for(let i=0;i<CartItemTitle.length;i++){
        if(CartItemTitle[i].innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }


    

    let tbody=table.querySelector('tbody');
    let newRow = tbody.insertRow();
    let imagecell = newRow.insertCell(0);
    let priceCell =newRow.insertCell(1)
    let quantityCell = newRow.insertCell(2);
    let removeCell = newRow.insertCell(3);

    
    removeCell.innerHTML='<button class="remove-div">Remove</button>'

    imagecell.colSpan = 2
    imagecell.innerHTML = `<img class="p-image" src="${imageSrc}" alt=""><span class="item-title">${title}</span>`;
    priceCell.classList.add("item-price");
    priceCell.innerText  = price;
    quantityCell.innerHTML=`<input class="item-quantity"  type="number"  value="1">`;


    let input = quantityCell.querySelector('input');
    input.addEventListener('change',quantityChanged);


    let removeBtn = removeCell.querySelector('button');
    removeBtn.addEventListener('click',removeItem);

    updateCartTotal()


}

function removeItem(e){
    e.target.parentElement.parentElement.remove();
    updateCartTotal()
}


function updateCartTotal(){
    // update count of cart
    let rowCount = table.rows.length - 1;
    if(rowCount>0){
    cartCount.innerText=rowCount;
    }

    //update total price of cart
    let total = 0
    let trow = table.querySelectorAll('tbody tr');
    Array.from(trow).forEach(row=>{
        let price = parseFloat(row.querySelector('.item-price').innerText.replace('$', ''));
        let quantity = row.querySelector('.item-quantity').value;
        
        total = total + (price * quantity)
        
    })
    total = Math.round(total * 100) / 100
    let totalPriceSpan = document.querySelector('.total-price');
    totalPriceSpan.innerText =`$${total}`;

}

function quantityChanged(e){
    if(isNaN(e.target.value) || e.target.value<=0 ){
        e.target.value = 1
    }
    if(e.target.value >10){
        e.target.value =10
    }
    updateCartTotal()
}

const purchased =document.querySelector('.purchase button');
purchased.addEventListener('click',purchasedClicked);


function purchasedClicked(){
    //get all item in cart
    let trow = table.querySelectorAll('tbody tr');
    trow.forEach(row => {
        row.remove();
      });
      alert("Thank You for shopping with us!")
    updateCartTotal()
}
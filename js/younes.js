  //++++++++++++++++++++++++++++++meny knappen++++++++++++++++++++++++++++++
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');


hamburger.addEventListener('click', menuOpen);
navMenu.addEventListener('click', navOpen);


function menuOpen () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function navOpen(){
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');

}
              
              
// //++++++++++++++++++++++++++++++theme toggle.++++++++++++++++++++++++++++++
              
const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');
              
darkMode.addEventListener('click', backgroundDark);
lightMode.addEventListener('click', backgroundLight);

function backgroundDark () {
  document.body.classList.toggle('dark_mode');
  darkMode.classList.toggle('hide');
  lightMode.classList.remove('hide');
}

function backgroundLight () {
  document.body.classList.remove('dark_mode');
  lightMode.classList.toggle('hide');
  darkMode.classList.remove('hide');
}    

//antal munkar, plus younes och minus
              
              
/* plus minus knappar
  -när man klickar på plus eller minus ska summan uppdateras
  -vi behöver ta reda på antal praliner
  -vi behöver ta reda på priset på pralinergit 
*/
              
const products = [{
  name:"Apelsin Hasselnöt",
  price:15,
  rating:4,
  amount: 0,
  kategori: "Nötter",
  description: "apelsin-hasselnot-pralin",
  image1:'bilder/praliner/apelsin-hasselnöt/AH-hel.png',
  image2:'bilder/praliner/apelsin-hasselnöt/AH-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name:"Blodapelsin-vanilj",
  price:20,
  rating:4,
  amount: 0,
  kategori: "Frukt",
  description: "pralin",
  image1:'bilder/praliner/blodapelsin-vanilj/BV-hel.png',
  image2:'bilder/praliner/blodapelsin-vanilj/BV-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  }, 
  {
  name: "Calamansi",
  price: 12,
  rating:3,
  amount: 0,
  kategori: "Mjölk",  
  description: "pralin",
  image1:'bilder/praliner/calamansi/CC-hel.png',
  image2:'bilder/praliner/calamansi/CC-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Espresso",
  price: 5,
  rating:3,
  amount: 0,
  kategori: "Mörk",  
  description: "pralin",
  image1:'bilder/praliner/espresso-kola/EK-hel.png',
  image2:'bilder/praliner/espresso-kola/EK-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Hallon Lakrits",
  price: 14,
  rating:3,
  amount: 0,
  kategori: "Mörk", 
  description: "pralin",
  image1:'bilder/praliner/hallon-lakrits/HL-hel.png',
  image2:'bilder/praliner/hallon-lakrits/HL-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Hasselnöt",
  price: 14,
  rating:3,
  amount: 0,
  kategori: "Nötter",  
  description: "pralin",
  image1:'bilder/praliner/hasselnöt/H-hel.png',
  image2:'bilder/praliner/hasselnöt/H-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Jordnöt",
  price: 16,
  rating:3,
  amount: 0,
  kategori: "Nötter",  
  description: "pralin",
  image1:'bilder/praliner/jordnöt/J-hel.png',
  image2:'bilder/praliner/jordnöt/J-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {             
  name: "Passion-Mango",
  price: 16,
  rating:3,
  amount: 0,
  kategori: "Frukt", 
  description: "pralin",
  image1:'bilder/praliner/passion-mango/PM-hel.png',
  image2:'bilder/praliner/passion-mango/PM-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Saltkola",             
  price: 10,
  rating:5,
  amount: 0,
  kategori: "Mjölk",  
  description: "pralin",
  image1:'bilder/praliner/saltkola/SK-hel.png',
  image2:'bilder/praliner/saltkola/SK-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Maracaibo",
  price: 8,
  rating:2,
  amount: 0,
  kategori: "Mörk", 
  description: "pralin",
  image1:'bilder/praliner/maracaibo/M-hel.png',
  image2:'bilder/praliner/maracaibo/M-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  }
  ];

  // lucia produkt som skrivs ut i maxs regel för lucia, skapa en funktion och kalla på den.
  const luciaProduct = {
    name: "Pepparkakspralin",
    price: 0,
    rating:5,
    amount: 1,
    kategori: "Mjölk", 
    description: "pralin",
    image1:'./bilder/pepparkaksPralin.jpg',
    alt: 'pralin-chocolate-orange-nuts',
  }
              
const chocolateContainer = document.querySelector('#chocolate-container');


//+++++++++++++++++++++++++++sätt att skriva ut text ist för och ha i html++++++++++++++++++++++++++++++              
function renderChocolate(arrayToRender) {
chocolateContainer.innerHTML = '';  //detta gör att systemet rensar så att antalet rensas medan man utökar den

  for (let i  = 0; i < arrayToRender.length; i++) {    
    chocolateContainer.innerHTML += 
    `<article class="pralin">
      <h3 class="cartName">${arrayToRender[i].name}</h3> 
      <div class="images">
        <section class="imgContainer">
          <div class="imageBox">
            <img id="img-1" class="img1" src="${arrayToRender[i].image1} "alt=""/>
            <img id="img-2" class="img2" src="${arrayToRender[i].image2} "alt=""/>
          </div>
          <button class="prevImage" data-operator="left"><span class="left"><i class='bx bxs-left-arrow'></i></span></button>
          <button class="nextImage" data-operator="right"><span class="right"><i class='bx bxs-right-arrow'></i></span></button>
        </section>
        Betyg:<span class="rating">${arrayToRender[i].rating}</span><br>
        Pris:<span class="price">${arrayToRender[i].price} kr/st</span> <br>
        Summa:<span class="sum">${arrayToRender[i].price * arrayToRender[i].amount}</span> <br>
        <button class="remove" data-operator="minus" data-id="${i}">-</button>
        <span class="amount">${arrayToRender[i].amount} st</span>
        <button class="add" data-operator="plus" data-id="${i}">+</button>
      </div> 
    </article>`;
  }


  //+++++++++++++++++++++++++++++++++++++++gör att man kan klicka på knappen+++++++++++++++++++++++++++++++++++++++

  const btnAdd = document.querySelectorAll('button[data-operator="plus"]');
  const btnReduce = document.querySelectorAll('button[data-operator="minus"]');

  for (let i= 0; i < btnAdd.length; i++) {
    btnAdd[i].addEventListener('click', updateAmount)
    btnReduce[i].addEventListener('click', reduceAmount)
  }


  //++++++++++++++++++++++++++priset av produkterna ökas.+++++++++++++++++++++++++++++++++++++++

  sumTotal = arrayToRender.reduce(                  
    (previousValue, arrayToRender) => 
    {return (arrayToRender.amount * arrayToRender.price) + previousValue;}, 0); 
  console.log(sumTotal);

                
  printOrderedChocolate ()
                
  document.querySelector('#cartSum').innerHTML = sumTotal;
    
  //+++++++++++++++++++++++++++++++++++++++ökar antal praliner som skrivs ut i kundkorgen.+++++++++++++++++++++++++++++++++++++++
  const amountTotal = arrayToRender.reduce(                  
  (previousValue, product) => {
  return product.amount+ previousValue;
  },
  0
  );
  console.log(amountTotal);
                  
  printOrderedChocolate ()
                
  document.querySelector('#cartTotal').innerHTML= amountTotal; //detta möjliggör användaren att kunna ändra bildspelet, när antalet ökas.
  const nextBtn = document.querySelectorAll('.nextImage');
  const prevBtn = document.querySelectorAll('.prevImage');

  for(let i = 0; i < nextBtn.length; i++){
    prevBtn[i].addEventListener('click', imageSwap);
    nextBtn[i].addEventListener('click', imageSwap);
  }

}   //++++++++++++++++++++++++++++++++++slut på renderchocolate+++++++++++++++++++++++++++++++++++++++

let sumtotal = 0;
let freightPrice = 25;
let priceToPay = 0;

//++++++++++++++++++++++++++++++FUNKTION för att printa ut chokladen på sidan++++++++++++++++++++++++++++++

function printOrderedChocolate () {
  document.querySelector('#cart').innerHTML = '';
  for(let i = 0; i < products.length; i ++){
    if (products[i].amount > 0) {
      document.querySelector('#cart').innerHTML += 
      `<div ="cartInfo"> <br> 
        <div ="cartTitel">
          <h3>${products[i].name}</h3> 
          <img src="${products[i].image1}" width="60" height="60"}>
          <div class="cartSumeringTitel"> 
            <h4>Antal</h4> 
            <h4>Summma</h4>
          </div>
          <div class="cartResultat"> 
            <p>${products[i].amount}st</p> 
            <p>${sum}</p>
          </div>
        </div>
        <hr class="line">
      </div>`;      
    }
  }
  if (isLucia) {                    //kallar på max regeln kring lucia.
    printedPralinLucia ();          //kallar på funktionen som skriver ut lucia pralin
  }
  updateCartPrice();
  tenProductsDiscount();
}  //++++++++++++++++++++++++++++++++++++printedOrderedChocolate slut+++++++++++++++++++++++++++++++++++++


//+++++++++++++++++++++++++++++++++++++++++rabat vid köp av 10 st från samma produkt+++++++++++++++++++++++++
/*function tenProductsDiscount(){
  
let amountTotal = products.reduce(                  
  (previousValue, product) => {
  return product.amount+ previousValue;},0);
  console.log(amountTotal);

  if (product.amount > 10)
  amountTotal = Math.round(price * 0.1);
}*/


//+++++++++++++++++++++++funktion skriva ut uppdaterad pris+++++++++++++++++++++++++++++++++++++
function updateCartPrice(){
  sumTotal = products.reduce(                  
    (previousValue, products) => 
    {return (products.amount * products.price) + previousValue;}, 0); 
  console.log(sumTotal);

  if (discountCodeValid){
    sumTotal = 0;
  }

  let amountShipping = products.reduce(                  
    (previousValue, product) => {
    return product.amount+ previousValue;},0);
    console.log(amountShipping);

  if (shippingCost){
    if (amountShipping > 15){
      freightPrice = 0;
    } else {
      freightPrice = 25 + Math.round(sumTotal * 0.1);
    }
  }

  let amountProducts = products.reduce(                  
    (previousValue, product) => {
    return product.amount+ previousValue;},0);
    console.log(amountProducts);

    //upprepning från uppifrån, kanske går o göra de tillsammans???++++
    //vid köp av fler än 10 st............

  sum = products.reduce(                  
    (previousValue, products) => 
    {return (products.amount * products.price) + previousValue;}, 0); 
    console.log(sum);

  for(let i = 0; i < products.length; i++){                                            
    amountProducts += products[i].amount;

   if (products[i].amount >= 10){
    sum += ((products[i].amount * products[i].price) * 0.1); 
   } else{
    sum += (products[i].amount * products[i].price);
   }
  
  }


  document.querySelector('#updatePrice').innerHTML = '';  
  document.querySelector('#updatePrice').innerHTML =
    ` <section class="cart-amount">
        <span>Summa</span>
        <span class="price-summary">${sumTotal}</span>
      </section>
      <br>
      <section>
        <span>Frakt</span>
        <span class="shipping">${freightPrice}</span>
      </section>
      <br>
      <section class="discount">
        <span>Rabatt</span>
        <span class="discount-sum"></span>
      </section>
      <hr class="line">
      <section class="total-price">
        <span>Att betala</span>
        <span class="total-summary">${freightPrice + sumTotal}</span>
      </section>`; 
}

//++++++++++++++++++++++++++++++++++funktion för rabatt+++++++++++++++++++++++++++++++++++

const discountField = document.querySelector('.discountCode');
const discountBtn = document.querySelector('.discountButton');
let discountCodeValid = false;

discountBtn.addEventListener('click' , validateDiscount);

function validateDiscount() {
    if (discountField.value === "a_damn_fine-cup_of-coffee") {
      discountCodeValid = true;
      updateCartPrice();
    }
}

//++++++++++++++++++++++++++++++funktion för leverans++++++++++++++++++++++++++++++

let shippingCost = true;

function shippingDiscount(){ 
  shippingCost = false;
}

//++++++++++++++++++++++++++++++funktion för plus knappen på sidan++++++++++++++++++++++++++++++
function updateAmount(e) {

const chocolateChoosed = e.currentTarget.dataset.id;
products[chocolateChoosed].amount += 1;
                
console.log(products);
renderChocolate(products);
}
              
renderChocolate(products);


 //++++++++++++++++++++++++++++++funktion för minusknappen på sidan++++++++++++++++++++++++++++++
function reduceAmount(e) {
const chocolateChoosed = e.currentTarget.dataset.id;
let amount = chocolateChoosed.innerHTML;

if (amount -1 < 0) {
return; 
}
                  
if (products[chocolateChoosed].amount > 0) {
  products[chocolateChoosed].amount -=1    
};
           
console.log(products);
renderChocolate(products);
}

//++++++++++++++++++++++++++++++funktion för att tömma varukorgen.++++++++++++++++++++++++++++++

const emptyCartBtn = document.querySelector('#emptyCart');
emptyCartBtn.addEventListener('click', emptyCart);

function emptyCart (e){
  for (let i = 0; i<products.length; i++){
    products[i].amount = 0;
  }

  renderChocolate(products);      //tömma de produkter som valts.
}


//detta skriver ut ratingen på sidan

/***************  Pseudokod
-knapp för att kunna trycka höger och vänster
-event för prevBtn och nextBtn
-funktion för att gå till nästa bild
-funktion för att gå till förgående bild
-variabel för att veeta vilken aktuell bild vi står på
-hantera när vi är på sista bilden samt första
-funktion för att skapa pluppar för antal bilder
*/
//steg 1 variabler 


//++++++++++++++++++++++++++++++ändra bild i ett bildspel++++++++++++++++++++++++++++++

function imageSwap(e){
  const image1Slideshow =e.currentTarget.parentElement.querySelector('#img-1');
  const image2Slideshow =e.currentTarget.parentElement.querySelector('#img-2');

  const first = image1Slideshow.getAttribute('src');
  const second = image2Slideshow.getAttribute('src');

  image1Slideshow.setAttribute('src', second);
  image2Slideshow.setAttribute('src', first);
};



//++++++++++++++++++++++++++++ få en gratis lucia pralin+++++++++++++++++++++++

function printedPralinLucia () {
    document.querySelector('#cart').innerHTML += 
    `<div>
      <br> 
      <div>
        <h3>${luciaProduct.name}</h3> 
        <img src="${luciaProduct.image1}" width="60" height="60"}>
        <div class="cartSumeringTitel"> 
          <h4>Antal</h4> 
          <h4>Summma</h4>
        </div>
        <div class="cartResultat"> 
          <p>${luciaProduct.amount}st</p> 
          <p>${luciaProduct.price}kr</p>
        </div>
      </div>
      <hr class="line">
    </div>`;
  };



 //++++++++++++++++++Rating skrivs ut på sidan+++++++++++++++++++++++++++++++++++++
function starCreate() {
  const ratingElements = document.querySelectorAll('.rating');
  
  for (let i = 0; i< products.length; i++) { 
    const ratingNumber = products[i].rating;
    const stars = '<span class="dot" ><i class="fa-solid fa-star"></i></span>';
    ratingElements[i].innerHTML += stars + ratingNumber;
  }
}

//+++++++++++++++++++++++det är jul, ändra bakgrund och ändra text till röd+++++++++++++++++++++++++++++++++++++++
function xMas (){
  if (isChristmas){
    document.querySelectorAll(".price").forEach((element) => {
      element.style.color = "red";
  });
  document.body.style.backgroundImage = "url('./bilder/jul-bakgrund.jpg')";
    document.body.style.backgroundSize = 'no-repeat';
}}



function discountMonday(){
  if (mondayDiscountActive){
    printOrderedChocolate.innerhtml += 'Måndagsrabatt: 10 % på hela beställningen';
    updateCartPrice.innerHTML = Math.round(sumTotal * 0.9);
    shippingDiscount.innerHTML = Math.round(freightPrice * 0.9);
  }
}




xMas();


                /*
                - behövs ett event för tidigare bild och kommande bild.(click)
                -funktion för att gå till nästa bild
                -funktion för att gå till tidigare bild
                -behövs ha koll på vilken som är den aktuella bilden (variabel)
                -hantera när vi är på sista bilden alt första bilden
                -funktion för att skapa pluppar för antal bilder
                */
              
              /*kundkorg, addToCart.
              -klicka på add to cart
                -produkten ska läggas i kundkorgen
                -antal st ska uppdateras
                -totalpris ska uppdateras utmed antal
                -rabatt ska dras när man beställer fler än 10 utav en (i<10)
                -knapp i kundkorg ska finnas för bekräfta beställning.*/
               //kundkorgs summering
              
            //kundkorgen ska ge dig rabatterat pris, 10% rabat..
            
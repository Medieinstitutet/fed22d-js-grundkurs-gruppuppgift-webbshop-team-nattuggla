              /******** VARIABLER ********/

/******** header ********/ 

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');


const pageLoadTime = new Date();                     //  skapa ett Date-objekt
const dateString = pageLoadTime.toDateString();      //  för kontroll av dag, här eller deklarera i funktionen isHoliday()?
const orderDay = pageLoadTime.getDay();              //  spara dagen för beställning som number mellan 0 och 6 (0 = söndag)
const orderHour = pageLoadTime.getHours();           //  spara klockslag för beställning, number mellan 0 och 23
let orderTimer;
let mondayDiscountActive = false;
let isEvenWeek = false;
const weekNum = getWeekNum();                       // spara aktuellt veckonummer

let deliveryTime;                                   //  massa matte på pageLoadTime sen?

let isLucia = false;           
let isChristmas = false;

const priceRangeElement = document.querySelector('#priceRangeElement');
const currentPriceRange = document.querySelector('#currentPriceRange');
const sortingRadios = document.querySelectorAll('input[name="sort-option-btn"]');

const chocolateContainer = document.querySelector('#chocolate-container');

// kundkorgsvariabler
const emptyCartBtn = document.querySelector('#emptyCart');
let sumtotal = 0;

  
let freightPrice = 25;
let priceToPay = 0;
let discountPrice = '.amount' * 0.9;

// rabattvariabler
const discountField = document.querySelector('.discountCode');
const discountBtn = document.querySelector('.discountButton');
let discountCodeValid = false;
let shippingCost = true;  // fraktkostnad default pris, om inget särskilt
let tenProductsDiscount = true;


/********  FUNKTIONER ********/

function onLoadListeners() {
    // meny
  hamburger.addEventListener('click', menuOpen);
  navMenu.addEventListener('click', navOpen);

    // theme toggle
  darkMode.addEventListener('click', backgroundDark);
  lightMode.addEventListener('click', backgroundLight);

    // sortering
  sortingRadios.forEach(element => {    // event på varje interaktion med radio-knappar
    element.addEventListener('change', updatePriceRange);
    });
  priceRangeElement.addEventListener('input', updatePriceRange);    // event på varje interaktion med pris-slider
  
    // 
  emptyCartBtn.addEventListener('click', emptyCart);
  discountBtn.addEventListener('click' , validateDiscount);   // event för rabattkods-knapp

}

function menuOpen () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function navOpen(){
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

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

/******** funktioner som kollar datum ********/ 

function isHoliday() {
  if (pageLoadTime.getDate() == 24 && pageLoadTime.getMonth() == 11) {        // jul
    // TODO: gör pristexter röda och byt bakgrundsbild
  isChristmas = true;
  }
  else if (pageLoadTime.getDate() == 13 && pageLoadTime.getMonth() == 11) {   //  lucia
  isLucia = true;
  //en funktion som skriver ut en <div><h3></h3> <img> <span></span></div> i kundkorgen, med namn, bild och summa 0kr. 
  //kalla på funktionen när det är regeln ovanför.
  }
}

function xMas (){
  if (isChristmas){
    document.querySelectorAll(".price").forEach((element) => {
      element.style.color = "red";
  });
  document.body.style.backgroundImage = "url('./bilder/jul-bakgrund.jpg')";
    document.body.style.backgroundSize = 'no-repeat';
}}

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


/**
 * kontrollerar vilken dag beställning lagts
 */
function checkDay(day) { 
  
  switch (day) {           
    case 1:   // OM måndag:
      if (orderHour < 10 && orderHour >= 3) {
        mondayDiscountActive = true;
      }
      else if (orderHour >= 0 && orderHour <= 3) {    // ska måndagsrabatten gälla här där helgpåslaget är aktivt?
      applyWeekendIncrease();
      }
    break;

    case 2:   // OM tisdag
    checkWeek(weekNum);
    break;

    case 5:   // OM fredag
      if (orderHour > 15) {     // efter 15
        applyWeekendIncrease();
      }
    break;

    case 6:   // OM lördag
    case 0:   // eller söndag
      applyWeekendIncrease();
    break;
    default:
    break;
  }
}

function getWeekNum() {   //  smart funktion från nätet, lite förkortad och modifierad
  startDate = new Date(pageLoadTime.getFullYear(), 0, 1);
  let days = Math.floor((pageLoadTime - startDate) / (24 * 60 * 60 * 1000));
        
  let weekNumber = Math.ceil(days / 7);
  return weekNumber;
}

function checkWeek(week) {
  if (week % 2 == 0) {
    isEvenWeek = true;
  }
}
/*
checkWeek(49);                  // ger false i console
checkWeek(weekNum);             // ger true i console (testad vecka 48)
*/

/******** funktioner som manipulerar pris ********/     
function discountMonday(){
  if (!mondayDiscountActive){
    printOrderedChocolate.innerhtml += 'Måndagsrabatt: 10 % på hela beställningen';
    updateCartPrice.innerHTML = Math.round(priceRegular * 0.9);
  }

  // const inSEK = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(sumTotal+freightPrice);
  // därdenskava.innerHTML = inSEK; <- kolla nåt 😀
}



function applyWeekendIncrease() {
  // sneaky prishöjning på 10% (eller bool?)
}


function shippingDiscount(){ 
  shippingCost = false;
}

  /******** sortering och filtrerings-funktioner ********/ 

  let selectedRadioBtn;
  let selectedPriceRange = priceRangeElement.value;


  function updatePriceRange() {   
    selectedPriceRange = priceRangeElement.value;
    currentPriceRange.innerHTML = `${selectedPriceRange} kr`;
    sortingRadios.forEach(element => {    // kolla vilken radio-knapp som är vald och kalla sorteringsfunktion
      if (element.checked) {
        selectedRadioBtn = element.id;  // #1 kanske lite snyggare med value ist 🤔  
      }
    });
    sortBy(selectedRadioBtn);
  }
  
  
  /**
   * 
   * @param {string} radioBtnId - id för vald sorterings-radioknapp
   * sorterararray och kallar på utskriftsfunktion
   */
  function sortBy(radioBtnId) {   // #2 kanske lite snyggare med value ist 🤔 
  
    switch (radioBtnId) {
      case 'priceRadioBtn':   // sortera efter pris, högt till lågt
        products.sort( (a, b) => { return b.price - a.price; } )
        
      break;
  
      case 'nameRadioBtn':    // sortera efter namn, A-Ö
        products.sort( (a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
  
      break;
  
      case 'categoryRadioBtn':
        products.sort( (a, b) => {
          if (a.kategori < b.kategori) {  // TODO: engelska
            return -1;
          }
          if (a.kategori > b.kategori) {  // TODO: kodupprepning här.. gör funktion av bokstavssortering? om tid finns..
            return 1;
          }
          return 0;
        });
  
      break;
  
      case 'ratingRadioBtn':
        products.sort( (a, b) => { return b.rating - a.rating; } )   // TODO: kodupprepning, om tid finns..
      break;
      
      default:
      break;    
    }
  
    renderChocolate();
  
  }

  function renderChocolate() {
    chocolateContainer.innerHTML = '';  //detta gör att systemet rensar så att antalet rensas medan man utökar den
      for (let i  = 0; i < products.length; i++) {    
        if (products[i].price <= selectedPriceRange) {
        chocolateContainer.innerHTML += 
        `<article class="pralin">
          <h3 class="cartName">${products[i].name}</h3> 
          <div class="images">
            <section class="imgContainer">
              <div class="imageBox">
                <img id="img-1" class="img1" src="${products[i].image1} "alt=""/>
                <img id="img-2" class="img2" src="${products[i].image2} "alt=""/>
              </div>
              <button class="prevImage" data-operator="left"><span class="left"><i class='bx bxs-left-arrow'></i></span></button>
              <button class="nextImage" data-operator="right"><span class="right"><i class='bx bxs-right-arrow'></i></span></button>
            </section>
            Betyg:<span class="rating">${products[i].rating}</span><br>
            Pris:<span class="price">${products[i].price} kr/st</span> <br>
            Summa:<span class="sum">${products[i].price * products[i].amount}</span> <br>
            <button class="remove" data-operator="minus" data-id="${i}">-</button>
            <span class="amount">${products[i].amount} st</span>
            <button class="add" data-operator="plus" data-id="${i}">+</button>
          </div> 
        </article>`;
        }
      }
      xMas();
      //+++++++++++++++++++++++++++++++++++++++gör att man kan klicka på knappen+++++++++++++++++++++++++++++++++++++++
    
      const btnAdd = document.querySelectorAll('button[data-operator="plus"]');
      const btnReduce = document.querySelectorAll('button[data-operator="minus"]');
    
      for (let i= 0; i < btnAdd.length; i++) {
        btnAdd[i].addEventListener('click', updateAmount)
        btnReduce[i].addEventListener('click', reduceAmount)
      }
    
    
      //++++++++++++++++++++++++++priset av produkterna ökas.+++++++++++++++++++++++++++++++++++++++
      sumTotal = products.reduce(                  
        (previousValue, product) => 
        {return (product.amount * product.price) + previousValue;}, 0); 
      printOrderedChocolate ()
                    
      document.querySelector('#cartSum').innerHTML = sumTotal;
        
      //+++++++++++++++++++++++++++++++++++++++ökar antal praliner som skrivs ut i kundkorgen.+++++++++++++++++++++++++++++++++++++++
      amountTotal = products.reduce(                  
      (previousValue, product) => {
      return product.amount+ previousValue;}, 0 );

                      
      printOrderedChocolate ();
      updateCartPrice();
                    
      document.querySelector('#cartTotal').innerHTML= amountTotal; //detta möjliggör användaren att kunna ändra bildspelet, när antalet ökas.
      const nextBtn = document.querySelectorAll('.nextImage');
      const prevBtn = document.querySelectorAll('.prevImage');
    
      for(let i = 0; i < nextBtn.length; i++){
        prevBtn[i].addEventListener('click', imageSwap);
        nextBtn[i].addEventListener('click', imageSwap);
      }
    
    }   //++++++++++++++++++++++++++++++++++slut på renderchocolate+++++++++++++++++++++++++++++++++++++++
  
//++++++++++++++++++++++++++++++funktion för plus knappen i produkt-container++++++++++++++++++++++++++++++
function updateAmount(e) {

  const chocolateChoosed = e.currentTarget.dataset.id;
  products[chocolateChoosed].amount += 1;
                  
  renderChocolate(products);
  }
                
  renderChocolate(products);
  
  
   //++++++++++++++++++++++++++++++funktion för minusknappen i produkt-container++++++++++++++++++++++++++++++
  function reduceAmount(e) {
  const chocolateChoosed = e.currentTarget.dataset.id;
  let amount = chocolateChoosed.innerHTML;
  
  if (amount -1 < 0) {
  return; 
  }
                    
  if (products[chocolateChoosed].amount > 0) {
    products[chocolateChoosed].amount -=1    
  };
             
  renderChocolate(products);
  }
  
//++++++++++++++++++++++++++++++ändra bild i ett bildspel++++++++++++++++++++++++++++++

function imageSwap(e){
  const image1Slideshow =e.currentTarget.parentElement.querySelector('#img-1');
  const image2Slideshow =e.currentTarget.parentElement.querySelector('#img-2');

  const first = image1Slideshow.getAttribute('src');
  const second = image2Slideshow.getAttribute('src');

  image1Slideshow.setAttribute('src', second);
  image2Slideshow.setAttribute('src', first);
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


//+++++++++++++++++++++++++FUNKTION för att printa ut chokladen i kundkorgen++++++++++++++++++++++++++++++

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
            <p>${products[i].amount * products[i].price}</p>
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
}  //++++++++++++++++++++++++++++++++++++printedOrderedChocolate slut+++++++++++++++++++++++++++++++++++++

function updateCartPrice(){
  sumTotal = products.reduce(                  
    (previousValue, products) => 
    {return (products.amount * products.price) + previousValue;}, 0); 

  if (discountCodeValid){
    sumTotal = 0;
  }

  let amountShipping = products.reduce(                  
    (previousValue, product) => {
    return product.amount+ previousValue;},0);

    document.querySelector(".amount").innerHTML = amountShipping;

  if (shippingCost){
    if (amountShipping >= 15){
      freightPrice = 0;
    } else {
      freightPrice = 25 + Math.round(sumTotal * 0.1);
    }
  }

    //+++++++++++++++++++++++++++++++++++vid köp av fler än 10 st............'
  amountTotal = products.reduce(                  
    (previousValue, product) => {
    return product.amount+ previousValue;}, 0 );

    const discountAlert = document.querySelector(".discountAlert");

  if (mondayDiscountActive) {
    if(amountTotal >= 10){
      discountPrice = Math.round((sumTotal) * 0.1);
      discountAlert.innerHTML = `<span> Måndagsrabatt! 10% på hela beställningen!</span>`;
    } else {
      discountPrice= 0;
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
        <span class="discount-sum">${discountPrice}</span>
        <div class="discountAlert"></div>
      </section>
      <hr class="line">
      <section class="total-price">
        <span>Att betala</span>
        <span class="total-summary">${(freightPrice + sumTotal)}</span>
      </section>`; 
}   // slut updateCartPrice()

function validateDiscount() {
  if (discountField.value === "a_damn_fine-cup_of-coffee") {
    discountCodeValid = true;
    updateCartPrice();
  }
}

function emptyCart (e){
  for (let i = 0; i<products.length; i++){
    products[i].amount = 0;
  }

  renderChocolate(products);      //tömma de produkter som valts.
}

              /******** PROGRAMFLÖDE ********/ 

/***** körs när sidan laddas  */

onLoadListeners();              // lägg på alla listeners
isHoliday();                    // kolla om det är en speciell helgdag, gör grejer isf
checkDay(orderDay);             // kontrollera veckodag, gör grejer i switch-satsen beroende på vilken
updatePriceRange();             // skriver ut produkterna samtidigt
xMas();



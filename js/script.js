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

// rabattvariabler
const discountField = document.querySelector('.discountCode');
const discountBtn = document.querySelector('.discountButton');
let discountCodeValid = false;
let shippingCost = true;  // fraktkostnad default pris, om inget särskilt




/********  FUNKTIONER ********/

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
  if (mondayDiscountActive){
    printOrderedChocolate.innerhtml += 'Måndagsrabatt: 10 % på hela beställningen';
    updateCartPrice.innerHTML = Math.round(sumTotal * 0.9);
    shippingDiscount.innerHTML = Math.round(freightPrice * 0.9);
  }

  // const inSEK = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(sumTotal+freightPrice);
  // därdenskava.innerHTML = inSEK; <- kolla nåt 😀
}



function applyWeekendIncrease() {
  // sneaky prishöjning på 10% (eller bool?)
}

function tenProductsDiscount() {
  //när du beställer 10 av en produkt ska du få rabatt
  }

function shippingDiscount(){ 
  shippingCost = false;
}

  /******** sortering och filtrerings-funktioner ********/ 

  function updatePriceRange() {   
    const selectedPriceRange = priceRangeElement.value;
    currentPriceRange.innerHTML = `${selectedPriceRange} kr`;
    filterByPrice(selectedPriceRange);
  }
  
  /**
   * 
   * @param {number} selectedMax - valt max-värde för prisintervall
   * filtrerar ut alla produkter inom valt intervall, kontrollerar vilken sorteringsknapp som är vald
   * kallar på sorteringsfunktion 
   */
  function filterByPrice(selectedMax) {
    // console.log(selectedMax); // kontrollerad: motsvarar vad man valt i slidern
    let filteredProducts = products.filter(product => product.price <= selectedMax); 
    sortingRadios.forEach(element => {    // kolla vilken radio-knapp som är vald och kalla sorteringsfunktion
      if (element.checked) {
        let selectedRadioBtn = element.id;  // #1 kanske lite snyggare med value ist 🤔 
        sortBy(selectedRadioBtn, filteredProducts);
      }
      /* skippar else, felhantering överflödig, right? 🤔 
      *  någon radio kommer alltid vara vald (sortera på pris default), 
      *  TODO: ändra ev. första utskrift av renderChocolate() (younes.js) till sortBy('priceRadioBtn')? OBS: om checked-attribut på någon radio, annars inte
      *  så den sorterar på default check (pris)?;
      * */ 
    })
  }
  
  /**
   * 
   * @param {string} radioBtnId - id för vald sorterings-radioknapp
   * @param {array} array(bra namn lol, tips?) - filtrerad array inom valt prisintervall
   * sorterar pris-filtrerad array och kallar på utskriftsfunktion (i younes.js)
   */
  function sortBy(radioBtnId, array) {   // #2 kanske lite snyggare med value ist 🤔 
    let filteredProducts = array;
    let sortedProducts;
  
    switch (radioBtnId) {
      case 'priceRadioBtn':   // sortera efter pris, högt till lågt
        sortedProducts = filteredProducts.sort( (a, b) => { return b.price - a.price; } )
        
      break;
  
      case 'nameRadioBtn':    // sortera efter namn, A-Ö
        sortedProducts = filteredProducts.sort( (a, b) => {
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
        sortedProducts = filteredProducts.sort( (a, b) => {
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
        sortedProducts = filteredProducts.sort( (a, b) => { return b.rating - a.rating; } )   // TODO: kodupprepning, om tid finns..
      break;
      
      default:
        
      renderChocolate(filteredProducts);  // lär aldrig hända, men om det skulle göra det, så printa ut osorterat efter valt prisintervall    
      break;    
    }
  
    renderChocolate(sortedProducts);
  
  }

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
    
      xMas();
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
  
//++++++++++++++++++++++++++++++funktion för plus knappen i produkt-container++++++++++++++++++++++++++++++
function updateAmount(e) {

  const chocolateChoosed = e.currentTarget.dataset.id;
  products[chocolateChoosed].amount += 1;
                  
  console.log(products);
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
             
  console.log(products);
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

hamburger.addEventListener('click', menuOpen);
navMenu.addEventListener('click', navOpen);
// theme toggle
darkMode.addEventListener('click', backgroundDark);
lightMode.addEventListener('click', backgroundLight);

isHoliday();                    // kolla om det är en speciell helgdag, gör grejer isf
checkDay(orderDay);             // kontrollera veckodag, gör grejer i switch-satsen beroende på vilken
updatePriceRange();             // skriver ut produkterna samtidigt
xMas();
sortingRadios.forEach(element => {    // event på varje interaktion med radio-knappar
  element.addEventListener('change', updatePriceRange);
  });

priceRangeElement.addEventListener('input', updatePriceRange);    // event på varje interaktion med pris-slider

emptyCartBtn.addEventListener('click', emptyCart);
discountBtn.addEventListener('click' , validateDiscount);   // event för rabattkods-knapp
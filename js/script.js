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
let weekendIncreaseActive = false;
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
let discountPrice = 0;

// rabattvariabler
const discountField = document.querySelector('.discountCode');
const discountBtn = document.querySelector('.discountButton');
let discountCodeValid = false;
let shippingCost = true;  // fraktkostnad default pris, om inget särskilt
let tenProductsDiscount = true;


let infoObject = [];

var btnSubmit = document.getElementById("submit");

const firstName = document.getElementById("fnamn");
const efterNamn = document.getElementById("enamn");
const adress = document.getElementById("adress");
const zipCode = document.getElementById("pphoneNum");
const postCity = document.getElementById("port");
const portCode = document.getElementById("pkod");
const phoneNum = document.getElementById("telefon");
const eMail = document.getElementById("eMail");



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

  btnSubmit.addEventListener("click", function () {
  
    infoObject.push({
      firstName: firstName.value,
      efterNamn: efterNamn.value,
      adress: adress.value,
      zipCode: zipCode.value,
      postCity: postCity.value,
      portCode: portCode.value,
      phoneNum: phoneNum.value,
      eMail: eMail.value,
  
    });
    alert(
      "Tack för din beställning " +
        firstName.value +
        "!" +
        " Din beställning på adress: " +
        adress.value +
        ", " +
        zipCode.value +
        " " +
        postCity.value +
        " kommer att levereras inom 3-5 arbetsdagar. Ett bekräftelsemail ha skickats till " +
        eMail.value +
        "."
    );
  });

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
        weekendIncreaseActive = true;
      }
    break;

    case 2:   // OM tisdag
    checkWeek(weekNum);
    break;

    case 5:   // OM fredag
      if (orderHour > 15) {     // efter 15
        weekendIncreaseActive = true;
      }
    break;

    case 6:   // OM lördag
    case 0:   // eller söndag
    weekendIncreaseActive = true;
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


  if (products[chocolateChoosed].amount == 10) {
    products[chocolateChoosed].price = (products[chocolateChoosed].price * 0.9);
    products[chocolateChoosed].amount += 1;   // funkar nu, why? 🤔
  }
                  
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

  if (products[chocolateChoosed].amount == 10) {
    products[chocolateChoosed].price = (products[chocolateChoosed].price / 0.9);
  }
             
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
let invoiceRadioBtn = document.querySelector('#invoice-radio');
function printOrderedChocolate () {

  let orderedTotalPrice;
  document.querySelector('#cart').innerHTML = '';
  for(let i = 0; i < products.length; i ++){
    if (products[i].amount > 0) {
      orderedTotalPrice = products[i].amount * products[i].price;
      if (orderedTotalPrice >= 800) {
        console.log('if 800');
        invoiceRadioBtn.setAttribute('disabled' , "");  // om totalpris större än 800, ingen faktura
      }
      document.querySelector('#cart').innerHTML += 
      `<div class="cartInfo"> <br> 
        <div class="cartTitel">
          <h3>${products[i].name}</h3> 
          <img src="${products[i].image1}" width="60" height="60"}>
          <div class="cartSumeringTitel"> 
            <h4>Antal</h4> 
            <h4>Summa</h4>
          </div>
          <div class="cartResultat"> 
            <p>${products[i].amount}st</p> 
            <p>${orderedTotalPrice}</p>
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
        <div class="discountAlert"></div>
      <hr class="line">
      <section class="total-price">
        <span>Att betala</span>
        <span class="total-summary">${(freightPrice + sumTotal)}</span>
      </section>`; 
    
      const discountAlert = document.querySelector(".discountAlert");
  if (mondayDiscountActive) {
      discountPrice = Math.round((sumTotal) * 0.1);
      discountAlert.innerHTML = `<span> Måndagsrabatt! 10% på hela beställningen! Du har sparat ${discountPrice} kr!</span>`;
  }

}   // slut updateCartPrice()

function validateDiscount() {
  if (discountField.value === "a_damn_fine-cup_of-coffee") {
    discountCodeValid = true;
    updateCartPrice();
    discountField.value = "Rabattkod accepterad!"
    discountBtn.setAttribute('disabled', "");
  }
  else {
    discountField.value = "Försök igen";
  }
}

function emptyCart (e){
  for (let i = 0; i<products.length; i++){
    products[i].amount = 0;
  }
  discountBtn.removeAttribute('disabled');
  discountField.value = "";

  renderChocolate(products);      //tömma de produkter som valts.
}

// funktion för verifiering för personphoneNum vid faktura
function verifyPersonNumber(inputtxt) {
  let numbers = /^(19|20)?[0-9]{6}[-]?[0-9]{4}$/;
  if (inputtxt.value.match(numbers)) {
    alert("Godkänt");
    return true;

  } else {
    alert("Skriv format: ÅÅÅÅMMDDXXXX / ÅÅMMDDXXXX");
    return false;
  }
}

// funktion för betalningssätt
const paymentBox = document.querySelector(".radio-content");
document.querySelectorAll('input[type="radio"]').forEach((element) => {
  element.addEventListener("click", showPaymentInput);
});

// **** lagt till width på inputs för att det ska se mer 'proffsigare' ut
function showPaymentInput(e) {
  const value = e.target.value;
  const cardContent = ` KortphoneNum: <input type="number" style="width: 150px;" class="cardInputs" placeholder="KortphoneNum"> <br>
                         ÅÅ/MM: <input type="text" style="width: 50px;" class="cardInputs" placeholder="ÅÅ/MM"> <br>
                         CVC: <input type="number" style="width: 50px;" class="cardInputs" placeholder="CVC">`;

  const invoiceContent = 
    `<form>` +
    `            
                        <label for="verifyPb"> PersonphoneNum: </label> ` +
    ` <input  type="number"
                                name="verifyPb"
                                id="verifyPb"
                                style="width: 150px;" 
                                placeholder="ÅÅÅÅMMDDXXXX">` +
  // **** ta bort skicka knappen för verifiering till personphoneNum och koppla den till submit knappen istället.
    ` <button type="submit" name="verifysub" id="verifysub" onclick="verifyPersonNumber(verifyPb)"> Skicka </button> `;
  +`</form>`;

  paymentBox.innerHTML = "";
  if (value == "card") {
    paymentBox.innerHTML = cardContent;
  } else {
    paymentBox.innerHTML = invoiceContent;
    let pbInput = document.querySelector('#verifyPb');
  }
}

// funktion för disable/enable knappen
function validInput() {}

function checkInput(formList) {
  curr = document.getElementById(formList).value;
  if (curr.length > 0) {
    validInput(formList, 1);
    return true;
  } else {
    validInput(formList, 0);
    return false;
  }
}
window.onload = function () {
  var btnSubmit = document.getElementById("submit");
  
  // låt knappen vara disabled vid onload
  btnSubmit.setAttribute("disabled", "disabled");

  // lägg till keyup event för varje input
  [].slice
    .call(document.querySelectorAll('form input:not([type="submit"])'))
    .forEach(function (element) {
      element.addEventListener(
        "keyup",
        
        function () {
          // räkna antal invalid inputs
          var invalidFields = [].slice
            .call(document.querySelectorAll('form input:not([type="submit"])'))
            .filter(function (element) {
              return !checkInput(element.id);
            });

            checkPaymentMethod();

          if (invalidFields.length == 0) {
            // gör knappen enable när invalid inputs är 0
              disableButtonSubmit();
          } else if (invalidFields.length == 1) {
            // om enda elementet i invalidFields är portCode, inte supersnygg kod kanske, men funkar nu 🙌
            if (invalidFields[0] == portCode) {
              disableButtonSubmit();
            }


          } else {
            // disable knappen om det är invalid inputs
            btnSubmit.setAttribute("disabled", "disabled");

          }
        },
        false
      );
      
    });
};

// funktion för att reseta formuläret
function resetInput() {
  document.getElementById("formList").reset();
}

///////////////////////////////////////////////////////

const paymentRadios = document.querySelectorAll('.payment'); 
paymentRadios.forEach(radiobutton => {    // event på varje interaktion med radio-knappar

  radiobutton.addEventListener('change', checkPaymentMethod);

  });

// skapa en nodelist av radioknappar för betalningssätt - nodelist kan göras loopar
// let paymentMethod; // är den utanför en funktion så är det en global? scope


function checkPaymentMethod() {      
  
  let paymentMethod;

    paymentRadios.forEach(radiobutton => {
      if (radiobutton.checked) {
        paymentMethod = radiobutton.value;
      }
      console.log(paymentMethod);

  })

  if (!paymentMethod === undefined) { // OM paymentmethod INTE är undefined (den är ikryssad)
    return; // avslutar, gör ingenting
  }

  else if(paymentMethod == 'card') {
    console.log('hej kort');
  }

  else if(paymentMethod = 'invoice') {
    let pbInput = document.querySelector('#verifyPb');
    console.log('hej faktura');
    pbInput.addEventListener('input', checkNumLength);

  }
}

function checkNumLength() {
  let pbInput = document.querySelector('#verifyPb');
  if (pbInput.length >= 10 || pbInput.length >= 12){
    verifyPersonNumber(pbInput.value); // skicka argument ett argument det inne i ()
  }
}

function disableButtonSubmit () {
  let paymentMethod; // deklarerar variablen (undefined) inne i en funktion (function scope)

  // inom (en parameter) kan döpas som jag vill  => arrow function

  // btnSubmit.removeAttribute("disabled");


}




              /******** PROGRAMFLÖDE ********/ 

/***** körs när sidan laddas  */

onLoadListeners();              // lägg på alla listeners
isHoliday();                    // kolla om det är en speciell helgdag, gör grejer isf
checkDay(orderDay);             // kontrollera veckodag, gör grejer i switch-satsen beroende på vilken
updatePriceRange();             // skriver ut produkterna samtidigt
xMas();



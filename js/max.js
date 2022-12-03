              /******** PSEUDOKOD ********/

  /* event när sidan laddas 

✅    spara aktuell dag i variabel
✅    spara aktuell tidpunkt i variabel 

✅    OM det är 13e december: 
✅        lägg till en gratis pepparkakschoklad i kundkorgen eller nåt 🍫😃

✅    OM det är 24 december
🔲        gör pristexter röda
✅        byt bakgrundsbild 

✅     OM det är en fredag efter 14, lördag eller söndag:
🔲        höj priset på alla produkter med 10%

  **************************/


  /* event på plus och minus-knappar:

✅    hämta totalpris från beställning, spara i variabel                   

✅    OM timer för beställning redan startad
✅        Avbryt timer

✅    Starta timer för beställning, 15 minuter
✅        NÄR tiden tar slut:
🔲            meddela att tiden för aktuell beställning är slut
🔲            töm beställningsformulär och kundkorg

🔲    OM beställningsobjektets totalpris blir större än 800, inaktivera val för faktura
 
🔲    OM en chokladsort är antal beställda 10 st eller fler:   <- event bara på plus-knappar?
🔲        pris-= -10%

🔲    OM chokladsort antal beställda färre än 10:   <- event bara på minus-knappar?
🔲     pris = orginalpriset


✅    Kontrollera ifall det är en rabattvärdig dag, OM sant:
✅        OM det är måndag OCH timvariabeln är mindre än 10:
✅            returnera totalpris * 0.1 till slutgiltigt pris
✅        annars OM det är tisdag:
✅            OM jämn vecka && beställningen över 25kr: if (isEvenWeek && totalprisvariabel >= 25)
✅                subtrahera 25 kr fr totalpris 
      

✅    funktion för att räkna ut frakt:
✅       OM antal beställda produkter > 15
✅          frakt = 0
✅       ANNARS
✅          frakt = pris + (pris * 0.1)
✅       skriv ut frakt nånstans

🔲    uppdatera priset efter alla rabatter och sånt till sammanställning i kundkorg (och totalpris)

**************************/

  /* övrigt/beställningsknapp klickas

🔲    rabattkod, nåt med RegEx? kmr vecka 3 har jag för mig
🔲    massa matte på leveranser
🔲    ** funktion för att hindra att beställningen ändras, hur gör vi?  **    

**************************/

/******** VARIABLER ********/

const pageLoadTime = new Date();                     //  skapa ett Date-objekt
const dateString = pageLoadTime.toDateString();      //  för kontroll av dag, här eller deklarera i funktionen isHoliday()?
const orderDay = pageLoadTime.getDay();              //  spara dagen för beställning som number mellan 0 och 6 (0 = söndag)
const orderHour = pageLoadTime.getHours();           //  spara klockslag för beställning, number mellan 0 och 23
let orderTimer;
let mondayDiscountActive = false;
let isEvenWeek = false;
const weekNum = getWeekNum();                       // spara aktuellt veckonummer
// const initalPrice = customerOrder.totalPrice;        //  hämta totalpriset från kundkorg, innan rabatter/påslag

let deliveryTime;                                   //  massa matte på pageLoadTime sen?

let isLucia = false;           
let isChristmas = false;

              /********  FUNKTIONER ********/

   


/**
 * testar om det är lucia eller julafton (funktionen verkar funka som den ska!)
 */
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

function startOrderTimer() {  // kör på plus/minus-event
  clearTimeout(orderTimer)    // gör inget om ingen timer finns, tror inte att "if (orderTimer > -1)" behövs?
  orderTimer = setTimeout(resetOrder, 1000 * 60 * 15);
}

function resetOrder() {
  // resetInput() - (från jenny.js)
  // alert('beställ snabbare or die');
  // töm kundkorg
}

              
function applyWeekendIncrease() {
  // sneaky prishöjning på 10% (eller bool?)
}


function tenProductsDiscount() {
//när du beställer 10 av en produkt ska du få rabatt
}



/******** sortering och filtrerings-funktioner ********/ 

// Produkterna ska gå att sortera utifrån namn, pris, kategori och rating
// Det ska gå att filtrera produkter på prisintervall

// filtrera först efter intervall
// sedan sortera efter vald sortering (pris högst default)
// printa ut uppdaterad objekt-array i produkt-container

const priceRangeElement = document.querySelector('#priceRangeElement');
const currentPriceRange = document.querySelector('#currentPriceRange');
const sortingRadios = document.querySelectorAll('input[name="sort-option-btn"]');

sortingRadios.forEach(element => {    // event på varje interaktion med radio-knappar
  element.addEventListener('change', updatePriceRange);
  });


priceRangeElement.addEventListener('input', updatePriceRange);    // event på varje interaktion med pris-slider


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
              /******** PROGRAMFLÖDE ********/ 


isHoliday();                    // kolla om det är en speciell helgdag, gör grejer isf
checkDay(orderDay);             // kontrollera veckodag, gör grejer i switch-satsen beroende på vilken

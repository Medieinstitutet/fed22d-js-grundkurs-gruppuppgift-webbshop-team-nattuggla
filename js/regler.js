              /******** PSEUDOKOD ********/

  /* event när sidan laddas */

// spara aktuell dag i variabel   ☑️
// spara aktuell tidpunkt i variabel  ☑️

// OM det är 13e december:
//    lägg till en gratis pepparkakschoklad i kundkorgen eller nåt 🍪😃

// OM det är 24 december
//    gör pristexter röda
//    byt bakgrundsbild


  /* event på plus och minus-knappar: */

// hämta totalpris från beställning, spara i variabel  ☑️

    // funktion för att hindra att beställningen ändras, hur gör vi? 

// OM timer för beställning redan startad
//    Avbryt timer
//
// Starta timer för beställning, 15 minuter
//    OM(eller när? 🤔) tiden tar slut
//        avbryt timer
//
// OM beställningsobjektets totalpris blir större än 800, inaktivera val för faktura  
// 
// OM en chokladsort är antal beställda: 10 st eller fler     <- event bara på plus-knappar?
//    pris-= -10%
//
// OM chokladsort antal beställda : färre än 10               <- event bara på minus-knappar?
//    pris = orginalpriset


// Kontrollera ifall det är en rabattvärdig dag, OM sant:   ☑️
//    OM det är måndag OCH timvariabeln är mindre än 10:    ☑️
//        returnera totalpris * 0.1 till slutgiltigt pris   ☑️

//    OM det är tisdag:
//        OM jämn vecka && beställningen över 25kr:
//            subtrahera 25 kr fr totalpris

// funktion för att räkna ut frakt:

// OM antal beställda produkter > 15
//    frakt = 0
// ANNARS 
//    frakt = pris + (pris * 0.1)
// skriv ut frakt nånstans

// rabattkod, nåt med RegEx? kmr vecka 3 har jag för mig

// uppdatera priset efter alla rabatter och sånt till kundkorg 

// massa matte på leveranser


              /******** VARIABLER ********/

const timeOfOrder = new Date();                     //  skapa ett Date-objekt
const dateString = timeOfOrder.toDateString();      //  för kontroll av dag, här eller deklarera i funktionen? isHoliday()?
const orderDay = timeOfOrder.getDay();              //  spara dagen för beställning som number mellan 0 och 6 (0 = söndag)
const orderHour = timeOfOrder.getHours();           //  spara klockslag för beställning, number mellan 0 och 23
// const orderWeek = timeOfOrder.getWeek();  // <- hur?
// const initalPrice = customerOrder.totalPrice;        //  hämta totalpriset från kundkorg, innan rabatter/påslag

let deliveryTime;                                   //  massa matte på timeOfOrder sen?


              /********  FUNKTIONER ********/
/**
 * testar om det är lucia eller julafton (funktionen verkar funka som den ska!)
 */
function isHoliday() {
  let isXmas = dateString.includes('Dec 24');   // .includes() returnerar true eller false
  let isLucia = dateString.includes('Nov 22')

  if (isXmas) {
    // TODO: gör pristexter röda och byt bakgrundsbild
  }
  else if (isLucia) {
    // TODO: lägg till en gratis lucia-choklad i kundkorg 🍫
  }
}

/**
 * kollar om dagen är rabattberättigad
 * @param {number} weekDay - dagen sidan laddats på
 * @returns en bool!
 */
function isDiscountDay(weekDay) {       
  if (weekDay == 1 || weekDay == 2 || weekDay == 6 || weekDay == 0) {
    return true;
  }
  else { 
    return false;
  }
}

/**
 * kontrollerar vilken dag beställning lagts
 */
function setDayDiscount() {    // tänkte fel från början, bör göras om, applyWeekendIncrease() ska inte vara på totalsumma, utan priset innan frakt (tolkar jag det som? 🤔)
  
  switch (orderDay) {           
    case 1:   // OM måndag:
    if (orderHour < 10 && orderHour >= 3) {
    applyMondayDiscount(initalPrice);
    }
    else if(orderHour > 0 && orderHour <= 3) { // tänk om
    applyWeekendIncrease(initalPrice);
    }

    break;

    case 2:   // OM tisdag
    checkWeek(orderWeek);   // TODO
    break;

    case 5:   // OM fredag:
    if (orderHour > 14) {
    applyWeekendIncrease(initalPrice);
  }

  break;

  case 6:   // OM lördag eller söndag:
  case 0:   
  applyWeekendIncrease(initalPrice);
  break;
  }
}

/**
 * ändrar beställnngsobjektets totalpris
 * @param {number} price priset från initialPrice
 */
function applyMondayDiscount(price) {      // en bool variabel i beställningsobjektet som heter hasMondayDiscount och false?                             
  hasMondayDiscount = true;           // så kan det skrivas ut ett meddelande beroende på true eller false typ..
  let discountedPrice = price *= 0.1;
  customerOrder.totalPrice = discountedPrice;
}

function checkWeek(week) {
  if (week % 2 == 0) {
    // då är det rabatt
  }
  else {
    return;
  }
}

function applyWeekendIncrease() {
  // sneaky prishöjning
}

              /******** PROGRAMFLÖDE ********/ 

isHoliday();
isDiscountDay(orderDay);        // kontrollera om dagens dag ger rätt till rabatt eller inte

if (isDiscountDay) {            // om den gör det, kolla vilken dag, och vilken tid
  setDayDiscount();
}



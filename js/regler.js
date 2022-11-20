              /******** PSEUDOKOD ********/

/* Om kunden inte har lagt beställningen inom 15 minuter så ska beställningsformuläret 
tömmas/rensas och kunden ska meddelas att denne är för långsam.     <-- när  triggas detta? */

// om beställningsobjektets totalpris blir större än 800, inaktivera val för faktura  <-- när  triggas detta?

// <beställningsknapp> klickas -->
// funktion för att hindra att beställningen ändras, hur gör vi? när? 
// spara dag för beställning i variabel   ☑️
// spara tidpunkt för beställning i variabel  ☑️
// hämta totalpris, spara i variabel  ☑️



// ska rabatter gå att kombinera? 🤔

// kontrollera ifall antal av en chokladsort är beställd mer än 10 st ->
//    bör göras innan nedan rabatter på totalsumma isf, vart och när?

// Kontrollera ifall det är en rabattvärdig dag, OM sant:   ☑️
//    OM det är måndag OCH timvariabeln är mindre än 10:    ☑️
//        returnera totalpris * 0.1 till slutgiltigt pris   ☑️

//    OM det är tisdag:
//        OM jämn vecka && beställningen över 25kr:
//            subtrahera 25 kr fr totalpris

// OM det är 13e december:
//    lägg till en gratis pepparkakschoklad eller nåt 🍪😃

// OM det är 24 december
//    gör pristexter röda
//    byt bakgrundsbild

// rabattkod, nåt med RegEx? kmr vecka 3 har jag för mig

// massa matte på leveranser

              /******** VARIABLER ********/


// const originalPrice = beställningsobjektet.totalPrice

const timeOfOrder = new Date();                     //  bör va typ event på beställningsknapp som kör typ placeOrder(), skapa ett Date-objekt
const displayDate = timeOfOrder.toDateString();     //  för utskrift av datum och tid för beställning
let deliveryTime;                                   //  massa matte på timeOfOrder sen
const orderDay = timeOfOrder.getDay();              //  spara dagen för beställning som number mellan 0 och 6 (0 = söndag)
const orderHour = timeOfOrder.getHours();           //  spara klockslag för beställning, number mellan 0 och 23
const initalPrice = customerOrder.totalPrice;        //  hämta totalpriset från kundkorgp, innan rabatter/påslag

              /********  FUNKTIONER ********/

/**
 * kollar om dagen är rabattberättigad
 * @param {number} weekDay - dagen som beställningen las
 * @returns en bool!
 */
function isDiscountDay(weekDay) {       
  if (weekDay == 1 || weekDay == 5 || weekDay == 6) {
    return true;
  }
  else { 
    return false;
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

function checkWeek() {
  // kontrollera om jämn vecka, nån modulo-check på vecko-nr?
}

function applyWeekendIncrease() {
  // sneaky prishöjning
}


              /******** PROGRAMFLÖDE ********/ 


// startas av typ placeOrder() när man klickar på lägg beställning ?

isDiscountDay(orderDay);        // kontrollera om dagens dag ger rätt till rabatt eller inte

if (isDiscountDay) {            // om den gör det, kolla vilken dag, och vilken tid
  switch (orderDay) {           // svårt att kontrollera om detta funkar som det ska, kan ju bara göras på rätt dag och tid 🤔
    
    case 1:   // OM måndag:
      if (orderHour < 10 && orderHour > 3) {
        applyMondayDiscount(initalPrice);
      }
      else if(orderHour > 0 && orderHour <= 3) {
        applyWeekendIncrease(initalPrice);
      }

    break;

    case 2:   // OM tisdag
      checkWeek();
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



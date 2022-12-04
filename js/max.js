              /******** PSEUDOKOD ********/

  /* event när sidan laddas 

✅    spara aktuell dag i variabel
✅    spara aktuell tidpunkt i variabel 

✅    OM det är 13e december: 
✅        lägg till en gratis pepparkakschoklad i kundkorgen eller nåt 🍫😃

✅    OM det är 24 december
✅        gör pristexter röda
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


// const initalPrice = customerOrder.totalPrice;        //  hämta totalpriset från kundkorg, innan rabatter/påslag



              /********  FUNKTIONER ********/

   


/**
 * testar om det är lucia eller julafton (funktionen verkar funka som den ska!)
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

              









// Produkterna ska gå att sortera utifrån namn, pris, kategori och rating
// Det ska gå att filtrera produkter på prisintervall

// filtrera först efter intervall
// sedan sortera efter vald sortering (pris högst default)
// printa ut uppdaterad objekt-array i produkt-container









              /******** PROGRAMFLÖDE ********/ 



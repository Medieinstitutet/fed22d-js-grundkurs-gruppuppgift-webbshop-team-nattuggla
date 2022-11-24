              /******** PSEUDOKOD ********/

  /* event när sidan laddas 

✅    spara aktuell dag i variabel
✅    spara aktuell tidpunkt i variabel 

✅    OM det är 13e december: 
🔲        lägg till en gratis pepparkakschoklad i kundkorgen eller nåt 🍫😃

✅    OM det är 24 december
🔲        gör pristexter röda
🔲        byt bakgrundsbild 

✅     OM det är en fredag efter 14, lördag eller söndag:
🔲        höj priset på alla produkter med 10%

  **************************/


  /* event på plus och minus-knappar:

✅    hämta totalpris från beställning, spara i variabel                   

🔲    OM timer för beställning redan startad
🔲        Avbryt timer

🔲    Starta timer för beställning, 15 minuter
🔲        OM(eller när? 🤔) tiden tar slut:
🔲            avbryt timer

🔲    OM beställningsobjektets totalpris blir större än 800, inaktivera val för faktura
 
🔲    OM en chokladsort är antal beställda 10 st eller fler:   <- event bara på plus-knappar?
🔲        pris-= -10%

🔲    OM chokladsort antal beställda färre än 10:   <- event bara på minus-knappar?
🔲     pris = orginalpriset


✅    Kontrollera ifall det är en rabattvärdig dag, OM sant:
✅        OM det är måndag OCH timvariabeln är mindre än 10:
✅            returnera totalpris * 0.1 till slutgiltigt pris
✅        annars OM det är tisdag:
🔲            OM jämn vecka && beställningen över 25kr:
🔲                subtrahera 25 kr fr totalpris
      

🔲    funktion för att räkna ut frakt:
🔲       OM antal beställda produkter > 15
🔲          frakt = 0
🔲       ANNARS
🔲          frakt = pris + (pris * 0.1)
🔲       skriv ut frakt nånstans

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
              const mondayDiscountActive = false;
              const isEvenWeek = false;
              // const orderWeek = pageLoadTime.getWeek();  // <- hur?
              // const initalPrice = customerOrder.totalPrice;        //  hämta totalpriset från kundkorg, innan rabatter/påslag
              
              let deliveryTime;                                   //  massa matte på pageLoadTime sen?
              
              
                            /********  FUNKTIONER ********/
              
                     
              /**
               * testar om det är lucia eller julafton (funktionen verkar funka som den ska!)
               */
              function isHoliday() {
                let isXmas = dateString.includes('Dec 24');   // .includes() returnerar true eller false
                let isLucia = dateString.includes('Nov 22');
              
                if (isXmas) {
                  // TODO: gör pristexter röda och byt bakgrundsbild
                }
                else if (isLucia) {
                  // TODO: lägg till en gratis lucia-choklad i kundkorg 🍫
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
                    checkWeek(orderWeek);   // TODO, funktionen eller variabeln finns ej än
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
              
              function checkWeek(week) {
                if (week % 2 == 0) {
                  isEvenWeek = true;
                }
              }
              
              function applyWeekendIncrease() {
                // sneaky prishöjning på 10% (eller bool?)
              }     
              
              
                            /******** PROGRAMFLÖDE ********/ 
              
              
              isHoliday();                    // kolla om det är en speciell helgdag, gör grejer isf
              checkDay(orderDay);             // kontrollera veckodag, gör grejer i switch-satsen beroende på vilken       





              // Younes: 

              // meny knappen
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
})

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}))


// theme toggle.

const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark_mode')
    darkMode.classList.toggle('hide')
    lightMode.classList.remove('hide')
})
lightMode.addEventListener('click', () => {
    document.body.classList.remove('dark_mode')
    lightMode.classList.toggle('hide')
    darkMode.classList.remove('hide')
})

//antal munkar, plus och minus


/* plus minus knappar
-när man klickar på plus eller minus ska summan uppdateras
-vi behöver ta reda på antal praliner
-vi behöver ta reda på priset på praliner
*/

const products = [
  {
    name:"Apelsin Hasselnöt",
    price:15,
    rating:4,
    amount: 0,
    description: "apelsin-hasselnot-pralin",
    images: [
      {
        img:'bilder/praliner/apelsin-hasselnöt/AH-hel.png',
        alt:'hasselnöt pralin',
      },
      {
        img:'bilder/praliner/apelsin-hasselnöt/AH-halv.png',
        alt:'hasselnöt pralin',
      },
    ],
  },
  {
    name:"Blodapelsin-vanilj",
    price:20,
    rating:4,
    amount: 0,
    description: "pralin",
    images: [
      {
        img:'bilder/praliner/blodapelsin-vanilj/BV-hel.png',
        alt:'blodapelsin, vanilj pralin',
      },
      {
        img:'bilder/praliner/blodapelsin-vanilj/BV-halv.png',
        alt:'blodapelsin, vanilj pralin',
      },
    ],
  }, 
  {
    name: "Calamansi",
    price: 18,
    rating:3,
    amount: 0,
    description: "pralin",
  },
  {
    name: "Espresso",
    price: 18,
    rating:3,
    amount: 0,
    description: "pralin",
  },
  {
    name: "Hallon Lakrits",
    price: 18,
    rating:3,
    amount: 0,
    description: "pralin",
  },
  {
    name: "Hasselnöt",
    price: 18,
    rating:3,
    amount: 0,
    description: "pralin",
  },
  {
    name: "Jordnöt",
    price: 18,
    rating:3,
    amount: 0,
    description: "pralin",
  },
  {
    name: "Passion-Mango",
    price: 18,
    rating:3,
    amount: 0,
    description: "pralin",
  },
  {
    name: "Saltkola",
    price: 18,
    rating:3,
    amount: 0,
    description: "pralin",
  }
];

  const chocolateContainer = document.querySelector('#chocolate-container');

  function renderChocolate() {
    chocolateContainer.innerHTML = '';  //detta gör att systemet rensar så att antalet rensas medan man utökar den

    for (let i  = 0; i < products.length; i++) {   //sätt att skriva ut text ist för och ha i html
      chocolateContainer.innerHTML += `
        <article class="pralin">
          <h3 class="cartName">${products[i].name}</h3>  
          <div class="images">
          <img id="img1" class="img-1" src="" alt="" width="200" height="200" />
          <img id="img2" class="img-2" src="" alt="" width="200" height="200" />
          </div>
          <span class="price">${products[i].price}kr</span> <br>
          Antal:<span class="amount">${products[i].amount}st</span> <br>
          <button class="remove" data-operator="minus" data-id="${i}">-</button>
          <button class="add" data-operator="plus" data-id="${i}">+</button>
        </article>
      `;
    }
    document.querySelectorAll('button.add').forEach((btn) => {  //när man klickar på knappen
      btn.addEventListener('click', updateAmount);
    });
    document.querySelectorAll('button.remove').forEach((btn) => { 
      btn.addEventListener('click', reduceAmount);
    });


    //antalet st av en produkt ökas.


    //lite förvirrande, men detta är för att få till att antalet plusas på. Antal sumeringen ökas på sidan
    const sumPrice = products.reduce(                  
      (previousValue, product) => {
        return (product.amount * product.price) + previousValue;
      },
      0
      );
      console.log(sumPrice);

      printOrderedChocolate ()

      document.querySelector('#cartSum').innerHTML = sumPrice;

      const sumTotal = products.reduce(                  
        (previousValue, product) => {
          return product.amount+ previousValue;
        },
        0
        );
        console.log(sumTotal);
  
        printOrderedChocolate ()

      document.querySelector('#cartTotal').innerHTML= sumTotal;
  }

  function printOrderedChocolate () {
    document.querySelector('#cart').innerHTML = '';

    for(let i = 0; i < products.length; i ++) {
      if (products[i].amount > 0) {
        document.querySelector('#cart').innerHTML += `<p>${products[i].name}</p>` + `${products[i].price}kr` + ' ' + `${products[i].amount}st`;      
      }
    }
  }

  function updateAmount(e) {
  const chocolateChoosed = e.currentTarget.dataset.id;
  products[chocolateChoosed].amount += 1;

  console.log(products);
  renderChocolate();
  }

  renderChocolate();

  function reduceAmount(e) {
    const chocolateChoosed = e.currentTarget.dataset.id;
    let amount = chocolateChoosed.innerHTML;
    
    if (amount -1 < 0) {
      return;
    }
    products[chocolateChoosed].amount -= 1;
  
    console.log(products);
    renderChocolate();
    }


  

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
const totalPrice = //kundkorgs summering

checkForPrice //kundkorgen ska ge dig rabatterat pris, 10% rabat..




// Jenny


 
 /* 
 x Formuläret där köparen fyller i sina uppgifter skall ha: Förnamn, Efternamn, Adress, Postnummer, Postort, ev portkod, Telefon (mobil), E-postadress.
 x Val för betalsätt: kort eller faktura
 / Samtliga formulärfält ska valideras och formuläret/beställningen ska inte gå att skicka om det finns några fel
 - När formuläret är korrekt ifyllt ska Skicka-/Beställ-knappen aktiveras, innan det är den utgråad 
 x Checkbox för beställning av nyhetsbrev (ska vara iklickad som default)
 x Checkbox för godkännande av behandling av personuppgifter
 x Om kort väljs som betalsätt, visas fält för kortnummer, datum/år och CVC. Dessa behöver inte valideras!
 x Om faktura valts som betalsätt ska ett formulärfält för svenskt personnummer visas. Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. att man fyllt i korrekt personnummer.
 - Felen ska markeras och kommuniceras tydligt (t.ex. ej enbart med röd färg, tag i beaktande a11y)
 - Det ska finnas en "Rensa beställning"-knapp som återställer samtliga formulärfält liksom eventuella beställda munkar/produkter (alltså antalet återställs till 0)
 - Det ska finnas ett fält för att mata in en rabattkod.
 
 PSEUDOKOD
 - OM formuläret är korrekt (true) så ska skicka/beställ knappen aktiveras (enable), ANNARS (disabled).
 - OM kort väljs som betalsätt, visa fält för kortnummer, datum/år och CVC.
 - OM faktura väljs som betalsätt, visa ett formulärfält för svenskt personnummer
 och OM svenskt personnummer ha skrivits rätt, markera att det är godkänt. ANNARS markera att det är rött.

 */

 /******** VARIABLER ********/

 var infoObject = [];

 const button = document.getElementById('add-info');
 
 const förnamn = document.getElementById('fnamn');
 const efternamn = document.getElementById('enamn');
 const adress = document.getElementById('adress');
 const postnum = document.getElementById('pnummer');
 const postort = document.getElementById('port');
 const portkod = document.getElementById('pkod');
 const nummer = document.getElementById('telefon');
 const email = document.getElementById('email');
 
 const box = document.getElementById('box');
 
 
                 /********  FUNKTIONER ********/
 
 
                 function handleRadioClick() {
                     if (document.getElementById('show').checked) {
                       box.style.display = 'block';
                     } else {
                       box.style.display = 'none';
                     }
                   }
                   
                   const radioButtons = document.querySelectorAll('input[name="example"]');
                   radioButtons.forEach(radio => {
                     radio.addEventListener('click', handleRadioClick);
                   });
 
 
 /* När man klickar på Skicka knappen så ska input värdet sparas i infoObject array */
 button.addEventListener('click', function() {
     infoObject.push({
         förnamn: förnamn.value, 
         efternamn: efternamn.value, 
         adress: adress.value,
         postnum: postnum.value,
         postort: postort.value,
         portkod: portkod.value,
         nummer: nummer.value,
         email: email.value,
     })
     alert('Tack för din beställning ' + förnamn.value + '!' + ' Din beställning på adress: ' + adress.value + ', ' + postnum.value + ' ' + postort.value + ' kommer att levereras inom 3-5 arbetsdagar. Ett bekräftelsemail ha skickats till ' + email.value + '.');
 })
 
 
 function allnumeric(inputtxt)
    {
       let numbers = /^(19|20)?[0-9]{6}[-]?[0-9]{4}$/;
       if(inputtxt.value.match(numbers))
       {
       alert('Godkänt');
       }
       else
       {
       alert('Skriv format: ÅÅÅÅMMDDXXXX / ÅÅMMDDXXXX');
       }
    } 
 
 
/* 
 x Formuläret där köparen fyller i sina uppgifter skall ha: Förnamn, Efternamn, Adress, Postnummer, Postort, ev portkod, Telefon (mobil), E-postadress.
 x Samtliga formulärfält ska valideras och formuläret/beställningen ska inte gå att skicka om det finns några fel
 x När formuläret är korrekt ifyllt ska Skicka-/Beställ-knappen aktiveras, innan det är den utgråad 
 x Checkbox för beställning av nyhetsbrev (ska vara iklickad som default)
 x Checkbox för godkännande av behandling av personuppgifter

 ***** (behöver connecta funktionen till beställda produkter osv också, just nu endast connectad till formulär) *****
 x Det ska finnas en "Rensa beställning"-knapp som återställer samtliga formulärfält liksom eventuella beställda munkar/produkter (alltså antalet återställs till 0)

 - Val för betalsätt: kort eller faktura
 - Om kort väljs som betalsätt, visas fält för kortnummer, datum/år och CVC. Dessa behöver inte valideras!
 - Om faktura valts som betalsätt ska ett formulärfält för svenskt personnummer visas. Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. att man fyllt i korrekt personnummer.
 - Felen ska markeras och kommuniceras tydligt (t.ex. ej enbart med röd färg, tag i beaktande a11y)
 - Det ska finnas ett fält för att mata in en rabattkod.
 
 PSEUDOKOD
 - OM formuläret är korrekt (true) så ska skicka/beställ knappen aktiveras (enable), ANNARS (disabled).
 - OM kort väljs som betalsätt, visa fält för kortnummer, datum/år och CVC.
 - OM faktura väljs som betalsätt, visa ett formulärfält för svenskt personnummer
 och OM svenskt personnummer ha skrivits rätt, markera att det är godkänt. ANNARS markera att det är rött.

 */


 let infoObject = [];

 const button = document.getElementById("submit");
 
 const fornamn = document.getElementById("fnamn");
 const efternamn = document.getElementById("enamn");
 const adress = document.getElementById("adress");
 const postnum = document.getElementById("pnummer");
 const postort = document.getElementById("port");
 const portkod = document.getElementById("pkod");
 const nummer = document.getElementById("telefon");
 const email = document.getElementById("email");
 
 button.addEventListener("click", function () {
   infoObject.push({
     fornamn: fornamn.value,
     efternamn: efternamn.value,
     adress: adress.value,
     postnum: postnum.value,
     postort: postort.value,
     portkod: portkod.value,
     nummer: nummer.value,
     email: email.value,
   });
   alert(
     "Tack för din beställning " +
       fornamn.value +
       "!" +
       " Din beställning på adress: " +
       adress.value +
       ", " +
       postnum.value +
       " " +
       postort.value +
       " kommer att levereras inom 3-5 arbetsdagar. Ett bekräftelsemail ha skickats till " +
       email.value +
       "."
   );
 });
 
 // funktion för betalningssätt
 const paymentBox = document.querySelector('.radio-content');
 document.querySelectorAll('input[type="radio"]').forEach(element => {
   element.addEventListener('click', showPaymentInput);
 });
 
 function showPaymentInput(e) {
   const value = e.target.value;
   const cardContent = ` <input type="number" placeholder="Kortnummer">
                         <input type="text" placeholder="ÅÅ/MM">
                         <input type="number" placeholder="CVC">`;
                         
   const invoiceContent = `<input type="text" placeholder="Personnummer (ÅÅÅÅMMDDXXXXX">`;
 
   paymentBox.innerHTML = "";
   if (value == "card") {
     paymentBox.innerHTML = cardContent;
     console.log('card');
   }
   else {
     paymentBox.innerHTML = invoiceContent;
     console.log('faktura');
   }
 }
 
 // funktion för disable/enable knappen
 function validInput() {
 }
 
 function checkInput(field) {
   curr = document.getElementById(field).value;
   if (curr.length > 0) {
     validInput(field, 1);
     return true;
   } else {
     validInput(field, 0);
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
             }
             );
           if (invalidFields.length == 0) { {
              
           }
             // gör knappen enable när invalid inputs är 0
             btnSubmit.removeAttribute("disabled");
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
   document.getElementById("formular").reset();
 }
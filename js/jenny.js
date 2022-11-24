
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
 
 
/* 
 x Formuläret där köparen fyller i sina uppgifter skall ha: Förnamn, efterNamn, Adress, zipCodemer, Postort, ev portCode, Telefon (mobil), E-postadress.
 x Samtliga formulärfält ska valideras och formuläret/beställningen ska inte gå att skicka om det finns några fel
 x När formuläret är korrekt ifyllt ska Skicka-/Beställ-knappen aktiveras, innan det är den utgråad 
 x Checkbox för beställning av nyhetsbrev (ska vara iklickad som default)
 x Checkbox för godkännande av behandling av personuppgifter

 ***** (behöver connecta funktionen till beställda produkter osv också, just nu endast connectad till formulär) *****
 x Det ska finnas en "Rensa beställning"-knapp som återställer samtliga formulärfält liksom eventuella beställda munkar/produkter (alltså antalet återställs till 0)

 - Val för betalsätt: kort eller faktura
 - Om kort väljs som betalsätt, visas fält för kortphoneNum, datum/år och CVC. Dessa behöver inte valideras!
 - Om faktura valts som betalsätt ska ett formulärfält för svenskt personphoneNum visas. Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. att man fyllt i korrekt personphoneNum.
 - Felen ska markeras och kommuniceras tydligt (t.ex. ej enbart med röd färg, tag i beaktande a11y)
 - Det ska finnas ett fält för att mata in en rabattkod.
 
 PSEUDOKOD
 - OM formuläret är korrekt (true) så ska skicka/beställ knappen aktiveras (enable), ANNARS (disabled).
 - OM kort väljs som betalsätt, visa fält för kortphoneNum, datum/år och CVC.
 - OM faktura väljs som betalsätt, visa ett formulärfält för svenskt personphoneNum
 och OM svenskt personphoneNum ha skrivits rätt, markera att det är godkänt. ANNARS markera att det är rött.

 */

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



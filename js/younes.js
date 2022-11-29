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
  }));
              
              
// theme toggle.
              
const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');
              
darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark_mode');
  darkMode.classList.toggle('hide');
  lightMode.classList.remove('hide');
  })
lightMode.addEventListener('click', () => {
  document.body.classList.remove('dark_mode');
  lightMode.classList.toggle('hide');
  darkMode.classList.remove('hide');
  })
              

//antal munkar, plus och minus
              
              
/* plus minus knappar
  -när man klickar på plus eller minus ska summan uppdateras
  -vi behöver ta reda på antal praliner
  -vi behöver ta reda på priset på praliner
*/
              
const products = [{
  name:"Apelsin Hasselnöt",
  price:15,
  rating:4,
  amount: 0,
  kategori: "Nötter",
  description: "apelsin-hasselnot-pralin",
  image1:'./bilder/praliner/apelsin-hasselnöt/AH-hel.png',
  image2:'./bilder/praliner/apelsin-hasselnöt/AH-halv.png',
  },
  {
  name:"Blodapelsin-vanilj",
  price:20,
  rating:4,
  amount: 0,
  kategori: "Frukt",
  description: "pralin",
  image1:'bilder/praliner/blodapelsin-vanilj/BV-hel.png',
  image2:'bilder/praliner/blodapelsin-vanilj/BV-halv.png'
  }, 
  {
  name: "Calamansi",
  price: 18,
  rating:3,
  amount: 0,
  kategori: "Mjölk",  
  description: "pralin",
  image1:'bilder/praliner/calamansi/CC-hel.png',
  image2:'bilder/praliner/calamansi/CC-halv.png',
  },
  {
  name: "Espresso",
  price: 18,
  rating:3,
  amount: 0,
  kategori: "Mörk",  
  description: "pralin",
  image1:'bilder/praliner/espresso-kola/EK-hel.png',
  image2: 'bilder/praliner/espresso-kola/EK-halv.png',
  },
  {
  name: "Hallon Lakrits",
  price: 18,
  rating:3,
  amount: 0,
  kategori: "Mörk", 
  description: "pralin",
  image1:'bilder/praliner/hallon-lakrits/HL-hel.png',
  image2: 'bilder/praliner/hallon-lakrits/HL-halv.png',
  },
  {
  name: "Hasselnöt",
  price: 18,
  rating:3,
  amount: 0,
  kategori: "Nötter",  
  description: "pralin",
  image1:'bilder/praliner/hasselnöt/H-hel.png',
  image2: 'bilder/praliner/hasselnöt/H-halv.png',
  },
  {
  name: "Jordnöt",
  price: 18,
  rating:3,
  amount: 0,
  kategori: "Nötter",  
  description: "pralin",
  image1:'bilder/praliner/jordnöt/J-hel.png',
  image2:'bilder/praliner/jordnöt/J-halv.png',
  },
  {             
  name: "Passion-Mango",
  price: 18,
  rating:3,
  amount: 0,
  kategori: "Frukt", 
  description: "pralin",
  image1:'bilder/praliner/passion-mango/PM-hel.png',
  image2:'bilder/praliner/passion-mango/PM-halv.png',
  },
  {
  name: "Saltkola",             
  price: 18,
  rating:5,
  amount: 0,
  kategori: "Mjölk",  
  description: "pralin",
  image1:'bilder/praliner/saltkola/SK-hel.png',
  image2:'bilder/praliner/saltkola/SK-halv.png',
  },
  {
  name: "Maracaibo",
  price: 18,
  rating:'⭐⭐⭐',
  amount: 0,
  kategori: "Mörk", 
  description: "pralin",
  image1:'bilder/praliner/maracaibo/M-hel.png',
  image2: 'bilder/praliner/maracaibo/M-halv.png',
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
          <section class="imgContainer">
            <div class="imageBox">
              <img id="img-1" class="img-1" src="${products[i].image1}"alt=""/>
              <img id="img-2" class="img-2" src="${products[i].image2}"alt=""/>
            </div>
            <button id="prevImage"><span class="left"><i class='bx bxs-left-arrow'></i></span></button>
            <button id="nextImage"><span class="right"><i class='bx bxs-right-arrow'></i></span></button>
          </section>
          Betyg:<span class="betyg">${products[i].rating} </span><br>
          Pris<span class="price">${products[i].price} kr/st</span> <br>
          Summa:<span class="sum">${(products[i].price)}</span> <br>
          <button class="remove" data-operator="minus" data-id="${i}">-</button>
          <span class="amount">${products[i].amount} st</span>
          <button class="add" data-operator="plus" data-id="${i}">+</button>
        </div> 
      </article>
    `;
  }

  //när man klickar på knappen
  document.querySelectorAll('button.add').forEach((btn) => {  
    btn.addEventListener('click', updateAmount);
  });
  document.querySelectorAll('button.remove').forEach((btn) => { 
    btn.addEventListener('click', reduceAmount);
  });

  //antalet st av en produkt ökas.
              
  //detta är för att få till att antalet plusas på. Priset ökas på sidan
  const sumPrice = products.reduce(                  
    (previousValue, product) => {
      return (product.amount * product.price) + previousValue;
  }, 0);
  console.log(sumPrice);
              
  printOrderedChocolate ()
              
  document.querySelector('#cartSum').innerHTML = sumPrice;
  document.querySelector('.totalSummary').innerHTML = sumPrice + 'kr';
  document.querySelector('.prisSummary').innerHTML = sumPrice + 'kr';

   
  //detta är för att totala priset ska ökas på sidan
  const sumTotal = products.reduce(                  
  (previousValue, product) => {
  return product.amount+ previousValue;
  },
  0
  );
  console.log(sumTotal);
                  
  printOrderedChocolate ()
                
  document.querySelector('#cartTotal').innerHTML= sumTotal;

  //ändra bild i ett bildspel
  // event listeners måste läggas till på nytt då bildspelsknapparna skapas på nytt
  // av for-loopen ovan. De gamla knapparna existerar inte längre.
  const nextBtn = document.querySelectorAll('#nextImage');
  const prevBtn = document.querySelectorAll('#prevImage');

  for (let i = 0; i < prevBtn.length; i++) {
    prevBtn[i].addEventListener('click', imageSwap);
    nextBtn[i].addEventListener('click', imageSwap);
  }
}
 //funktion för att printa ut chokladen på sidan

function printOrderedChocolate () {
document.querySelector('#cart').innerHTML = '';
                  
   
for(let i = 0; i < products.length; i ++) {
  if (products[i].amount > 0) {
  document.querySelector('#cart').innerHTML += `<br>`+`<img src="${products[i].image1}" width="60" height="60"}>` + `<br>` +`<p>${products[i].name}</p>` + `` + `<span>Antal:${products[i].amount}st</span>` + ' ' + `<p>Summa:${products[i].price}kr</span>`;      
}
  }
};


//funktion för plus knappen på sidan
function updateAmount(e) {

const chocolateChoosed = e.currentTarget.dataset.id;
products[chocolateChoosed].amount += 1;
                
console.log(products);
renderChocolate();
}
              
renderChocolate();


 //funktion för minusknappen på sidan
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
renderChocolate();
}

//för att tömma varukorgen.

const emptyCartBtn = document.querySelector('#emptyCart');
emptyCartBtn.addEventListener('click',  emptyCart);

function emptyCart (e){
  for (let i = 0; i<products.length; i++){
    products[i].amount = 0;
  }

  renderChocolate();      //tömma varukorgen, de produkter som valts.
}


//detta skriver ut ratingen på sidan



/* slideshow */

/***************  Pseudokod
-knapp för att kunna trycka höger och vänster
-event för prevBtn och nextBtn
-funktion för att gå till nästa bild
-funktion för att gå till förgående bild
-variabel för att veeta vilken aktuell bild vi står på
-hantera när vi är på sista bilden samt första
-funktion för att skapa pluppar för antal bilder
*/
//steg 1 variabler 

function imageSwap(e){
  const image1Slideshow =e.currentTarget.parentElement.querySelector('#img-1');
  const image2Slideshow =e.currentTarget.parentElement.querySelector('#img-2');

  const firstPralin = image1Slideshow.getAttribute('src');
  const secondPralin = image2Slideshow.getAttribute('src');

  image1Slideshow.setAttribute('src', secondPralin);
  image2Slideshow.setAttribute('src', firstPralin);
};

// när du väljer antal så kan du inte byta bild? why???



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
               //kundkorgs summering
              
            //kundkorgen ska ge dig rabatterat pris, 10% rabat..
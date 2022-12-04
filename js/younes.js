/* plus minus knappar
  -när man klickar på plus eller minus ska summan uppdateras
  -vi behöver ta reda på antal praliner
  -vi behöver ta reda på priset på pralinergit 
*/


              
const products = [{   // TODO: import från egen fil
  name:"Apelsin Hasselnöt",
  price:15,
  rating:4,
  amount: 0,
  kategori: "Nötter",
  description: "apelsin-hasselnot-pralin",
  image1:'bilder/praliner/apelsin-hasselnöt/AH-hel.png',
  image2:'bilder/praliner/apelsin-hasselnöt/AH-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name:"Blodapelsin-vanilj",
  price:20,
  rating:4,
  amount: 0,
  kategori: "Frukt",
  description: "pralin",
  image1:'bilder/praliner/blodapelsin-vanilj/BV-hel.png',
  image2:'bilder/praliner/blodapelsin-vanilj/BV-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  }, 
  {
  name: "Calamansi",
  price: 12,
  rating:3,
  amount: 0,
  kategori: "Mjölk",  
  description: "pralin",
  image1:'bilder/praliner/calamansi/CC-hel.png',
  image2:'bilder/praliner/calamansi/CC-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Espresso",
  price: 5,
  rating:3,
  amount: 0,
  kategori: "Mörk",  
  description: "pralin",
  image1:'bilder/praliner/espresso-kola/EK-hel.png',
  image2:'bilder/praliner/espresso-kola/EK-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Hallon Lakrits",
  price: 14,
  rating:3,
  amount: 0,
  kategori: "Mörk", 
  description: "pralin",
  image1:'bilder/praliner/hallon-lakrits/HL-hel.png',
  image2:'bilder/praliner/hallon-lakrits/HL-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Hasselnöt",
  price: 14,
  rating:3,
  amount: 0,
  kategori: "Nötter",  
  description: "pralin",
  image1:'bilder/praliner/hasselnöt/H-hel.png',
  image2:'bilder/praliner/hasselnöt/H-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Jordnöt",
  price: 16,
  rating:3,
  amount: 0,
  kategori: "Nötter",  
  description: "pralin",
  image1:'bilder/praliner/jordnöt/J-hel.png',
  image2:'bilder/praliner/jordnöt/J-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {             
  name: "Passion-Mango",
  price: 16,
  rating:3,
  amount: 0,
  kategori: "Frukt", 
  description: "pralin",
  image1:'bilder/praliner/passion-mango/PM-hel.png',
  image2:'bilder/praliner/passion-mango/PM-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Saltkola",             
  price: 10,
  rating:5,
  amount: 0,
  kategori: "Mjölk",  
  description: "pralin",
  image1:'bilder/praliner/saltkola/SK-hel.png',
  image2:'bilder/praliner/saltkola/SK-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  },
  {
  name: "Maracaibo",
  price: 8,
  rating:2,
  amount: 0,
  kategori: "Mörk", 
  description: "pralin",
  image1:'bilder/praliner/maracaibo/M-hel.png',
  image2:'bilder/praliner/maracaibo/M-halv.png',
  alt: 'pralin-chocolate-orange-nuts',
  }
  ];

  // lucia produkt som skrivs ut i maxs regel för lucia, skapa en funktion och kalla på den.
  const luciaProduct = {
    name: "Pepparkakspralin",
    price: 0,
    rating:5,
    amount: 1,
    kategori: "Mjölk", 
    description: "pralin",
    image1:'./bilder/pepparkaksPralin.jpg',
    alt: 'pralin-chocolate-orange-nuts',
  }
              



//+++++++++++++++++++++++++++sätt att skriva ut text ist för och ha i html++++++++++++++++++++++++++++++              





//+++++++++++++++++++++++funktion skriva ut uppdaterad pris+++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++funktion för rabatt+++++++++++++++++++++++++++++++++++







//++++++++++++++++++++++++++++++funktion för leverans++++++++++++++++++++++++++++++






//++++++++++++++++++++++++++++++funktion för att tömma varukorgen.++++++++++++++++++++++++++++++







//detta skriver ut ratingen på sidan

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





//++++++++++++++++++++++++++++ få en gratis lucia pralin+++++++++++++++++++++++




 


//+++++++++++++++++++++++det är jul, ändra bakgrund och ändra text till röd+++++++++++++++++++++++++++++++++++++++









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
            
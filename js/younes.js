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
              
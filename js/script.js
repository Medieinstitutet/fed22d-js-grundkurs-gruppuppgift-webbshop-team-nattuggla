// meny knappen

const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');

menuBtn.addEventListener('click', toggleMenuOpenState);
nav.addEventListener('click', toggleMenuOpenState);


function toggleMenuOpenState(e) {
    if (e.target.nodeName == 'A'){
        return;
    }
    
    nav.classList.toggle('open');
}

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



const decreaseButtons = document.querySelectorAll('button[data-operator="minus"]');
const increaseButtons = document.querySelectorAll('button[data-operator="plus"]');

for (let i = 0; i <  decreaseButtons.length; i++ ) {
    decreaseButtons[i].addEventListener('click', decreaseCount);
    increaseButtons[i].addEventListener('click', increaseCount);
}

function decreaseCount (e){
    const amountElement = e.currentTarget.parentElement.querySelector('.amount');
    let amount = amountElement.innerHTML;

    if (amount - 1 < 0){
        return;
    }

   amountElement.innerHTML = amount - 1;

   chokladSummering(e.currentTarget.parentElement);
}

function increaseCount (e) {
    const amountElement = e.currentTarget.parentElement.querySelector('.amount');

    //pga pluspol så reagerar inte datorn att de tär en siffra likt när det är en minuspol. därför behövs number här.
    let amount = Number(amountElement.innerHTML);  
    
    amountElement.innerHTML = amount + 1;

   chokladSummering(e.currentTarget.parentElement);
}

/* plus minus knappar
-när man klickar på plus eller minus ska summan uppdateras
-vi behöver ta reda på antal praliner
-vi behöver ta reda på priset på praliner
*/

function chokladSummering (chokladElement) {
    const chokladPris = chokladElement.querySelector('.pris').innerHTML;
    const orderedAmount = chokladElement.querySelector('.amount').innerHTML;

    const sum = chokladPris * orderedAmount;
    chokladElement.querySelector('.sum').innerHTML = sum;
}


const totalPrice = orderedAmount.querySelector('.sum').innerHTML; //kundkorgs summering


checkForPrice //kundkorgen ska ge dig rabatterat pris, 10% rabat..
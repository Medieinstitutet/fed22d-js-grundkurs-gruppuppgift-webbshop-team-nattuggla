const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark__mode')
    darkMode.classList.toggle('hide')
    lightMode.classList.remove('hide')
})
lightMode.addEventListener('click', () => {
    document.body.classList.remove('dark__mode')
    lightMode.classList.toggle('hide')
    darkMode.classList.remove('hide')
})


let buy= document.querySelectorAll('.buy');
let product=[
    {
        name: 'Mjölkchoklad',
        tag: 'Mjölkchoklad',
        price: 15,
        inCart: 0,

    }
]

for (let i=0; i<buy.length; i++){
    buy[i].addEventListener('click', ()=>{
        purchased();
    })
}

function purchased (){
    let productNumbers=localStorage.getItem('purchased');

    productNumbers= parseInt('productNumbers');
    
    localStorage.setItem('purchased', 1);
}


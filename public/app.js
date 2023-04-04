// https://memory-game-c293e.web.app/

//GRAB A COUPLE OF THINGS
const section = document.querySelector('section');
const playerLivesCount = document.querySelector("span");
let playerLives = 10;  
// először legyen const

//LINK TEXT
playerLivesCount.textContent = playerLives;

//GENERATE THE DATA 2xminden kép
const getData = () => [
    { imgScr: './images/airplane.jpg', name: "airplane" },
    { imgScr: './images/camera.jpg', name: "camera" },
    { imgScr: './images/catalonia.jpg', name: "catalonia" },
    { imgScr: './images/london.jpg', name: "london" },
    { imgScr: './images/nature.jpg', name: "nature" },
    { imgScr: './images/thailand.jpg', name: "thailand" },
    { imgScr: './images/village.jpg', name: "village" },
    { imgScr: './images/walking.jpg', name: "walking" },
    { imgScr: './images/airplane.jpg', name: "airplane" },
    { imgScr: './images/camera.jpg', name: "camera" },
    { imgScr: './images/catalonia.jpg', name: "catalonia" },
    { imgScr: './images/london.jpg', name: "london" },
    { imgScr: './images/nature.jpg', name: "nature" },
    { imgScr: './images/thailand.jpg', name: "thailand" },
    { imgScr: './images/village.jpg', name: "village" },
    { imgScr: './images/walking.jpg', name: "walking" },
];

//RANDOMIZE an array, shuffle the array
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    console.log(cardData);
    return cardData;
};

//CARD GENERATOR FUNCTION
const cardGenerator = () => {
    const cardData = randomize();
    //GENERATE THE HTML
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //ATTACH INFO TO THE CARDS
        face.setAttribute('src', item.imgScr);
        card.setAttribute('name', item.name);

        //ATTACH THE CARDS TO THE SECTION
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            // card.classList.toggle('flipped'); később ha kell
            checkCards(e);
            // először ne add át az e-t, nézzük meg mi lehet a gond
        })
    });
};

//  CSINÁLJUK MEG A CSS-T

//CHECK CARDS
const checkCards = (e) => {
    const clickedCard = e.target;
    console.log(clickedCard); //pointer-events:none-t kell állítani a backre és a face-re
    clickedCard.classList.add('flipped');

    const flippedCards = document.querySelectorAll('.flipped');
    // LOGIC
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log('juhúú találat!');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                // ha van találat akkor még vissza tudom fordítani ezért kell=>
                card.style.pointerEvents = 'none';
            });
        } else {
            console.log('ajaj, ez nem jó!');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                // card.classList.remove('toggleCard'); ez így túl gyors kell késleltetés
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });

            // REDUCE LIVES
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                setTimeout(() => restart('Sajnos vesztettél! :('), 1000);
            }
        }
    }
    //RUN A CHECK TO SEE IF WE WON THE GAME
    const toggleCards = document.querySelectorAll('.toggleCard');
    if (toggleCards.length === 16) {
        setTimeout(() => restart('Gratulálok! Nyertél! :)'), 1000);
    }
};

// RESTART
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    // amíg nem állítódnak be az új kártyák addig nem lehet kattintani rájuk
    section.style.pointerEvents = "none";

    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        // RANDOMIZE
        setTimeout(() => {
            // gond - nem tudok kattintani a már eltalált lapokra az új körben sem
            cards[index].style.pointerEvents = "all";
            // update the image src and name (különbség? src már van name attributuma még nincs)
            // faces[index].src = item.imgScr; 
            faces[index].setAttribute('src', item.imgScr); 
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 10;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 1000);
};

cardGenerator();

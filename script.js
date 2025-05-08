//playbord é a tela ou tabuleiro
/* Container onde a cobra e a comida serão renderizadas */
const playBoard = document.querySelector(".play-board"); //PONTUAÇÃO ATUAL ou JOGADOR
const scoreElement = document.querySelector(".score");

//Record (maior pontuação)
const highScoreElement = document.querySelector(".high-score");
//Controles de movimento / Seleciona elementos <i> Ícones Botões para Devices Mobiles
const controls = document.querySelectorAll(".controls i")

//Objetos de interatividade - Cadastro de variaveis

/* Variavel Boleana que indica se o jogo terminou */
let gameOver = false;
//Variavel para armazenar as coordenadas x e y da comida
let foodX, foodY;
//armazena as coordenadas x e y da cabeça da cobra (posiçao inicial)
let snakeX = 5, snakeY = 5;
// variavel para armazenar a velocidade das direcoes x e y, inicialmente em 0, pq a cobra está parada 
let velocityX = 0, velocityY = 0;
// Uma Array para armazenar as coordenadas de cada segmento do corpo, primeiro elemento é a cabeça
let snakeBody = [];
//variavel para armezar o ID do intervalo que será usado para atualizar o jogo em um determinado ritmo.
let setIntervalId;
//uma variavel para manter o controle da pontuaçao atual do jogador
let score = 0;



let highScore = localStorage.getItem("high-score") || 0;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random () * 30) +1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//função para lidar com o fim do jogo

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Aperte OK para recomeçar :)")
    location.reload();
}

/* Função para mudar a direção da cobrinha */
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRigth" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } 
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.CDATA_SECTION_NODE.key})));

/* Começar o game = init game */
const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"`;

    //Quando a cobra se alimenta - When snake eat food
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore

        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }
}
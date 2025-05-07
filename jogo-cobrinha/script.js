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
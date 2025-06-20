const whiteCar = document.getElementById("white");
const redCar = document.getElementById("red");
const result = document.getElementById("result");
const body = document.body;

const btnWhite = document.getElementById("branco");
const btnRed = document.getElementById("vermelho");
const btnReset = document.getElementById("resetar");
const btnAcelerar = document.getElementById("acelerar");
const btnDesacelerar = document.getElementById("desacelerar");

let selectedCar = null;
let carSize = 50;
const maxCarSize = 100;
const minCarSize = 30;
const carSpeedIncrement = 5;

function selectCar(color) {
    selectedCar = color;
    if (color === "white") {
        result.innerText = "Carro Branco";
        body.style.backgroundColor = "gray";
        whiteCar.style.zIndex = 3;
        redCar.style.zIndex = 2;
    } else if (color === "red") {
        result.innerText = "Carro Vermelho";
        body.style.backgroundColor = "darkred";
        whiteCar.style.zIndex = 2;
        redCar.style.zIndex = 3;
    }
    btnAcelerar.style.display = "inline-block";
    btnDesacelerar.style.display = "inline-block";
    btnReset.style.display = "inline-block";
}

function reset() {
    selectedCar = null;
    carSize = 50;
    result.innerText = "?";
    body.style.backgroundColor = "black";
    whiteCar.style.zIndex = 2;
    redCar.style.zIndex = 2;
    whiteCar.style.width = `${carSize}px`;
    whiteCar.style.height = `${carSize}px`;
    redCar.style.width = `${carSize}px`;
    redCar.style.height = `${carSize}px`;
    btnAcelerar.style.display = "none";
    btnDesacelerar.style.display = "none";
    btnReset.style.display = "none";
}

function adjustCarSize(increase) {
    if (selectedCar) {
        carSize += increase ? carSpeedIncrement : -carSpeedIncrement;
        carSize = Math.max(minCarSize, Math.min(carSize, maxCarSize));
        const carElement = selectedCar === "white" ? whiteCar : redCar;
        carElement.style.width = `${carSize}px`;
        carElement.style.height = `${carSize}px`;
    }
}

whiteCar.addEventListener("click", () => selectCar("white"));
redCar.addEventListener("click", () => selectCar("red"));
btnWhite.addEventListener("click", () => selectCar("white"));
btnRed.addEventListener("click", () => selectCar("red"));
btnAcelerar.addEventListener("click", () => adjustCarSize(true));
btnDesacelerar.addEventListener("click", () => adjustCarSize(false));
btnReset.addEventListener("click", reset);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        adjustCarSize(true);
    } else if (event.key === "ArrowDown") {
        adjustCarSize(false);
    }
});

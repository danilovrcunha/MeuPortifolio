document.addEventListener("DOMContentLoaded", function() {
    let tentativasRestantes = 5;
    let numeroSorteado = Math.floor(Math.random() * 100) + 1;
    let historicoTentativas = [];

    const tentativasDisplay = document.querySelector(".tentativas");
    const inputNumero = document.querySelector("input");
    const resultadoDisplay = document.querySelector("#resultado");
    const b1 = document.getElementById("b1");
    const b2 = document.getElementById("b2");
    const b3 = document.getElementById("b3");

    function atualizarTentativas() {
        tentativasDisplay.textContent = `Você tem ${tentativasRestantes} tentativas restantes!`;
    }

    function mostrarMensagem(mensagem) {
        resultadoDisplay.textContent = mensagem;
    }

    function mostrarHistorico() {
        resultadoDisplay.innerHTML += `<br>Números tentados: ${historicoTentativas.join(', ')}`;
    }

    function verificarTentativa(chute) {
        if (chute < 1 || chute > 100 || isNaN(chute)) {
            mostrarMensagem("Por favor, insira um número válido entre 1 e 100.");
            return;
        }

        historicoTentativas.push(chute);

        if (chute === numeroSorteado) {
            mostrarMensagem("Parabéns! Você acertou o número!");
            reiniciarJogo();
        } else if (chute > numeroSorteado) {
            mostrarMensagem("O número é menor.");
        } else {
            mostrarMensagem("O número é maior.");
        }

        tentativasRestantes--;
        atualizarTentativas();

        if (tentativasRestantes === 0) {
            mostrarMensagem(`Suas tentativas acabaram! O número era ${numeroSorteado}.`);
        } else {
            mostrarHistorico();
        }

        inputNumero.value = "";
    }

    function reiniciarJogo() {
        tentativasRestantes = 5;
        numeroSorteado = Math.floor(Math.random() * 100) + 1;
        historicoTentativas = [];
        inputNumero.value = "";
        resultadoDisplay.textContent = "";
        atualizarTentativas();
    }

    b1.addEventListener("click", function() {
        if (tentativasRestantes > 0) {
            const chuteAleatorio = Math.floor(Math.random() * 100) + 1;
            mostrarMensagem(`Número sorteado para você: ${chuteAleatorio}`);
            verificarTentativa(chuteAleatorio);
        }
    });

    b2.addEventListener("click", function() {
        const chuteUsuario = parseInt(inputNumero.value);
        verificarTentativa(chuteUsuario);
    });

    b3.addEventListener("click", function() {
        reiniciarJogo();
    });

    atualizarTentativas();
});

document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll(".grid div")
    const resultDisplay = document.querySelector("#result")

    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let aliensInvadersTakenDown = []
    let result = 0
    let direction = 1
    let invaderId

    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]


    

    // draw the aliens
    alienInvaders.forEach(function (invader) {
        squares[currentInvaderIndex + invader].classList.add("invader")
    })


    // draw the shooter
    squares[currentShooterIndex].classList.add("shooter")



    // move the shooter on the line
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove("shooter")

        switch (e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0) {
                    currentShooterIndex -= 1;
                }
                break
            case 39:
                if (currentShooterIndex < (squares.length - width) -1) {
                    currentShooterIndex += 1;
                }
                break
        }
        squares[currentShooterIndex].classList.add("shooter");
    }

    document.addEventListener("keydown", moveShooter);

})

//EXPERIMENTA AGORa sff
// dá, mas não pára no final da Array ah ya tens razaão 1 m
// Muito fixe isto do Live Share!
// Acho q uma das coisas é o length, passarmos para length - 1 ?    

//experimenta agora -
// YES funciona !! Mas se quisermos dinamicamente, deixa tentar (squares.length - width)
// Okay alternativa um pouco manhosa --> (squares.length - width) -1)
// mais vale a opção do video se o remainder for < width(15) -1 currentIndex ++

// Vou ter que fechar a loja por hoje. Amanha dia de trabalho.
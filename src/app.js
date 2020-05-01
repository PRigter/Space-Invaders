// document.addEventListener("DOMContentLoaded", function () { // enable in the end of dev
    const squares = document.querySelectorAll(".grid div")
    const resultDisplay = document.querySelector("#result")

    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let aliensInvadersTakenDown = []
    let result = 0
    let direction = 1
    let lastDefenseLine = squares.length - (width * 2)
    let invaderId

    // const alienInvaders = [
    //     0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    //     15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    //     30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    // ]

    const alienInvaders = [ 0, 1 , 2, 3 ]
    

    // draw the aliens
    alienInvaders.forEach(function (invader) {
        squares[currentInvaderIndex + invader].classList.add("invader")
    })


    // draw the shooter
    squares[currentShooterIndex].classList.add("shooter")



    // move the shooter on horizontal line
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

    
    // move the aliens invaders
    // 1 - Moving as a group horizontally
    // 2 - And then moving down a row each time they reach the horizontal limit
    function moveInvaders() {
        //** 1º Set the edges of the aliens block
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width
        } else if (direction === width) {
            if (leftEdge) {
                direction = 1
            } else {
                direction = -1
            }
        }

        for (let i = 0; i <= alienInvaders.length -1; i++ ) {
            squares[alienInvaders[i]].classList.remove("invader")
        }

        for (let i = 0; i <= alienInvaders.length -1; i++) {
            alienInvaders[i] += direction
        }
        for (let i = 0; i <= alienInvaders.length -1; i++) {
            squares[alienInvaders[i]].classList.add("invader")
            squares[alienInvaders[i]] = 2
        }


        // Set Game Over
        if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
            resultDisplay.textContent = " Game Over"
            squares[currentShooterIndex].classList.add("boom")
            clearInterval(invaderId)
        }

        // Reaching Last Defense Line -> Game Over
        for (let i = 0; i < alienInvaders.length -1; i++) {
            if (alienInvaders[i] > lastDefenseLine) {
                resultDisplay.textContent = " Game Over"
                clearInterval(invaderId)
            }
        }   
    }


    invaderId = setInterval(moveInvaders, 60)






// }) //Enable in the end of dev


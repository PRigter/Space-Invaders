
// Global Variables
const squares = document.querySelectorAll(".grid div")
const resultDisplay = document.querySelector("#result")


let view = {
    width: 15,
    currentShooterIndex: 202,
    currentInvaderIndex: 0,
    alienInvaders: [0, 1, 2, 3],
    alienInvadersTakenDown: [],
    result: 0,
    direction: 1,

    get lastDefenseLine() {
        return console.log(squares.length - (this.width * 2))
    },

    resultDisplay: function () {
        resultDisplay.textContent = this.result
    },

    shooterDisplay: function () {
        squares[this.currentShooterIndex].classList.add("shooter")
    },

    aliensDisplay: function () {
        currentInvaderIndex = this.currentInvaderIndex

        this.alienInvaders.forEach(function (invader) {
            squares[invader + currentInvaderIndex].classList.add("invader")
        })
    }

}



let model = {
    invaderId: function () {
        setInterval(this.aliensMove, 500)
    },

    aliensMove: function () {
        const leftEdge = view.alienInvaders[0] % view.width === 0
        const rightEdge = view.alienInvaders[view.alienInvaders.lenght - 1] % view.width === view.width - 1

        if ((leftEdge && view.direction === -1) || (rightEdge && view.direction === 1)) {
            view.direction = view.width
        } else if (view.direction === view.width) {
            if (leftEdge) {
                view.direction = 1
            } else {
                view.direction - 1
            }
        }
    
        for (let i = 0; i <= view.alienInvaders.length - 1; i++) {
            squares[view.alienInvaders[i]].classList.remove("invader")
        }
        for (let i = 0; i <= view.alienInvaders.length - 1; i++) {
            view.alienInvaders[i] += view.direction
        }
        for (let i = 0; i <= view.alienInvaders.length -1; i++) {
            if (!view.alienInvadersTakenDown.includes(i)) {
                squares[view.alienInvaders[i]].classList.add("invader")
            }  
        }


    },

    gameOver: function() {
        //* To be continued
    }
}


let controller = {
    shooterMove: function (e) {
        squares[view.currentShooterIndex].classList.remove("shooter")

        switch (e.keyCode) {
            case 37:
                console.log("left")
                if (view.currentShooterIndex % view.width !== 0) {
                    view.currentShooterIndex -= 1
                }
                break
            case 39:
                console.log("right")
                if (view.currentShooterIndex % view.width < view.width - 1) {
                    view.currentShooterIndex += 1
                }
                break
        }

        squares[view.currentShooterIndex].classList.add("shooter")
    },


    fire: function (e) {
        if (e.keyCode === 32) {
            
            let laserId
            let currentLaserIndex = view.currentShooterIndex
            console.log(currentLaserIndex)
          


            function moveLaser() { 
                squares[currentLaserIndex].classList.remove("laser")
                currentLaserIndex -= view.width
                squares[currentLaserIndex].classList.add("laser")

                // Collision Detection
                if (squares[currentLaserIndex].classList.contains("invader")) {
                    squares[currentLaserIndex].classList.remove("laser")
                    squares[currentLaserIndex].classList.remove("invader")
                    squares[currentLaserIndex].classList.add("boom")

                    setTimeout(function() {
                        squares[currentLaserIndex].classList.remove("boom")
                    }, 250)

                    clearInterval(laserId)

                    const alienShot = view.alienInvaders.indexOf(currentLaserIndex)
                    view.alienInvadersTakenDown.push(alienShot)
                    
                    view.result++
                    resultDisplay.textContent = view.result
                }

                //Remove laser when it reaches the Top Line of the Grid
                if (currentLaserIndex < view.width) {
                    clearInterval(laserId)
                    setInterval(() => squares[currentLaserIndex].classList.remove("laser") , 100)
                }
            }

           laserId = setInterval(moveLaser, 140)
           
        

        }
    }
}


document.addEventListener("keydown", controller.shooterMove)
document.addEventListener("keyup", controller.fire)



init()

// INITIAL FUNCTION
function init() {
    view.resultDisplay()
    view.shooterDisplay()
    view.aliensDisplay()
    model.invaderId()

}
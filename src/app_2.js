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
        return squares.length - (this.width * 2)
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
    },

    gameWinDisplay: function () {
        resultDisplay.innerHTML = "YOU WIN!"
    },

    gameOverDisplay: function () {
        resultDisplay.innerHTML = "Game Over"
    }
}


let model = {
    invaderSpeed: 800,
    gameStatus: true,

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

            // Check for Game Over --> When Aliens reaches last 2 row's
            // Está com 30 para teste apenas --> corrigir para: view.lastDefenseLine()
            if (view.alienInvaders[i] > view.lastDefenseLine) {
                clearInterval(invaderId)
                view.gameOverDisplay()

                // gameOn = false
                console.log(this.gameStatus)
            }
        }

        for (let i = 0; i <= view.alienInvaders.length - 1; i++) {
            if (!view.alienInvadersTakenDown.includes(i)) {
                squares[view.alienInvaders[i]].classList.add("invader")
            }
        }


        // console.log("Aliens moving")



    }
}

const invaderId = setInterval(model.aliensMove, model.invaderSpeed)


let controller = {
    shooterMove: function (e) {
        squares[view.currentShooterIndex].classList.remove("shooter")

        switch (e.keyCode) {
            case 37:
                // console.log("left")
                if (view.currentShooterIndex % view.width !== 0) {
                    view.currentShooterIndex -= 1
                }
                break
            case 39:
                // console.log("right")
                if (view.currentShooterIndex % view.width < view.width - 1) {
                    view.currentShooterIndex += 1
                }
                break
        }

        squares[view.currentShooterIndex].classList.add("shooter")
    },
    
    laserSpeed: 340,

    fire: function() {
        // debugger
        let currentLaserIndex = view.currentShooterIndex
        let laserId
        let laserIsMoving

    
        let moveLaser = function() {
           
            squares[currentLaserIndex].classList.remove("laser")
            currentLaserIndex -= view.width
            squares[currentLaserIndex].classList.add("laser")
            
            // console.log(currentLaserIndex)

            // Collision Detection
            if (squares[currentLaserIndex].classList.contains("invader")) {
                squares[currentLaserIndex].classList.remove("laser")
                squares[currentLaserIndex].classList.remove("invader")
                squares[currentLaserIndex].classList.add("boom")

                setTimeout(function () {
                    squares[currentLaserIndex].classList.remove("boom")
                }, 250)

                clearInterval(laserId)

                const alienShot = view.alienInvaders.indexOf(currentLaserIndex)
                view.alienInvadersTakenDown.push(alienShot)

                view.result++
                resultDisplay.textContent = view.result

                // Check for Win Game
                if (view.alienInvadersTakenDown.length === view.alienInvaders.length) {
                    clearInterval(invaderId)
                    view.gameWinDisplay()
                }
            }

            //Remove laser when it reaches the Top Line of the Grid
            if (currentLaserIndex < view.width) {
                clearInterval(laserId)
                setInterval(() => squares[currentLaserIndex].classList.remove("laser"), 100)
            }


             // Check if it's still a laser on the move - Only 1 Laser at a time
            if (currentLaserIndex < (view.currentShooterIndex + view.width) && currentLaserIndex > view.width ) {
                console.log("laser is moving")
                laserIsMoving = true
                return true
                
                
            } else if (currentLaserIndex < view.width) {
                console.log("Laser has Stopped")
                laserIsMoving = false
                return false  
            }
            
            // console.log(currentLaserIndex)
            // console.log(laserIsMoving)
        }


        
            laserId = setInterval(function() {
                moveLaser()
            }, this.laserSpeed) 


            console.log(moveLaser())
            if (moveLaser() == true) {
                console.log("move laser is true")
                return true
            }

    }
        
    
    
}



document.addEventListener("keydown", controller.shooterMove)
document.addEventListener("keyup", function(e) {

    let laserActive

    // Check if theres a laser on the move
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains("laser")) {
            console.log("found class")
            laserActive = true
            break
        }
    }

    // Only allow fire, when Space Key pressed AND there is no other laser on the move
    if (e.keyCode === 32 && laserActive != true) {
        controller.fire()
    }

})



init()

// INITIAL FUNCTION
function init() {
    view.resultDisplay()
    view.shooterDisplay()
    view.aliensDisplay()

}
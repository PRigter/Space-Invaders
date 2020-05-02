
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
    invaderId: 0,
    
    get lastDefenseLine() {
        return squares.length - (this.width * 2)
    },

    resultDisplay: function() {
        resultDisplay.textContent = this.result
    },

    shooterDisplay: function() {
        squares[this.currentShooterIndex].classList.add("shooter")
    },

    aliensDisplay: function() {
        currentInvaderIndex = this.currentInvaderIndex
    
        this.alienInvaders.forEach(function(invader) {
            squares[invader + currentInvaderIndex].classList.add("invader")
        })
    }

}


let controller = {
    shooterMove: function (e) {
        switch (e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0) {
                    currentShooterIndex -= 1
                }
                break
            case 39:
                if (currentShooterIndex % width < width - 1) {
                    currentShooterIndex += 1
                }
                break
        }
    },  
    
    aliensMove: function() {
        
    },

    fire: function(e) {
        if (e.keyCode === 32) {
            console.log("space bar ")
        } 
    }
}


document.addEventListener("keyup", controller.fire)










init()

// INITIAL FUNCTION
function init() {
    view.resultDisplay()
    view.shooterDisplay()
    view.aliensDisplay()
}
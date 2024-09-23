class Cell {
    constructor(id, imgElement) {
        this.id = id
        this.imgElement = imgElement
        this.color = "picture/box.gif"
    }

    setColor(color) {
        this.color = color
        this.imgElement.src = color
    }

    clear() {
        this.setColor("picture/box.gif")
    }

    isEmpty() {
        return this.color === "picture/box.gif"
    }
}

class Game {
    constructor(gameGrid, numberBalls, score, startButton, resetButton) {
        this.gameGrid = gameGrid
        this.numberBalls = numberBalls
        this.score = score
        this.startButton = startButton
        this.resetButton = resetButton
        this.numberScore = 0
        this.gridSize = 81
        this.grid = []
        this.borderTable = ["6", "7", "8", "9", "15", "16", "17", "18", "24", "25", "26", "27", "33", "34", "35", "36", "42", "43", "44", "45", "51", "52", "53", "54", "60", "61", "62", "63", "69", "70", "71", "72"]
        this.selectedCell = null
        this.changeColour = "picture/joker.png"

        this.initGrid()
        this.addTdClickHandlers()
        this.addThreeBallsWithClick()
        this.reset()
    }

    initGrid() {
        for (let i = 1; i <= this.gridSize; i++) {
            let imgElement = document.getElementById(i.toString())
            let cell = new Cell(i.toString(), imgElement)
            this.grid.push(cell)
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    getRandomFreeCell() {
        let freeCells = this.grid.filter(cell => cell.isEmpty())
        let randomIndex = this.getRandomInt(0, freeCells.length)
        return freeCells[randomIndex]
    }

    getThreeRandomFreeCells() {
        let result = []
        for (let i = 0; i < 3; i++) {
            result.push(this.getRandomFreeCell())
        }
        return result
    }

    getRandomColour() {
        let colours = ["picture/blue.png", "picture/red.png", "picture/green.png"]
        return colours[this.getRandomInt(0, 3)]
    }

    handleTdClick(event) {
        const target = event.target.closest("td")
        const img = target.querySelector("img")
        const clickedCell = this.grid.find(cell => cell.id === img.id)

        if (!clickedCell.isEmpty()) {
            this.clearSelection()
            target.classList.toggle("selected")
            this.selectedCell = clickedCell
            this.changeColour = img.src
        } 
        else if (this.selectedCell) {
            this.moveBall(clickedCell)
            this.checkLine(clickedCell)
            this.addThreeBalls()
            this.selectedCell = null
            this.clearSelection()
        }
    }

    moveBall(targetCell) {
        targetCell.setColor(this.changeColour)
        this.selectedCell.clear()
    }

    clearSelection() {
        document.querySelectorAll("td.selected").forEach(td => td.classList.remove("selected"))
        this.selectedCell = null
    }

    addThreeBalls() {
        this.clearSelection()
        const threeBalls = this.getThreeRandomFreeCells()
        for (let j = 0; j < 3; j++) {
            const box = threeBalls[j]
            box.setColor(this.getRandomColour())
            this.checkLine(box)
        }
        this.updateNumberOfBalls()
    }

    addTdClickHandlers() {
        const tds = document.querySelectorAll("table td")
        tds.forEach(td => {
            td.addEventListener("click", event => this.handleTdClick(event))
        })
    }

    reset() {
        this.resetButton.addEventListener("click", () => {
            this.grid.forEach(cell => cell.clear())
            this.numberScore = 0
            this.score.value = "score : " + this.numberScore
            this.updateNumberOfBalls()
            this.clearSelection()
        })
    }

    updateNumberOfBalls() {
        let result = this.grid.filter(cell => !cell.isEmpty()).length
        this.numberBalls.value = "number of balls : " + result
    }

    addThreeBallsWithClick() {
        this.startButton.addEventListener("click", () => {
            this.addThreeBalls()
        })
    }

    checkLine(cell) {
        // Logique de vérification et gestion des lignes à implémenter ici
    }
}

const game = new Game(
    document.getElementById("gamegrid"),
    document.getElementById("numberBalls"),
    document.getElementById("score"),
    document.getElementById("start"),
    document.getElementById("reset")
)

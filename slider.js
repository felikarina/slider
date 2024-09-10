let startButton = document.getElementById("start")
let resetButton = document.getElementById("reset")
let gameGrid = document.getElementById("gamegrid")
let numberBalls = document.getElementById("numberBalls")
const emptyGrid = gameGrid.innerHTML
const Grid = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81"]
let newGrid = [].concat(Grid)
let firstClick = false
let firstBoxClicked = "0"
let changeColour = "picture/joker.png"
const borderTable = ["6","7","8","9","15","16","17","18","24","25","26","27","33","34","35","36","42","43","44","45","51","52","53","54","60","61","62","64","70","71","72","73"]


function handleTdClick(event) {
    const target = event.target.closest("td")
    document.querySelectorAll("td.selected").forEach(td => td.classList.remove("selected"))
    if (target && !target.querySelector("img[src*='picture/box.gif']")) {
        target.classList.toggle("selected")
        changeColour = target.querySelector("img").src
        firstBoxClicked = target.querySelector("img").id
        firstClick = true
    }
    if (target && target.querySelector("img[src*='picture/box.gif']") && firstClick) {
        moveBall(target)
        firstClick = false
        boxremoved = target.querySelector("img").id
        newGrid = newGrid.filter((number) => number !== boxremoved)
        push = newGrid.push(firstBoxClicked)
        let targetBox = target.querySelector("img")
        checkLine(targetBox)
        addThreeBalls()
        console.log(newGrid)
    }
}

function addTdClickHandlers() {
    const tds = document.querySelectorAll("table td")
    tds.forEach(td => {
        td.addEventListener("click", handleTdClick)
    })
}

function clearTdClick() {
    const tds = document.querySelectorAll("table td")
    tds.forEach(td => td.classList.remove("selected"))
}

function moveBall(td) {
    let picture = td.querySelector("img")
    picture.src = changeColour
    document.getElementById(firstBoxClicked).src = "picture/box.gif"
}

function getRandomInt(min, max) {
    //The maximum is exclusive and the minimum is inclusive
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

function getRandomForGrid() {
    let number = getRandomInt(0,newGrid.length)
    let result = newGrid[number]
    newGrid.splice(number,1)
    return result
}

function getThreeBallsRandom() {
    result = []
    for (let i=0; i<3; i++) {
        push = result.push(getRandomForGrid())
    }
    return result
}

function getRandomColour() {
    let colours = ["picture/blue.png","picture/darkRed.png","picture/green.png","picture/purple.png","picture/red.png","picture/yellow.png"]
    return colours[getRandomInt(0,6)]
    // let colours = ["picture/blue.png","picture/red.png","picture/green.png"]
    // return colours[getRandomInt(0,2)]
}

function addThreeBallsWithClick() {
    startButton.addEventListener("click", () => {
        clearTdClick()
        threeBalls = getThreeBallsRandom()
        for (let j=0; j<3; j++){
            let box = document.getElementById(threeBalls[j])
            box.src = getRandomColour()
            checkLine(box)
        } 
        numberOfBalls(newGrid.length)   
    })
}

function addThreeBalls() {
    clearTdClick()
    threeBalls = getThreeBallsRandom()
    for (let j=0; j<3; j++){
        let box = document.getElementById(threeBalls[j])
        box.src = getRandomColour()
        checkLine(box)
    }
    changeSrc()
    numberOfBalls(newGrid.length)
}

function changeSrc() {
    for (let k=0; k<3; k++) {
        let box = document.getElementById(threeBalls[k])
        box.src = getRandomColour()
    }
}

function following(box) {
    let follow = parseInt(box.id)+1
    follow = follow.toString()
    let result = document.getElementById(follow)
    if (result == null) {
        result = "x"
    }
    return result
}

function followingUp(box) {
    let follow = parseInt(box.id)+9
    follow = follow.toString()
    let result = document.getElementById(follow)
    if (result == null) {
        result = "x"
    }
    return result
}

function boxBeforeUp(box) {
    let follow = parseInt(box.id)-9
    follow = follow.toString()
    let result = document.getElementById(follow)
    if (result == null) {
        result = "x"
    }
    return result
}

function boxBefore(box) {
    let follow = parseInt(box.id)-1
    follow = follow.toString()
    let result = document.getElementById(follow)
    if (result == null) {
        result = "x"
    }
    return result
}

function checkLine(box) {
    let firstbox = box
    let nope = checkRight(box)
    if (nope == 0  && !borderTable.find((element) => element == box.id)) {
        disappear(box)
    }
    for (p=0; p<4; p++) {
        box = boxBefore(box)
        nope = checkRight(box)
        if (nope == 0 && box !== "x" && !borderTable.find((element) => element == box.id)) {
            disappear(box)
        }
    }
    nope = checkUp(firstbox)
    if (nope == 0) {
        disappearUp(firstbox)
    }
    for (q=0; q<4; q++) {
        firstbox = boxBeforeUp(firstbox)
        nope = checkUp(firstbox)
        if (nope == 0 && firstbox !== "x") {
            disappearUp(firstbox)
        }
    }
}

function checkUp(box) {
    let nope = 0
    let nextBox = followingUp(box)
    for (m=0; m<4; m++) {
        if (box.src !== nextBox.src){
            nope++
        }
    nextBox = followingUp(nextBox)
    }
    return nope
}

function checkRight(box) {
    let nope = 0
    let nextBox = following(box)
    for (m=0; m<4; m++) {
        if (box.src !== nextBox.src){
            nope++
        }
    nextBox = following(nextBox)
    }
    return nope
}

function disappearUp(box) {
    let nextID = followingUp(box)
    box.src = "picture/box.gif"
    push = newGrid.push(box.id)
    for (n=0; n<4; n++) {
        push = newGrid.push(nextID.id)
        nextID.src = "picture/box.gif"
        nextID = followingUp(nextID)
    }
}

function disappear(box) {
    let nextID = following(box)
    box.src = "picture/box.gif"
    push = newGrid.push(box.id)
    for (n=0; n<4; n++) {
        push = newGrid.push(nextID.id)
        nextID.src = "picture/box.gif"
        nextID = following(nextID)
    }
}

function reset() {
    resetButton.addEventListener("click", () => {
        gameGrid.innerHTML = emptyGrid
        newGrid = [].concat(Grid)
        addTdClickHandlers();
    })
}

function numberOfBalls(number) {
    number = 81-number
    return numberBalls.value = "number of balls : " + number
}

addTdClickHandlers()
addThreeBallsWithClick()
reset()
let test = [2,3,4]

if(test.find((element) => element == 6)){
    console.log("true")
}

function checkLine1() {
    for (let l=0; l<tabLine.length; l++) {
        let images = tabLine[l].querySelectorAll("img")
        let img = Array.from(images) //convert nodelist in array for slice
        let sources = Array.from(img).map(img => img.src)
        for (let i = 0; i < sources.length - 4; i++) {
            let currentSource = sources[i]
            if (sources.slice(i, i + 5).every(src => src === currentSource) && currentSource !== "http://127.0.0.1:5500/picture/box.gif" ) {
                console.log("yes")
                let elementsToUpdate = img.slice(i, i + 5)
                updateImageSources(elementsToUpdate)
            }
        }
    }
}
function updateImageSources(elementsToUpdate){
    elementsToUpdate.forEach(element => {
        element.src = "picture/box.gif"
        push = newGrid.push(element.id)
        console.log(newGrid)
    })
}


//FIRST VERSION

let startButton = document.getElementById("start")
let resetButton = document.getElementById("reset")
let gameGrid = document.getElementById("gamegrid")
let numberBalls = document.getElementById("numberBalls")
let score = document.getElementById("score")
let numberScore = 0
const emptyGrid = gameGrid.innerHTML
const Grid = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81"]
let newGrid = [].concat(Grid)
let CountGrid = [].concat(Grid)
let firstClick = false
let firstBoxClicked = "0"
let changeColour = "picture/joker.png"
const borderTable = ["6","7","8","9","15","16","17","18","24","25","26","27","33","34","35","36","42","43","44","45","51","52","53","54","60","61","62","63","69","70","71","72"]


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
        if (!newGrid.includes(firstBoxClicked)) {
            newGrid.push(firstBoxClicked)
        }
        let targetBox = target.querySelector("img")
        checkLine(targetBox)
        addThreeBalls()
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
        result.push(getRandomForGrid())
    }
    return result
}

function getRandomColour() {
    // let colours = ["picture/blue.png","picture/darkRed.png","picture/green.png","picture/purple.png","picture/red.png","picture/yellow.png"]
    // return colours[getRandomInt(0,6)]
    let colours = ["picture/blue.png","picture/red.png","picture/green.png"]
    return colours[getRandomInt(0,3)]
}

function addThreeBallsWithClick() {
    startButton.addEventListener("click", () => {
        clearTdClick()
        let threeBalls = getThreeBallsRandom()
        for (let j=0; j<3; j++){
            let box = document.getElementById(threeBalls[j])
            box.src = getRandomColour()
            checkLine(box)
            newGrid = newGrid.filter((id) => id !== box.id)
        } 
    numberOfBalls()    
    })
}

function addThreeBalls() {
    clearTdClick()
    let threeBalls = getThreeBallsRandom()
    for (let j=0; j<3; j++){
        let box = document.getElementById(threeBalls[j])
        box.src = getRandomColour()
        checkLine(box)
        newGrid = newGrid.filter((id) => id !== box.id)
    }
    numberOfBalls()
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
        if (nope == 0 && box !== "x" && firstbox.src !== "picture/box.gif" && !borderTable.find((element) => element == box.id)) {
            disappear(box)
            scoreInput()
            break
        }
    }
    nope = checkUp(firstbox)
    if (nope == 0) {
        disappearUp(firstbox)
    }
    for (q=0; q<4; q++) {
        firstbox = boxBeforeUp(firstbox)
        nope = checkUp(firstbox)
        if (nope == 0 && firstbox !== "x" && firstbox.src !== "picture/box.gif") {
            disappearUp(firstbox)
            scoreInput()
            break
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
    if (!newGrid.includes(box.id)) {
        newGrid.push(box.id)
    }
    for (n=0; n<4; n++) {
        if (!newGrid.includes(nextID.id)) {
            newGrid.push(nextID.id)
        }
        nextID.src = "picture/box.gif"
        nextID = followingUp(nextID)
    }
}

function disappear(box) {
    let nextID = following(box)
    box.src = "picture/box.gif"
    if (!newGrid.includes(box.id)) {
        newGrid.push(box.id)
    }
    for (n=0; n<4; n++) {
        if (!newGrid.includes(nextID.id)) {
            newGrid.push(nextID.id)
        }
        nextID.src = "picture/box.gif"
        nextID = following(nextID)
    }
}

function reset() {
    resetButton.addEventListener("click", () => {
        gameGrid.innerHTML = emptyGrid
        newGrid = [].concat(Grid)
        addTdClickHandlers()
        numberScore = 0
        score.value = "score : " + numberScore
        numberOfBalls()
    })
}

function numberOfBalls() {
    let result = 0
    for (r=0; r<81; r++) {
        if (document.getElementById(CountGrid[r]).src !== "http://127.0.0.1:5500/picture/box.gif") {
            result ++
        }
    }
    return numberBalls.value = "number of balls : " + result
}

function scoreInput() {
    numberScore += 10
    return score.value = "score : " + numberScore
}

addTdClickHandlers()
addThreeBallsWithClick()
reset()
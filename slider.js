let startButton = document.getElementById("start")
let resetButton = document.getElementById("reset")
let gameGrid = document.getElementById("gamegrid")
const emptyGrid = gameGrid.innerHTML
let Grid = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81"]
let newGrid = [].concat(Grid)
let line1 = document.getElementById("line1")
let line2 = document.getElementById("line2")
let line3 = document.getElementById("line3")
let line4 = document.getElementById("line4")
let line5 = document.getElementById("line5")
let line6 = document.getElementById("line6")
let line7 = document.getElementById("line7")
let line8 = document.getElementById("line8")
let line9 = document.getElementById("line9")
let tabLine = [line1,line2,line3,line4,line5,line6,line7,line8,line9]
let firstClick = false
let firstBoxClicked = "0"
let changeColour = "picture/joker.png"

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
    //let colours = ["picture/joker.png","picture/blue.png","picture/darkRed.png","picture/green.png","picture/purple.png","picture/red.png","picture/yellow.png"]
    let colours = ["picture/blue.png","picture/red.png","picture/green.png"]
    return colours[getRandomInt(0,2)]
    //return colours[getRandomInt(0,7)]
}

function addThreeBallsWithClick() {
    startButton.addEventListener("click", () => {
        clearTdClick()
        threeBalls = getThreeBallsRandom()
        for (let j=0; j<3; j++){
            let box = document.getElementById(threeBalls[j])
            console.log(newGrid)
            console.log(box.src)
            box.src = getRandomColour()
            checkLine(box)
        }    
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
    let nope = checkRight(box)
    if (nope == 0) {
        console.log("yep")
        disappear(box)
    }
    let newbox = boxBefore(box)
    nope = checkRight(newbox)
    if (nope == 0 && newbox !== "x") {
        console.log("yip")
        disappear(newbox)
    }
    let newbox2 = boxBefore(newbox)
    nope = checkRight(newbox2)
    if (nope == 0 && newbox2 !== "x") {
        console.log("middle")
        disappear(newbox2)
    }
    let newbox3 = boxBefore(newbox2)
    nope = checkRight(newbox3)
    if (nope == 0 && newbox3 !== "x") {
        console.log("liend")
        disappear(newbox3)
    }
    let newbox4 = boxBefore(newbox3)
    nope = checkRight(newbox4)
    if (nope == 0 && newbox4 !== "x") {
        console.log("end")
        disappear(newbox4)
    }
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

// function checkLine1() {
//     for (let l=0; l<tabLine.length; l++) {
//         let images = tabLine[l].querySelectorAll("img")
//         let img = Array.from(images) //convert nodelist in array for slice
//         let sources = Array.from(img).map(img => img.src)
//         for (let i = 0; i < sources.length - 4; i++) {
//             let currentSource = sources[i]
//             if (sources.slice(i, i + 5).every(src => src === currentSource) && currentSource !== "http://127.0.0.1:5500/picture/box.gif" ) {
//                 console.log("yes")
//                 let elementsToUpdate = img.slice(i, i + 5)
//                 updateImageSources(elementsToUpdate)
//             }
//         }
//     }
// }
// function updateImageSources(elementsToUpdate){
//     elementsToUpdate.forEach(element => {
//         element.src = "picture/box.gif"
//         push = newGrid.push(element.id)
//         console.log(newGrid)
//     })
// }

function reset() {
    resetButton.addEventListener("click", () => {
        gameGrid.innerHTML = emptyGrid
        newGrid = [].concat(Grid)
        addTdClickHandlers();
    })
}

addTdClickHandlers()
addThreeBallsWithClick()
reset()
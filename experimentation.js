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
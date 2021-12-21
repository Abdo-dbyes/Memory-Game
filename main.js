
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children)

let timerMin = document.querySelector('.timer .min')
let timerSec = document.querySelector('.timer .sec')

let orderRange = Array.from(Array(blocks.length).keys())

document.querySelector(".control-buttons span").onclick = function(){
    let yourName = prompt("أدخل أسمك هنا؟")
    if(yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "Unknown"
    }else {
        document.querySelector(".name span").innerHTML = yourName
    }
    document.querySelector(".control-buttons").remove()
    for(let i = 0;i < blocks.length;i++ ){
        blocks[i].classList.add("is-flipped")
    }
    setTimeout(function(){
        for(let i = 0;i < blocks.length;i++ ){
            blocks[i].classList.remove("is-flipped")
        }
    },3000)
    let ti = setInterval(function(){
        let timeMin = parseInt(timerMin.innerHTML)
        let timeSec = parseInt(timerSec.innerHTML)
        timerSec.innerHTML -= 1
        if (timeMin > 0 && timeSec == 0){
            timerMin.innerHTML -= 1
            timerSec.innerHTML = 59
        }
        if(timeSec== 0 && timeMin == 0 ){
            timerMin.textContent = `00`
            timerSec.textContent = `00`
            document.querySelector(".lose").classList.remove("loser-off")
            document.querySelector(".lose").classList.add("loser-on")
            clearInterval(ti)
        }
        for(let i = 0;i < blocks.length;i++ ){
            let hasMatch= blocks.filter(hasMatch => hasMatch.classList.contains("has-match"))
            if (hasMatch.length == 20 ){
                document.querySelector(".win").classList.remove("winner-off")
                document.querySelector(".win").classList.add("winner-on")
                return clearInterval(ti)
            }
        }

    },1000)

}


document.querySelector('.lose button').onclick = function(){
    
    restart()
    document.querySelector(".lose").classList.add("loser-off")
    
    function restart(){
        shuffle(orderRange)
        blocks.forEach((block, index) => {
            block.style.order = orderRange[index]
        
            block.addEventListener("click", function () {
                flipBlock(block);
            })
        })
        for(let i = 0;i < blocks.length;i++ ){
            blocks[i].classList.add("is-flipped")
        }
        setTimeout(function(){
            for(let i = 0;i < blocks.length;i++ ){
                blocks[i].classList.remove("is-flipped")
                blocks[i].classList.remove('has-match')
            }
        },4000)
        timerMin.innerHTML = "01"
        timerSec.innerHTML = "30"
        setInterval(function(){
            let timeMin = parseInt(timerMin.innerHTML)
            let timeSec = parseInt(timerSec.innerHTML)
            timerSec.innerHTML -= 1
            if (timeMin > 0 && timeSec == 0){
                timerMin.innerHTML -= 1
                timerSec.innerHTML = 59
            }
            if(timeSec== 0 && timeMin == 0 ){
                timerMin.textContent = `00`
                timerSec.textContent = `00`
                document.querySelector(".lose").classList.remove("loser-off")
                document.querySelector(".lose").classList.add("loser-on")
            }
            
            
        },1000)
        
    }
}
shuffle(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index]

    block.addEventListener("click", function () {
        flipBlock(block);
    })
})

function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flipped")
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"))
    if (allFlippedBlocks.length == 2){
        stopClicking()
        checkMatchedBlock(allFlippedBlocks[0],allFlippedBlocks[1])
    }
    
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking")

    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    },duration)
}

function checkMatchedBlock(firstBlock, secondBlock){
    let triesElement = document.querySelector('.tries span')

    if (firstBlock.dataset.fruits === secondBlock.dataset.fruits) {
        
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')

        firstBlock.classList.add('has-match')
        secondBlock.classList.add('has-match')
    }else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, duration);
    }
}

function shuffle(array) {
    let current = array.length;
        
    while(current > 0) {
        let temp;
        let random;
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current]
        
        array[current] = array[random]
        
        array[random ] = temp

        
    }
    return array
}




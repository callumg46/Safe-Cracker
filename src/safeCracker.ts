//Canvas

let backgroundCanvas = document.getElementById('background') as HTMLCanvasElement;
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;
let c = backgroundCanvas.getContext("2d")!;

let textCanvas = document.getElementById("topText") as HTMLCanvasElement;
textCanvas.width = window.innerWidth;
textCanvas.height = window.innerHeight
let tc = textCanvas.getContext('2d')!;

let animateCanvas = document.getElementById('animate') as HTMLCanvasElement;
animateCanvas.width = window.innerWidth;
animateCanvas.height = window.innerHeight;
let ac = animateCanvas.getContext('2d')!;

let rotateCanvas = document.getElementById('rotate') as HTMLCanvasElement;
rotateCanvas.width = window.innerWidth;
rotateCanvas.height = window.innerHeight;
let rc = rotateCanvas.getContext('2d')!;

let rewardCanvas = document.getElementById("rewards") as HTMLCanvasElement;
rewardCanvas.width = window.innerWidth;
rewardCanvas.height = window.innerHeight;
let rec = rewardCanvas.getContext('2d')!;

let multiplyerCanvas = document.getElementById("multipliers") as HTMLCanvasElement;
multiplyerCanvas.width = window.innerWidth;
multiplyerCanvas.height = window.innerHeight;
let mc = multiplyerCanvas.getContext('2d')!;

let rewardFlashCanvas1 = document.getElementById("rewardFlash1") as HTMLCanvasElement;
rewardFlashCanvas1.width = window.innerWidth;
rewardFlashCanvas1.height = window.innerHeight;
let fc1 = rewardFlashCanvas1.getContext('2d')!;

let rewardFlashCanvas2 = document.getElementById("rewardFlash2") as HTMLCanvasElement;
rewardFlashCanvas2.width = window.innerWidth;
rewardFlashCanvas2.height = window.innerHeight;
let fc2 = rewardFlashCanvas1.getContext('2d')!;

let rotateCanvas2 = document.getElementById("rotate2") as HTMLCanvasElement;
rotateCanvas2.width = window.innerWidth;
rotateCanvas2.height = window.innerHeight;
let rc2 = rotateCanvas2.getContext('2d')!;

//Images

const backgroundImage = new Image();
const doorClosedImage = new Image();
const mainDialImage = new Image();
const dialDisplayImage = new Image();
const greenDialDisplayImage = new Image();
const LEDImage = new Image();
const dialSpinImage = new Image();
const spinText = new Image();
const openDoorImage = new Image();
const rewardsImages = new Image();
const coinImage = new Image();
const diamondImage = new Image();
const goldImage = new Image();
const notesImage = new Image();
const ringImage = new Image();

//load Images

loadImages(doorClosedImage);
loadImages(mainDialImage);
loadImages(dialDisplayImage);
loadImages(greenDialDisplayImage);
loadImages(LEDImage);
loadImages(dialSpinImage);
loadImages(spinText);
loadImages(openDoorImage);
loadImages(coinImage);
loadImages(diamondImage);
loadImages(goldImage);
loadImages(notesImage);
loadImages(ringImage);

//move rotate canvas x2

rc.save();
rc.translate(((window.innerWidth / 2) - (backgroundImage.width / 2)) + 123, 485);

rc2.save();
rc2.translate(((window.innerWidth / 2) - (backgroundImage.width / 2)) + 123, 485);

let betValue = 100;
let clickCounter = 0;
let haveClicked = false;
let doneNo:number[] = [];
let earnedRewards:rewards[] = [];
let rewardobjects: rewards[] = [];
let winningRewards:rewards[] = []
let chosenRewards: rewards[] =[]

backgroundImage.onload = function() {
    drawBackground();
}
rotateCanvas.addEventListener('mousemove', findMouse, true)

//rewards class

class rewards {
         rewardimage: HTMLImageElement = new Image();
         multiplyer: number = 0;
         multiplyerConvert: string = "";
         multiplyerTxt: string = "";
         xPos:number = 0;
         yPos:number = 0;
         xIncrementDoor:number = 0;
         yIncrementDoor:number = 0;
         xIncrementReward:number = 0;
         yIncrementReward:number = 0;
         xIncrementTxt:number = 0;
         yIncrementTxt:number = 0;

         constructor (rewardimage : HTMLImageElement, multiplyer:number) {

            this.rewardimage = rewardimage;
            this.multiplyer = multiplyer;
            this.xPos = (window.innerWidth / 2) - (backgroundImage.width / 2)
            this.yPos = 235
  
            this.multiplyerConvert = this.multiplyer.toString();
            this.multiplyerTxt = this.multiplyerTxt.concat("x", this.multiplyerConvert);

           mc.font = '50px Titan One Regular';
           mc.strokeStyle = 'black';
           mc.fillStyle = 'white';
           mc.lineWidth = 3;

           rewardimage.onload = function(){
               console.log('image loaded');
           }
           openDoorImage.onload = function(){
               console.log('image loaded');        
           }
         }

         draw(){   // draw rewards
            
            c.drawImage(openDoorImage, this.xPos + this.xIncrementDoor, this.yPos + this.yIncrementDoor);
            singleFrame(this.rewardimage, 2, this.xIncrementReward, this.yPos + this.yIncrementReward);
             
            mc.fillText(this.multiplyerTxt, this.xPos + this.xIncrementTxt, this.yPos + this.yIncrementTxt)
            mc.strokeText(this.multiplyerTxt, this.xPos + this.xIncrementTxt, this.yPos + this.yIncrementTxt)

         }
}

// load all images

function loadImages (image:HTMLImageElement) {
    image.onload = function(){
        console.log('image loaded');
    }
};

//checks mouse position is over dial

function findMouse(event:MouseEvent){
    let cRect = rotateCanvas.getBoundingClientRect();
    let mouseX = event.clientX - cRect.top;
    let   mouseY = event.clientY - cRect.top;
   
    if (mouseX > window.innerWidth / 2 - backgroundImage.width / 2 + 680 && mouseX < window.innerWidth / 2 - backgroundImage.width / 2 + 780 && mouseY > 570 && mouseY < 670){
        rotateCanvas.addEventListener("click", clicked)
        haveClicked = true;
    }
}

//rotates the dial once user clicks

function clicked(){

    clickCounter += 1;
    let currentFrame = 0;
    
    let rotateList:number[] = [40, 80, 120, 160, 200, 240, 280, 320, 360];
    let rotateListNo = Math.floor(Math.random() * 9);

    for (let i = 0; i < doneNo.length; i++) {
        while (rotateListNo == doneNo[i]) {
        rotateListNo = Math.floor(Math.random() * 9);
        }
    }

    doneNo.push(rotateListNo);
    let rotateAmount:number = rotateList[rotateListNo];
    rotateDial(currentFrame, rotateAmount, rotateListNo, clickCounter);
    tc.font = '150px Titan One Regular';
    tc.fillStyle = 'black';
    tc.fillText('Spinning!', (window.innerWidth / 2) - (backgroundImage.width / 2)+ 100, 150)       
}

// draws all background images

function drawBackground(){
    c.drawImage(backgroundImage,(window.innerWidth / 2) - (backgroundImage.width / 2), 10, 900, 800);
    flashImage(LEDImage, 3, 580, 440, true, 150, ac, 20);
    let safeXPos = (window.innerWidth / 2) - (backgroundImage.width / 2) + 50;
    let safeYPos = 260;
    c.font = '50px Titan One Regular';
    c.fillStyle = 'white';
    let safeTxtNo = 1;

    for (let i = 0; i < 3; i++) {

        for (let k = 0; k < 3; k++) {
            c.drawImage(doorClosedImage,safeXPos, safeYPos);
            let safeTxt = safeTxtNo.toString();
            c.fillText(safeTxt, safeXPos + (doorClosedImage.width / 2) - 10, safeYPos + (doorClosedImage.height / 2) +20 )
            safeTxtNo++
            safeXPos += 170;  
            }

        safeXPos = (window.innerWidth / 2) - (backgroundImage.width / 2) + 50;
        safeYPos += 170
    }

    c.drawImage(mainDialImage, (window.innerWidth / 2) - (backgroundImage.width / 2) + 570, 450 );
    c.drawImage(dialDisplayImage,  (window.innerWidth / 2) - (backgroundImage.width / 2) + 585, 270)

    let numCol = 3;
    let NumRow = 1;

    let frameWidth = dialSpinImage.width / numCol;
    let frameHeight = dialSpinImage.height / NumRow;

    let currentFrame = 0;

    let maxFrame = numCol * NumRow - 1;
        if (currentFrame > maxFrame) {
            currentFrame = 0;
        }

    let column = currentFrame % numCol;
    let row = Math.floor(currentFrame / numCol);
    c.drawImage(dialSpinImage, column * frameWidth, row *frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + 580, 485, frameWidth, frameHeight );
    blinkImage(spinText, window.innerWidth /2 - window.innerHeight / 2 + 700, 590, fc1);
}

//displays a single frame of given sprite sheet

function singleFrame(Image:HTMLImageElement, numCol:number, xWidth:number, yHeight:number){

    let NumRow = 1;
    let frameWidth = Image.width / numCol;
    let frameHeight = Image.height / NumRow;
    let currentFrame = 0;

    let maxFrame = numCol * NumRow - 1;
        if (currentFrame > maxFrame) {
            currentFrame = 0;
        }

    let column = currentFrame % numCol;
    let row = Math.floor(currentFrame / numCol);
    rec.drawImage(Image, column * frameWidth, row *frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + xWidth, yHeight, frameWidth, frameHeight )
}

//loops through a sprite sheet

function flashImage(flashingImage:HTMLImageElement, numCol:number, xWidth:number, yHeight:number, repeat:boolean, xIncrement:number, canvas: CanvasRenderingContext2D, fps:number) {

    let NumRow = 1;
    let frameWidth = flashingImage.width / numCol;
    let frameHeight = flashingImage.height / NumRow;
    let currentFrame = 0;

    function flash() {
        setTimeout(function(){
            currentFrame ++

            let maxFrame = numCol * NumRow - 1;
            if (currentFrame > maxFrame) {
                currentFrame = 0;
            }
    
            let column = currentFrame % numCol;
            let row = Math.floor(currentFrame / numCol);
    
            canvas.clearRect(0,0, window.innerWidth, window.innerHeight);
            canvas.drawImage(flashingImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + xWidth, yHeight, frameWidth, frameHeight);
            if (repeat === true ) { 
                    canvas.drawImage(flashingImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + xWidth + xIncrement, yHeight, frameWidth, frameHeight);
                  
            }
            requestAnimationFrame(flash);

        }, 1000/fps)
    }
    requestAnimationFrame(flash);
}

//flashes given text

function flashTxt (text:string, posX:number, posY:number, canvas:CanvasRenderingContext2D) {

    let count = 100;
    let timer = setInterval(function(){
        count--;
        if (count % 2 == 1) {
            canvas.fillText(text, posX, posY )
        }
        else {
            canvas.clearRect(0, 0, window.innerWidth, window.innerHeight)
        }
        if (count === 0) {
            clearInterval (timer);
        }
    }, 500)
}

//flashes/blinks given image

function blinkImage(image: HTMLImageElement, posX:number, posY:number, canvas:CanvasRenderingContext2D){
    let count = 100;
    let timer = setInterval(function(){
        count--;
        if (count % 2 == 1) {
            canvas.drawImage(image, posX, posY)
        }
        else {
            canvas.clearRect(0, 0, window.innerWidth, window.innerHeight)
        }
        if (count === 0) {
            clearInterval (timer);
        }
    }, 500)
}

//rotates given image, takes one frame from sprite sheet first

function spinImage(image:HTMLImageElement, numCol:number, canvas:CanvasRenderingContext2D, rotateAmount:number, angleIncrement:number, runFunc:boolean) {
 
    let NumRow = 1;
    let angle = 0;
    let counter = 0;

    let frameWidth = image.width / numCol;
    let frameHeight = image.height / NumRow;
    let maxFrame = numCol * NumRow - 1;
    let currentFrame = 0
    if (currentFrame > maxFrame) {
        currentFrame = 0;
    }
    let column = currentFrame % numCol;
    let row = Math.floor(currentFrame / numCol);

    let reqAnim = requestAnimationFrame(spinning);

    function spinning () {

        canvas.clearRect(0,0,frameWidth, frameHeight)
        canvas.save();
        
        canvas.translate(frameWidth/2, frameHeight/2);       //translates canvas for rotation (rc is canvas context)
        angle -=angleIncrement; 
        canvas.rotate(radCalc(angle));      //actual rotation (function is angle * PI/180)
        counter ++
        
        canvas.translate(-frameWidth / 2, -frameHeight / 2)   //restore canvas
        canvas.drawImage(image, column * frameWidth, row *frameHeight, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight )   //draw image
        canvas.restore();

        if (counter < rotateAmount) {
            reqAnim = requestAnimationFrame(spinning)
        }
        else {
            cancelAnimationFrame(reqAnim)
            if (runFunc === true) {
                safeOpen(rotateAmount);
            }
        } 
    }
}

//called when user clicks, calls spins image

function rotateDial (currentFrame:number, rotateAmount:number, rotateListNo:number, clickCounter:number) {

    spinImage(dialSpinImage, 3, rc, rotateAmount, 1, true);
    tc.clearRect(0, 0, window.innerWidth, window.innerHeight);

}

// displays number dial landed on

function dialDisplay(rotateAmount:number){
         
    let displayTxt = ((rotateAmount / 40) + 2).toString();
    if (displayTxt === '10') {
        displayTxt = "1";
    }
    else if (displayTxt === '11') {
        displayTxt = "2";
    }

    c.fillStyle = 'white';

    if (clickCounter === 1) {

        c.fillText(displayTxt,  (window.innerWidth / 2) - (backgroundImage.width / 2) + 600, 320)
    }
    else if (clickCounter === 2) {

        c.fillText(displayTxt,  (window.innerWidth / 2) - (backgroundImage.width / 2) + 650, 320)

    }
    else if (clickCounter === 3) {

        c.fillText(displayTxt,  (window.innerWidth / 2) - (backgroundImage.width / 2) + 700, 320)

    }
    else if (clickCounter === 4) {

        c.fillText(displayTxt,  (window.innerWidth / 2) - (backgroundImage.width / 2) + 750, 320)

    }
    return displayTxt;
}

// checks if user got a match

function winCheck(currentReward:rewards){
    for (let i = 0; i < earnedRewards.length; i++) {
        if (currentReward.multiplyer == earnedRewards[i].multiplyer) {
            winningRewards.push(currentReward);
            winningRewards.push(earnedRewards[i]);
            win()
        }
    } 
}

//opens safes and displays rewards

function safeOpen(rotateAmount:number){

    let displayTxt:string = dialDisplay(rotateAmount);
    rewardobjects = [new rewards(coinImage, 15), new rewards(diamondImage, 16), new rewards(goldImage, 17), new rewards(notesImage, 18), new rewards(ringImage, 19)] //full list of objects

    if (clickCounter < 2) {

        let randomRewards = Math.floor(Math.random() * 4)
        for (let i = 0; i < 3; i++) {
            for (let i = 0; i < chosenRewards.length; i++) {
                while (rewardobjects[randomRewards] == chosenRewards[i]) {
                randomRewards = Math.floor(Math.random() * 4);
                }
            }
            chosenRewards.push(rewardobjects[randomRewards]);     //on first loop through, take 3 different, randomly selected objects from large list, into smaller list
        }
    }
    
    let rewardChoice = Math.floor(Math.random() * 3)  //each loop through (every time the user clicks), take a random object from small list.

    if (displayTxt === "1") {    //assign variables of the object depending on which position they end up. 

        chosenRewards[rewardChoice].xIncrementDoor = 15;
        chosenRewards[rewardChoice].yIncrementDoor = 0;
        chosenRewards[rewardChoice].xIncrementReward = 30;
        chosenRewards[rewardChoice].yIncrementReward = 5;
        chosenRewards[rewardChoice].xIncrementTxt = 110;
        chosenRewards[rewardChoice].yIncrementTxt = 100;
        chosenRewards[rewardChoice].draw();

    }
    else if(displayTxt === "2") {

        chosenRewards[rewardChoice].xIncrementDoor = 200;
        chosenRewards[rewardChoice].yIncrementDoor = 0;
        chosenRewards[rewardChoice].xIncrementReward = 210;
        chosenRewards[rewardChoice].yIncrementReward = 5;
        chosenRewards[rewardChoice].xIncrementTxt = 280;
        chosenRewards[rewardChoice].yIncrementTxt = 100;
        chosenRewards[rewardChoice].draw();
    }

    else if (displayTxt == "3") {

        chosenRewards[rewardChoice].xIncrementDoor = 350;
        chosenRewards[rewardChoice].yIncrementDoor = 0;
        chosenRewards[rewardChoice].xIncrementReward = 360;
        chosenRewards[rewardChoice].yIncrementReward = 5;
        chosenRewards[rewardChoice].xIncrementTxt = 430;
        chosenRewards[rewardChoice].yIncrementTxt = 100;
        chosenRewards[rewardChoice].draw();
    }

    else if(displayTxt === "4") {

        chosenRewards[rewardChoice].xIncrementDoor = 20;
        chosenRewards[rewardChoice].yIncrementDoor = 170;
        chosenRewards[rewardChoice].xIncrementReward = 30;
        chosenRewards[rewardChoice].yIncrementReward = 175;
        chosenRewards[rewardChoice].xIncrementTxt = 100;
        chosenRewards[rewardChoice].yIncrementTxt = 270;
        chosenRewards[rewardChoice].draw();
    }

    else if (displayTxt == "5") {

        chosenRewards[rewardChoice].xIncrementDoor = 190;
        chosenRewards[rewardChoice].yIncrementDoor = 170;
        chosenRewards[rewardChoice].xIncrementReward = 200;
        chosenRewards[rewardChoice].yIncrementReward = 175;
        chosenRewards[rewardChoice].xIncrementTxt = 280;
        chosenRewards[rewardChoice].yIncrementTxt = 270;
        chosenRewards[rewardChoice].draw();
    }

    else if(displayTxt === "6") {

        chosenRewards[rewardChoice].xIncrementDoor = 350;
        chosenRewards[rewardChoice].yIncrementDoor = 170;
        chosenRewards[rewardChoice].xIncrementReward = 360;
        chosenRewards[rewardChoice].yIncrementReward = 175;
        chosenRewards[rewardChoice].xIncrementTxt = 430;
        chosenRewards[rewardChoice].yIncrementTxt = 270;
        chosenRewards[rewardChoice].draw();
    }

    else if (displayTxt == "7") {

        chosenRewards[rewardChoice].xIncrementDoor = 20;
        chosenRewards[rewardChoice].yIncrementDoor = 340;
        chosenRewards[rewardChoice].xIncrementReward = 30;
        chosenRewards[rewardChoice].yIncrementReward = 345;
        chosenRewards[rewardChoice].xIncrementTxt = 100;
        chosenRewards[rewardChoice].yIncrementTxt = 440;
        chosenRewards[rewardChoice].draw();
    }

    else if(displayTxt === "8") {

        chosenRewards[rewardChoice].xIncrementDoor = 200;
        chosenRewards[rewardChoice].yIncrementDoor = 340;
        chosenRewards[rewardChoice].xIncrementReward = 210;
        chosenRewards[rewardChoice].yIncrementReward = 345;
        chosenRewards[rewardChoice].xIncrementTxt = 280;
        chosenRewards[rewardChoice].yIncrementTxt = 440;
        chosenRewards[rewardChoice].draw();
    }

    else if (displayTxt == "9") {

        chosenRewards[rewardChoice].xIncrementDoor = 350;
        chosenRewards[rewardChoice].yIncrementDoor = 340;
        chosenRewards[rewardChoice].xIncrementReward = 360;
        chosenRewards[rewardChoice].yIncrementReward = 345;
        chosenRewards[rewardChoice].xIncrementTxt = 430;
        chosenRewards[rewardChoice].yIncrementTxt = 440;
        chosenRewards[rewardChoice].draw();
    }
    
    if (clickCounter > 1) { //on second loop through, start checking if the objects match with winCheck function.
        winCheck(chosenRewards[rewardChoice]);
        earnedRewards.push(chosenRewards[rewardChoice]);  //if true, win check calls win() and ends game, if not, current random object i added to a list of random objects that have already been used.
    }
    else {
        earnedRewards.push(chosenRewards[rewardChoice]); // on first loop through, add current random object to list of objects that have been used.
    }
    
}

// performs multiple animations upon win

function win(){

    tc.clearRect(0, 0, window.innerWidth, window.innerHeight);
    tc.fillText("WINNER!!", (window.innerWidth / 2) - (backgroundImage.width / 2)+ 100, 150);
    c.drawImage(greenDialDisplayImage,  (window.innerWidth / 2) - (backgroundImage.width / 2) + 585, 270)
    c.fillText("WIN",  (window.innerWidth / 2) - (backgroundImage.width / 2) + 660, 320)
    let winningAmount = (betValue * winningRewards[0].multiplyer).toString();
    let youWonTxt = "YOU WON £";
    let winningString = youWonTxt.concat(winningAmount);
    setTimeout(function(){
        tc.font = '90px Titan One Regular'
        tc.clearRect(0, 0, window.innerWidth, window.innerHeight)
        flashTxt(winningString, (window.innerWidth / 2) - (backgroundImage.width / 2) + 100, 150, tc);
        rc.clearRect(0, 0, window.innerWidth, window.innerHeight)
        spinImage(dialSpinImage, 3, rc2, 360, 8, false);
        flashImage(dialSpinImage, 3, 580, 485, false, 0, fc1, 5)
    },2000)
    
}

// converts degrees to radians

function radCalc(a:number) {
    return a * (Math.PI/180);
}

//image sources

backgroundImage.src = 'img/background_safe_minigame.png';    
doorClosedImage.src = 'img/safe_minigame.png';
mainDialImage.src = 'img/support_safe_dial_minigame.png';
dialDisplayImage.src = 'img/screen_safe_background.png';
greenDialDisplayImage.src = 'img/screen_safe_win.png';
LEDImage.src = 'img/leds_safe_dial_minigame.png';
dialSpinImage.src = 'img/safe_dial_minigame.png';
spinText.src = 'img/text_spin_safe_dial_minigame.png';
openDoorImage.src = 'img/safe_open_minigame.png';
coinImage.src = 'img/coins.png';
diamondImage.src = 'img/diamond.png';
goldImage.src = 'img/gold.png'
notesImage.src = 'img/notes.png';
ringImage.src = 'img/ring.png';


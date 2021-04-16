"use strict";
var backgroundCanvas = document.getElementById('background');
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;
var c = backgroundCanvas.getContext("2d");
var textCanvas = document.getElementById("topText");
textCanvas.width = window.innerWidth;
textCanvas.height = window.innerHeight;
var tc = textCanvas.getContext('2d');
var animateCanvas = document.getElementById('animate');
animateCanvas.width = window.innerWidth;
animateCanvas.height = window.innerHeight;
var ac = animateCanvas.getContext('2d');
var rotateCanvas = document.getElementById('rotate');
rotateCanvas.width = window.innerWidth;
rotateCanvas.height = window.innerHeight;
var rc = rotateCanvas.getContext('2d');
var rewardCanvas = document.getElementById("rewards");
rewardCanvas.width = window.innerWidth;
rewardCanvas.height = window.innerHeight;
var rec = rewardCanvas.getContext('2d');
var multiplyerCanvas = document.getElementById("multipliers");
multiplyerCanvas.width = window.innerWidth;
multiplyerCanvas.height = window.innerHeight;
var mc = multiplyerCanvas.getContext('2d');
var rewardFlashCanvas1 = document.getElementById("rewardFlash1");
rewardFlashCanvas1.width = window.innerWidth;
rewardFlashCanvas1.height = window.innerHeight;
var fc1 = rewardFlashCanvas1.getContext('2d');
var rewardFlashCanvas2 = document.getElementById("rewardFlash2");
rewardFlashCanvas2.width = window.innerWidth;
rewardFlashCanvas2.height = window.innerHeight;
var fc2 = rewardFlashCanvas1.getContext('2d');
var rotateCanvas2 = document.getElementById("rotate2");
rotateCanvas2.width = window.innerWidth;
rotateCanvas2.height = window.innerHeight;
var rc2 = rotateCanvas2.getContext('2d');
var backgroundImage = new Image();
var doorClosedImage = new Image();
var mainDialImage = new Image();
var dialDisplayImage = new Image();
var greenDialDisplayImage = new Image();
var LEDImage = new Image();
var dialSpinImage = new Image();
var spinText = new Image();
var openDoorImage = new Image();
var rewardsImages = new Image();
var coinImage = new Image();
var diamondImage = new Image();
var goldImage = new Image();
var notesImage = new Image();
var ringImage = new Image();
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
rc.save();
rc.translate(((window.innerWidth / 2) - (backgroundImage.width / 2)) + 123, 485);
rc2.save();
rc2.translate(((window.innerWidth / 2) - (backgroundImage.width / 2)) + 123, 485);
var betValue = 100;
var clickCounter = 0;
var haveClicked = false;
var doneNo = [];
var earnedRewards = [];
var rewardobjects = [];
var winningRewards = [];
var chosenRewards = [];
backgroundImage.onload = function () {
    drawBackground();
};
rotateCanvas.addEventListener('mousemove', findMouse, true);
var rewards = /** @class */ (function () {
    function rewards(rewardimage, multiplyer) {
        this.rewardimage = new Image();
        this.multiplyer = 0;
        this.multiplyerConvert = "";
        this.multiplyerTxt = "";
        this.xPos = 0;
        this.yPos = 0;
        this.xIncrementDoor = 0;
        this.yIncrementDoor = 0;
        this.xIncrementReward = 0;
        this.yIncrementReward = 0;
        this.xIncrementTxt = 0;
        this.yIncrementTxt = 0;
        this.rewardimage = rewardimage;
        this.multiplyer = multiplyer;
        this.xPos = (window.innerWidth / 2) - (backgroundImage.width / 2);
        this.yPos = 235;
        this.multiplyerConvert = this.multiplyer.toString();
        this.multiplyerTxt = this.multiplyerTxt.concat("x", this.multiplyerConvert);
        mc.font = '50px Titan One Regular';
        mc.strokeStyle = 'black';
        mc.fillStyle = 'white';
        mc.lineWidth = 3;
        rewardimage.onload = function () {
            console.log('image loaded');
        };
        openDoorImage.onload = function () {
            console.log('image loaded'); //ADD THIS AS A FUNCTION FOR ALL IMAGES
        };
    }
    rewards.prototype.draw = function () {
        c.drawImage(openDoorImage, this.xPos + this.xIncrementDoor, this.yPos + this.yIncrementDoor);
        singleFrame(this.rewardimage, 2, this.xIncrementReward, this.yPos + this.yIncrementReward);
        mc.fillText(this.multiplyerTxt, this.xPos + this.xIncrementTxt, this.yPos + this.yIncrementTxt);
        mc.strokeText(this.multiplyerTxt, this.xPos + this.xIncrementTxt, this.yPos + this.yIncrementTxt);
    };
    return rewards;
}());
function loadImages(image) {
    image.onload = function () {
        console.log('image loaded');
    };
}
;
function findMouse(event) {
    var cRect = rotateCanvas.getBoundingClientRect();
    var mouseX = event.clientX - cRect.top;
    var mouseY = event.clientY - cRect.top;
    if (mouseX > window.innerWidth / 2 - backgroundImage.width / 2 + 680 && mouseX < window.innerWidth / 2 - backgroundImage.width / 2 + 780 && mouseY > 570 && mouseY < 670) {
        rotateCanvas.addEventListener("click", clicked);
        haveClicked = true;
    }
}
function clicked() {
    clickCounter += 1;
    var currentFrame = 0;
    var rotateList = [40, 80, 120, 160, 200, 240, 280, 320, 360];
    var rotateListNo = Math.floor(Math.random() * 9);
    for (var i = 0; i < doneNo.length; i++) {
        while (rotateListNo == doneNo[i]) {
            rotateListNo = Math.floor(Math.random() * 9);
        }
    }
    doneNo.push(rotateListNo);
    var rotateAmount = rotateList[rotateListNo];
    rotateDial(currentFrame, rotateAmount, rotateListNo, clickCounter);
    tc.font = '150px Titan One Regular';
    tc.fillStyle = 'black';
    tc.fillText('Spinning!', (window.innerWidth / 2) - (backgroundImage.width / 2) + 100, 150);
}
function drawBackground() {
    c.drawImage(backgroundImage, (window.innerWidth / 2) - (backgroundImage.width / 2), 10, 900, 800);
    flashImage(LEDImage, 3, 580, 440, true, 150, ac, 20);
    var safeXPos = (window.innerWidth / 2) - (backgroundImage.width / 2) + 50;
    var safeYPos = 260;
    c.font = '50px Titan One Regular';
    c.fillStyle = 'white';
    var safeTxtNo = 1;
    for (var i = 0; i < 3; i++) {
        for (var k = 0; k < 3; k++) {
            c.drawImage(doorClosedImage, safeXPos, safeYPos);
            var safeTxt = safeTxtNo.toString();
            c.fillText(safeTxt, safeXPos + (doorClosedImage.width / 2) - 10, safeYPos + (doorClosedImage.height / 2) + 20);
            safeTxtNo++;
            safeXPos += 170;
        }
        safeXPos = (window.innerWidth / 2) - (backgroundImage.width / 2) + 50;
        safeYPos += 170;
    }
    c.drawImage(mainDialImage, (window.innerWidth / 2) - (backgroundImage.width / 2) + 570, 450);
    c.drawImage(dialDisplayImage, (window.innerWidth / 2) - (backgroundImage.width / 2) + 585, 270);
    var numCol = 3;
    var NumRow = 1;
    var frameWidth = dialSpinImage.width / numCol;
    var frameHeight = dialSpinImage.height / NumRow;
    var currentFrame = 0;
    var maxFrame = numCol * NumRow - 1;
    if (currentFrame > maxFrame) {
        currentFrame = 0;
    }
    var column = currentFrame % numCol;
    var row = Math.floor(currentFrame / numCol);
    c.drawImage(dialSpinImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + 580, 485, frameWidth, frameHeight);
    blinkImage(spinText, window.innerWidth / 2 - window.innerHeight / 2 + 700, 590, fc1);
}
function singleFrame(Image, numCol, xWidth, yHeight) {
    var NumRow = 1;
    var frameWidth = Image.width / numCol;
    var frameHeight = Image.height / NumRow;
    var currentFrame = 0;
    var maxFrame = numCol * NumRow - 1;
    if (currentFrame > maxFrame) {
        currentFrame = 0;
    }
    var column = currentFrame % numCol;
    var row = Math.floor(currentFrame / numCol);
    rec.drawImage(Image, column * frameWidth, row * frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + xWidth, yHeight, frameWidth, frameHeight);
}
function flashImage(flashingImage, numCol, xWidth, yHeight, repeat, xIncrement, canvas, fps) {
    var NumRow = 1;
    var frameWidth = flashingImage.width / numCol;
    var frameHeight = flashingImage.height / NumRow;
    var currentFrame = 0;
    function flash() {
        setTimeout(function () {
            currentFrame++;
            var maxFrame = numCol * NumRow - 1;
            if (currentFrame > maxFrame) {
                currentFrame = 0;
            }
            var column = currentFrame % numCol;
            var row = Math.floor(currentFrame / numCol);
            canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
            canvas.drawImage(flashingImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + xWidth, yHeight, frameWidth, frameHeight);
            if (repeat === true) {
                canvas.drawImage(flashingImage, column * frameWidth, row * frameHeight, frameWidth, frameHeight, (window.innerWidth / 2) - (backgroundImage.width / 2) + xWidth + xIncrement, yHeight, frameWidth, frameHeight);
            }
            requestAnimationFrame(flash);
        }, 1000 / fps);
    }
    requestAnimationFrame(flash);
}
function flashTxt(text, posX, posY, canvas) {
    var count = 100;
    var timer = setInterval(function () {
        count--;
        if (count % 2 == 1) {
            canvas.fillText(text, posX, posY);
        }
        else {
            canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        if (count === 0) {
            clearInterval(timer);
        }
    }, 500);
}
function blinkImage(image, posX, posY, canvas) {
    var count = 100;
    var timer = setInterval(function () {
        count--;
        if (count % 2 == 1) {
            canvas.drawImage(image, posX, posY);
        }
        else {
            canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        if (count === 0) {
            clearInterval(timer);
        }
    }, 500);
}
function spinImage(image, numCol, canvas, rotateAmount, angleIncrement, runFunc) {
    var NumRow = 1;
    var angle = 0;
    var counter = 0;
    var frameWidth = image.width / numCol;
    var frameHeight = image.height / NumRow;
    var maxFrame = numCol * NumRow - 1;
    var currentFrame = 0;
    if (currentFrame > maxFrame) {
        currentFrame = 0;
    }
    var column = currentFrame % numCol;
    var row = Math.floor(currentFrame / numCol);
    var reqAnim = requestAnimationFrame(spinning);
    function spinning() {
        canvas.clearRect(0, 0, frameWidth, frameHeight);
        canvas.save();
        canvas.translate(frameWidth / 2, frameHeight / 2); //translates canvas for rotation (rc is canvas context)
        angle -= angleIncrement;
        canvas.rotate(radCalc(angle)); //actual rotation (function is angle * PI/180)
        counter++;
        canvas.translate(-frameWidth / 2, -frameHeight / 2); //restore canvas
        canvas.drawImage(image, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight); //draw image
        canvas.restore();
        if (counter < rotateAmount) {
            reqAnim = requestAnimationFrame(spinning);
        }
        else {
            cancelAnimationFrame(reqAnim);
            if (runFunc === true) {
                safeOpen(rotateAmount);
            }
        }
    }
}
function rotateDial(currentFrame, rotateAmount, rotateListNo, clickCounter) {
    spinImage(dialSpinImage, 3, rc, rotateAmount, 1, true);
    tc.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
function dialDisplay(rotateAmount) {
    var displayTxt = ((rotateAmount / 40) + 2).toString();
    if (displayTxt === '10') {
        displayTxt = "1";
    }
    else if (displayTxt === '11') {
        displayTxt = "2";
    }
    c.fillStyle = 'white';
    if (clickCounter === 1) {
        c.fillText(displayTxt, (window.innerWidth / 2) - (backgroundImage.width / 2) + 600, 320);
    }
    else if (clickCounter === 2) {
        c.fillText(displayTxt, (window.innerWidth / 2) - (backgroundImage.width / 2) + 650, 320);
    }
    else if (clickCounter === 3) {
        c.fillText(displayTxt, (window.innerWidth / 2) - (backgroundImage.width / 2) + 700, 320);
    }
    else if (clickCounter === 4) {
        c.fillText(displayTxt, (window.innerWidth / 2) - (backgroundImage.width / 2) + 750, 320);
    }
    return displayTxt;
}
function winCheck(currentReward) {
    for (var i = 0; i < earnedRewards.length; i++) {
        if (currentReward.multiplyer == earnedRewards[i].multiplyer) {
            winningRewards.push(currentReward);
            winningRewards.push(earnedRewards[i]);
            win();
        }
    }
}
function safeOpen(rotateAmount) {
    var displayTxt = dialDisplay(rotateAmount);
    rewardobjects = [new rewards(coinImage, 15), new rewards(diamondImage, 16), new rewards(goldImage, 17), new rewards(notesImage, 18), new rewards(ringImage, 19)]; //full list of objects
    if (clickCounter < 2) {
        var randomRewards = Math.floor(Math.random() * 4);
        for (var i = 0; i < 3; i++) {
            for (var i_1 = 0; i_1 < chosenRewards.length; i_1++) {
                while (rewardobjects[randomRewards] == chosenRewards[i_1]) {
                    randomRewards = Math.floor(Math.random() * 4);
                }
            }
            chosenRewards.push(rewardobjects[randomRewards]); //on first loop through, take 3 different, randomly selected objects from large list, into smaller list
        }
    }
    var rewardChoice = Math.floor(Math.random() * 3); //each loop through (every time the user clicks), take a random object from small list.
    if (displayTxt === "1") { //assign variables of the object depending on which position they end up. 
        chosenRewards[rewardChoice].xIncrementDoor = 15;
        chosenRewards[rewardChoice].yIncrementDoor = 0;
        chosenRewards[rewardChoice].xIncrementReward = 30;
        chosenRewards[rewardChoice].yIncrementReward = 5;
        chosenRewards[rewardChoice].xIncrementTxt = 110;
        chosenRewards[rewardChoice].yIncrementTxt = 100;
        chosenRewards[rewardChoice].draw();
    }
    else if (displayTxt === "2") {
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
    else if (displayTxt === "4") {
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
    else if (displayTxt === "6") {
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
    else if (displayTxt === "8") {
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
        earnedRewards.push(chosenRewards[rewardChoice]); //if true, win check calls win() and ends game, if not, the current random object i added to a list of random objects that have already been used.
    }
    else {
        earnedRewards.push(chosenRewards[rewardChoice]); // on first loop through, add current random object to list of objects that have been used.
    }
}
function win() {
    tc.clearRect(0, 0, window.innerWidth, window.innerHeight);
    tc.fillText("WINNER!!", (window.innerWidth / 2) - (backgroundImage.width / 2) + 100, 150);
    c.drawImage(greenDialDisplayImage, (window.innerWidth / 2) - (backgroundImage.width / 2) + 585, 270);
    c.fillText("WIN", (window.innerWidth / 2) - (backgroundImage.width / 2) + 660, 320);
    var winningAmount = (betValue * winningRewards[0].multiplyer).toString();
    var youWonTxt = "YOU WON £";
    var winningString = youWonTxt.concat(winningAmount);
    setTimeout(function () {
        tc.font = '90px Titan One Regular';
        tc.clearRect(0, 0, window.innerWidth, window.innerHeight);
        flashTxt(winningString, (window.innerWidth / 2) - (backgroundImage.width / 2) + 100, 150, tc);
        rc.clearRect(0, 0, window.innerWidth, window.innerHeight);
        spinImage(dialSpinImage, 3, rc2, 360, 8, false);
        flashImage(dialSpinImage, 3, 580, 485, false, 0, fc1, 5);
    }, 2000);
}
function radCalc(a) {
    return a * (Math.PI / 180);
}
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
goldImage.src = 'img/gold.png';
notesImage.src = 'img/notes.png';
ringImage.src = 'img/ring.png';
//# sourceMappingURL=test.js.map
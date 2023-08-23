const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const PLATER_WIDTH = 100;
const PLATER_HEIGHT = 100;
const playerImage = new Image();
const keysQueue= [];



let posX = 0;
let posY = 0;
let velocity = 0;
let gravity = 3;
let accelY = 0;
let isJumping = false;

ctx.imageSmoothingEnabled = true;

const states = {
    idle: 1,
    run: 42,
}

var currentState = 'idle';
playerImage.src = 'Imagenes/run/run_0.png';

function animate() {

    posX += velocity;
    if (posY > 1){
        posY = Math.max(0,posY + accelY);
        accelY = accelY - gravity;
        console.log(posY,accelY);
    }
    else{
        posY = 0;
        accelY = 0;
        isJumping = false;
    }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, posX, CANVAS_HEIGHT-PLATER_HEIGHT - posY, PLATER_WIDTH, PLATER_HEIGHT);
    frame = Math.floor(requestAnimationFrame(animate)/1,5);
    playerImage.src = 'Imagenes/'+currentState+'/'+ currentState +'_'+ frame % states[currentState] + '.png';
}

function setState(state){
    currentState = state;
}

function moveLeft(){
    Math.abs(velocity) > 3 ? velocity -= 0 : velocity -= 4;
}

function jump(){
    if (!isJumping){
        posY = 5;
        accelY = 40;
        isJumping = true;
    }
}

function moveRight(){
    Math.abs(velocity) > 3 ? velocity += 0 : velocity += 4;
}

document.addEventListener('keydown', function(event){
    if (!keysQueue.includes(event.key)){
        keysQueue.push(event.key);
    }
    console.log(event.key)
    if (event.key == 'a'){
        if (keysQueue.includes(event.key)){
            
        }
        setState('run');
        moveLeft();
        if (playerImage.dataset.direction != 'left'){
            playerImage.dataset.direction = 'left';
            playerImage.transform = 'scaleX(-1)';
        }
    }

    if (event.key == 'd'){
        setState('run');
        moveRight();
        if (playerImage.dataset.direction != 'right'){
            playerImage.dataset.direction = 'right';
            playerImage.transform = 'scaleX(1)';
        }
    }

    if (event.key == 'w'){
    setState('run');
    jump();
    }

})

document.addEventListener('keyup', function(event){
    keysQueue.splice(keysQueue.indexOf(event.key),1);
    if (keysQueue.length == 0){
        setState('idle');
        velocity = 0;
    }
})


animate();
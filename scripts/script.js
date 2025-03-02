console.log("script js successfully loaded")
const canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d")

let player1Health=100;
let player2Health=100;

const lookRightAnimation= new Image();
const lookLeftAnimation= new Image();

const characters=[
    {name: "Eye of Rah", sheet: "/files/images/characters/eye_of_rah/standing/standing_sprite.png", frames: 8, delay: 5},
    {name: "Chopped Chin", sheet: "/files/images/characters/chopped_chin/standing/chopped_chin_sprite.png", frames: 5, delay: 10}
]

const arenas=[
    "/files/images/arena/arena1.png",
    "/files/images/arena/arena2.png",
    "/files/images/arena/arena3.png",
]



let currChar = parseInt(localStorage.getItem("currChar")) || 0;
let currChar2 = parseInt(localStorage.getItem("currChar2")) || 0;         //def 0

let currIdx = parseInt(localStorage.getItem("currIdx")) || 0;

lookRightAnimation.src = characters[currChar].sheet;
lookLeftAnimation.src = characters[currChar2].sheet;

canvas.style.backgroundImage=`url(${arenas[currIdx]})`;

//---------------------SPRITE PROPERTIES-----------------
const frameWidth=32;
const frameHeight=64;

let p1FrameCount=0;
let p2FrameCount=0;

const totalFrames=characters[currChar].frames; //eye of rah = 8 chopped chin = 5
const frameDelay=characters[currChar].delay;

const totalFrames2=characters[currChar2].frames; //eye of rah = 8 chopped chin = 5
const frameDelay2=characters[currChar2].delay;//eye of rah = 5 chopped chin = 10

let frameCounter=0;
let frameCounter2=0;

function flipImage(image,x,y,width,height,flip,frameCount){
    ctx.save();
    if(flip){
        ctx.scale(-1,1);
        ctx.drawImage(
            image,
            frameCount*frameWidth,
            0,
            frameWidth,
            frameHeight,
            -x-width,
            y,
            width,
            height
        );
    }
    else{
        ctx.drawImage(
            image,
            frameCount*frameWidth,
            0,
            frameWidth,
            frameHeight,
            x,
            y,
            width,
            height
        );
    }
    ctx.restore();
}



function loadFrame(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;


    xCoord+=xVel;
    yCoord+=yVel;

    xCoord2+=xVel2;
    yCoord2+=yVel2;

    frameCounter++;
    frameCounter2++;

    if(frameCounter>=frameDelay){
        frameCounter=0;
        p1FrameCount=(p1FrameCount+1)%totalFrames;
    }

    if(frameCounter2>=frameDelay2){
        frameCounter2=0;
        p2FrameCount=(p2FrameCount+1)%totalFrames2;
    }

    //--------------------LOOK DIRECTION-----------------

    let p2FaceLeft=xCoord<xCoord2; //if true: p1--><--p2
    let p1FaceLeft=xCoord>xCoord2; //if true: p2--><--p1

    //--------------------SPRITE LOADING AND FLIP------------------
    //PLAYER 1 - SPRITE
    flipImage(
        lookRightAnimation,
        xCoord,
        spriteYCoord,
        frameWidth*3,
        frameHeight*3,
        p1FaceLeft,
        p1FrameCount
    );
    //PLAYER 1 - HIT BOX

    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.strokeRect(xCoord, yCoord, 100, 200);

    //PLAYER 2 - SPRITE
    flipImage(
        lookLeftAnimation,
        xCoord2,
        spriteYCoord2,
        frameWidth*3,
        frameHeight*3,
        p2FaceLeft,
        p2FrameCount
    );
    //PLAYER 2 - HITBOX

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.strokeRect(xCoord2, yCoord2, 100, 200);


    //--------------------GROUND COLOR UNDER PLAYER--------------------

    ctx.fillStyle="red";
    ctx.fillRect(xCoord,590,100,10);

    ctx.fillStyle="blue";
    ctx.fillRect(xCoord2,590,100,10);

    requestAnimationFrame(loadFrame);

    console.log(`coord 1: (${xCoord},${yCoord}) coord 2: (${xCoord2},${yCoord2})`);
}


requestAnimationFrame(loadFrame);

const canvas = document.getElementById("jsCanvas");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

// 모드 셋 + 클릭 이벤트 주입
const modeSet = document.getElementsByName("mode");
for (let i =0; i<modeSet.length; i++){
    modeSet[i].onclick = handleModeChange;
}

// context -->canvas안에 픽셀을 다룸
const ctx = canvas.getContext("2d");

// color class
const colors = document.getElementsByClassName("jsColor");

// range 
const range = document.getElementById("jsRange");

//buttons
const save = document.getElementById("jsSave");

// 캔버스 크기를 css와 동일하게 해줘야함.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;



// 선의 색과 두깨를 정의
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle =INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove (event){
    // client -> 윈도우 전체에서 마우스 좌표
    // offset -> canvas 안에서 마우스 좌표
    const x = event.offsetX;
    const y = event.offsetY;

    // 클릭하지 않고 마우스를 움직이면 path(line)를 저장 
    if(painting && !filling){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    // 클릭하면 이전 저장한 path에서 움직인 만큼 선을 그림.
    else{
        ctx.beginPath();
        ctx.moveTo(x,y);
    }

}

function changeColor(event){
    Array.from(colors).forEach(color => color.style.border="none");
    const color = event.target.style.backgroundColor;
    event.target.style.border="solid";
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
    
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}



function handleModeChange(event){
    const mode = event.target.value;
    if(mode === "fill"){
        filling = true;
    }else{
        filling = false;
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    } else{

    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint❤";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // 우클릭 메뉴 막기
}
if(colors){
    Array.from(colors).forEach(color =>
        color.addEventListener("click",changeColor));
}


if(range){
    range.addEventListener("input", handleRangeChange);
}


if(save){
    save.addEventListener("click",handleSaveClick);
}
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".button__tool");
const sizeButtons = document.querySelectorAll(".button__size");
const buttonClear = document.querySelector(".button__clear");

let brushSize = 20;

ctx.fillStyle = "#000";

let isPainting = false;

let activeTool = "brush";

inputColor.addEventListener("change", ({target})=>{
    ctx.fillStyle = target.value;
})

canvas.addEventListener("mousedown", (event) => {
    const {clientX, clientY} = event;
    isPainting = true;
    if (activeTool=="brush"){
        draw(clientX, clientY);
    }
    if (activeTool=="rubber"){
        erase(clientX, clientY);
    }

})

canvas.addEventListener("mousemove", (event) => {
    const {clientX, clientY} = event;
    if (isPainting){
        if (activeTool=="brush"){
            draw(clientX, clientY);
        }
        if (activeTool=="rubber"){
            erase(clientX, clientY);
        }
    }
})

canvas.addEventListener("mouseup", () => {
    isPainting = false;
})


const draw = (x,y) => {
    ctx.globalCompositeOperation = "source-over"
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft,
        y - canvas.offsetTop, brushSize/2, 0, 2*Math.PI)
    ctx.fill()
}

const erase = (x,y) => {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft,
        y - canvas.offsetTop, brushSize/2, 0, 2*Math.PI)
    ctx.fill()
}

const selectTool = ({target}) => {
    const selectedTool = target.closest("button")
    const action = selectedTool.getAttribute("data-action")
    if (action){
        tools.forEach((tool) => tool.classList.remove("active"))
        activeTool = action
        selectedTool.classList.add("active")
    }
}

const selectSize = ({target}) => {
    const selectedTool = target.closest("button")
    const size = selectedTool.getAttribute("data-size")

    sizeButtons.forEach((tool) => tool.classList.remove("active"))
    selectedTool.classList.add("active")
    brushSize = size
}

tools.forEach( (tool)=>{
    tool.addEventListener("click", selectTool)
})

sizeButtons.forEach( (button)=>{
    button.addEventListener("click", selectSize)
})

buttonClear.addEventListener("click", ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})
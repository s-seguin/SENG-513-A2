let resetDisplayFlag = false;

function btnClick(btn) {
    console.log("reset: ", resetDisplayFlag);
    if (resetDisplayFlag)
        clearDisplay();
    console.log("User clicked " + btn);
    document.getElementById("display").innerHTML += btn;
}

function evalExpression() {
    let currentExpression = document.getElementById("display").innerText;
    let ex = eval(currentExpression);
    console.log(ex);
    document.getElementById("display").innerHTML = ex;
    resetDisplayFlag = true;
}

function clearDisplay() {
    document.getElementById("display").innerHTML = "";
    resetDisplayFlag = false;
}
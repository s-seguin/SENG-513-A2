let resetDisplayFlag = false;

function btnClick(btn) {
   // console.log("reset: ", resetDisplayFlag);
    if (resetDisplayFlag)
        clearDisplay();
    //console.log("User clicked " + btn);
    //this isnt working for operators
    if ((btn != '*' || btn != '/' || btn != '+' || btn != '-') && eval(document.getElementById("display").innerText) === 0)
        document.getElementById("display").innerText = btn;
    else
        document.getElementById("display").innerText += btn;
}

function evalExpression() {
    let currentExpression = document.getElementById("display").innerText;
    let ex = eval(currentExpression);
    console.log(ex);
    console.log(currentExpression);
    document.getElementById("prevCalcDisplay").innerText = currentExpression + " =";
    document.getElementById("display").innerText = ex;
    resetDisplayFlag = true;
}

function clearDisplay() {
    document.getElementById("display").innerText = "";
    resetDisplayFlag = false;
}

function deleteLastEntry() {
    let entry = document.getElementById("display").innerText;
    if (entry.length == 1)
        document.getElementById("display").innerText = "0";
    else
        document.getElementById("display").innerText = entry.slice(0, entry.length -1);
}
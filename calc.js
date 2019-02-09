let resetDisplayFlag = false;
let previousAns = null;

//States
const CLEAR = "clear";
const ANS = "ans";
const EXPRESSION = "exp";

function btnClick(btn) {
    console.log(getDisplayState());
    
    switch (getDisplayState()) {
        case CLEAR:
            if (btn != ")") {
                if (isOperator(btn))
                    appendToDisplay("display", btn);
                else
                    setDisplayTo("display", btn);
                break;
            }
            break;

        case ANS:
            previousAns = null;
            if(isOperator(btn))
                appendToDisplay("display", btn);
            else if (btn == "." || btn == "(")
                setDisplayTo("display", btn);
            break;

        case EXPRESSION:
            appendToDisplay("display", btn);
            break;

        default:
            break;  
            


    }
}





function evalExpression() {
    let currentExpression = document.getElementById("display").innerText;
    let ex = eval(currentExpression);
    console.log(ex);
    console.log(currentExpression);
    document.getElementById("prevCalcDisplay").innerText = currentExpression + " =";
    document.getElementById("display").innerText = ex;
    previousAns = ex;
    resetDisplayFlag = true;
}

/**
 * Deletes the last entry in the display. Used for the CE button on the calculator.
 */
function clearLastEntry() {
    let entry = document.getElementById("display").innerText;
    if (entry.length == 1)
        document.getElementById("display").innerText = "0";
    else
        document.getElementById("display").innerText = entry.slice(0, entry.length -1);
}

/**
 * Append the given item to the inner text of display specified by the display id
 * @param {*} displayID id of the display we want to modify
 * @param {*} str  the str we want to append to the InnerText
 */
function appendToDisplay(displayID, str) {
    document.getElementById(displayID).innerText += str;
}

/**
 * Sets the inner text of the display to the given str
 * @param {*} displayID id of the display we want to modify
 * @param {*} str the str we want to set as the InnerText
 */
function setDisplayTo(displayID, str) {
    document.getElementById(displayID).innerText = str;
}

/**
 * Clears the display to be blank
 */
function clearDisplay() {
    document.getElementById("display").innerText = "";
    resetDisplayFlag = false;
}

/**
 * Return the state of display. States are defined as cosntants at the top of the file.
 */
function getDisplayState() {
    let display = document.getElementById("display").innerText;

    if (display.length == 0)
        return CLEAR;
    else if (display.length == 1 && display === "0")
        return CLEAR;
    else if (previousAns != null)
        return ANS;
    else
        return EXPRESSION;
}

/**
 * Checks if a given character is an operator i.e is it -,+,*,/
 */
function isOperator(chr) {
    if (chr == "-" || chr == "+" || chr == "*" || chr == "/")
        return true;
    else
        return false;
}
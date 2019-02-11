//a var to keep track of the previous ans / calc
let previousAns = null;

//States
const CLEAR = "clear";
const ANS = "ans";
const EXPRESSION = "exp";
const ERROR = "ERROR";

/**
 * Handle button clicks
 * @param {*} btn the calling button
 */
function btnClick(btn) {
    console.log(getDisplayState());
    console.log(previousAns);
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
            if(isOperator(btn))
                appendToDisplay("display", btn);
            else if (btn != ")")
                setDisplayTo("display", btn);
            
            setDisplayTo("prevCalcDisplay", "Ans = " + previousAns);
            previousAns = null;
            break;

        case EXPRESSION:
            if (isOperator(btn) && isOperator(getLastCharDisplay("display")))
                replaceLastCharDisplay("display", btn);
            else if (btn == "." && displayContains("display","."))
                console.log("Expression already contains '.'");
            else
                appendToDisplay("display", btn);
            break;
        
        case ERROR:
            if (btn != ")") {
                if (isOperator(btn))
                    appendToDisplay("display", btn);
                else
                    setDisplayTo("display", btn);
                break;
            }
            break;

        default:
            break;  
            


    }
}

/**
 * Evaluates the expression in display.InnerText
 * 
 * Calls JavaScript eval, if errors are thrown, "ERROR" is shown in the display
 */
function evalExpression() {
    let currentExpression = document.getElementById("display").innerText;
    try {
        let ex = eval(currentExpression);
        console.log(ex);
        console.log(currentExpression);
        document.getElementById("prevCalcDisplay").innerText = currentExpression + " =";
        document.getElementById("display").innerText = ex;
        previousAns = ex;
    } catch (err) {
        document.getElementById("prevCalcDisplay").innerText = currentExpression + " =" + ERROR;
        document.getElementById("display").innerText = ERROR;
        previousAns = ex;
    }
    
}

/**
 * Deletes the last entry in the display. Used for the CE button on the calculator.
 */
function clearLastEntry() {
    let entry = document.getElementById("display").innerText;
    if (entry.length == 1 || getDisplayState() == ANS)
        document.getElementById("display").innerText = "0";
    else
        document.getElementById("display").innerText = entry.slice(0, entry.length -1);
}

/**
 * Returns the last character of the given display InnerText
 * @param {*} displayID 
 */
function getLastCharDisplay(displayID) {
    let display = document.getElementById(displayID).innerText;
    return display.charAt(display.length - 1);
}

/**
 * Replace the last character of the InnerText in the given display with chr
 * @param {*} displayID 
 * @param {*} chr 
 */
function replaceLastCharDisplay(displayID, chr) {
    let display = document.getElementById(displayID).innerText;

    document.getElementById(displayID).innerText = display.slice(0, display.length - 1) + chr;
}
/**
 * Append the given item to the inner text of display specified by the display id
 * @param {*} displayID id of the display we want to modify
 * @param {*} str  the str we want to append to the InnerText
 */
function appendToDisplay(displayID, str) {
    document.getElementById(displayID).innerText += str;
}

function displayContains(displayID, chr) {
    if ((document.getElementById(displayID).innerText).includes(chr))
        return true;
    else 
        return false;
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
    else if (display == ERROR)
        return ERROR;
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
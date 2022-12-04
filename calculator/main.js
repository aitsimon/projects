/**
 * @autor {Aitor}
 * @version {1.0}
 * @date {2022-12-02}
 */
window.onload = () => {
    // Instance of global variables needed
    var divDisplay = document.getElementById('display');
    var divPreview = document.getElementById('preview');
    var buttons = document.getElementsByTagName('button');
    var buffer = '0';
    var bufferOperation = undefined;
    var operationBefore = false;
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function (event) {
            processClick(event);
        });
    }
    /**
     * Function to process the click in the different parts of the calculator
     * @param {Event} clickEvent Store the clickEvent
     */
    function processClick(clickEvent) {
        var button = clickEvent.target;
        let char = button.innerText
        let regexNumber = /^\d{1,}$|(?=^.{1,}$)^\d+\.\d{0,}$/;
        let operations = ['%', '/', '*', '-', '+'];
        let displayChanges = ['AC', 'DEL', '='];
        if (bufferOperation != undefined && operations.includes(char)) {
            alert('Invalid operation');
        } else {
            if (regexNumber.test(divDisplay.innerText.concat(char))) {
                if(operationBefore){
                    divDisplay.innerText = char;
                }else{
                    divDisplay.innerText += char;
                }
            } else if (operations.includes(char)) {
                bufferOperation = char;
                buffer = divDisplay.innerText;
                divPreview.innerText = buffer.concat(char);
                divDisplay.innerText = '';
            } else if (displayChanges.includes(char)) {
                changeDisplay(char);
            } else {
                alert('Invalid operation');
            }
        }
    }
    /**
     * Function to change the main the display of th calculator, enters in switch with options for different
     * symbols like "=,AC,DEL"
     * @param {String} symbol - The symbol pressed on the calculator
     */
    function changeDisplay(symbol) {
        switch (symbol) {
            case '=':
                divPreview.innerText = operate(bufferOperation);
                buffer = divDisplay.innerText;
                bufferOperation = undefined;
                operationBefore=true;
                break;
            case 'AC':
                divDisplay.innerText = '';
                divPreview.innerText = '';
                buffer = '0';
                bufferOperation = undefined;
                operationBefore=false;
                break;
            case 'DEL':
                divDisplay.innerText = divDisplay.innerText.slice(0, -1);
                break;
            default:
                break;
        }
    }
    /**
     * Function to process the the operation process of the calculator. Called when it has been pressed one of
     * the operations symbols avaible such us "+,-,/,*". It via "eva" native function that transforms the String
     * of an operation to a numeric value. The opration String is generated with the concatenation of the buffered
     * String of previous operations plus the symbol given as parameter plus the new number that it's been displayed
     * in the display currently.
     * @param {String} symbol - The symbol of the current operation
     * @returns {String} operationString - The operation that has been processed
     */
    function operate(symbol) {
        let newNumber = divDisplay.innerText;
        let operationString = `${buffer}${symbol}${newNumber}`;
        let result = eval(operationString);
        buffer = result;
        if(result.toString().length>7){
            result =result.toString().substring(0,9);
        }
        divDisplay.innerText = result;
        bufferOperation = undefined;
        return operationString;
    }
}
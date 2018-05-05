const calculator = {
    number1: 0,
    number2: 0,
    operation: '',
    
    inputOutput: document.getElementById('calcInput'),
    
    clear: function(inputBox) {
        if(inputBox.value != '' && calculator.number1 != 0) {
            inputBox.value = '';
            calculator.number2 = 0;
        }
        else if(inputBox.value == '' && calculator.number1 != 0) {
            calculator.number1 = 0;
            calculator.number2 = 0;
            calculator.operation = '';
        }
        else {
            calculator.number1 = 0;
            calculator.number2 = 0;
            calculator.operation = '';
        }
    },
    
    mutipleOperation: function(inputBox, button) {
        switch(button.innerHTML) {
            case '+':
                calculator.number1 += parseFloat(inputBox.value);
                calculator.number2 = 0;
                inputBox.value = '';
                break;
            case '-':
                calculator.number1 -= parseFloat(inputBox.value);
                calculator.number2 = 0;
                inputBox.value = '';
                break;
            case 'X':
                calculator.number1 *= parseFloat(inputBox.value);
                calculator.number2 = 0;
                inputBox.value = '';
                break;
            case '/':
                calculator.number1 /= parseFloat(inputBox.value);
                calculator.number2 = 0;
                inputBox.value = '';
                break;
        }
    },
    
    buttonClicked: function(button) {
        console.log(button.innerHTML);
        let inputBox = document.getElementById('calcInput');

        switch (button.innerHTML) {
            case 'M':
                break;
            case 'C':
                calculator.clear(inputBox);
                break;
            case '/':
                if(calculator.number1 == 0) {
                    calculator.number1 = parseFloat(inputBox.value);
                    calculator.operation = button.innerHTML;
                    inputBox.value = '';
                }
                else if(calculator.number1 != 0) {
                    calculator.mutipleOperation(inputBox, button);
                }
                break;
            case 'X':
                if(calculator.number1 == 0) {
                    calculator.number1 = parseFloat(inputBox.value);
                    calculator.operation = button.innerHTML;
                    inputBox.value = '';
                }
                else if(calculator.number1 != 0) {
                    calculator.mutipleOperation(inputBox, button);
                }
                break;
            case '-':
                if(calculator.number1 == 0) {
                    calculator.number1 = parseFloat(inputBox.value);
                    calculator.operation = button.innerHTML;
                    inputBox.value = '';
                }
                else if(calculator.number1 != 0) {
                    calculator.mutipleOperation(inputBox, button);
                }
                break;
            case '+':
                if(calculator.number1 == 0) {
                    calculator.number1 = parseFloat(inputBox.value);
                    calculator.operation = button.innerHTML;
                    inputBox.value = '';
                }
                else if(calculator.number1 != 0) {
                    calculator.mutipleOperation(inputBox, button);
                }
                break;
            case '=':
                if(calculator.number1 != 0) {
                    calculator.number2 = parseFloat(inputBox.value);
                    switch(calculator.operation) {
                        case '+':
                            inputBox.value = (calculator.number1 + calculator.number2).toString();
                            break;
                        case '-':
                            inputBox.value = (calculator.number1 - calculator.number2).toString();
                            break;
                        case 'X':
                            inputBox.value = (calculator.number1 * calculator.number2).toString();
                            break;
                        case '/':
                            inputBox.value = (calculator.number1 / calculator.number2).toString();
                            break;
                    }
                }
                calculator.operation = button.innerHTML;
                break;
            default:
            //if it made it to here it's a number
                if(calculator.operation == '=') {
                    inputBox.value = button.innerHTML;
                    calculator.operation = '';
                    calculator.number1 = 0;
                    calculator.number2 = 0;
                }
                else
                    inputBox.value = inputBox.value + button.innerHTML;
        }
    }
}


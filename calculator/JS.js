const calculator = {
    number1: 0,
    number2: 0,
    operation: '',
    lastPressed: '',
    
    inputOutput: document.getElementById('calcInput'),
    
    clear: function(inputBox) {
        inputBox.value = '0';
        calculator.number1 = 0;
        calculator.number2 = 0;
        calculator.operation = '';
    },
    
    mutipleOperation: function(inputBox, button) {
        switch(calculator.operation) {
            case '+':
                calculator.number1 += parseFloat(inputBox.value);
                calculator.number2 = 0;
                calculator.operation = button.innerHTML;
                inputBox.value = '0';
                break;
            case '-':
                calculator.number1 -= parseFloat(inputBox.value);
                calculator.number2 = 0;
                calculator.operation = button.innerHTML;
                inputBox.value = '0';
                break;
            case 'X':
                calculator.number1 *= parseFloat(inputBox.value);
                calculator.number2 = 0;
                calculator.operation = button.innerHTML;
                inputBox.value = '0';
                break;
            case '/':
                calculator.number1 /= parseFloat(inputBox.value);
                calculator.number2 = 0;
                calculator.operation = button.innerHTML;
                inputBox.value = '0';
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
                calculator.lastPressed = button.innerHTML;
                break;
                
            case '/':
                if(calculator.lastPressed != button.innerHTML) {
                    if(calculator.number1 == 0) {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = '/';
                    }
                    else if(calculator.operation == '=') {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = '/';
                        calculator.number2 = 0;
                    }
                    else if(calculator.operation != '=') {
                        calculator.mutipleOperation(inputBox, button);
                    }
                    calculator.lastPressed = button.innerHTML;
                }
                break;
                
            case 'X':
                if(calculator.lastPressed != button.innerHTML) {
                    if(calculator.number1 == 0) {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = 'X';
                    }
                    else if(calculator.operation == '=') {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = 'X';
                        calculator.number2 = 0;
                    }
                    else if(calculator.operation != '=') {
                        calculator.mutipleOperation(inputBox, button);
                    }
                    calculator.lastPressed = button.innerHTML;
                }
                break;
                
            case '-':
                if(calculator.lastPressed != button.innerHTML) {
                    if(calculator.number1 == 0) {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = '-';
                    }
                    else if(calculator.operation == '=') {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = '-';
                        calculator.number2 = 0;
                    }
                    else if(calculator.operation != '=') {
                        calculator.mutipleOperation(inputBox, button);
                    }
                    calculator.lastPressed = button.innerHTML;
                }
                break;
                
            case '+':
                if(calculator.lastPressed != button.innerHTML) {
                    if(calculator.number1 == 0) {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = '+';
                    }
                    else if(calculator.operation == '=') {
                        calculator.number1 = parseFloat(inputBox.value);
                        inputBox.value = '0';
                        calculator.operation = '+';
                        calculator.number2 = 0;
                    }
                    else if(calculator.operation != '=' && calculator.operation != '') {
                        calculator.mutipleOperation(inputBox, button);
                    }
                    calculator.lastPressed = button.innerHTML;
                }
                break;
                
            case '=':
                if(calculator.number1 != 0) {
                    calculator.number2 = parseFloat(inputBox.value);
                    inputBox.value = '0';
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
                            
                        default:
                            break;
                    }
                    calculator.operation = '=';
                }
                calculator.lastPressed = button.innerHTML;
                break;
            default:
            //if it made it to here it's a number
                if(calculator.operation == '=') {
                    calculator.clear(inputBox);
                    inputBox.value = button.innerHTML;
                    calculator.lastPressed = button.innerHTML;
                }
                else {
                    if(inputBox.value == '0') {
                        inputBox.value = button.innerHTML;
                        calculator.lastPressed = button.innerHTML;
                    }
                    else {
                        inputBox.value = inputBox.value + button.innerHTML;
                        calculator.lastPressed = button.innerHTML;
                    }
                }
        }
    }
}


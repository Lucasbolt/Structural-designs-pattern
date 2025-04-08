import { StackCalculator } from "../../proxy/stackcalculator"

function patchedCalculator (calculator) {
    //new method
    calculator.add = function () {
        const addend2 = calculator.getValue()
        const addend1 = calculator.getValue()
        const result = addend1 + addend2
        calculator.putValue(result)
        return result
    }

    //modified method 
    const divideOrig = calculator.divide
    calculator.divide = () => {
        const divisor = calculator.peekValue()
        if (divisor === 0) {
            throw new Error('Division by 0')
        }
        return divideOrig.apply(calculator)
    }

    return calculator
}

const calculator = new StackCalculator()
const enhancedCalculator = patchedCalculator(calculator)
enhancedCalculator.putValue(4)
enhancedCalculator.putValue(3)
console.log(enhancedCalculator.add())
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.multiply())
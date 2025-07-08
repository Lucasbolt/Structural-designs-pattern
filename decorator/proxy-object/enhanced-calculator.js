import { StackCalculator } from "../../proxy/stackcalculator"

const enhancedCalculatorHandler = {
    get (target, property) {
        if (property === 'add') {
            return function add() {
                const addend2 = target.getValue()
                const addend1 = target.getValue()
                const result = addend1 + addend2
                target.putValue(result)
                return result
            }
        } else if (property === 'divide') {
            return function () {
                const divisor = target.peekValue()
                if (divisor === 0) { throw new Error('Division by 0') }
                return target.divide()
            }
        }

        return target[property]
    }
}

const calculator = new StackCalculator
const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler)
import { StackCalculator } from "../stackcalculator.js";

const safecalculatorProxyHandler = {
    get: (target, property) => {
        if (property === 'divide') {
            return function () {
                const divisor = target.peekValue()
                if (divisor === 0) throw new Error("Invalid operation: cannot divide by 0");
                return target.divide()
            }
        }

        return target[property]
    }
}

const calculator = new StackCalculator()

const safecalculator = new Proxy(calculator, safecalculatorProxyHandler)

calculator.putValue(2)
safecalculator.putValue(4)
safecalculator.putValue(0)
calculator.putValue(5)
safecalculator.putValue(0)
console.log(safecalculator.peekValue())
// console.log(safecalculator.divide())

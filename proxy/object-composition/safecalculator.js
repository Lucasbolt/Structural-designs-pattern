export class SafeCalculator {
    constructor (calculator) {
        this.calculator = calculator
    }

    divide () {
        const divisor = this.calculator.peekValue()
        if (divisor === 0) throw new Error('Invalid operation: cannot divide by 0')
        return this.calculator.divide()
    }

    multiply() {
        return this.calculator.multiply()
    }

    pushValue (number) {
        return this.calculator.pushValue(number)
    }

    peekValue () {
        return this.calculator.peekValue()
    }
}


//using factoty method
export function createSafecalculator (calculator) {
    return {
        divide () {
            const divisor = calculator.peekValue()
            if (divisor === 0) throw new Error("Invalid operation: cannot divide by 0");
            return calculator.divide()
        },

        multiply () {
            return calculator.multiply()
        },

        peekValue () {
            return calculator.peekValue()
        },

        pushValue (number) {
            return calculator.peekValue(number)
        } 
    }
}
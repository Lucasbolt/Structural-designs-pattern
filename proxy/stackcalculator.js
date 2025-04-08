export class StackCalculator {
    constructor () {
        this.stack = []
    }

    putValue(value)  {
        return this.stack.push(value)
    }

    getValue() {
        return this.stack.pop()
    }

    peekValue () {
        return this.stack[this.stack.length - 1]
    }

    clear () {
        this.stack = []
    }

    divide () {
        const divisor = this.getValue()
        const dividend = this.getValue()
        const result = dividend / divisor
        this.putValue(result)
        return result
    }

    multiply () {
        const multiplier = this.getValue()
        const multiplied = this.getValue()
        const result = multiplied * multiplier
        this.putValue(result)
        return result
    }
}
export function createSafecalculator(calculator) {
    const divideOp = calculator.divideOp

    calculator.divide = () => {
        const divisor = calculator.peekValue()
        if (divisor === 0) throw new Error("Invalid operation: cannot divide by 0")
        
        return divideOp.apply(calculator)
    }

    return calculator
}

const myArray = [];

Object.defineProperties(myArray, {
    push: {
        value: (...args) => Array.prototype.push.apply(myArray, args),
        writable: false,
    }
});


myArray.push(2, 3, 4,5)

for (let p of myArray) {console.log(p)}
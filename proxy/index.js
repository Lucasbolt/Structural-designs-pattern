// import { createWriteStream } from 'fs';
// // import { ProxyStackCalculator } from "./object-composition/safecalculator.js";
// // import { StackCalculator } from "./stackcalculator.js";
// import { createWritableProxy } from "./proxy-object/loggin-writable.js";

// const writable = createWriteStream('text.txt', { encoding: 'base64'})

// const writeableProxy = createWritableProxy(writable)

// writeableProxy.write('Hello world')
// writeableProxy.write('I am Lucas')


import { createObserverable } from "./proxy-object/create-observable.js";

function calculateTotal (invoice) {
    return invoice.subtotal - 
        invoice.discount + invoice.tax
}

const invoice = {
    subtotal: 100,
    discount: 10,
    tax: 20
}

let total = calculateTotal(invoice)
console.log(`Starting total: ${total}`)

const obsInvoice = createObserverable(invoice,
    ({ prop, prev, curr }) => {
        total = calculateTotal(invoice)
        console.log(`TOTAL: ${total} (${prop} changed: ${prev} -> ${curr})`)
    }
)

obsInvoice.subtotal = 200
obsInvoice.discount = 20
obsInvoice.discount = 20
obsInvoice.tax = 30

console.log(`Final TOTAL: ${total}`)
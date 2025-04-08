import { createWriteStream } from 'fs'
import { createWritableProxy } from './loggin-writable.js'

const writable = createWriteStream('test.txt')
const writableProxy = createWritableProxy(writable)

writableProxy.write('Hello world\n')
writableProxy.write('Today is a good day to log things down\n')
writable.write('This is not logged')
writableProxy.end()
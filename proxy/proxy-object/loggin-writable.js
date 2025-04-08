export const createWritableProxy = (writable) => {
    return new Proxy (writable, {
        get: (target, property) => {
            if (property === 'write') {
                return function (...args) {
                    const [ chunk ] = args
                    console.log('writing...', chunk)
                    writable.write(...args)
                }
            }
            return target[property]
        }
    })
}
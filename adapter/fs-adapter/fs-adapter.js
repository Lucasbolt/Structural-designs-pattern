import { resolve } from 'path'


export function createFSAdapter(db) {
    return ({
        readFile (filename, options, callback) {
            if (typeof options === 'function') {
                callback = options
                options = {}
            } else if (typeof options === 'string') {
                options = { encoding: options }
            }
            db.get(resolve(filename))
            .then(result => {
                if (options.encoding) {
                    // Convert Buffer to string using the requested encoding
                    result = Buffer.from(result).toString(options.encoding)
                }
                callback(null, result)
            })
            .catch(err => {
                if (err.type === 'NotFoundError') {
                    err = new Error(`ENOENT, open ${filename}`)
                    err.code = 'ENOENT'
                    err.errno = 34
                    err.path = filename
                }
                return callback && callback(err)
            })
        },

        writeFile (filename, content, options, callback) {
            if (typeof options === 'function') {
                callback = options
                options = {}
            } else if (typeof options === 'string') {
                options = { encoding: options }
            }
            // Convert content to Buffer if encoding is specified
            let value = content
            if (options.encoding && typeof content === 'string') {
                value = Buffer.from(content, options.encoding)
            }
            db.put(
                resolve(filename), value
            ).then(result => callback(null, result))
            .catch(err => callback(err))
        }
    })
}
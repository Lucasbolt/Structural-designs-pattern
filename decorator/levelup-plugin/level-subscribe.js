export function levelSubscribe(db) {
    db.subscribe = (pattern, listener) => {
        db.on('put', (key, val) => {
            if (typeof val !== 'object' || val === null) return;
            const match = Object.keys(pattern).every((k) => {
                return pattern[k] === val[k];
            });

            if (match) { listener(key, val); }
        });
    };
    
    return db;
}
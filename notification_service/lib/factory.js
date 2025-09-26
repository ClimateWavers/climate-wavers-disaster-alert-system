export function cleanUndefined(obj){
    if (obj && typeof obj === 'object') {
        const clone = Array.isArray(obj) ? [...obj] : { ...obj };

        Object.keys(clone).forEach((key) => {
            if (clone[key] === undefined) {
                delete clone[key];
            } else if (typeof clone[key] === 'object') {
                clone[key] = cleanUndefined(clone[key]);
                if (typeof clone[key] === 'object' && Object.keys(clone[key]).length === 0) {
                    delete clone[key]; 
                }
            }
        });
        return clone;
    }

    return obj;
}
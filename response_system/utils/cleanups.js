exports.cleanText = function(input) {
    // Remove unnecessary asterisks
    let cleanedText = input.replace(/\*\*/g, '');
    cleanedText = cleanedText.replace(/^\s*\*\s*/gm, '');
    return cleanedText;
}

const cleanUndefined = function(obj){
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

exports.cleanUndefined = cleanUndefined
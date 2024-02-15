// Function to convert TypeScript object to URLSearchParams
export function objectToSearchParams(obj: Record<string, any>): URLSearchParams {
    const params = new URLSearchParams();
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj[key]) {
                params.append(key, encodeURIComponent(obj[key].toString()));
            }
        }
    }
    return params;
}
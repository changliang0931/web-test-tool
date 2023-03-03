
const storage = {
    set: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key: string, defaultValue?: any) => {
        const value = localStorage.getItem(key);
        return (value ? JSON.parse(value) : defaultValue);
    },
    remove: (key: string) => {
        localStorage.removeItem(key);
    }
}


export default storage;
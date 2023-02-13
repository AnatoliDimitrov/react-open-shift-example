import { useState } from 'react';

export const useLocalStorage = (key, defaultData) => {
    const [data, setData] = useState(() => {
        const storedUser = localStorage.getItem(key);
        return storedUser ? JSON.parse(storedUser) : defaultData
    });

    const setlocalStorage = (newData) => {
        localStorage.setItem(key, JSON.stringify(newData));

        setData(newData);
    };

    return [data, setlocalStorage];
};
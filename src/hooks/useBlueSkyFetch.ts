import { useState, useEffect } from 'react';

export function useBlueSkyFetch(station_name: string) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!station_name) return undefined;

        let url = `/api/bluesky?id=${station_name}`;

        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        };

        fetchData();
    }, [station_name]);

    return data;
}

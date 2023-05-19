export function useBlueSkyFetch(
    station_name: string
) {
    const [data, setData] = useState<any>(null)
    let url = `/api/bluesky?id=${station_name}`

    useEffect(() => {
        if (!station_name) return undefined;

        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json()
            setData(data.data);
        };

        fetchData();
    }, [station_name]);

    return data;
}
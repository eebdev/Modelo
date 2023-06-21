import { useState } from 'react';
import Link from 'next/link';

interface Station {
    name: string;
    country: string;
    city: string;
}

const Search = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<Station[]>([]);
    const [loading, setLoading] = useState(false);
  
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      if(e.target.value === '') {
        setResults([]);
        return;
      }
      setLoading(true);
      const res = await fetch(`/api/stations?search=${e.target.value}`);
      const data: Station[] = await res.json();
      setResults(data);
      setLoading(false);
    }
  
    return (
      <div className="flex flex-col items-center justify-center bg-mac-grey px-6 py-4 rounded-lg shadow-lg">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for stations..."
          className="w-full px-3 py-2 mb-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {loading && <p className="text-gray-500">Searching...</p>}
        {!loading && results.map((station, index) => (
          <Link key={index} href={`/dashboard/station/${encodeURIComponent(station.name)}`} passHref>
            <button className="w-full mt-2 px-3 py-2 text-left bg-white rounded-md cursor-pointer hover:bg-gray-200">
              {station.country} - {station.city}
            </button>
          </Link>
        ))}
      </div>
    );
};
  
export default Search;


import { useState } from 'react';
import { useRouter } from 'next/router';

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
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for stations..."
          className="px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {loading && <p className="text-gray-500">Searching...</p>}
        {!loading && results.map((station, index) => (
          <p key={index} className="text-modelo-yellow">
            {station.country} - {station.city}
          </p>
        ))}
      </div>
    );
  };
  
  export default Search;
  
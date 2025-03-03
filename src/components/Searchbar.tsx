import { useState } from 'react';

type Props = {
  onSearch: (username: string) => void;
}

const Searchbar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if(input.trim()) onSearch(input);
  }

  return (
    <div className='p-4 flex flex-col'>
      <input 
        type="text"
        placeholder="Search github username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className='border rounded border-gray-300 p-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      <button type='button' onClick={handleSearch} className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full cursor-pointer'>Search</button>
    </div>
  )
}

export default Searchbar;
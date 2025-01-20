import { motion } from 'framer-motion';
import { useState, useEffect, FC } from 'react';
import { searchBlogPosts } from '../services/axios';

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchBlogPosts(searchTerm);
        setSearchResults(data);
      } catch (error) {
        console.error(`Error fetching search results: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="max-w-7xl mx-auto mb-4">
      <div className="flex justify-center items-center p-2">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title, tags, topic, date, etc."
          className="w-full p-2 border rounded-md"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.90 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </motion.button>
      </div>
      {loading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      ) : (
        <ul>
          {searchResults.map((blog) => (
            <li key={blog._id} className="py-2 border-b border-gray-200">
              <h2 className="text-lg font-bold">{blog.title}</h2>
              <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search
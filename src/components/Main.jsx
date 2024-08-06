import { useContext, useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import toast from 'react-hot-toast';
import inputContext from '../contex/inputcontext';
const API_URL = "http://localhost:3000/api";

const Main = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const { inputText } = useContext(inputContext);
  


  useEffect(() => {
    const handle = () => {
      const sortData = data.filter((post) =>
        post.title.toLowerCase().includes(inputText.toLowerCase().trim())
      );
      setFilterData(sortData);
    };

    handle();
  }, [inputText, data]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => {
        console.log("Error fetching blog data:", err);
        toast.error('Failed to fetch blog data.');
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        toast.success('Blog deleted successfully!');
        setData(data.filter(post => post._id !== id));
        setFilterData(filterData.filter(post => post._id !== id));
      })
      .catch(err => {
        console.log("Error deleting blog:", err);
        toast.error('Failed to delete blog.');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 pt-8 pb-8">
      <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        { (inputText ? filterData : data).map((post) => (
          <BlogCard
            key={post._id}
            title={post.title}
            author={post.author}
            content={post.content}
            imageUrl={post.imageUrl}
            createdAt={post.createdAt}
            id={post._id}
            onDelete={handleDelete}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;

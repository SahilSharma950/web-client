import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import userContext from '../contex/user';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    imageUrl: '',
    tags: [],
    categories: []
  });
  const { userInfo } = useContext(userContext);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      tags: value.split(',').map((tag) => tag.trim()),
    });
  };

  const handleCategoriesChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      categories: value.split(',').map((category) => category.trim()),
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!userInfo.isLoggedIn) {
        toast.error('Please log in to create a blog');
        return;
      }
      const response = await fetch('http://localhost:3000/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Blog created: ', result);
      toast.success('Blog created successfully!');
      navigate('/home');
    } catch (error) {
      console.log('Error: ', error);
      toast.error('Failed to create blog');
    }
    console.log(formData);
    setFormData({
      title: '',
      author: '',
      content: '',
      imageUrl: '',
      tags: [],
      categories: []
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl w-full">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter blog content"
            rows="5"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            placeholder="Enter tags separated by commas"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Categories</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories.join(', ')}
            onChange={handleCategoriesChange}
            placeholder="Enter categories separated by commas"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;

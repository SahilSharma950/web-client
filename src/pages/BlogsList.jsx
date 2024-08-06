import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import userContext from "../contex/user";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useContext(userContext);

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log("Error fetching blog list:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-2"><strong>Author :</strong> {blog.author}</p>
            {blog.createdAt && (
                <p className="text-gray-600 text-sm">
                 <strong> Published on :</strong> {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              )}
            <div className="flex flex-wrap my-4">
              <span className="mr-2"><strong>Tags :</strong> </span>
              {blog.tags && blog.tags.map((tag, index) => (

                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between">
              {userInfo.isAdmin && (
                <>
                  <button
                    onClick={() => handleUpdate(blog._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
              <Link to={`/blogpage/${blog._id}`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Read more...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

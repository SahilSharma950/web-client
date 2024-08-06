/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../contex/user";

const BlogCard = ({ title, author, imageUrl, id, onDelete, tags,createdAt }) => {
  const { userInfo } = useContext(userContext);

  return (
    <div className="w-[23vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <img className="w-full h-72 object-cover object-center" src={imageUrl} alt="Blog" />
      <div className="px-4 py-2">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-700 mt-2"><strong>Author :</strong> {author}</p>
      </div>
      <div className="px-4 py-1">
        <p className="text-gray-700 text-base">
        <strong> Published on :</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="px-4 py-1 flex flex-wrap gap-2 mb-">
      <span className="mr-2"><strong>Tags :</strong></span>
        {tags && tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="px-4 py-2 bg-gray-100 lg:flex justify-end gap-5 sm:flex sm:flex-row">
        <Link to={`/blogpage/${id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
          Read more
        </Link>
        {userInfo.isAdmin && (
          <>
            <button
              className="text-red-500 hover:text-red-700 font-semibold"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
            <Link to={`/update/${id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
              Update
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/blog/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((err) => {
        console.log('Error fetching blog post:', err);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-sm text-gray-600 mt-2">By {post.author}</p>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4 flex-grow">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img className="w-full h-[70vh] object-cover object-center" src={post.imageUrl} alt={post.title} />
          <div className="p-6">
            <p className="text-gray-700 text-base">{post.content}</p>
            {post.tags && (
              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-800">Tags:</h2>
                <div className="flex flex-wrap mt-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white shadow py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Your Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;

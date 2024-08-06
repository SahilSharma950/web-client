import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function BlogPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/recent-posts")
      .then(response => response.json())
      .then(posts => setRecentPosts(posts))
      .catch(err => {
        console.log("Error fetching blog data:", err);
        toast.error('Failed to fetch blog data.');
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/blog/${id}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => {
        console.log('Error fetching blog post:', err);
        toast.error('Failed to fetch blog post.');
      });
  }, [id]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM, yyyy');
  };
  const formatTime = (dateString) => {
    return format(new Date(dateString), 'hh:mm a');
  };

  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3">
          <img
            src={data.imageUrl}
            alt="Blog Image"
            className="w-full h-[70vh] rounded-lg"
          />
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
              <span>By {data.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h1V.5a.5.5 0 0 1 1 0V1h4V.5a.5.5 0 0 1 1 0V1h1V.5a.5.5 0 0 1 1 0V1h.5A1.5 1.5 0 0 1 15 2.5V4H1V2.5A1.5 1.5 0 0 1 2.5 1H3V.5a.5.5 0 0 1 .5-.5zM1 5h14v9.5A1.5 1.5 0 0 1 13.5 16h-11A1.5 1.5 0 0 1 1 14.5V5zm9.5 1a.5.5 0 0 0-.5.5V7H6v-.5a.5.5 0 0 0-1 0V7H4.5a.5.5 0 0 0 0 1H5v2H4.5a.5.5 0 0 0 0 1H5v.5a.5.5 0 0 0 1 0V11h4v.5a.5.5 0 0 0 1 0V11h.5a.5.5 0 0 0 0-1H12V8h.5a.5.5 0 0 0 0-1H12V6.5a.5.5 0 0 0-.5-.5zm-6 1.5h1v1h-1v-1zm5 0h1v1h-1v-1z" />
              </svg>
              <span>{formatDate(data.createdAt)}</span>
            </div>
           
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5v-8zm1.5 8a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v8zm1-8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 3.5v7.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7.5a.5.5 0 0 1 .5-.5h1zm-1 1a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 1 4.5v7a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-1z" />
              </svg>
              <span>{data.categories[0]}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">Title : {data.title} </h1>
         {showMore ? <p className="mt-4">{data.content}</p>:<p className="mt-4">{data.content.slice(0, 300)}...</p> }
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleShowMore}
          >
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </div>
        <div className="md:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Categories</h2>
            <ul className="mt-2 space-y-2">
              {data.categories?.map((category, index) => (
                <li key={index} className="hover:text-red-500 transition">
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Recent Post</h2>
            {recentPosts?.map((post, index) => (
              <div key={index} className="flex gap-4 mt-4">
                <img src={post.imageUrl} alt={post.title} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-600"><strong >Date : </strong> {formatDate(post.createdAt)}</p>
                  <p> <strong className='mr-1'>Time :</strong>{formatTime(post.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Popular Tags</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center mt-8">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition">
          Next
        </button>
      </div> */}
    </div>
    </>
  );
}

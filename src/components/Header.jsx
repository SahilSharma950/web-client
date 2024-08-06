import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import InputContext from "../contex/inputcontext";
import { useContext, useState } from "react";
import userContext from "../contex/user";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { setInputText } = useContext(InputContext);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 3000);
  };

  const handleSignOut = () => {
    // Perform sign-out logic here
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate("/");
    // Redirect or update UI as needed
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[0][0]}`,
    };
  }

  return (
    <nav className="h-auto shadow-2xl sticky top-0 bg-white dark:text-white">
      <div className="lg:flex lg:justify-around lg:items-center sm:flex sm:justify-between sm:items-center px-4 py-2">
        <img
          src="https://whizametmedia.com/assets/img/allimg/medialogo.webp"
          alt="Whizamet"
          width="100px"
          className="mx-auto lg:mx-0"
        />
        { userInfo.isLoggedIn ? <div
          className="relative flex items-center gap-3 mt-2 lg:mt-0 z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Stack direction="row" spacing={1}>
            <Avatar {...stringAvatar(userInfo.name)} />
          </Stack>
          {isDropdownVisible && (
            <div
              className="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="block w-full px-4 py-2 text-left text-gray-700">
                {userInfo.name}
              </span>
              <button
                onClick={handleSignOut}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>:<Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
      <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
      Login
    </Link>}
      </div>
      <hr />
      <div className="flex flex-col lg:flex-row justify-around items-center h-auto lg:h-[13vh] px-4 py-2">
        <div className="flex flex-col lg:flex-row items-center gap-6 mt-2 lg:mt-0 w-full lg:w-auto">
          <h2 className="text-3xl mr-7">Filter</h2>
          <div className="box h-16"></div>
          <div className="text-2xl">
            <Link to="/createblog" className="block lg:inline-block">
              CREATE BLOG
            </Link>
          </div>
          <div className="text-2xl">
            <Link to="/bloglist" className="block lg:inline-block">
              BLOGS
            </Link>
          </div>
        </div>
        <form className="mt-2 lg:mt-0 w-full lg:w-auto">
          <div className="relative w-full lg:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              onChange={(e) => setInputText(e.target.value)}
              id="search"
              className="block w-full lg:w-[15vw] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Header;

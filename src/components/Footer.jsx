
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" py-8 w-[80vw] m-auto">
      <div className="container mx-auto flex flex-col  md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 w-[23vw]">
          <h2 className="text-2xl font-bold text-gray-800">BLOG SITE</h2>
          <p className="text-gray-600">
            Welcome to our technical blog, where we delve into the world of
            cutting-edge technologies and explore their practical applications.
          </p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-gray-800">Category</h3>
          <ul className="list-none mt-2">
            <li className="text-gray-600">HTML</li>
            <li className="text-gray-600">CSS</li>
            <li className="text-gray-600">JavaScript</li>
            <li className="text-gray-600">VS Code</li>
          </ul>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-gray-800">Get In Touch</h3>
          <ul className="list-none mt-2">
            <li className="text-gray-600">+91-8XXX-XXX-XX</li>
            <li className="text-gray-600">demo@gmail.com</li>
          </ul>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-gray-800">Follow Us On</h3>
          <ul className="list-none mt-2 flex gap-6 text-2xl">
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaLinkedin />
            </li>
            <li>
              <FaTwitter />
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center mt-3">
        <p className="text-gray-600 text-center mt-4">© 2024 BLOG SITE</p>
        <p className="text-gray-600 text-center">
          Made with ❤️ in Mohali, India
        </p>
      </div>
    </footer>
  );
};

export default Footer;

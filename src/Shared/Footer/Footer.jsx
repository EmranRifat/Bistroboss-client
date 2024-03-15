import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h1 className="font-bold text-xl mb-4">CONTACT US</h1>
              <p className="mb-2">123 ABS Street, Unit 21, Bangladesh</p>
              <p className="mb-2">Providing reliable tech since 1992</p>
              <p className="mb-2">+88 01686067203</p>
              <p>Mon - Fri: 08:00-22:00, Sat - Sun: 10:00-23:00</p>
            </div>

            <div className="w-full md:w-1/2">
              <h6 className="font-bold text-xl mb-4">Social</h6>
              <p className="mb-2">Join us on social media</p>
              <div className="flex space-x-2">
                <a href="#" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/* Facebook Icon */}
                  </svg>
                </a>
                <a href="#" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/* Twitter Icon */}
                  </svg>
                </a>
                <a href="#" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    {/* Instagram Icon */}
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-gray-900 text-gray-400 py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 - All rights reserved by ACME Industries Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

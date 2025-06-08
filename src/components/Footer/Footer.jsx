import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white py-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <ul className="list-none space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Rooms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-none space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  The Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Restaurant
                </a>
              </li>
            </ul>
          </div>
          <div className="pr-0 md:pr-5">
            <p className="mb-4">
              <span className="block text-primary">Address:</span>
              <span>
                198 West 21th Street, <br /> Suite 721 New York NY 10016
              </span>
            </p>
            <p className="mb-4">
              <span className="block text-primary">Phone:</span>
              <span>(+1) 435 3533</span>
            </p>
            <p>
              <span className="block text-primary">Email:</span>
              <span>info@domain.com</span>
            </p>
          </div>
          <div>
            <p className="mb-4">Sign up for our newsletter</p>
            <form action="#" className="flex items-center">
              <input
                type="email"
                className="form-control p-2 flex-grow bg-gray-700 text-white"
                placeholder="Email..."
              />
              <button type="submit" className="bg-blue-500 text-white p-2">
                <span className="fa fa-paper-plane"></span>
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-5">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy;2025 All rights reserved | This template is made with{" "}
            <i className="icon-heart-o" aria-hidden="true"></i> by{" "}
            <a className="text-primary">team</a>
          </p>
          <p className="text-center md:text-right social space-x-4">
            <a href="#" className="hover:text-gray-400">
              <span className="fa-brands fa-facebook-f"></span>
            </a>
            <a href="#" className="hover:text-gray-400">
              <span className="fa-brands fa-twitter"></span>
            </a>
            <a href="#" className="hover:text-gray-400">
              <span className="fa-brands fa-linkedin"></span>
            </a>
            <a href="#" className="hover:text-gray-400">
              <span className="fa-brands fa-vimeo"></span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

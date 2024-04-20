import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const [cart] = useCart();
  const { user, logOut } = useContext(AuthContext);
  
  const navigate = useNavigate();
  // console.log(user);
 
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Logout successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    navigate("/login");
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>

      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>

      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>

      {user ? (
        <>
          <button
            onClick={handleLogOut}
            className="btn btn-sm btn-seconary mt-1"
          >
            Logout
          </button>
          <span className="ml-16 mt-2">{user?.displayName || user?.email}</span>

          <li>
            <Link to="/dashboard/cart">
              <button className=" btn btn-sm ">
                <FaShoppingCart></FaShoppingCart>
                <div className="badge badge-secondary ">+{cart?.length}</div>
              </button>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar z-10 bg-opacity-30 fixed bg-black text-white max-w-screen-xl ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost font-bold  text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-600 "
          >
            BISTRO-BOSS
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end"></div>
      </div>
    </div>
  );
};

export default Navbar;

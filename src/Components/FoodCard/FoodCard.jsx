import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FoodCard = ({ item }) => {
  const { user } = useContext(AuthContext);
  const { name, image, price, recipe, _id } = item;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [, refetch] = useCart();
 const axiosSecure=useAxiosSecure();
  const handleAddtoCart = () => {
    // console.log(food, user.email);
    // send data to database
    if (user && user.email) {
      
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      // axios.post("http://localhost:5000/carts", cartItem)
      axiosSecure.post('carts',cartItem)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name}Added to your cart !`,
            showConfirmButton: false,
            timer: 1500,
          });
          // cart refetch to update cart items
        refetch();
        }
        
      });
    } else {
      Swal.fire({
        title: "You are not Logged In..!",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div>
      <div className="card w-96 h-96 bg-base-100 shadow-xl ">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <p className="absolute bg-slate-900 text-lg font-semibold text-white px-4 right-0  mt-4 mr-4">
          ${price}
        </p>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button
              onClick={handleAddtoCart}
              className="btn btn-sm mt-2 btn-outline border-0 border-b-4  bg-slate-200 text-orange-600 mx-auto"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

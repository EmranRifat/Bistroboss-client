import React from "react";
import useCart from "../../../hooks/useCart";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
  const [cart , refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  // console.log(totalPrice);
const axiosSecure=useAxiosSecure();
  const handleDelete = (id) => {
    // console.log(" delete",id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // axios.delete(`http://localhost:5000/carts/${id}`)
            axiosSecure.delete(`/carts/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly border p-4 rounded">
        <h2 className="text-2xl">Total Items: {cart.length}</h2>
        <h2 className="text-2xl">Total Price : <span className="font-semibold">{totalPrice}</span> $</h2>
        <button className="btn btn-sm btn-primary">Pay</button>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Name </th>
              <th>Price </th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Fresh & healthy food
                  </span>
                </td>
                <td>$ {item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-md "
                  >
                    <FaTrashAlt className="text-red-500"></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;

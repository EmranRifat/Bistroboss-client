import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div>
      <div className="flex justify-evenly my-4">
        <div className="text-3xl">All Users </div>
        <div className="text-3xl">Total Users : {users.length} </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-md  bg-orange-500 "
                  >
                    <FaUsers className="text-white text-2xl"></FaUsers>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-md "
                  >
                    <FaTrashAlt className="text-red-500"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

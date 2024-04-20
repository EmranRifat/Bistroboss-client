import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const {user} = useContext(AuthContext);
 const axiosSecure=useAxiosSecure();

  const { refetch, data:cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      // const res = await axios.get( `http://localhost:5000/carts?email=${user.email}`);
      const res=await axiosSecure.get(`/carts?email=${user.email}`)
      return res.data;
    },
  });

  // console.log(cart);

  return [cart, refetch];
};

export default useCart;

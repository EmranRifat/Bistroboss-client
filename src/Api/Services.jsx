import { useQuery } from "@tanstack/react-query";

export const getCartData = () => {
  const { data: cart = [] } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
    const res= await fetch("http://localhost:5000/carts")
     
    return res.data;
    }
  });
  return [cart];
};

// save a booking

export const saveBooking = async (bookingData) => {
  const url = "https://airbnb-server-sand.vercel.app/bookings";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();
  return data;
};

// get All bookings by email
export const getBookingsByEmail = async (email) => {
  const response = await fetch(
    `https://airbnb-server-sand.vercel.app/bookings?email=${email}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("aircnc-token")}`,
      },
    }
  );
  const bookings = await response.json();
  return bookings;
};

// Delete a booking
export const deleteBooking = async (id) => {
  const response = await fetch(
    `https://airbnb-server-sand.vercel.app/booking/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",

        authorization: `Bearer ${localStorage.getItem("aircnc-token")}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

// get All bookings for admin
export const getBookings = async () => {
  const response = await fetch(
    "https://airbnb-server-sand.vercel.app/bookings",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("aircnc-token")}`,
      },
    }
  );
  const bookings = await response.json();
  return bookings;
};
// Create payment intent
// eslint-disable-next-line no-unused-vars
export const getPaymentIntent = async (price) => {
  const response = await fetch(
    "https://airbnb-server-sand.vercel.app/create-payment-intent",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("aircnc-token")}`,
      },
      body: JSON.stringify({ price }),
    }
  );
  const data = await response.json();
  return data;
};

// // save booking after payment
// export const saveBooking=bookingData=>{

//  return  fetch('https://airbnb-server-sand.vercel.app/bookings',{
//     method:'POST',
//     headers:{
//       'content-type':'application/json'
//     },
//     body:JSON.stringify(bookingData),
//   })

// }

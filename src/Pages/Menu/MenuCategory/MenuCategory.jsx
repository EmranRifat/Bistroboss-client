import React from "react";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import Cover from "../../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, Img }) => {
  return (
    <div>
      {title && <Cover img={Img} title={title}></Cover>}
      <div className="mb-12 mt-16 grid md:grid-cols-2 gap-10 md:max-w-screen-lg mx-auto justify-center  ">
        {
          items.map((item) => (
          <MenuItem item={item} 
          key={item._id}>
          </MenuItem>
        ))}
        
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn btn-sm mt-2 btn-outline justify-center border-0 border-b-4 font-bold text-slate-800 flex mx-auto my-8">
          ORDER YOUR FAVORUITE FOOD
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;

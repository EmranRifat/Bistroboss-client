import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  // const [menu, setMenu] = useState([]);
  const [menu] = useMenu();
  // console.log(menu);
  const popular = menu.filter((item) => item.category === "popular");

  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItems = data.filter((item) => item.category === "popular");
  //       setMenu(popularItems);
  //     });
  // }, []);

  return (
    <section>
      <SectionTitle
        heading={"From Our Menu"}
        subHeading={"Popular Items"}
      ></SectionTitle>
      <div className="mb-12 grid md:grid-cols-2 gap-10 md:max-w-screen-lg mx-auto justify-center  ">
        {popular.map((item) => (
          <MenuItem item={item} key={item._id}></MenuItem>
        ))}
      </div>

      <div className="text-center">
        <button className="btn btn-sm mt-2 btn-outline border-0 border-b-4 font-bold text-black mx-auto">
          View Full Menu
        </button>
      </div>
    </section>
  );
};

export default PopularMenu;

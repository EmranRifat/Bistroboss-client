import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const offered = menu.filter((item) => item.category === "offered");
  const pizza = menu.filter((item) => item.category === "pizza");


  return (
    <div>
      <Helmet>
        <title>Restaurent | Menu</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <SectionTitle
        heading="TODAY'S OFFER "
        subHeading="Don't Miss"
      ></SectionTitle>
     
      <MenuCategory items={offered}></MenuCategory>
      <MenuCategory items={dessert} title="dessert" Img={dessertImg}></MenuCategory>
      <MenuCategory items={pizza} title="pizza" Img={pizzaImg}></MenuCategory>
      <MenuCategory items={soup} title="soup" Img={soupImg}></MenuCategory>
      <MenuCategory items={salad} title="salad" Img={saladImg}></MenuCategory>
    </div>
  );
};

export default Menu;

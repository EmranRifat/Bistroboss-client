import React, { useState } from "react";
import Cover from "../../Shared/Cover/Cover";
import cover from "../../assets/shop/order.jpg";
import useMenu from "../../hooks/useMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

  const { category } = useParams();
  
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const drinks = menu.filter((item) => item.category === "drinks");
  const pizza = menu.filter((item) => item.category === "pizza");
  return (
    <div>
      <Helmet>
        <title>Restaurent | Order Food</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
      <Cover img={cover} title={"Order Foods"}></Cover>

      {/* ------------------------------------------------- */}
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList >
          <Tab>SALAD</Tab>
          <Tab>PIZZA</Tab>
          <Tab>SOUP</Tab>
          <Tab>DESSERT</Tab>
          <Tab>DRINKS</Tab>
        </TabList>

        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;

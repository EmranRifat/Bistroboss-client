import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import feature from "../../../assets/home/featured.jpg";
import "./Featured.css";
const Featured = () => {
  return (
    <div className="featured-item pt-4 my-20  bg-fixed text-white">
      <SectionTitle
        subHeading={"check it out"}
        heading={"Featured Items"}
      ></SectionTitle>
      
      <div className="md:flex justify-center items-center py-16 md:px-36 ">
        <div>
          <img className="rounded md:px-0 px-10" src={feature} alt="" />
        </div>
        <div className="md:ml-10 mt-4 bg-slate-600 opacity-70 md:mx-0 mx-10 p-3">
          <p>Aug 20,2029</p>
          <p className="uppercase font-semibold ">Where can i get some..? </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sint
            eaque aut fugiat aperiam, maiores repellat obcaecati omnis cumque
            totam! Itaque id ex exercitationem quia dolorum ipsam commodi
            praesentium officia, laudantium culpa soluta repellendus. Saepe non
            dicta a, rerum commodi neque provident, officiis, facere dolorum
            exercitationem veniam! Fugiat, hic commodi.
          </p>
          <button className="btn btn-sm mt-2 btn-outline border-0 border-b-4 font-bold text-black">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

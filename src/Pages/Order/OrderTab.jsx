import FoodCard from "../../Components/FoodCard/FoodCard";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

const OrderTab = ({ items }) => {
    // console.log(items);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8 mb-8 md:mx-0 ml-20 ">
        {paginatedItems.map((item) => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>
      <div className="mb-4">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination flex justify-center  "
        activeClassName="bg-blue-500 rounded-full text-white"
        previousClassName="px-2 py-1 mr-2 bg-gray-200 rounded-md hover:bg-gray-300"
        nextClassName="px-2 py-1 ml-2 bg-gray-200 rounded-md hover:bg-gray-300"
        previousLabel="< previous"
        nextLabel="next >"
      />
      </div>
    </div>
  );
};

export default OrderTab;

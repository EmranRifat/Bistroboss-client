import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import qutes from "../../../assets/home/qutes.png";
const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="py-12">
      <SectionTitle
        subHeading={"What Our Clients Say"}
        heading={"Testimonials"}
      />
      <div className="mt-8">
        <Swiper
          autoplay={{
            delay: 3000,
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="md:mx-20 md:px-36 px-24 md:p-8 flex flex-col items-center lg:px-12 xl:px-24">
                <Rating
                  className="md:mb-4"
                  style={{ maxWidth: 160 }}
                  value={review.rating}
                  readOnly
                />
                <img className="py-4 md:h-24 h-20 " src={qutes} alt="" />
                <p className="text-lg lg:text-xl">{review.details}</p>
                <h3 className="text-lg lg:text-xl text-orange-400">
                  {review.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;

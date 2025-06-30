import React, { useState, useEffect } from "react";
import "./StatusDetails.css";
import post1 from "../../../../Assets/postdetails/post1.png";
import post2 from "../../../../Assets/postdetails/post2.png";
import post3 from "../../../../Assets/postdetails/post3.jpg";
import post4 from "../../../../Assets/postdetails/post4.jpg";
import post5 from "../../../../Assets/postdetails/post5.png";
import post6 from "../../../../Assets/postdetails/post6.png";
import post7 from "../../../../Assets/postdetails/post7.jpg";
import post8 from "../../../../Assets/postdetails/post8.jpg";
import post9 from "../../../../Assets/postdetails/post9.jpg";
import post10 from "../../../../Assets/postdetails/post10.jpg";
import post11 from "../../../../Assets/postdetails/post11.jpg";
import post12 from "../../../../Assets/postdetails/post12.jpg";

const StatusDetails = () => {
  const StatusData = [
    {
      id: 1,
      img: post1,
      title: "Beautiful Sunset",
      images: [post1, post2, post3],
    },
    {
      id: 2,
      img: post2,
      title: "Nature Walk",
      images: [post4, post5],
    },
    {
      id: 3,
      img: post3,
      title: "Beach Day",
      images: [post6, post7],
    },
    {
      id: 4,
      img: post4,
      title: "Mountain Hike",
      images: [post8],
    },
    {
      id: 5,
      img: post5,
      title: "City Lights",
      images: [post9, post10, post11],
    },
    {
      id: 6,
      img: post6,
      title: "Morning Coffee",
      images: [post12],
    },
    {
      id: 7,
      img: post7,
      title: "Snowy Peaks",
      images: [post3, post6],
    },
    {
      id: 8,
      img: post8,
      title: "Desert Safari",
      images: [post1, post4, post8],
    },
    {
      id: 9,
      img: post9,
      title: "Evening Ride",
      images: [post2, post7, post11],
    },
    {
      id: 10,
      img: post10,
      title: "Golden Hour",
      images: [post5, post10],
    },
    {
      id: 11,
      img: post11,
      title: "Lakeside Calm",
      images: [post9, post12],
    },
    {
      id: 12,
      img: post12,
      title: "Starry Night",
      images: [post11, post12],
    },
  ];

  const [activeStatus, setActiveStatus] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeStatus && activeStatus.images.length > 0) {
      const timer = setTimeout(() => {
        if (currentIndex < activeStatus.images.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeStatus, currentIndex]);

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    setCurrentIndex(0);
  };

  const goNext = () => {
    if (currentIndex < activeStatus.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const closeViewer = () => {
    setActiveStatus(null);
    setCurrentIndex(0);
  };

  return (
    <div className="mian_status_container">
      <div className="inner_div_of_status_">
        <div className="status_list_container">
          {StatusData.map((status) => (
            <div
              key={status.id}
              className="Status_item_container"
              onClick={() => handleStatusClick(status)}
            >
              <div className="Status_img">
                <img src={status.img} alt={status.title} />
              </div>
              <div className="status_title">
                <h2>{status.title}</h2>
              </div>
            </div>
          ))}
        </div>

        {activeStatus && (
          <div className="status_details_show">
            <div className="story_progress_bar_container">
              {activeStatus.images.map((_, i) => (
                <div
                  key={i}
                  className={`story_progress_bar ${
                    i < currentIndex ? "filled" : ""
                  } ${i === currentIndex ? "active" : ""}`}
                ></div>
              ))}
            </div>

            <div className="close_btn" onClick={closeViewer}>
              ×
            </div>

            <div className="status_img_show">
              <div className="click_area left" onClick={goPrev}></div>
              <img src={activeStatus.images[currentIndex]} alt="" />
              <div className="click_area right" onClick={goNext}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusDetails;

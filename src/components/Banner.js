import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import SideImg from "../Assets/sideImg3.jpg";

function Banner() {
  // make a dynamic text
  const Words = ["Collaboration", "Union", "Community", "Power", "Liaison"];
  const Colors = ["red", "green", "tomato", "black"];
  const [change, setchnage] = useState(false);

  let Word = "";

  const MakeDynamic = () => {
    for (let index = 0; index < Words.length; index++) {
      const RandomWord = Math.floor(Math.random() * Words.length);
      // const RandomColor = Math.floor(Math.random() * Colors.length);
      return (Word = Words[RandomWord]);
    }
  };

  // use the combinations of useEffect and settimeout function to produces such a king of dynamic content
  useEffect(() => {
    setTimeout(() => {
      setchnage(!change);
      MakeDynamic();
    }, 1000);
  }, [change]);

  return (
    <>
      <div className="row" id="banner">
        <div
          className="col-md-12 mx-auto d-flex flex-column align-items-center justify-content-center"
          id="Banner"
        >
          <div className="row m-3">
            <div
              className="col-md-6 mx-auto d-flex flex-column align-items-start justify-content-center py-4 rounded"
              // style={{ backgroundColor: "rgb(161,216,197)"}}
            >
              <p
                className="display-3 fw-bold text-start"
                style={{ color: "rgb(250,165,40)" }}
              >
                Beside Compitation, We make here Massive
                <span className="text-primary">
                  {" "}
                  <br />
                  {MakeDynamic()} !
                </span>
              </p>
              <br />
              <div className="actionBtn d-flex flex-row gap-3">
                <Link to="/AskLectures">
                  <button className="btn btn-primary btn-lg">
                    Ask Your Lectures
                    <span className="fs-4 ms-3">
                      <FaChalkboardTeacher />
                    </span>
                  </button>
                </Link>
                <Link to="/AskLectures">
                  <button className="btn btn-outline-primary btn-lg">
                    Find Lectures
                    <span className="fs-4 ms-3">
                      <FaChalkboardTeacher />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <img src={SideImg} alt="img" className="img-fluid w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;

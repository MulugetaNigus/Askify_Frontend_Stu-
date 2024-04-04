import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import sampleImg from "../Assets/userProfile.png";
import Footer from "../components/Footer";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";

function Lectures() {
  // incomming data holder
  const [Lectures, setLectures] = useState([]);

  // fetch the lectures info at the staring point of the page loading using useEffect()
  useEffect(() => {
    const getAllLectures = async () => {
      await axios
        .get("https://studaskify.onrender.com/api/v1/Alllectureinfo")
        .then((result) => {
          console.log(result.data);
          setLectures(result.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getAllLectures();
  }, []);

  // get a single lecture data
  const handleGetSingleLecture = (id) => {
    try {
      axios
        .get(`https://studaskify.onrender.com/api/v1/getLecture/${id}`)
        .then((result) => {
          console.log(result.data);
          window.localStorage.setItem(
            "SingleLecturename",
            result.data.username
          );
          window.localStorage.setItem("SingleLecturSkill", result.data.Skill);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Nav />

      <div className="row m-1">
        <div className="col-md-12 bg-light p-1 d-flex flex-row align-items-center justify-content-center mt-4">
          <h2 className="text-dark fw-bold display-3">
            Lectures ready to{" "}
            <span className="text-primary fw-bold display-1">assist</span> you
            <span className="display-1 ms-3">
              <IoSpeedometerOutline />
            </span>
          </h2>
        </div>
        {Lectures &&
          Lectures.map((lecture) => (
            <div className="row gap-2 mt-3">
              <div className="col-md-4 mx-auto d-flex flex-column align-items-center justify-content-center text-center border border-light bg-light bg-opacity-100 shadow border-opacity-25 rounded">
                <img src={sampleImg} alt="user_profile" className="img-fluid w-25 mb-3" />
                <p className="fw-normal fs-4">
                  <span className="mx-2 fs-4">
                    <FaRegUser />
                  </span>{" "}
                  :{" "}
                  <span className="text-primary fw-bold">{lecture.username}</span>
                </p>
                <p className="fw-normal fs-4">
                  <span className="mx-2 fs-4">
                    <LiaChalkboardTeacherSolid />
                  </span>{" "}
                  : <span className="text-primary fw-bold">{lecture.Skill}</span>
                </p>
                <a href="/LecturesDetail" className="w-100" id="AskHimBtn">
                  <button
                    className="btn btn-outline-primary btn-lg w-100  my-2"
                    onClick={() => handleGetSingleLecture(lecture._id)}
                  >
                    Ask Him <IoIosArrowForward />
                  </button>
                </a>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default Lectures;

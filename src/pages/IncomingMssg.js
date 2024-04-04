import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
// import img from "../Assets/user.jpg";
import { FiEye } from "react-icons/fi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FiUserCheck } from "react-icons/fi";
import axios from "axios";

// user name
const userUsername = window.localStorage.getItem("username");

function IncomingMssg() {
  const [answers, setanswers] = useState([]);

  // use useEffect to fetch the data
  useEffect(() => {
    const getResponses = async () => {
      await axios
        .get("https://studaskify.onrender.com/api/v1/responses")
        .then((result) => {
          console.log(result.data);
          if (result.data[0].user === userUsername) {
            setanswers(result.data);
            window.localStorage.setItem("NumOfIncommingResponses" , result.data.length);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getResponses();
  }, []);

  // try to view the incomming message
  const navigate = useNavigate();
  const handleToViewAnswers = async (id) => {
    window.localStorage.setItem("IncommingMssgUniqueID" , id);
    navigate("/Responses");
  };

  return (
    <>
      <Nav />
      {/* starter */}
      <div className="row headerTitle mt-3">
        <div className="col-md-10 mx-auto">
          <p className="display-4 fw-bold text-primary">
            Incoming Responses{" "}
            <span className="display-3">
              <RiQuestionAnswerLine />
            </span>
          </p>
        </div>
      </div>
      {/* mai body */}
      {/* <div className="row m-2 mt-1"> */}
      {answers &&
        answers.map((user) => (
          <>
            <div className="col-md-10 d-flex mb-3 mx-auto bg-danger bg-opacity-25 border border-light border-opacity-25 p-4 shadow rounded align-items-center justify-content-between">
              <div className="row"></div>
              <div className="col-md-6 my-3">
                <div className="row d-flex flex-row align-items-center justify-content-center">
                  <div className="col-md-12 text-start d-flex flex-row align-items-center justify-content-center gap-3">
                    <div className="detail">
                      <h4 className="text-primary">
                        {" "}
                        <span className="fs-3">
                          <FiUserCheck />
                        </span>{" "}
                        {user.lecture}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex flex-row align-items-center justify-content-center">
                {/* <Link to="/Responses"> */}
                <button
                  className="btn btn-primary w-100 btn-lg"
                  onClick={() => handleToViewAnswers(user._id)}
                >
                  View Detail{" "}
                  <span className="fs-3">
                    <FiEye />
                  </span>
                </button>
                {/* </Link> */}
              </div>
            </div>
            {/* </div> */}
          </>
        ))}
      {/* </div> */}
    </>
  );
}

export default IncomingMssg;

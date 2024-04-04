import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";


function IncomingResponses() {
  const [IncommingResponses, setIncommingResponses] = useState([]);
  const [message , setmessage] = useState("");

  // fetch all data from our db
  // try to view the incomming message
  const navigate = useNavigate();
  useEffect(() => {
    // get the user id from our localstorage
    const iddss = window.localStorage.getItem("IncommingMssgUniqueID");
    const handleToViewAnswers = async (id) => {
      try {
        await axios
          .get("https://studaskify.onrender.com/api/v1/" + iddss)
          .then((result) => {
            setIncommingResponses(result.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    handleToViewAnswers();
  }, []);


  // replay fot the lectures
  const handleToSendMessg = async () => {
    // setloading(true);
    try {
      // validate the user inputs
      if (!message) {
        // setloading(false);
        return alert("empty message not allowed !");
      }

      // make an object, its contain username , message , lecname;
      const Ready2Send = {
        lecture: window.localStorage.SingleLecturename + "_" + uuidv4(),
        message: message,
        user: window.localStorage.getItem("username") + "_" + uuidv4(),
      };

      await axios
        .post("https://studaskify.onrender.com/api/v1", Ready2Send)
        .then(() => {
          // setloading(false);
          alert("Message submitted !");
          // console.log(result.data);
          navigate("/AskLectures");
          setmessage("");
        })
        .catch((err) => {
          // setloading(false);
          alert("something went wrong, pleasae try again !");
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Nav />
      <div className="row">
        <div className="col-md-12 d-flex flex-column align-items-start justify-content-start mt-3">
          <p className="ms-3 display-5 fw-bold text-primary">
            Responses from your instructor{" "}
            <span className="h2">
              <MdOutlineAssignmentReturned />
            </span>
          </p>
          {/* <hr /> */}
          {/* {
            IncommingResponses &&
            IncommingResponses.map( (mssg) => ( */}
          <p className="text-muted fs-5 fw-normal text-start ms-2 border border-light rounded p-2">
            {IncommingResponses.message}
          </p>
          {/* )) */}
          {/* }  */}
        </div>
      </div>
      <hr />
      <h4 className="ms-4 text-start">If You Want, Replay Here:</h4>
      <div className="row m-2">
        <div className="col-md-8">
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            className="form-control my-2 border-info fw-bold rounded p-2 border-opacity-25 fs-5"
            placeholder="Write Down Your Answer Here..."
            onChange={(e) => setmessage(e.target.value)}
            value={message}
          />
          <div className="actionBtn d-flex flex-row align-items-start justify-content-start">
            <button
              className="btn btn-primary btn-lg mt-2"
              onClick={() => handleToSendMessg()}
            >
              Replay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomingResponses;

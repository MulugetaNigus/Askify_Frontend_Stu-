import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import img from "../Assets/user.jpg";
import Footer from "../components/Footer";
import { GoQuestion } from "react-icons/go";
import { RiMailSendLine } from "react-icons/ri";
import { RiToolsLine } from "react-icons/ri";
import { FiUserCheck } from "react-icons/fi";
import { MdMoreTime } from "react-icons/md";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function LetctureDetail() {
  // to track the message box weather the box empty or not !
  const [isEmptyMessg, setisEmptyMessg] = useState("");
  const [loading, setloading] = useState(false);

  // send messages here
  const navigate = useNavigate();
  const handleSendMessage = async () => {
    setloading(true);
    try {
      // validate the user inputs
      if (!isEmptyMessg) {
        setloading(false);
        return alert("empty message not allowed !");
      }

      // make an object, its contain username , message , lecname;
      const Ready2Send = {
        lecture: window.localStorage.SingleLecturename + "_" + uuidv4(),
        message: isEmptyMessg,
        user: window.localStorage.getItem("username") + "_" + uuidv4(),
      };

      await axios
        .post("https://studaskify.onrender.com/api/v1/", Ready2Send)
        .then((result) => {
          setloading(false);
          alert("Message submitted !");
          // console.log(result.data);
          navigate("/AskLectures");
          setisEmptyMessg("");
        })
        .catch((err) => {
          setloading(false);
          alert("something went wrong, pleasae try again !");
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // ai detector functions to detect the ai generated txt !
  // async function run(text) {
  //     try {
  //         const response = await axios.post(
  //             'https://api.sapling.ai/api/v1/aidetect',
  //             {
  //                 key: 'RDEDDDHJEQOJ6LSIHWP4QV4C28IARVPA',
  //                 text,
  //             },
  //         );
  //         const {status, data} = response;
  //         console.log({status});
  //         console.log(JSON.stringify(data, null, 4));
  //     } catch (err) {
  //         const { msg } = err.response.data;
  //         console.log({err: msg});
  //     }
  // }
  // in below pass the text if you want to detect by ai detector model
  // run("The sun dipped below the horizon, painting the sky in hues of pink and gold. A gentle breeze rustled the leaves, creating a soothing melody in the quiet evening. I closed my eyes and let the tranquility of the moment wash over me. The scent of blooming flowers filled the air, carrying with it a sense of peace and contentment. In that fleeting moment, all worries and troubles seemed to fade away. The world felt still and serene, as if time itself had paused to appreciate the beauty of the world. I savored the moment, grateful for the simple joys that nature offered. The soft glow of twilight enveloped me, wrapping me in a comforting embrace. It was a moment of pure bliss, a moment to cherish and hold dear in my heart. And as the stars began to twinkle in the darkening sky, I felt a deep sense of gratitude for the beauty that surrounded me.");

  return (
    <>
      {/* navigation */}
      <Nav />

      {/* user header information */}
      <div
        className="row m-2 mx-auto d-flex flex-row align-items-center justify-content-evenly w-100 p-3 rounded"
        style={{ backgroundColor: "rgb(6 200 235)" }}
      >
        <div className="col-md-12 mx-auto d-flex flex-row align-items-center justify-content-between">
          <div className="row">
            <div className="col-md-12 d-flex flex-column align-items-start justify-content-start ms-2">
              <div className="person d-flex flex-row">
                <h5 className="text-light">
                  <span className="fs-3">
                    <FiUserCheck />{" "}
                    <b>{window.localStorage.getItem("SingleLecturename")}</b>
                  </span>{" "}
                </h5>
              </div>
              <div className="skills d-flex flex-row alignn-items-start justify-content-start gap-1">
                <span className="fs-3">
                  <RiToolsLine />{" "}
                </span>
                <h6 className="text-light border border-secondary border-opacity-25 bg-primary bg-opacity-25 rounded py-1 px-2">
                  Skills: {window.localStorage.getItem("SingleLecturSkill")}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* message center */}
      <div className="row m-1 mt-5">
        <div className="col-md-8 text-start">
          <label
            htmlFor="message"
            className="d-flex flex-row align-items-start text-secondary fs-4 rounded mb-2 p-2 text-light"
            style={{ backgroundColor: "rgb(6 200 235)" }}
          >
            Write Your Question Here : {" "}
            <span className="fs-3 ms-2">
              <GoQuestion />
            </span>
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="15"
            className="form-control border border-primary border-opacity-50 fs-5"
            placeholder="How can i debug my javascript code in easy way..."
            value={isEmptyMessg}
            onChange={(e) => setisEmptyMessg(e.target.value)}
          />
          {loading ? (
            <button className="btn btn-light text-dark btn-lg fs-4 my-3 mb-5">
              loading...
            </button>
          ) : (
            <button
              className="btn btn-outline-danger btn-lg fs-4 my-3 mb-5"
              onClick={() => handleSendMessage()}
            >
              Send <RiMailSendLine />
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LetctureDetail;

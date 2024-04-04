import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import logo from "../Assets/landing-page-3.jpg";
// import AuthImg from "./locker.png";

function UserReg() {
  const [Username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  // create a new user
  const navigate = useNavigate();
  const handleRegister = async () => {
    setloading(true);
    setTimeout(async () => {
      try {
        if (!Username || !email || !password) {
          return seterror(true);
          // return alert("All fields are required!");
        }

        // register user in our localstorage
        window.localStorage.setItem("AskiUser", Username);

        const newUser = {
          username: Username,
          email: email,
          password: password,
        };

        await axios
          .post("https://studaskify.onrender.com/api/v1/register", newUser)
          .then((result) => {
            console.log(result.data);
            setloading(false);
            alert("Registration Completed!");
            navigate("/login");
            setUsername("");
            setemail("");
            setPassword("");
          })
          .catch((err) => {
            console.log(err.message);
            setloading(false);
            alert("user aleady exist !");
          });
      } catch (error) {
        console.error(error.message);
        setloading(false);
        alert("something went wrong, please try again !");
      }
    }, 3000);
  };

  return (
    <>
      <div className="row m-3 mt-5">
        <div className="col-md-2"></div>
        <div
          className="col-md-3 border border-secondary border-opacity-25 bg-light bg-opacity-25 p-3 rounded
                      d-flex flex-column align-items-center justify-content-center
        "
          id="signIn"
        >
          <img
            src={logo}
            alt="logo"
            className="img-fluid"
            style={{ width: "900px" }}
          />
          <p className="display-3 fw-bold text-primary">
            Sign<span className="text-dark">Up</span> Here
          </p>
          {/* <Link to="/login" className="w-100 mt-5"><button className="btn btn-outline-primary btn-lg w-100">SignIn</button></Link> */}
        </div>
        <div
          className="col-md-5 mx-auto border border-secondary border-opacity-25 bg-light bg-opacity-25 p-3 rounded"
          id="UserReg"
        >
          <div className="row">
            <div className="col-md-12 mx-auto">
              {/* <p className="display-4 fw-bold mb-3" id="authTitle">
              Askify
                {/* <img src={AuthImg} alt="AuthImg" className="img-fluid" style={{width: "70px"}} /> */}
              {/* </p> */}
              {/* <img
                src={logo}
                alt="logo"
                className="img-fluid"
                style={{ width: "300px" }}
              /> */}
              {/* <div class="form-check form-switch display-6">
                  <label class="form-check-label" for="flexSwitchCheckChecked">Auth</label>
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
                  </div> */}
            </div>
          </div>
          <span
            htmlFor="username"
            className="fw-bold fs-6 d-flex flex-row align-items-start ms-1"
            style={{ color: error && "red" }}
          >
            Username{" "}
          </span>
          <input
            type="text"
            className="form-control form-control-lg bg-light bg-opacity-100"
            placeholder="Joen Due"
            // {...register("firstname")}
            onChange={(e) => setUsername(e.target.value)}
            required
            value={Username}
            style={{ border: error && "0.5px solid red" }}
          />
          {error && (
            <p className="text-danger fw-light d-flex flex-row">
              username required
            </p>
          )}
          <span
            htmlFor="username"
            className="fw-bold fs-6 d-flex flex-row align-items-start ms-1 mt-2"
            style={{ color: error && "red" }}
          >
            email
          </span>
          <input
            type="email"
            className="form-control form-control-lg bg-light bg-opacity-100 mb-2"
            placeholder="JoenDue@gmail.com"
            // {...register("lastname")}
            onChange={(e) => setemail(e.target.value)}
            required
            value={email}
            style={{ border: error && "0.5px solid red" }}
          />
          {error && (
            <p className="text-danger fw-light d-flex flex-row">
              email required
            </p>
          )}
          <span
            htmlFor="username"
            className="fw-bold fs-6 d-flex flex-row align-items-start ms-1"
            style={{ color: error && "red" }}
          >
            password
          </span>
          <input
            type="password"
            className="form-control form-control-lg bg-light bg-opacity-100"
            placeholder="*************"
            // {...register("lastname")}
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            style={{ border: error && "0.5px solid red" }}
          />
          {error && (
            <p className="text-danger fw-light d-flex flex-row">
              password required
            </p>
          )}
          <br />
          {loading ? (
            <div className="animate">
              <button className="btn btn-light text-danger btn-lg w-100 border border-light fw-normal">
                loading...{" "}
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleRegister()}
              className="btn btn-primary btn-lg w-100 text-light border border-secondary border-opacity-25 fw-normal"
            >
              Register{" "}
              <span className="fs-3">
                <PiTrademarkRegisteredLight />
              </span>
            </button>
          )}
          <div className="row mb-5">
            <div className="col-md-12 text-start mt-3">
              <Link to="/login">Already Have An Account?</Link>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
}

export default UserReg;

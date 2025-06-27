/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./LoginPage.scss";

import { LuListTodo } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [ID, setID] = useState("Sampurn");
  const [password, setPassword] = useState("123");
  const [mailValue, SetmailValue] = useState("");
  const [passVal, setPassVal] = useState("");

  const emailcapute = (e) => {
    SetmailValue(e.target.value);
  };

  const passcapture = (e) => {
    setPassVal(e.target.value);
  };

  const authen = () => {
    if (ID === mailValue && password === passVal) {
      toast.success("✅ Login Successful!", {
        position: "bottom-right",
      });
    } else {
      toast.error("Account not found", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <ToastContainer limit={1} />

      <main>
        <div id="left">
          <div id="top">
            <h2>
              <LuListTodo />
              <span>FlowTask</span>
            </h2>

            <h1>Sign in</h1>
            <p>
              Don’t have an account? <span>Create now</span>
            </p>
          </div>

          <div id="input">
            <form>
              <h5>Email / Username</h5>
              <input
                onChange={emailcapute}
                type="text"
                placeholder="Email / Username"
                value={mailValue}
              />
              <h5>Password</h5>
              <input
                onChange={passcapture}
                type="password"
                placeholder="Password"
                value={passVal}
              />
              <div id="createAcc">
                <h5>Don’t have an account?</h5>
                <h5 id="makeacc">Create account</h5>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  authen(); 
                }}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>

        <div id="right"></div>
      </main>
    </>
  );
}

export default LoginPage;

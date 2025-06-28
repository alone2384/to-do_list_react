import React, { useState } from "react";
import "./LoginPage.scss";
import Vaul from "./Vaul";
import { LuListTodo } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [mailValue, setMailValue] = useState("");
  const [passVal, setPassVal] = useState("");

  // 🔁 Store all user info in one array
  const [userArr, setUserArr] = useState([]);


  
  const handleLogin = () => {
    const user = userArr.find(
      (u) =>
        (u.email === mailValue || u.username === mailValue) &&
        u.password === passVal
    );

    if (user) {
      toast.success("✅ Login Successful!", { position: "bottom-right" });
    } else {
      toast.error("❌ Invalid ID or Password", { position: "bottom-right" });
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
              Don’t have an account?{" "}
              <Vaul setUserArr={setUserArr} />
            </p>
          </div>

          <div id="input">
            <form>
              <h5>Email / Username</h5>
              <input
                type="text"
                placeholder="Email / Username"
                value={mailValue}
                onChange={(e) => setMailValue(e.target.value)}
              />
              <h5>Password</h5>
              <input
                type="password"
                placeholder="Password"
                value={passVal}
                onChange={(e) => setPassVal(e.target.value)}
              />
              <div id="createAcc">
                <h5>Can't remember your password?</h5>
                <h5 id="makeacc">Forgot Password</h5>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
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

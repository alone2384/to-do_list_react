import React, { useState } from "react";
import "./LoginPage.scss";
import Vaul from "./signup";
import { LuListTodo } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react"; // already imported if not, make sure it is

function LoginPage() {
  const [mailValue, setMailValue] = useState("");
  const [passVal, setPassVal] = useState("");

  const [userArr, setUserArr] = useState(() => {
    const savedUsers = localStorage.getItem("userArr");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    // localStorage.setItem("userArr", JSON.stringify(userArr));

    const handleKeyCombo = (e) => {
      if (e.ctrlKey && e.code === "Space") {
        const onC = (e2) => {
          if (e2.key.toLowerCase() === "c") {
            localStorage.clear();
            toast.info("🧹 LocalStorage cleared!", {
              position: "bottom-right",
            });
            window.removeEventListener("keydown", onC); // clean up
          }
        };
        window.addEventListener("keydown", onC);
      }
    };

    window.addEventListener("keydown", handleKeyCombo);

    return () => {
      window.removeEventListener("keydown", handleKeyCombo);
    };
  }, []);

  const [loginCheck, setLoginCheck] = useState(() => {
    const stored = localStorage.getItem("loginCheck");
    return stored ? JSON.parse(stored) : 0;
  });
  useEffect(() => {
    localStorage.setItem("loginCheck", JSON.stringify(loginCheck));
  }, [loginCheck]);

  const handleLogin = () => {
    const user = userArr.find(
      (u) =>
        (u.email === mailValue || u.username === mailValue) &&
        u.password === passVal
    );

    if (user) {
      toast.success("✅ Login Successful!", { position: "bottom-right" });
      setLoginCheck(1);
      window.location.reload();
    } else {
      toast.error("❌ Invalid ID or Password", { position: "bottom-right" });
    }
  };
  const Afterlogin = {
    display: loginCheck === 1 ? "none" : "flex",
  };
  return (
    <>
      <ToastContainer limit={10} />
      <main style={Afterlogin}>
        <div id="left">
          <div id="top">
            <h2>
              <LuListTodo />
              <span>FlowTask</span>
            </h2>

            <h1>Sign in</h1>
            <p>
              Don’t have an account?{" "}
              <Vaul setUserArr={setUserArr} userArr={userArr} />
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
                  // console.log(userArr);
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

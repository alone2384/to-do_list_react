"use client";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import "./signup.scss";

export default function Vaul({ setUserArr, userArr }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, username, password };

    setUserArr((prev) => [...prev, newUser]);

    // Reset
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    localStorage.setItem("userArr", JSON.stringify(userArr));
  }, [userArr]);

  return (
    <Drawer.Root>
      <Drawer.Trigger className="drawer-trigger">Create account</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <div className="drawer-inner">
            <div aria-hidden className="drawer-bar" />
            <Drawer.Title className="drawer-title">
              Create your account
            </Drawer.Title>

            <form className="signup-form" onSubmit={handleSubmit}>
              <label className="signup-label">
                Name
                <input
                  type="text"
                  placeholder="Full Name"
                  className="signup-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="signup-label">
                Email
                <input
                  type="email"
                  placeholder="Email"
                  className="signup-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="signup-label">
                Username
                <input
                  type="text"
                  placeholder="Username"
                  className="signup-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label className="signup-label">
                Password
                <input
                  type="password"
                  placeholder="Password"
                  className="signup-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <Drawer.Close asChild>
                <button
                  type="submit"
                  className="signup-button"
                >
                  Sign up
                </button>
              </Drawer.Close>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

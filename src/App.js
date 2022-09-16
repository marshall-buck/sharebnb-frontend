import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./routes-nav/NavBar";
import RoutesList from "./routes-nav/RoutesList";
import LoadingSpinner from "./common/LoadingSpinner";
import ShareBnB from "./api/api";
import { BrowserRouter } from "react-router-dom";

import UserContext from "./auth/UserContext";
import decode from "jwt-decode";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "sharebnb-token";

function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);


  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decode(token);
            // put the token on the Api class so it can use it to call the API.
            ShareBnB.token = token;
            let currentUser = await ShareBnB.getCurrentUser(username);

            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser({
              infoLoaded: true,
              data: null
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    },
    []
  );


  /** Handles site-wide logout. */
  function logout() {
    // setApplicationIds(new Set([]));
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function signup(signupData) {
    let token = await ShareBnB.register(signupData);
    setToken(token);
  }

  /** Handles site-wide login.
   *
   * Logs in a user
   *
   * Make sure you await this function to see if any error happens.
   */
  async function login(loginData) {
    console.log(loginData);
    let token = await ShareBnB.login(loginData);
    setToken(token);
  }

  async function createProperty(formData) {
    let property = await ShareBnB.createProperty(formData);
    return property;

  }

  async function uploadImages(formData) {
    const property = await ShareBnB.uploadImages(formData);
    return property;
  }

  async function sendMsg(formData) {
    const message = await ShareBnB.sendMessage(formData);
    return message;
  }

  if (!currentUser.infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App"
      style={{
        backgroundImage: `url("background.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        height: "100vh"
      }}>
      <UserContext.Provider
        value={{
          currentUser: currentUser.data
        }}
      >
        <BrowserRouter>

          <NavBar logout={logout} />
          <RoutesList
            currentUser={currentUser.data}
            login={login}
            signup={signup}
            createProperty={createProperty}
            uploadImages={uploadImages}
            sendMsg={sendMsg} />

        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

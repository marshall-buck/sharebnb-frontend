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

/** ShareBnb App
 *
 *
 * Context:
 * -currentUser.data: {userName, firstName, lastName, emailAddress}
 *
 * State:
 *   - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app,
 *   infoLoaded: has user data been pulled from API?
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *
 *
 */

function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /*  Load user info from API. Until a user is logged in and they have a token,
    this should not run. It only needs to re-run when a user logs out, so
     the value of the token is a dependency for this effect.
  */
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
    [token]
  );



  /***************AUTH FUNCTIONS**********************/
  /** Handles site-wide logout. */
  function logout() {
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
   */
  async function signup(signupData) {
    let token = await ShareBnB.register(signupData);
    setToken(token);
  }

  /** Handles site-wide login.
   *
   * Logs in a user, sets token
   *
   */
  async function login(loginData) {
    let token = await ShareBnB.login(loginData);
    setToken(token);
  }



  /*************PROPERTY FUNCTIONS********************** */

  /* Calls api to create a property and returns property */
  async function createProperty(formData) {
    let property = await ShareBnB.createProperty(formData);
    return property;

  }
  /* Calls api to upload and image and returns property with new image */
  async function uploadImages(formData) {
    const property = await ShareBnB.uploadImages(formData);
    return property;
  }

  /* Calls api to sendMsg, and returns message */
  async function sendMsg(formData) {
    const message = await ShareBnB.sendMessage(formData);
    return message;
  }

  if (!currentUser.infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App"
    // style={{
    //   backgroundImage: `url("background.jpg")`,
    //   backgroundSize: "cover",
    //   backgroundRepeat: "repeat-y",
    //   height: "100vh"
    // }}
    >
      <UserContext.Provider
        value={{
          currentUser: currentUser.data,

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

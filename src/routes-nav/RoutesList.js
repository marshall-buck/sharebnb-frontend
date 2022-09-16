
import { Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";

import CreatePropertyForm from "../properties/CreatePropertyForm";
import PropertyList from "../properties/PropertyList";
import PropertyDetails from "../properties/PropertyDetails";
import Homepage from "../Homepage";
import UserDetails from "../user/UserDetails";
import SendMessageForm from "../messages/SendMessageForm";
import MessageList from "../messages/MessageList";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in.
 *
 * Visiting a non-existent route navigates to the homepage.
 * Props:
 * -currentUser
 * - login fn()
 * - createProperty fn()
 * - uploadImages fn()
 * - sendMsg fn()
 *
 */

function RoutesList({
  currentUser, login, signup, createProperty, uploadImages, sendMsg
}) {
  return (
    <div className="pt-5">
      <Routes>
        <Route path="/" element={<Homepage />} />
        {!currentUser &&
          <>
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route path="/login" element={<LoginForm login={login} />} />
          </>
        }
        {currentUser &&
          <>
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/add" element={<CreatePropertyForm
              createProperty={createProperty}
              uploadImages={uploadImages} />}
            />
            <Route path="/properties/:id" element={<PropertyDetails sendMsg={sendMsg} />} />
            <Route path="/profile" element={<UserDetails />} />
            <Route path="/messages/" element={<MessageList />} />
            <Route path="/messages/send" element={<SendMessageForm
              sendMsg={sendMsg} />} />

          </>
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutesList;

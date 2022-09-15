import { Routes, Route } from "react-router-dom";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";


import CreatePropertyForm from "../properties/CreatePropertyForm";



/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in.
 *
 * Visiting a non-existent route navigates to the homepage.
 */

function RoutesList({ login, signup, currentUser, uploadImages, createProperty }) {


  return (
    <div className="pt-5">
      <Routes>

        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/login" element={<LoginForm login={login} />} />

        <Route path="/properties/add" element={<CreatePropertyForm
          createProperty={createProperty} uploadImages={uploadImages} />} />

      </Routes>
    </div>
  );
}

export default RoutesList;



/**
 *
 *   <Routes>
        {!currentUser &&
        <>
          <Route path="/login"element={<LoginForm login={login} />} />
          <Route path="/signup"element={<SignupForm signup={signup} />} />
        </>
        }

        <Route path="/"element={<Homepage />} />

        {currentUser &&
        <>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/profile" element={<ProfileForm />} />

        </>
      }

        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
 */
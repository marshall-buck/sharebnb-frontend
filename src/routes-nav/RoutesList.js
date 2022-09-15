
import { Routes, Route } from "react-router-dom";


// import LoginForm from "../auth/LoginForm";

import SignupForm from "../auth/SignupForm";



/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in.
 *
 * Visiting a non-existant route navigates to the homepage.
 */

function RoutesList({ login, signup, currentUser }) {
  // console.debug(
  //   "Routes",
  //   `login=${typeof login}`,
  //   `register=${typeof register}`,
  // );

  return (
    <div className="pt-5">
      <Routes>

        <Route path="/signup" element={<SignupForm signup={signup} />} />

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
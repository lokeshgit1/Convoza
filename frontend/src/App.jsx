import { useAuth } from '@clerk/clerk-react';
import React, { use } from 'react'
//import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import * as Sentry from "@sentry/react";
import CallPage from './pages/CallPage';


const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);


<<<<<<< HEAD


=======
/**
 * Root application component that renders auth-aware routes and a Sentry test button.
 *
 * When the user is signed in, renders instrumented routes (via SentryRoutes) that show
 * HomePage at "/" and redirect "/auth" to "/". When the user is signed out, renders
 * instrumented routes that show AuthPage at "/auth" and redirect any other path to "/auth".
 * Includes a developer-facing button that throws an Error ("Test Sentry Error") to verify
 * Sentry error capture.
 *
 * @returns {JSX.Element} The app's top-level React element.
 */
>>>>>>> 45b6777e26171b7233848a226b0a39319361ee35
export default function App() {
  const { isSignedIn,isLoaded } = useAuth();

  if(!isLoaded){
    return null;
  }

  return (
    <>

      <SentryRoutes>
        <Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to="/" replace />} />

        <Route path="/call/:id" element={isSignedIn ? <CallPage /> : <Navigate to="/auth" replace />} />
        <Route 
        path="*" element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />} />
      </SentryRoutes>

    </>
  );
};


//first version of the routing code
//  <SignedIn>
//         <SentryRoutes>
//         <Route path="/" element={<HomePage/>} />
//         <Route path="/auth" element={<Navigate to={"/"} replace />} />
//         </SentryRoutes>
//       </SignedIn>

//       <SignedOut>
//         <SentryRoutes>
//           <Route path="/auth" element={<AuthPage/>} />
//           <Route path="*" element={<Navigate to="/auth" replace />} />
//         </SentryRoutes>
//       </SignedOut>

import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import * as Sentry from "@sentry/react";
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);


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
export default function App() {
 
  return (
    <>
    <button
      onClick={() => {
        throw new Error("Test Sentry Error");
      }}
      >
      throw  Error</button>

      <SignedIn>
        <SentryRoutes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </SentryRoutes>
      </SignedIn>

      <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </SentryRoutes>
      </SignedOut>
    </>
  );
};

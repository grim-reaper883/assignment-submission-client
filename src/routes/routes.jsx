import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Assignment from "../pages/Assignment"
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Submission from "../pages/Submission";
import ProtectedRoute from "../components/ProtectedRoute";
import ManageAssignments from "../pages/ManageAssignments";
import ReviewSubmissions from "../pages/ReviewSubmissions";
import AddAssignment from "../pages/AddAssignment";
import SubmissionForm from "../pages/SubmissionForm";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Main /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'assignment',
        element: <Assignment />
      },
      {
        path: 'submission',
        element: <Submission />
      },
      {
        path: 'manageAssignments',
        element: <ManageAssignments />
      },
      {
        path: 'addAssignment',
        element: <AddAssignment />
      },
      {
        path: 'submissionForm',
        element: <SubmissionForm />
      },
      {
        path: 'reviewSubmissions',
        element: <ReviewSubmissions />
      },
    ]
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
]);
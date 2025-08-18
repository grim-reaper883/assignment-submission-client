import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:5000/assignments")
      .then(res => setAssignments(res.data))
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    axios.get("http://localhost:5000/submissions")
      .then(res => {
        const mine = res.data.filter(s => s.submittedBy === user.email);
        setMySubmissions(mine);
      });
  }, [user?.email]);

  const submittedAssignmentIds = useMemo(() => new Set(mySubmissions.map(s => s.assignmentId)), [mySubmissions]);


  return (
    <div>
      <div className="text-center text-white mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Assignments
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              assignments.map((assignments, index) => <tr key={assignments._id}>
                <th>{index + 1}</th>
                <td>{assignments.title}</td>
                <td>{assignments.description}</td>
                <td>{assignments.deadline}</td>
                <td>
                  {submittedAssignmentIds.has(assignments._id) ? (
                    <button className="btn btn-disabled" disabled>Submitted</button>
                  ) : (
                    <Link to={`/submissionForm?assignmentId=${assignments._id}`}>
                      <button className="btn btn-accent">Submit</button>
                    </Link>
                  )}
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;
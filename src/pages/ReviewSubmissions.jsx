import axios from "axios";
import { useEffect, useState } from "react";

const ReviewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/submissions')
      .then(res => setSubmissions(res.data))
  }, [])
  return (
    <div className="">
      <div className="text-center text-white mb-12">
        <h1 className="text-5xl font-bold mb-4">Review Submissions</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Assignment ID</th>
              <th>Submission URL</th>
              <th>Submitted At</th>
              <th>Status</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission.id}>
                <td>{index + 1}</td>
                <td>{submission.assignmentId}</td>
                <td>
                  <a
                    href={submission.submissionURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Link
                  </a>
                </td>
                <td>{new Date(submission.submittedAt).toLocaleString()}</td>

                <td>{submission.feedback || "No feedback yet"}</td>
                <td>
                  <select defaultValue="Pending" className="select">
                    <option disabled={true}>Pending</option>
                    <option>Accepted</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewSubmissions;
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ReviewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/submissions").then((res) => setSubmissions(res.data));
  }, [axiosSecure]);

  const handleReview = async (id, status) => {
    try {
      await axiosSecure.patch(`/submissions/${id}`, {
        status,
        feedback:
          status === "Accepted"
            ? "Great work!"
            : status === "Rejected"
            ? "Please revise and resubmit."
            : "",
      });

      // refresh after update
      const res = await axiosSecure.get("/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Error updating submission:", err);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center text-white mb-12">
        Review Submissions
      </h1>

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
              <tr key={submission._id}>
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

                <td>{submission.status}</td>
                <td>
                  <select
                    defaultValue={submission.status || "Pending"}
                    className="select"
                    onChange={(e) =>
                      handleReview(submission._id, e.target.value)
                    }
                  >
                    <option disabled>Pending</option>
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

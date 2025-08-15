import { useEffect, useState } from "react";
import axios from "axios";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get("http://localhost:5000/submissions")
    .then(res=> setSubmissions(res.data))
  },[]);

  // useEffect(() => {
  //   const fetchSubmissions = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("http://localhost:5000/submissions", {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       setSubmissions(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Failed to fetch submissions",err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchSubmissions();
  // }, []);

  // if (loading) {
  //   return <div className="text-center py-10">Loading submissions...</div>;
  // }



  return (
    <div className="">
      <div className="text-center text-white mb-12">
        <h1 className="text-5xl font-bold mb-4">My Submissions</h1>
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
              <th>Feedback</th>
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
                <td>
                  <span className={`badge ${
                    submission.status === 'Accepted' ? 'badge-success' :
                    submission.status === 'Rejected' ? 'badge-error' : 'badge-warning'
                  }`}>
                    {submission.status}
                  </span>
                </td>
                <td>{submission.feedback || "No feedback yet"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
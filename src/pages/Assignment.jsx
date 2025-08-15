import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Assignment = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/assignments")
      .then(res => setAssignments(res.data))
  }, []);


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
                <td><Link to='/submissionForm'>
                  <button className="btn btn-accent">Submit</button>
                </Link></td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;
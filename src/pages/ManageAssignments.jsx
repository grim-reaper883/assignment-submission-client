import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load assignments. Please try again.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch assignments only once when component mounts
  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (assignmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axiosPublic.delete(`/assignments/${assignmentId}`);
          await fetchAssignments(); // refresh list

          Swal.fire({
            title: "Deleted!",
            text: "Assignment has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          console.error("Error deleting assignment:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete assignment. Please try again.",
            icon: "error"
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div>
      <div>
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Manage Assignments
          </h1>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-4 mb-6">
            <Link to="/addAssignment">
              <button className="btn btn-soft btn-success">+ Add New Assignment</button>
            </Link>
          </div>
          {loading && assignments.length === 0 ? (
            <div className="text-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  assignments.map((assignment, index) => (
                    <tr key={assignment._id}>
                      <th>{index + 1}</th>
                      <td>{assignment.title}</td>
                      <td>{assignment.description}</td>
                      <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/updateAssignment/${assignment._id}`}>
                        
                        </Link>
                        <button 
                          className="btn btn-accent" 
                          onClick={() => handleDelete(assignment._id)}
                          disabled={loading}
                        >
                          {loading ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                </tr>
                  ))
                }
              </tbody>
            </table>
          )}
          {!loading && assignments.length === 0 && (
            <div className="text-center py-8">
              <p>No assignments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAssignments;
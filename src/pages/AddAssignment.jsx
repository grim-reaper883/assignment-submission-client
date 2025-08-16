

import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const AddAssignment = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    createdBy: user?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.deadline) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const assignmentData = {
        ...formData,
        createdBy: user.email,
        createdAt: new Date().toISOString()
      };

      await axiosPublic.post('/assignments', assignmentData);
      
      // Redirect to manage assignments page after successful creation
      navigate('/manageAssignments');
    } catch (error) {
      console.error('Assignment creation error:', error);
      setError('Failed to create assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="max-w-screen mx-auto p-6 bg-base-200 rounded-2xl shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-5xl font-bold text-center">Add New Assignment</h2>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="label font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter assignment title"
            required
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Write assignment details"
            required
            disabled={loading}
          ></textarea>
        </div>

        {/* Deadline */}
        <div>
          <label className="label font-semibold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            disabled={loading}
          />
        </div>

        {/* Created By */}
        <div>
          <label className="label font-semibold">Created By</label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            className="input input-bordered w-full"
            placeholder="Creator's email"
            required
            disabled={true}
          />
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Creating Assignment...' : 'Add Assignment'}
        </button>
      </form>
    </div>
  );
};

export default AddAssignment;
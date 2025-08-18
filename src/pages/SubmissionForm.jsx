import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmissionForm = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    assignmentId: '',
    studentId: '',
    submissionURL: '',
    note: '',
    status: 'Pending',
    feedback: '',
    submittedAt: new Date().toISOString().split('T')[0]
  });
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const assignmentIdFromQuery = searchParams.get('assignmentId') || '';

  useEffect(() => {
    if (assignmentIdFromQuery) {
      setFormData(prev => ({ ...prev, assignmentId: assignmentIdFromQuery }));
    }
  }, [assignmentIdFromQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.assignmentId || !formData.studentId || !formData.submissionURL) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const submissionData = {
        ...formData,
        studentEmail: user.email,
        studentName: user.displayName || user.email?.split('@')[0] || 'Student'
      };

      await axiosPublic.post('/submissions', submissionData);
      
      navigate('/submission');
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.status === 409) {
        setError('You have already submitted this assignment.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to submit assignment. Please try again.');
      }
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
        <h2 className="text-5xl font-bold text-center">Submit Assignment</h2>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {/* Assignment ID */}
        <div>
          <label className="label font-semibold">Assignment ID</label>
          <input
            type="text"
            name="assignmentId"
            value={formData.assignmentId}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter assignment ID"
            required
            disabled={loading || Boolean(assignmentIdFromQuery)}
          />
        </div>

        {/* Student ID */}
        <div>
          <label className="label font-semibold">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter your student ID"
            required
            disabled={loading}
          />
        </div>

        {/* Submission URL */}
        <div>
          <label className="label font-semibold">Submission URL</label>
          <input
            type="url"
            name="submissionURL"
            value={formData.submissionURL}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Link to your work"
            required
            disabled={loading}
          />
        </div>

        {/* Note */}
        <div>
          <label className="label font-semibold">Note (optional)</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Any additional comments"
            disabled={loading}
          ></textarea>
        </div>

        {/* Status (hidden - defaults to Pending) */}
        <input type="hidden" name="status" value={formData.status} />

        {/* Feedback (hidden - for teachers later) */}
        <input type="hidden" name="feedback" value={formData.feedback} />

        {/* Submitted At */}
        <div>
          <label className="label font-semibold">Submitted At</label>
          <input
            type="date"
            name="submittedAt"
            value={formData.submittedAt}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            disabled={loading}
          />
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
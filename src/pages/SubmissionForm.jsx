

const SubmissionForm = () => {
  return (
    <div>
      <form
        className="max-w-screen mx-auto p-6 bg-base-200 rounded-2xl shadow-lg space-y-4"
      // onSubmit={handleSubmit}
      >
        <h2 className="text-5xl font-bold text-center">Submit Assignment</h2>

        {/* Assignment ID */}
        <div>
          <label className="label font-semibold">Assignment ID</label>
          <input
            type="text"
            name="assignmentId"
            // value={formData.assignmentId}
            // onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter assignment ID"
            required
          />
        </div>

        {/* Student ID */}
        <div>
          <label className="label font-semibold">Student ID</label>
          <input
            type="text"
            name="studentId"
            // value={formData.studentId}
            // onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter your student ID"
            required
          />
        </div>

        {/* Submission URL */}
        <div>
          <label className="label font-semibold">Submission URL</label>
          <input
            type="url"
            name="submissionURL"
            // value={formData.submissionURL}
            // onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Link to your work"
            required
          />
        </div>

        {/* Note */}
        <div>
          <label className="label font-semibold">Note (optional)</label>
          <textarea
            name="note"
            // value={formData.note}
            // onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Any additional comments"
          ></textarea>
        </div>

        {/* Status (hidden - defaults to Pending) */}
        <input type="hidden" name="status"
        // value={formData.status} 
        />

        {/* Feedback (hidden - for teachers later) */}
        <input type="hidden" name="feedback"
        //  value={formData.feedback}
        />

        {/* Submitted At */}
        <div>
          <label className="label font-semibold">Submitted At</label>
          <input
            type="datetime-local"
            name="submittedAt"
            // value={formData.submittedAt}
            // onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Assignment
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
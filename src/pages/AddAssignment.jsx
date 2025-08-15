

const AddAssignment = () => {
  return (
    <div>
      <form
        className="max-w-screen mx-auto p-6 bg-base-200 rounded-2xl shadow-lg space-y-4"
        // onSubmit={handleSubmit}
      >
        <h2 className="text-5xl font-bold text-center">Add New Assignment</h2>

        {/* Title */}
        <div>
          <label className="label font-semibold">Title</label>
          <input
            type="text"
            name="title"
            // value={formData.title}
            // onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter assignment title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            // value={formData.description}
            // onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Write assignment details"
            required
          ></textarea>
        </div>

        {/* Deadline */}
        <div>
          <label className="label font-semibold">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            // value={formData.deadline}
            // onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Created By */}
        <div>
          <label className="label font-semibold">Created By (User ID)</label>
          <input
            type="text"
            name="createdBy"
            // value={formData.createdBy}
            // onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter creator's user ID"
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Add Assignment
        </button>
      </form>
    </div>
  );
};

export default AddAssignment;
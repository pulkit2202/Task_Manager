import React from 'react';
import Alert from './alert';
import './create-task.css';
import Small from './small';
import useCreateTask from './useCreateTask';
import useChangeTitle from './useChangeTitle.jsx';

const CraeteTASK = () => {
  const { handleSubmit, error, setFiles } = useCreateTask(); // ⬅ Add setFiles
  useChangeTitle('Create Task');

  function showAlert() {
    if (error.msg) {
      return <Alert text={error.msg} color={error.color} />;
    }
  }

  return (
    <div className="container dasboard-createTask">
      <p>Create Your Task</p>
      {showAlert()}
      <div className="row">
        <div className="w-50 mx-auto col-md-12">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-3 dasboard-createTask__title">
              <label htmlFor="title" className="form-label">Task Title</label>
              <input
                name="title"
                type="text"
                className={error.title ? 'form-control is-invalid' : 'form-control'}
                id="title"
              />
              <Small text={error.title} />
            </div>

            <div className="mb-3 dasboard-createTask__des">
              <label htmlFor="des" className="form-label">Task Description</label>
              <textarea
                name="des"
                className={error.des ? 'form-control is-invalid' : 'form-control'}
                id="des"
              />
              <Small text={error.des} />
            </div>

            <div className="mb-3 dasboard-createTask__date">
              <label htmlFor="start" className="form-label">Start Date</label>
              <input
                name="start"
                type="date"
                className={error.start ? 'form-control is-invalid' : 'form-control'}
                id="start"
              />
              <Small text={error.start} />
            </div>

            <div className="mb-3 dasboard-createTask__date">
              <label htmlFor="end" className="form-label">End Date</label>
              <input
                name="end"
                type="date"
                className={error.end ? 'form-control is-invalid' : 'form-control'}
                id="end"
              />
              <Small text={error.end} />
            </div>

            {/* ✅ PDF Upload */}
            <div className="mb-3 dasboard-createTask__docs">
              <label className="form-label">Attach up to 3 PDF documents</label>
              <input
                type="file"
                name="documents"
                className={error.files ? "form-control is-invalid" : "form-control"}
                accept="application/pdf"
                multiple
                onChange={(e) => setFiles([...e.target.files])} // ✅ update files in state
              />
              <Small text={error.files} />
            </div>

            <button type="submit" className="btn create-btn btn-outline-success">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CraeteTASK;

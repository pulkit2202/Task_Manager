import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./viewTask.css";
import useUrl from "./useUrl";

const ViewTask = () => {
  let { id } = useParams();
  let { url } = useUrl();
  let [sigTask, setsigTask] = useState({});
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setsigTask(data.task);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="viewtask">
      <div className="viewtask-mainwrapper">
        <div className="viewtask-title">
          <h1 style={{ fontWeight: "700", textDecoration: "underline" }}>
            Title
          </h1>
          <p>{sigTask.title}</p>
        </div>

        <div className="viewtask-des">
          <h1 style={{ fontWeight: "700", textDecoration: "underline" }}>
            Description
          </h1>
          <p>{sigTask.des}</p>
        </div>

        <div className="viewtask-time">
          <h1 style={{ fontWeight: "700", textDecoration: "underline" }}>
            Time
          </h1>
          <p>
            {sigTask.startD}/{sigTask.endD}
          </p>
        </div>

        <div className="viewtask-status">
          <h1 style={{ fontWeight: "700", textDecoration: "underline" }}>
            Status
          </h1>
          <p>{sigTask.complete ? "Completed" : "Not completed"}</p>
        </div>

        {/* ✅ Attached PDF Files */}
        {sigTask.files && sigTask.files.length > 0 && (
          <div className="viewtask-files">
            <h1 style={{ fontWeight: "700", textDecoration: "underline" }}>
              Attached PDFs
            </h1>
            <ul>
              {sigTask.files.map((file, index) => (
                <li key={index}>
                  <a
                    href={`${url}/task/file/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="viewtask-filelink"
                  >
                    📄 {file}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="viewtask-btnwrapper">
        <Link to={`/dasboard/task/edit/${id}`}>
          <button className="btn-edit">Edit</button>
        </Link>
        <Link to="/dasboard/task/all">
          <button className="btn-back">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewTask;

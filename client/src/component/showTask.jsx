import React, { useState, useEffect } from "react";
import ShowSingle from "./showSingle";
import ReactDOM from "react-dom";
import "./showTask.css";
import moment from "moment";
import { useLocation } from "react-router";
import useTool from "./useTool";
import DasboardAllTaskEmpty from "./dasboard-AllTaskEmpty";
import EmptyCompletedTask from "./emptyCompletedTask";
import EmptyImportantTask from "./emptyImportantTask";
import Loading from "./loading";
import useUrl from "./useUrl";

const Showtask = () => {
  const location = useLocation();
  const { url } = useUrl();
  const cookie = localStorage.getItem("__toketasjy42562627");

  const { handleComplete, handleDelete, handleStar, state } = useTool(location);

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks based on filter + page
  useEffect(() => {
    fetchTasks();
  }, [filter, page]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/task?filter=${filter}&page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      const data = await res.json();
      setTasks(data.all || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
    setLoading(false);
  };

  const AlertPortal = () => {
    if (state.error) {
      setTimeout(() => {
        let alertx = document.getElementById("alertx");
        if (alertx) alertx.style.display = "none";
      }, 700);

      return ReactDOM.createPortal(
        <div id="alertx" className={`alertx ${state.error.color}`}>
          <p>{state.error.msg}</p>
        </div>,
        document.getElementById("alert")
      );
    }
  };

  const createdTime = (time) => moment(time).fromNow();

  const renderConditionally = () => {
    if (!loading && tasks.length === 0 && location.pathname === "/dasboard/task/completed") {
      return <EmptyCompletedTask />;
    } else if (!loading && tasks.length === 0 && location.pathname === "/dasboard/task/all") {
      return <DasboardAllTaskEmpty />;
    } else if (!loading && tasks.length === 0 && location.pathname === "/dasboard/task/important") {
      return <EmptyImportantTask />;
    } else if (!loading) {
      return tasks.map((task, index) => (
        <ShowSingle
          key={index}
          title={task.title}
          id={task._id}
          handleComplete={handleComplete}
          handleStar={handleStar}
          handleDelete={handleDelete}
          createdTime={createdTime(task.createdAt)}
          des={task.des}
          start={task.startD}
          end={task.endD}
          important={task.important}
          complete={task.complete}
        />
      ));
    }
  };

  return (
    <div className="showtask">
      {AlertPortal()}

      {/* ✅ Filter & Pagination UI */}
      <div className="task-controls">
        <div className="filter-wrapper">
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1); // reset to page 1 on filter change
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="important">Important</option>
          </select>
        </div>

        <div className="pagination-wrapper">
          <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div>

      {loading ? <Loading /> : renderConditionally()}
    </div>
  );
};

export default Showtask;

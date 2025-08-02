 import React, { useState } from "react";
import "./showSingle.css";
import useChangeTitle from "./useChangeTitle.jsx";
import star from "../assets/star.svg";
import starfill from "../assets/star-fill.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import checkfill from "../assets/checkfill.svg";
import check from "../assets/check.svg";
import { Link } from "react-router-dom";

const ShowSingle = ({
  title,
  des,
  start,
  end,
  complete,
  important,
  createdTime,
  id,
  handleComplete,
  handleDelete,
  handleStar,
  attachedDocuments = [],
}) => {
  let [width, setWidth] = useState(window.innerWidth);
  useChangeTitle("Your Task");

  window.addEventListener("resize", (e) => {
    let widthx = e.target.innerWidth;
    if (widthx < 800) {
      setWidth(700);
    } else {
      setWidth(1000);
    }
  });

  function textTruncate(text) {
    if (text.length > 50 && width > 800) {
      return text.substring(0, 47) + "....";
    } else if (width < 800 && text.length > 20) {
      return text.substring(0, 20) + "....";
    }
    return text;
  }

  return (
    <div className="single shadow">
      <div className="single-details-mainwrapper">
        <div className="single-details-wrapper">
          <div className="single-details">
            <p className="single-details__title">{title}</p>
            <p className="single-details__des">{textTruncate(des)}</p>
          </div>

          <div className="single-time">
            <p className="single-time__time">{`Time: ${start} - ${end}`}</p>
            <p className="single-time__posted">{`Created: ${createdTime}`}</p>
            <p className="single-time__status">
              Status: {complete ? "Completed" : "Not Completed"}
            </p>

            {/* 📎 Attached PDFs */}
            {attachedDocuments.length > 0 && (
              <div className="single-documents">
                <p><strong>📎 Attached PDFs:</strong></p>
                <ul style={{ paddingLeft: "20px" }}>
                  {attachedDocuments.map((doc, i) => (
                    <li key={i}>
                      <a
                        href={`http://localhost:5000/task/file/${doc.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄 {doc.originalname}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="single-details-mainwrapper__overlay">
          <Link to={`/dasboard/task/view/${id}`}>
            <button className="btn btn-outline-success">See Details</button>
          </Link>
        </div>
      </div>

      <div className="single-tool">
        <div className="single-tool__wrapper">
          <Link to={`/dasboard/task/edit/${id}`}>
            <img className="edit-icon" src={edit} alt="Edit" />
          </Link>
          <img
            className="trash-icon"
            onClick={(event) => handleDelete(event, id)}
            src={trash}
            alt="Delete"
          />
          <img
            className="star-icon"
            style={{ height: "30px" }}
            onClick={(event) => handleStar(event, id)}
            src={important ? starfill : star}
            alt="Star"
          />
          <img
            className="check-icon"
            style={{ height: "30px" }}
            onClick={(event) => handleComplete(event, id)}
            src={complete ? checkfill : check}
            alt="Check"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowSingle;

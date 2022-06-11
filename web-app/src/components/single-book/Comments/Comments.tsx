import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import { StateContext } from "../../../Context";
import { Comment } from "../../../types";
// import { addComment } from "../../../services/book.service";
import calcDate from "./date-calculator";
import "./Comments.css";

export default function Comments() {
  const { state } = React.useContext(StateContext);
  const lang = state.ui.lan || "am";
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [newComment, setNewComment] = React.useState<string>("");

  // const { isLoading: userBookReadStatusLoading, mutate } = useMutation(comment => {
  //   return addComment('a', 'a');
  // })

  const addComment = (event: any) => {
    event.preventDefault();

    setComments([
      ...comments,
      {
        body: newComment,
        author: state.auth.user.firstname,
        date: new Date(),
      },
    ]);

    setNewComment("");
  };

  return (
    <div className="comments-section_container">
      <h2>Մեկնաբանություններ</h2>
      {state.auth.isLoggedIn ? (
        <div className="new-comment_container">
          <form onSubmit={addComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={10}
              placeholder="Ավելացնել նոր մեկնաբանություն..."
            />
            <button className={newComment.trim().length < 5 ? "hide" : ""}>
              Ավելացնել
            </button>
          </form>
        </div>
      ) : (
        <div>
          <Link to="/join" style={{ textDecoration: "underline" }}>
            Կիսվեք Ձեր տպավորություններով
          </Link>
        </div>
      )}
      {comments.length != 0 && (
        <div className="comments_container">
          {comments.map((comment: any, index: any) => (
            <div className="comment_container df df-ac">
              <div className="df df-ac">
                <div className="author-icon_container">{comment.author[0]}</div>

                <div className="df df-column">
                  <span>{comment.author}</span>
                  <span className="comment-body">{comment.body}</span>
                  <span className="comment-date">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ marginRight: "5px" }}
                    />
                    {calcDate(comment.date, lang)}
                  </span>
                </div>
              </div>

              <div className="comment-actions_container df">
                {/* <FontAwesomeIcon icon={faPen}/> */}
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import "./PostWiseDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../../../../GlobalContext";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";

import post1 from "../../../../Assets/postdetails/post1.png";
import post2 from "../../../../Assets/postdetails/post2.png";
import post3 from "../../../../Assets/postdetails/post3.jpg";
import post4 from "../../../../Assets/postdetails/post4.jpg";
import post5 from "../../../../Assets/postdetails/post5.png";
import post6 from "../../../../Assets/postdetails/post6.png";
import post7 from "../../../../Assets/postdetails/post7.jpg";
import post8 from "../../../../Assets/postdetails/post8.jpg";
import post9 from "../../../../Assets/postdetails/post9.jpg";
import post10 from "../../../../Assets/postdetails/post10.jpg";
import post11 from "../../../../Assets/postdetails/post11.jpg";
import post12 from "../../../../Assets/postdetails/post12.jpg";
const PostWiseDetails = () => {
  const backArrow = (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.82808 6.99999L7.77808 2.04999L6.36408 0.635986L7.62939e-05 6.99999L6.36408 13.364L7.77808 11.95L2.82808 6.99999Z"
        fill="#0B0B0B"
      />
    </svg>
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [postCounts, setpostCounts] = useState(0);
  const [ViewRplies, SetViewRplies] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState();
  const {
    CommentDeletemodel,
    setCommentDeletemodel,
    seletedCommentsData,
    setseletedCommentsData,
  } = useContext(GlobalContext);
  const postdata = [
    { id: 1, img: post1, like: "10k", comment: "20" },
    { id: 2, img: post2, like: "1k", comment: "30" },
    { id: 3, img: post3, like: "2k", comment: "40" },
    { id: 4, img: post4, like: "1.2k", comment: "50" },
    { id: 5, img: post5, like: "50k", comment: "100" },
    { id: 6, img: post6, like: "1.7k", comment: "200" },
    { id: 7, img: post7, like: "30k", comment: "400" },
    { id: 8, img: post8, like: "300", comment: "300" },
    { id: 9, img: post9, like: "1.1k", comment: "80" },
    { id: 10, img: post10, like: "100", comment: "10" },
    { id: 11, img: post11, like: "1.9k", comment: "100" },
    { id: 12, img: post12, like: "1M", comment: "80" },
  ];

  const likeUsers = [
    { id: 1, name: "Lorem, ipsum.", username: "lorem1", image: post1 },
    { id: 2, name: "Dolor sit amet.", username: "dolor2", image: post2 },
    { id: 3, name: "Consectetur elit.", username: "elit3", image: post3 },
    { id: 4, name: "Adipiscing elit.", username: "adipiscing4", image: post4 },
    { id: 5, name: "Sed do eiusmod.", username: "sed5", image: post5 },
    { id: 6, name: "Tempor incididunt.", username: "tempor6", image: post6 },
    { id: 7, name: "Labore et dolore.", username: "labore7", image: post7 },
    { id: 8, name: "Magna aliqua.", username: "magna8", image: post8 },
    { id: 9, name: "Ut enim ad.", username: "utenim9", image: post9 },
    { id: 10, name: "Minim veniam.", username: "minim10", image: post10 },
  ];
  const commentsData = [
    {
      id: 1,
      username: "@techie",
      time: "2h",
      comment: "Great post! Really loved the insights.",
      image: post1,
      replies: [
        {
          id: 101,
          username: "@coder99",
          time: "1h",
          comment: "I agree with you!",
          image: post2,
        },
        {
          id: 102,
          username: "@frontenddev",
          time: "45m",
          comment: "Totally relatable content.",
          image: post3,
        },
      ],
    },
    {
      id: 2,
      username: "@devgirl",
      time: "5h",
      comment: "Thanks for sharing this!",
      image: post2,
      replies: [
        {
          id: 201,
          username: "@john_doe",
          time: "4h",
          comment: "You're welcome!",
          image: post1,
        },
        {
          id: 202,
          username: "@jane_code",
          time: "3h",
          comment: "Agreed. Very helpful.",
          image: post4,
        },
        {
          id: 203,
          username: "@design_guru",
          time: "2h",
          comment: "Clear and concise.",
          image: post5,
        },
      ],
    },
    {
      id: 3,
      username: "@ui_lover",
      time: "30m",
      comment: "UI looks clean and user-friendly!",
      image: post3,
      replies: [
        {
          id: 301,
          username: "@ux_master",
          time: "10m",
          comment: "Exactly what I thought!",
          image: post1,
        },
        {
          id: 302,
          username: "@reviewer_1",
          time: "5m",
          comment: "Smooth experience too.",
          image: post2,
        },
      ],
    },
    {
      id: 4,
      username: "@nightowl",
      time: "8h",
      comment: "Was up late reading this. Totally worth it.",
      image: post4,
      replies: [
        {
          id: 401,
          username: "@earlybird",
          time: "7h",
          comment: "Same here!",
          image: post3,
        },
        {
          id: 402,
          username: "@midnighter",
          time: "6h",
          comment: "You’re not alone 😂",
          image: post5,
        },
      ],
    },
    {
      id: 5,
      username: "@beta_tester",
      time: "1d",
      comment: "Tested it, works like a charm.",
      image: post5,
      replies: [
        {
          id: 501,
          username: "@feedback_bot",
          time: "22h",
          comment: "Thanks for the input!",
          image: post1,
        },
        {
          id: 502,
          username: "@qa_specialist",
          time: "20h",
          comment: "Noticed any bugs?",
          image: post2,
        },
        {
          id: 503,
          username: "@coder_alpha",
          time: "18h",
          comment: "Works well here too.",
          image: post3,
        },
      ],
    },
    {
      id: 6,
      username: "@cat_coder",
      time: "3h",
      comment: "Meow! 🐱 Amazing code.",
      image: post1,
      replies: [
        {
          id: 601,
          username: "@dog_dev",
          time: "2h",
          comment: "Woof! 🐶 Agree!",
          image: post2,
        },
        {
          id: 602,
          username: "@parrot_script",
          time: "1h",
          comment: "Polly approves! 🦜",
          image: post3,
        },
      ],
    },
    {
      id: 7,
      username: "@api_hunter",
      time: "9h",
      comment: "APIs integrated well. Fast response.",
      image: post2,
      replies: [
        {
          id: 701,
          username: "@json_guy",
          time: "7h",
          comment: "Love the structure!",
          image: post4,
        },
        {
          id: 702,
          username: "@rest_master",
          time: "6h",
          comment: "Neat implementation.",
          image: post5,
        },
      ],
    },
    {
      id: 8,
      username: "@bugzilla",
      time: "6h",
      comment: "Found a minor bug on mobile view.",
      image: post3,
      replies: [
        {
          id: 801,
          username: "@fixitfast",
          time: "5h",
          comment: "Thanks, we’re on it!",
          image: post1,
        },
      ],
    },
    {
      id: 9,
      username: "@pro_reviewer",
      time: "12h",
      comment: "In-depth review coming soon.",
      image: post4,
      replies: [
        {
          id: 901,
          username: "@wait4it",
          time: "11h",
          comment: "Looking forward to it!",
          image: post2,
        },
        {
          id: 902,
          username: "@checkmate",
          time: "10h",
          comment: "Don’t forget to tag us!",
          image: post5,
        },
      ],
    },
    {
      id: 10,
      username: "@weekend_warrior",
      time: "2d",
      comment: "Spent the weekend tweaking this. Satisfying result.",
      image: post5,
      replies: [
        {
          id: 1001,
          username: "@supporter",
          time: "1d",
          comment: "Proud of you!",
          image: post3,
        },
        {
          id: 1002,
          username: "@cheerleader",
          time: "22h",
          comment: "Hard work pays off.",
          image: post2,
        },
        {
          id: 1003,
          username: "@coach_dev",
          time: "20h",
          comment: "Keep pushing forward!",
          image: post1,
        },
      ],
    },
  ];
  const handleClickDelete = (item) => {
    setCommentDeletemodel(true);
    setseletedCommentsData(item);
  };
  const hadelclosedlikeComment = () => {
    setpostCounts(0);
    setSelectedPostId();
  };
  return (
    <>
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="Post_wise_details_heading_main">
            <button className="back_btn" onClick={() => navigate(-1)}>
              {backArrow}
            </button>

            <div className="post_wise_user_details">
              <div className="ms-3">
                <p className="FullName_of_user">
                  Name :- {state["creat_by.full_name"]}
                </p>
                <p className="user_name">
                  User Name :- {state["creat_by.username"]}
                </p>

                <p className="date_and_time">
                  {new Date(Number(state.createdutctimestamp)).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              postCounts === 0
                ? "other_PostDetails_main_div"
                : " PostDetails_main_div"
            }
          >
            <div className="PostwiseDetails_post_inner_div">
              <div
                className={`PostwiseDetails_show_div ${
                  selectedPostId === state?.id ? "active_post" : ""
                }`}
                onClick={() => setSelectedPostId(state.id)} // or however you open the details panel
              >
                <div className="PostwiseDetails_img_container">
                  {state["post_galleries.gallery_type"] === "Image" ? (
                    <img
                      src={state["post_galleries.gallery"]}
                      alt=""
                      className="Post_img_container"
                    />
                  ) : state["post_galleries.gallery_type"] === "Video" ? (
                    <video
                      controls
                      className="Post_img_container"
                      poster={state["post_galleries.gallery_thumbnil"] || ""}
                    >
                      <source
                        src={state["post_galleries.gallery"]}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </div>
                <div className="PostwiseDetails_overlay">
                  <p className="caption_text">{state.caption}</p>
                  <div className="post_numbers_div">
                    <div
                      className="likes_number_icon_post_wise"
                      onClick={() => setpostCounts(1)}
                    >
                      <FaRegHeart className="like_icon_post_wise" />
                      <p>{state.likes}</p>
                    </div>
                    <div
                      className="likes_number_icon_post_wise"
                      onClick={() => setpostCounts(2)}
                    >
                      <FaRegComment className="like_icon_post_wise" />
                      <p>{state.comments}</p>
                    </div>
                    <div
                      className="likes_number_icon_post_wise"
                      onClick={() => setpostCounts(2)}
                    >
                      <FaRegEye className="like_icon_post_wise" />
                      <p>{state.totalviews}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {postCounts === 0 ? (
              ""
            ) : (
              <div className="PostDetails_comment_inner_div">
                <div className="heading_of_PostDetails_comment_div">
                  <div className="btn_divS">
                    <button
                      className="Likes_btn_"
                      onClick={() => setpostCounts(1)}
                    >
                      {postCounts === 1 ? <FaHeart /> : <FaRegHeart />}
                      likes
                    </button>

                    <button
                      className="comments_btn_"
                      onClick={() => setpostCounts(2)}
                    >
                      {postCounts === 2 ? <FaComment /> : <FaRegComment />}
                      comments
                    </button>
                  </div>
                  <div className="closed_btn">
                    <RxCrossCircled
                      className="closed_btn"
                      onClick={() => hadelclosedlikeComment()}
                    />
                  </div>
                </div>

                <div className="main_content_div_like_and_comments">
                  {postCounts === 1 ? (
                    <div className="likes_user_list">
                      {likeUsers.map((user) => (
                        <div className="likers_user_list" key={user.id}>
                          <div className="user_data_div">
                            <div className="image_div_of_users">
                              <img src={user.image} alt={user.name} />
                            </div>
                            <div className="user_name_and_id">
                              <h3>{user.name}</h3>
                              <p>{user.username}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="comment_list_main_div">
                      <div className="Comments_list_inner_div">
                        {commentsData.map((comment) => (
                          <div key={comment.id} className="user_comments_card">
                            <div className="user_img_div_for_comments">
                              <img src={comment.image} alt={comment.username} />
                            </div>
                            <div className="main_text_area_div">
                              <div className="comment_text_">
                                <div className="user_name_time_">
                                  <h3>{comment.username}</h3>
                                  <span>{comment.time}</span>
                                </div>
                                <div className="comments_text_area">
                                  <p>{comment.comment}</p>
                                </div>
                                <span
                                  className="comment_Delete_btn"
                                  onClick={() => handleClickDelete(comment)}
                                >
                                  <MdDeleteForever />
                                </span>
                              </div>

                              <div className="replay_main_list">
                                <div className="heading_replay_btn">
                                  {ViewRplies === comment.id ? (
                                    <div className="main_div_replies_list">
                                      {comment.replies.map((reply) => (
                                        <div
                                          key={reply.id}
                                          className="user_comments_card"
                                        >
                                          <div className="user_img_div_for_comments">
                                            <img
                                              src={reply.image}
                                              alt={reply.username}
                                            />
                                          </div>
                                          <div className="main_text_area_div">
                                            <div className="comment_text_">
                                              <div className="user_name_time_">
                                                <h3>{reply.username}</h3>
                                                <span>{reply.time}</span>
                                              </div>
                                              <div className="comments_text_area">
                                                <p>{reply.comment}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      <h2 onClick={() => SetViewRplies(0)}>
                                        Hide All Replies
                                      </h2>
                                    </div>
                                  ) : (
                                    <h2
                                      onClick={() => SetViewRplies(comment.id)}
                                    >
                                      View Replies({comment.replies.length})
                                    </h2>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostWiseDetails;

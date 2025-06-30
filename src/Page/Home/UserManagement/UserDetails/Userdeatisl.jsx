/** @format */

import React from "react";
import "./Userdeatisl.css";
import BG_img from "../../../../Assets/userlist/userditails_bg.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Loader from "../../../../Common/loader/index";
import Backdrop from "@mui/material/Backdrop";
import Skeleton from "@mui/material/Skeleton";
import axios from "../../../../Common/Api/Api";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";
import PostDetails from "../PostDetails/PostDetails";
import PlayDetails from "../PlayDetails/PlayDetails";
import PollDetails from "../PollDetails/PollDetails";
import StatusDetails from "../StatusDetails/StatusDetails";
import { GlobalContext } from "../../../../GlobalContext";

const Userdeatisl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [UserDetailsdata, SetUserDetailsdata] = useState(null);
  const [detailList, setdetailsList] = useState(0);

  const Edit = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_10_151)">
        <path
          d="M6.414 16L16.556 5.858L15.142 4.444L5 14.586V16H6.414ZM7.243 18H3V13.757L14.435 2.322C14.6225 2.13453 14.8768 2.02921 15.142 2.02921C15.4072 2.02921 15.6615 2.13453 15.849 2.322L18.678 5.151C18.8655 5.33853 18.9708 5.59284 18.9708 5.858C18.9708 6.12316 18.8655 6.37747 18.678 6.565L7.243 18ZM3 20H21V22H3V20Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_151">
          <rect width="24" height="24" fill="black" />
        </clipPath>
      </defs>
    </svg>
  );
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
  const Camera = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="30" rx="15" fill="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.3889 23.1H17.6111C20.5761 23.1 22.0586 23.1 23.1236 22.4014C23.5845 22.0989 23.9804 21.7102 24.2884 21.2577C25 20.2121 25 18.7565 25 15.8454C25 12.9344 25 11.4789 24.2884 10.4333C23.9804 9.98063 23.5845 9.59199 23.1236 9.28955C22.4392 8.84062 21.5826 8.68017 20.2709 8.62282C19.6449 8.62282 19.1061 8.15715 18.9834 7.55454C18.7992 6.65065 17.9908 6 17.052 6H13.948C13.0091 6 12.2008 6.65065 12.0167 7.55454C11.8939 8.15715 11.355 8.62282 10.7291 8.62282C9.41746 8.68017 8.56077 8.84062 7.87648 9.28955C7.41545 9.59199 7.01962 9.98063 6.71157 10.4333C6 11.4789 6 12.9344 6 15.8454C6 18.7565 6 20.2121 6.71157 21.2577C7.01962 21.7102 7.41545 22.0989 7.87648 22.4014C8.94143 23.1 10.4239 23.1 13.3889 23.1ZM15.5 11.9591C13.3139 11.9591 11.5417 13.6991 11.5417 15.8454C11.5417 17.9918 13.3139 19.7318 15.5 19.7318C17.6861 19.7318 19.4584 17.9918 19.4584 15.8454C19.4584 13.6991 17.6861 11.9591 15.5 11.9591ZM15.5 13.5136C14.1883 13.5136 13.125 14.5576 13.125 15.8454C13.125 17.1332 14.1883 18.1773 15.5 18.1773C16.8117 18.1773 17.875 17.1332 17.875 15.8454C17.875 14.5576 16.8117 13.5136 15.5 13.5136ZM19.9861 12.7364C19.9861 12.3071 20.3405 11.9591 20.7778 11.9591H21.8334C22.2706 11.9591 22.625 12.3071 22.625 12.7364C22.625 13.1657 22.2706 13.5136 21.8334 13.5136H20.7778C20.3405 13.5136 19.9861 13.1657 19.9861 12.7364Z"
        fill="url(#paint0_linear_763_147)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_763_147"
          x1="10.5"
          y1="9"
          x2="20.5"
          y2="22.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.105" stop-color="#391BF2" />
          <stop offset="0.8" stop-color="#E0212D" />
        </linearGradient>
      </defs>
    </svg>
  );

  const closed = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5379 11.2121C12.1718 10.846 11.5782 10.846 11.2121 11.2121C10.846 11.5782 10.846 12.1718 11.2121 12.5379L13.6742 15L11.2121 17.4621C10.846 17.8281 10.846 18.4218 11.2121 18.7879C11.5782 19.154 12.1718 19.154 12.5379 18.7879L15 16.3259L17.462 18.7879C17.8282 19.154 18.4218 19.154 18.7879 18.7879C19.154 18.4218 19.154 17.8281 18.7879 17.462L16.3258 15L18.7879 12.5379C19.154 12.1718 19.154 11.5782 18.7879 11.2121C18.4218 10.846 17.8282 10.846 17.462 11.2121L15 13.6741L12.5379 11.2121Z"
        fill="url(#paint0_linear_767_149)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 1.5625C7.57868 1.5625 1.5625 7.57868 1.5625 15C1.5625 22.4214 7.57868 28.4375 15 28.4375C22.4214 28.4375 28.4375 22.4214 28.4375 15C28.4375 7.57868 22.4214 1.5625 15 1.5625ZM3.4375 15C3.4375 8.61421 8.61421 3.4375 15 3.4375C21.3858 3.4375 26.5625 8.61421 26.5625 15C26.5625 21.3858 21.3858 26.5625 15 26.5625C8.61421 26.5625 3.4375 21.3858 3.4375 15Z"
        fill="url(#paint1_linear_767_149)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_767_149"
          x1="15"
          y1="10.9375"
          x2="15"
          y2="19.0625"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#391BF2" />
          <stop offset="1" stop-color="#E0212D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_767_149"
          x1="8"
          y1="5.5"
          x2="23"
          y2="23.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#391BF2" />
          <stop offset="1" stop-color="#E0212D" />
        </linearGradient>
      </defs>
    </svg>
  );

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
    setShowModal(true);
  };

  // Close Modal
  const handleClose = () => setShowModal(false);
  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));

  const UserDetails = async () => {
    setLoading(true);
    try {
      const Response = await axios.post(
        "user/get-profile",
        { user_id: state.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ UserDetails ~ Response:", Response);

      SetUserDetailsdata(Response?.data?.data);
    } catch (error) {
      SetUserDetailsdata(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    UserDetails();
  }, []);

  const [isEditing, setIsEditing] = useState(0);
  const [editableName, setEditableName] = useState("");
  const [editableUserName, setEditableUserName] = useState("");
  const [editableBio, setEditableBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    if (UserDetailsdata) {
      setEditableName(UserDetailsdata?.name);
      setEditableUserName(UserDetailsdata?.user_name);
      setEditableBio(UserDetailsdata?.about);
    }
  }, [UserDetailsdata]);

  const userDataupdate = async (value, type) => {
    setLoading(true);
    let field_value = value;
    let finalType = type;

    if (!value && !type) {
      field_value =
        isEditing === 1
          ? editableName
          : isEditing === 2
          ? editableUserName
          : editableBio;
      finalType =
        isEditing === 1 ? "Name" : isEditing === 2 ? "UserName" : "Bio";
    }

    try {
      const Response = await axios.post(
        "user/update-user-attributes",
        {
          user_id: state.id,
          field_value: field_value,
          type: finalType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MyToken}`,
          },
        }
      );
      toast.success(Response?.data?.message);
      UserDetails();
      setIsEditing(0);
    } catch (error) {
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Local preview

      const formData = new FormData();
      formData.append("gallery", file);

      try {
        const response = await fetch(
          "http://44.244.158.85:3000/api/v1/common/upload-gallery",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        const uploadedUrl = data?.data?.image_url;

        if (uploadedUrl) {
          await userDataupdate(uploadedUrl, "ProfilePicture");
        }
      } catch (err) {
        toast.error("Profile Image upload failed!");
      }
    }
  };

  const handleBackgroundImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file)); // Local preview

      const formData = new FormData();
      formData.append("gallery", file);

      try {
        const response = await fetch(
          "http://44.244.158.85:3000/api/v1/common/upload-gallery",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        const uploadedUrl = data?.data?.image_url;

        if (uploadedUrl) {
          await userDataupdate(uploadedUrl, "BackgroundImage");
        }
      } catch (err) {
        console.log("five");
        toast.error("Background Image upload failed!");
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="main_post_details_div">
            <div className="carDetails_heding_div">
              <button className="back_btn" onClick={() => navigate(-1)}>
                {backArrow}
              </button>
              <div className="btn_groups_of_userDetails">
                <button
                  className={detailList === 0 ? "btn_active" : "secondary_btn"}
                  onClick={() => setdetailsList(0)}
                >
                  Profile
                </button>
                <button
                  className={detailList === 1 ? "btn_active" : "secondary_btn"}
                  onClick={() => setdetailsList(1)}
                >
                  Post
                </button>
                <button
                  className={detailList === 2 ? "btn_active" : "secondary_btn"}
                  onClick={() => setdetailsList(2)}
                >
                  Play
                </button>
                <button
                  className={detailList === 3 ? "btn_active" : "secondary_btn"}
                  onClick={() => setdetailsList(3)}
                >
                  Poll
                </button>
                <button
                  className={detailList === 4 ? "btn_active" : "secondary_btn"}
                  onClick={() => setdetailsList(4)}
                >
                  Status
                </button>
              </div>
              <h1>User Detail</h1>
            </div>
            {detailList === 0 ? (
              loading ? (
                <div className="main_fram_div_ofuserdetails">
                  {/* Skeleton Loader while loading */}
                  <div className="Header_bg_main_div">
                    <Skeleton className="User_profile_img_and_other_ditels" />

                    <Skeleton
                      variant="circular"
                      width={80}
                      height={80}
                      className="profile_img"
                      style={{ background: "none" }}
                    />
                  </div>
                  <div className="user_details_of_persnol">
                    <Skeleton variant="text" width="40%" height={30} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                  </div>
                  <div className="User_deyails_ofnumber">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={100}
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                </div>
              ) : UserDetailsdata ? (
                <div className="main_fram_div_ofuserdetails">
                  <div
                    className="Header_bg_main_div"
                    style={{
                      backgroundImage: `url(${
                        backgroundImage ||
                        UserDetailsdata?.backgroundImage ||
                        BG_img
                      })`,
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageChange}
                      style={{ display: "none" }}
                      id="backgroundImageInput"
                    />
                    <label
                      htmlFor="backgroundImageInput"
                      className="header_bg_camera"
                      onClick={() => setIsEditing(5)}
                      style={{ cursor: "pointer" }}
                    >
                      {Camera}
                    </label>
                    <div className="User_profile_img_and_other_ditels">
                      <div className="profile_img">
                        <img
                          src={profileImage || UserDetailsdata?.profile_pic}
                          alt="profile"
                          onClick={() =>
                            handleImageClick(
                              profileImage || UserDetailsdata?.profile_pic
                            )
                          }
                          style={{ cursor: "pointer" }}
                        />

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          style={{ display: "none" }}
                          id="profileImageInput"
                        />
                        <label
                          htmlFor="profileImageInput"
                          className="Camera"
                          onClick={() => setIsEditing(4)}
                          style={{ cursor: "pointer" }}
                        >
                          {Camera}
                        </label>
                      </div>
                    </div>
                    <Modal
                      show={showModal}
                      onHide={handleClose}
                      centered
                      size="lg"
                    >
                      <Modal.Body
                        className="text-center"
                        style={{ position: "relative" }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleClose()}
                        >
                          {closed}
                        </span>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            height: "70vh",
                            borderRadius: "8px",
                          }}
                        />
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div className="user_details_of_persnol">
                    {isEditing === 1 ? (
                      <div className="edit_mode_field">
                        <input
                          type="text"
                          value={editableName}
                          onChange={(e) => setEditableName(e.target.value)}
                        />
                        <div
                          className="save_btn"
                          onClick={() => {
                            setIsEditing(0);
                            userDataupdate();
                          }}
                        >
                          <p>save</p>
                        </div>
                      </div>
                    ) : (
                      <h1>
                        {editableName || "N/A"}{" "}
                        <span
                          onClick={() => setIsEditing(1)}
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                        >
                          {Edit}
                        </span>
                      </h1>
                    )}

                    {isEditing === 2 ? (
                      <div className="edit_mode_username_field">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                        />
                        <div
                          className="save_btn"
                          onClick={() => {
                            setIsEditing(0);
                            userDataupdate();
                          }}
                        >
                          <p>save</p>
                        </div>
                      </div>
                    ) : (
                      <h4>
                        {editableUserName || "N/A"}{" "}
                        <span
                          onClick={() => setIsEditing(2)}
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                        >
                          {Edit}
                        </span>
                      </h4>
                    )}
                    {isEditing === 3 ? (
                      <div className="edit_mode_bio_field">
                        <textarea
                          type="text"
                          value={editableBio}
                          onChange={(e) => setEditableBio(e.target.value)}
                        />
                        <div
                          className="save_btn"
                          onClick={() => {
                            setIsEditing(0);
                            userDataupdate();
                          }}
                        >
                          <p>save</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bio_text_div">
                        <p>{editableBio || "No about info"}</p>

                        <span
                          onClick={() => setIsEditing(3)}
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                        >
                          {Edit}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="User_deyails_ofnumber">
                    <div className="Total_number_show_div">
                      <h2>{UserDetailsdata?.post || 0}</h2>
                      <h2>Post</h2>
                    </div>
                    <div className="Total_number_show_div">
                      <h2>{UserDetailsdata?.votes || 0}</h2>
                      <h2>Votes</h2>
                    </div>
                    <div className="Total_number_show_div">
                      <h2>{UserDetailsdata?.followers || 0}</h2>
                      <h2>Followers</h2>
                    </div>
                    <div className="Total_number_show_div">
                      <h2>{UserDetailsdata?.following || 0}</h2>
                      <h2>Following</h2>
                    </div>
                    <div className="Total_number_show_div">
                      <h2>{UserDetailsdata?.like_count || 0}</h2>
                      <h2>Likes</h2>
                    </div>
                    <div className="Total_number_show_div">
                      <h2>{UserDetailsdata?.birthdate || "N/A"}</h2>
                      <h2>DOB</h2>
                    </div>
                    <div className="Total_number_show_div">
                      <h2>{UserDetailsdata?.gender || "N/A"}</h2>
                    </div>
                    <div className="Total_number_show_div">
                      <p>
                        {UserDetailsdata?.country_code || ""}{" "}
                        {UserDetailsdata?.phone_number || "N/A"}
                      </p>
                      <h2>Mo.Number</h2>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-data-message">
                  <h3>No Data Found</h3>
                  <p>Please try again later or check user ID.</p>
                </div>
              )
            ) : detailList === 1 ? (
              <PostDetails />
            ) : detailList === 2 ? (
              <PlayDetails />
            ) : detailList === 3 ? (
              <PollDetails />
            ) : (
              <StatusDetails />
            )}
          </div>
        </div>
      </div>

      {/* Optional: Keeping Backdrop loader if you want
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#000000bd",
        }}
        open={loading}
      >
        <Loader />
      </Backdrop> */}
    </>
  );
};

export default Userdeatisl;

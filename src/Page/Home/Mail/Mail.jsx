import "./Mail.css";
import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import Loader from "../../../Common/loader/index";
import { NavLink } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "../../../Common/Api/Api";
import Backdrop from "@mui/material/Backdrop";
import { MailSchemas } from "../../../schemas/index";
import default_img from "../../../Assets/defaultProfileImg.png";
import img1 from "../../../Assets/userlist/Nabil.png";
import img2 from "../../../Assets/userlist/Beihe_Wang.png";
import img3 from "../../../Assets/userlist/Bembe.png";
import img4 from "../../../Assets/userlist/Ben.jpg";
import img5 from "../../../Assets/userlist/Lena.png";
import img6 from "../../../Assets/userlist/Leonardo.png";
import img7 from "../../../Assets/userlist/Noora.png";
import img8 from "../../../Assets/userlist/Nabil.png";

const Mail = () => {
  const email = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_3_833)">
        <path
          d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z"
          fill="#059bff"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_833">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  const noti = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM9 21H15V23H9V21Z"
        fill="#059bff"
      />
    </svg>
  );
  const ico = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z"
        fill="#000"
      />
    </svg>
  );
  const initialValues = {
    Title: "",
    Desc: "",
  };
  const UserdemoData = [
    { id: 1, profileImage: img1, firstName: "Nabil", lastName: "Ahmed" },
    { id: 2, profileImage: img2, firstName: "Beihe", lastName: "Wang" },
    { id: 3, profileImage: img3, firstName: "Bembe", lastName: "Okoro" },
    { id: 4, profileImage: img4, firstName: "Ben", lastName: "Johnson" },
    { id: 5, profileImage: img5, firstName: "Lena", lastName: "Schmidt" },
    { id: 6, profileImage: img6, firstName: "Leonardo", lastName: "Martinez" },
    { id: 7, profileImage: img7, firstName: "Noora", lastName: "Hassan" },
    { id: 8, profileImage: img8, firstName: "Nabil", lastName: "Ahmed" },
  ];

  const [checked, setChecked] = useState(false);
  const [userDatalist, setUserDatalist] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [notiChecked, setNotiChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    console.log("🚀 ~ handleCheckboxChange ~ isChecked:", isChecked);
    setChecked(isChecked);
    if (isChecked) {
      const allUserIds = UserdemoData.map((user) => user.id);
      //   const allUserIds = userDatalist.map((user) => user.id); live data with api
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleEmailCheckboxChange = () => {
    setEmailChecked(!emailChecked);
  };

  const handleNotiCheckboxChange = () => {
    setNotiChecked(!notiChecked);
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const userData = async (searchTerm) => {
    try {
      const response = await axios.post(
        "admin/user-notification-list",
        {
          search: searchTerm,
        },
        {
          headers: {
            Authorization: `${MyToken}`,
          },
        }
      );
      setUserDatalist(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    userData();
  }, []);
  useEffect(() => {
    if (searchTerm.length > 0 || searchTerm.length === 0) {
      const delayDebounceFn = setTimeout(() => {
        userData(searchTerm);
      });

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  //   const onSubmit = async (values, { resetForm }) => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post(
  //         "admin/send-podcast-news",
  //         {
  //           title: values.Title,
  //           description: values.Desc,
  //           userIds: selectedUsers,
  //           sendNotify: notiChecked,
  //           sendMail: emailChecked,
  //         },
  //         {
  //           headers: {
  //             Authorization: `${MyToken}`,
  //           },
  //         }
  //       );

  //       resetForm();
  //       setLoading(false);
  //       setSelectedUsers([]);
  //       setChecked(false);
  //     } catch (error) {
  //       setLoading(false);
  //     }
  //   };

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    errors,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: MailSchemas,
    // onSubmit,
    onSubmit: (values, { resetForm }) => {
      console.log("🚀 ~ SendNotification ~ values:", values);
      setNotiChecked(false);
      setSelectedUsers([]);
      setChecked(false);
      resetForm();
    },
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <>
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="main_notification_div">
            <div className="heading_div_of_notification">
              <h1>Send Mail</h1>
            </div>
            <form action="" className="sendnoti" onSubmit={handleSubmit}>
              <div className="main_all_input_div">
                <div className="from_inputs_div">
                  <div className="title_main_div">
                    <label htmlFor="">Subject</label>
                    <div className="title_input_div">
                      <input
                        type="text"
                        value={values.Title}
                        name="Title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {touched.Title && errors.Title ? (
                      <div className="errors_msg_p">{errors.Title}</div>
                    ) : null}
                  </div>
                  <div className="desc_main_div">
                    <label htmlFor="">Message Box</label>
                    <div className="text_area_desc">
                      <textarea
                        name="Desc"
                        id=""
                        value={values.Desc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></textarea>
                    </div>
                    {touched.Desc && errors.Desc ? (
                      <div className="errors_msg_p">{errors.Desc}</div>
                    ) : null}
                  </div>
                </div>
                <div className="userlists_div">
                  <div className="head_div_for_userlist">
                    <div className="USer_list_heading_div">
                      <div className="user_list_title">
                        <h2>User List</h2>
                      </div>
                      {/* <div className="select_teg_of_all">
                            <p>Select All</p>
                            <div className="checkbox_of_all">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />
                            <span className="checkmark"></span>
                            </div>
                        </div> */}
                    </div>
                    <div className="search_main_div">
                      <div className="input_box">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleInputChange}
                        />
                      </div>
                      <NavLink>{ico}</NavLink>
                    </div>
                  </div>
                  <div className="mid_div_for_userlist">
                    {/* {userDatalist.map((item, i) => ( */}
                    {UserdemoData.map((item, i) => (
                      <div className="div_of_user_data" key={i}>
                        <div className="user_details_of_uselist">
                          <div className="iamge_box">
                            <img
                              src={
                                item.profileImage
                                  ? item.profileImage
                                  : default_img
                              }
                              alt=""
                            />
                          </div>
                          <div className="name_div_userlist">
                            <p>
                              {item.firstName} {item.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="checkbox_of_all">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(item.id)}
                            onChange={() => handleUserCheckboxChange(item.id)}
                          />
                          <span className="checkmark"></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="last_div_for_userlist">
                    <div className="email_check_div">
                      <span>{email}</span>
                      <div className="checkbox_of_all">
                        <input
                          type="checkbox"
                          checked={emailChecked}
                          onChange={handleEmailCheckboxChange}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </div>
                    {/* <div className="email_check_div">
                      <span>{noti}</span>
                      <div className="checkbox_of_all">
                        <input
                          type="checkbox"
                          checked={notiChecked}
                          onChange={handleNotiCheckboxChange}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="btn_of_delte_model">
                <Button
                  type="submit"
                  variant="primary"
                  style={{ background: "var(--primary-color-lightgreen)" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {!loading && <div></div>}
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#1249328c",
            }}
            open={true}
          >
            <Loader />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default Mail;

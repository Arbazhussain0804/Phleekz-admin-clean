import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Model.css";
import {
  ForgotSchemas,
  ChnagepasswordSchemas,
  AddHastagSchemas,
  BanuserSchemas,
  BlueTickRejectSchemas,
  AddFaqsSchemas,
  AddBusinessCategorySchemas,
  AddSectionSchemas,
  AddSectionItemsSchemas,
} from "../../schemas/index";
import axios from "../../Common/Api/Api";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Loader from "../loader/index";
import defulteImage from "../../Assets/Logo.png";

export const ForgotPasswordModel = () => {
  const { forgotPasswordModel, setForgotPasswordModel } =
    useContext(GlobalContext);
  const handleClose = () => {
    setForgotPasswordModel(false);
  };

  const initialValues = {
    Email: "",
  };
  const [loading, setloading] = useState(false);
  const onSubmit = async () => {
    setloading(true);
    try {
      const response = await axios.post(
        "admin/forgot-password",
        {
          email: values.Email,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("Forgot password response:", response);
      handleClose();
      setloading(false);
    } catch (error) {
      console.log("Forgot password error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ForgotSchemas,
    // onSubmit,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  return (
    <>
      <Modal
        size="ms"
        show={forgotPasswordModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(159, 160, 163, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="main_change_div">
            <form action="" className="pass_form" onSubmit={handleSubmit}>
              <div className="oldpass">
                <label htmlFor="text">Email</label>
                <div className="old_pass_input_div">
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={values.Email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.Email && touched.Email ? (
                  <p className="errors_msg_p">{errors.Email} </p>
                ) : null}
              </div>

              <div className="pass_sub_btn">
                <Button
                  type="submit"
                  variant="primary"
                  style={{ background: "var(--primary-color-lightgreen)" }}
                  // onClick={handleClose}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const ChangepasswordModel = () => {
  const { changePasswordshow, setchangePasswordshow } =
    useContext(GlobalContext);
  const handleClose = () => {
    setchangePasswordshow(false);
  };

  const initialValues = {
    oldpassword: "",
    Newpassword: "",
    confirmpassword: "",
  };
  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (values, { resetForm }) => {
    try {
      const Response = await axios.post(
        "admin/change-password",
        {
          oldPassword: values.oldpassword,
          newPassword: values.Newpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      if (Response?.status === 200) {
        toast.success("Password updated successfully", {
          position: "top-right",
        });
        setchangePasswordshow(false);
        resetForm();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
      console.log(error);
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ChnagepasswordSchemas,
    onSubmit,
  });
  // : () => {
  // console.log(values);
  // resetForm();
  // },
  return (
    <>
      <Toaster />
      <Modal
        size="ms"
        show={changePasswordshow}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(159, 160, 163, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title>Chnage Password</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="main_change_div">
            <form action="" className="pass_form" onSubmit={handleSubmit}>
              <div className="oldpass">
                <label htmlFor="text">Old Password</label>
                <div className="old_pass_input_div">
                  <input
                    type="text"
                    id="oldpassword"
                    name="oldpassword"
                    value={values.oldpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="old Password"
                  />
                </div>
                {errors.oldpassword && touched.oldpassword ? (
                  <p className="errors_msg_p">{errors.oldpassword} </p>
                ) : null}
              </div>
              <div className="oldpass">
                <label htmlFor="text">New Password</label>
                <div className="old_pass_input_div">
                  <input
                    type="text"
                    id="Newpassword"
                    name="Newpassword"
                    value={values.Newpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="New password"
                  />
                </div>
                {errors.Newpassword && touched.Newpassword ? (
                  <p className="errors_msg_p">{errors.Newpassword} </p>
                ) : null}
              </div>
              <div className="oldpass">
                <label htmlFor="text">Confirm Password</label>
                <div className="old_pass_input_div">
                  <input
                    type="text"
                    id="confirmpassword"
                    name="confirmpassword"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                  />
                </div>
                {errors.confirmpassword && touched.confirmpassword ? (
                  <p className="errors_msg_p">{errors.confirmpassword} </p>
                ) : null}
              </div>
              <div className="pass_sub_btn">
                <Button
                  type="submit"
                  variant="primary"
                  style={{ background: "var(--primary-color-lightgreen)" }}
                  // onClick={handleClose}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const LogoutModel = () => {
  const { LogoutModalshow, setLogoutModalshow } = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleClose = () => {
    setLogoutModalshow(false);
  };
  const handlelogout = () => {
    setLogoutModalshow(false);
    localStorage.removeItem("responseData");
    localStorage.removeItem("MYtokan");
    navigate("/Login");
  };
  return (
    <>
      <Modal
        size="sm"
        show={LogoutModalshow}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(159, 160, 163, 0.55)" }}
      >
        <Modal.Body closeButton className="modelbg">
          <Modal.Title style={{ textAlign: "center" }}>Log out !</Modal.Title>
          <p>Are you sure, you want to Logout ?</p>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={handlelogout}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const PostDetailsModel = () => {
  const { PostDetailsmodelshow, setPostDetailsmodelshow } =
    useContext(GlobalContext);

  const handleClose = () => {
    setPostDetailsmodelshow(false);
  };
  const handlelogout = () => {
    setPostDetailsmodelshow(false);
  };
  return (
    <>
      <Modal
        size="lg"
        show={PostDetailsmodelshow}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(159, 160, 163, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Post Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg">
          <p>Are you sure, you want to Logout ?</p>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={handlelogout}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
// ?  ADD hastag model start here
export const AddHanstagModel = () => {
  const { HashtagModel, setHashtagModel, HashtagReload, setHashtagReload } =
    useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setHashtagModel(false);
  };

  const initialValues = {
    Hastagname: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "master/manage-hashtag",
        {
          type: "Add",
          name: values.Hastagname,
          id: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      resetForm();
      setHashtagReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddHastagSchemas,
    onSubmit,
    // onSubmit: () =>
    // {
    //   console.log(values);
    //   resetForm();
    // }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const modifiedValue = value.replace(/ /g, "_"); // Replace spaces with underscores
    formikHandleChange({
      target: {
        name,
        value: modifiedValue,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={HashtagModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Add Hastag</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Add Hastag</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="Hastagname"
                  placeholder="Add Hastag"
                  value={values.Hastagname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.Hastagname && touched.Hastagname ? (
                <p className="errors_msg_p">{errors.Hastagname} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ?  ADD hastag model end here
// ?  edit hastag model start here
export const EditHanstagModel = () => {
  const {
    EditHashtagModel,
    setEditHashtagModel,
    SelectedHashtagData,
    setSelectedHashtagData,
    HashtagReload,
    setHashtagReload,
  } = useContext(GlobalContext);
  console.log("🚀 ~ SelectedHashtagData:", SelectedHashtagData);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setEditHashtagModel(false);
  };

  const initialValues = {
    Hastagname: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (valuem, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "master/manage-hashtag",
        {
          type: "Edit",
          name: values.Hastagname,
          id: SelectedHashtagData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      resetForm();
      setHashtagReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddHastagSchemas,
    onSubmit,
    // onSubmit: () =>
    // {
    //   console.log(values);
    //   resetForm();
    // }
  });
  useEffect(() => {
    if (SelectedHashtagData) {
      setValues({
        Hastagname: SelectedHashtagData?.name,
      });
    }
  }, [SelectedHashtagData, setValues]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const modifiedValue = value.replace(/ /g, "_"); // Replace spaces with underscores
    formikHandleChange({
      target: {
        name,
        value: modifiedValue,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={EditHashtagModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Edit Hastag</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Edit Hastag</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="Hastagname"
                  placeholder="Add Hastag"
                  value={values.Hastagname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.Hastagname && touched.Hastagname ? (
                <p className="errors_msg_p">{errors.Hastagname} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ?  edit hastag model end here

export const DeleteHanstagModel = () => {
  const {
    DeleteHashtag,
    SetdeleteHashtag,
    SelectedHashtagData,
    setSelectedHashtagData,
    HashtagReload,
    setHashtagReload,
  } = useContext(GlobalContext);
  console.log("🚀 ~ SelectedHashtagData:", SelectedHashtagData);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    SetdeleteHashtag(false);
  };

  const initialValues = {
    Hastagname: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const DeleteHastagapi = async () => {
    setloading(true);
    try {
      const Response = await axios.post(
        "master/manage-hashtag",
        {
          type: "Delete",
          name: SelectedHashtagData.name,
          id: SelectedHashtagData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );

      setHashtagReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const handleDeletcall = () => {
    DeleteHastagapi();
    handleClose();
  };

  return (
    <>
      <Modal
        size="sm"
        show={DeleteHashtag}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Delete Hastag
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>Are you sure, you want to Delete this Hastag ?</p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleDeletcall()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

export const DeleteuserModel = () => {
  const {
    UserDeleteModel,
    setUserDeleteModel,
    SelectedUser,
    UserListReload,
    setUserListReload,
  } = useContext(GlobalContext);

  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setUserDeleteModel(false);
  };

  return (
    <>
      <Modal
        size="md"
        show={UserDeleteModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>
              Are you sure, you want to Delete this User (
              {SelectedUser?.username}) ?
            </p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleClose()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

export const BanuserModel = () => {
  const {
    UserBenModel,
    setUserBenModel,
    SelectedUser,
    UserListReload,
    setUserListReload,
  } = useContext(GlobalContext);

  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setUserBenModel(false);
  };

  const initialValues = {
    Reason: "",
    Duration: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: BanuserSchemas,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      handleClose();
    },
  });

  return (
    <>
      <Modal
        size="md"
        show={UserBenModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Ban User</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="user_details_main_div">
            <div className="name_div_users">
              <h2>User Name :- {SelectedUser?.username}</h2>
            </div>
            <form action="" className="form_main_div" onSubmit={handleSubmit}>
              <div className="reson_div">
                <label htmlFor="">Ban Reason</label>
                <div className="Ban_reson_input_div">
                  <textarea
                    name="Reason"
                    value={values.Reason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id=""
                  ></textarea>
                </div>
                {errors.Reason && touched.Reason ? (
                  <p className="errors_msg_p">{errors.Reason} </p>
                ) : null}
              </div>
              <div className="Ban_duration">
                <select
                  name="Duration"
                  value={values.Duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id=""
                >
                  <option value="">Ban duration</option>
                  <option value="3Month">3 Month</option>
                  <option value="6Month">6 Month</option>
                  <option value="12Month">12 Month</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Bot & Fake Account">Bot & Fake Account</option>
                </select>
              </div>
              {errors.Duration && touched.Duration ? (
                <p className="errors_msg_p">{errors.Duration} </p>
              ) : null}
              <div className="btn_of_delte_model">
                <Button variant="secondary" onClick={handleClose}>
                  No
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ background: "var(--primary-color-lightgreen)" }}
                >
                  Yes
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

export const BlueTickApprovedModel = () => {
  const {
    blueTickAcceptModel,
    setblueTickAcceptModel,
    SelectedUser,
    UserListReload,
    setUserListReload,
  } = useContext(GlobalContext);

  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setblueTickAcceptModel(false);
  };
  return (
    <>
      <Modal
        size="md"
        show={blueTickAcceptModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Approved Blue Tick User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>
              Are you sure, you want to Approved Blue Tick for this User (
              {SelectedUser?.username}) ?
            </p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              closed
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleClose()}
            >
              Approved
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
export const UnBanModel = () => {
  const {
    UserUNBenModel,
    setUserUNBenModel,

    SelectedUser,
    UserListReload,
    setUserListReload,
  } = useContext(GlobalContext);

  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setUserUNBenModel(false);
  };
  return (
    <>
      <Modal
        size="md"
        show={UserUNBenModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>UnBan User</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>
              Are you sure, you want to UnBan this User (
              {SelectedUser?.username}) ?
            </p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleClose()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

export const BlueTickRejectModel = () => {
  const {
    blueTickRejectModel,
    setblueTickRejectModel,
    SelectedUser,
    UserListReload,
    setUserListReload,
  } = useContext(GlobalContext);

  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setblueTickRejectModel(false);
  };

  const initialValues = {
    Reason: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: BlueTickRejectSchemas,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      handleClose();
    },
  });

  return (
    <>
      <Modal
        size="md"
        show={blueTickRejectModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Blue Tick Reject{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="user_details_main_div">
            <div className="name_div_users">
              <h2>User Name :- {SelectedUser?.username}</h2>
            </div>
            <form action="" className="form_main_div" onSubmit={handleSubmit}>
              <div className="reson_div">
                <label htmlFor="">Blue Tick Reject Reason</label>
                <div className="Ban_reson_input_div">
                  <textarea
                    name="Reason"
                    value={values.Reason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id=""
                  ></textarea>
                </div>
                {errors.Reason && touched.Reason ? (
                  <p className="errors_msg_p">{errors.Reason} </p>
                ) : null}
              </div>
              {/* <div className="Ban_duration">
                <select
                  name="Duration"
                  value={values.Duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id=""
                >
                  <option value="">Ban duration</option>
                  <option value="3Month">3 Month</option>
                  <option value="6Month">6 Month</option>
                  <option value="12Month">12 Month</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Bot & Fake Account">Bot & Fake Account</option>
                </select>
              </div>
              {errors.Duration && touched.Duration ? (
                <p className="errors_msg_p">{errors.Duration} </p>
              ) : null} */}
              <div className="btn_of_delte_model">
                <Button variant="secondary" onClick={handleClose}>
                  Closed
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ background: "var(--primary-color-lightgreen)" }}
                >
                  Reject
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

// ? Comment delete model

export const DeleteCommnetsModel = () => {
  const {
    CommentDeletemodel,
    setCommentDeletemodel,
    seletedCommentsData,
    setseletedCommentsData,
  } = useContext(GlobalContext);

  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setCommentDeletemodel(false);
  };

  return (
    <>
      <Modal
        size="md"
        show={CommentDeletemodel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Delete Comments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>Are you sure, you want to Delete this Comments ?</p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleClose()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

// ! Faqs all models

// ? Add Faqs model start here
export const AddFaqsModel = () => {
  const { FaqsAddModel, setFaqsAddModel, FaqsReload, setFaqsReload } =
    useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setFaqsAddModel(false);
  };

  const initialValues = {
    question: "",
    answer: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "cms/manage-faq",
        {
          type: "Add",
          question: values.question,
          answer: values.answer,
          id: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      resetForm();
      setFaqsReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddFaqsSchemas,
    onSubmit,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={FaqsAddModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Add Faqs</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Add Question</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="question"
                  placeholder="Add Question"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.question && touched.question ? (
                <p className="errors_msg_p">{errors.question} </p>
              ) : null}
            </div>
            <div className="main_input_container">
              <label htmlFor=""> Add Answer</label>
              <div className="textarea_box">
                <textarea
                  name="answer"
                  placeholder="Add Answer"
                  value={values.answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div>
              {errors.answer && touched.answer ? (
                <p className="errors_msg_p">{errors.answer} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Add Faqs model end here
// ? Edit Faqs model start here
export const EditFaqsModel = () => {
  const {
    FaqsEditModel,
    setFaqsEditModel,
    SelectedFaqsData,
    setSelectedFaqsData,
    FaqsReload,
    setFaqsReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setFaqsEditModel(false);
  };

  const initialValues = {
    question: "",
    answer: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "cms/manage-faq",
        {
          type: "Edit",
          question: values.question,
          answer: values.answer,
          id: SelectedFaqsData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      resetForm();
      setFaqsReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddFaqsSchemas,
    onSubmit,
  });
  useEffect(() => {
    if (SelectedFaqsData) {
      setValues({
        question: SelectedFaqsData?.question,
        answer: SelectedFaqsData?.answer,
      });
    }
  }, [SelectedFaqsData, setValues]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={FaqsEditModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Edit Faqs</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Edit Question</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="question"
                  placeholder="Edit Question"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.question && touched.question ? (
                <p className="errors_msg_p">{errors.question} </p>
              ) : null}
            </div>
            <div className="main_input_container">
              <label htmlFor=""> Edit Answer</label>
              <div className="textarea_box">
                <textarea
                  name="answer"
                  placeholder="Edit Answer"
                  value={values.answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div>
              {errors.answer && touched.answer ? (
                <p className="errors_msg_p">{errors.answer} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Edit Faqs model end here
//? delete Faqs model start here
export const DeleteFaqsModel = () => {
  const {
    FaqsDeleteModel,
    setFaqsDeleteModel,
    SelectedFaqsData,
    setSelectedFaqsData,
    FaqsReload,
    setFaqsReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setFaqsDeleteModel(false);
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const DeleteFaqsapi = async () => {
    setloading(true);
    try {
      const Response = await axios.post(
        "cms/manage-faq",
        {
          type: "Delete",
          question: SelectedFaqsData.question,
          answer: SelectedFaqsData.answer,
          id: SelectedFaqsData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );

      setFaqsReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const handleDeletcall = () => {
    DeleteFaqsapi();
    handleClose();
  };

  return (
    <>
      <Modal
        size="sm"
        show={FaqsDeleteModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Delete Faqs</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>Are you sure, you want to Delete this Faq ?</p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleDeletcall()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Delete Faqs model end here

// ! Business Category all model

// ? Add Business Category model start here
export const AddBusinessCategoryModel = () => {
  const {
    BusinessCategoryAddModel,
    setBusinessCategoryAddModel,
    BusinessCategoryReload,
    setBusinessCategoryReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setBusinessCategoryAddModel(false);
  };

  const initialValues = {
    category: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "master/manage-business-category",
        {
          type: "Add",
          name: values.category,
          id: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      resetForm();
      setBusinessCategoryReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddBusinessCategorySchemas,
    onSubmit,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={BusinessCategoryAddModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Add Business Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Add Category</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="category"
                  placeholder="Add Category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.category && touched.category ? (
                <p className="errors_msg_p">{errors.category} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Add Business Category model end here
// ? Edit Business Category model start here
export const EditBusinessCategoryModel = () => {
  const {
    BusinessCategoryEditModel,
    setBusinessCategoryEditModel,
    SelectedBusinessCategoryData,
    setSelectedBusinessCategoryData,
    BusinessCategoryReload,
    setBusinessCategoryReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setBusinessCategoryEditModel(false);
  };

  const initialValues = {
    category: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "master/manage-business-category",
        {
          type: "Edit",
          name: values.category,
          id: SelectedBusinessCategoryData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      resetForm();
      setBusinessCategoryReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddBusinessCategorySchemas,
    onSubmit,
  });
  useEffect(() => {
    if (SelectedBusinessCategoryData) {
      setValues({
        category: SelectedBusinessCategoryData?.name,
      });
    }
  }, [SelectedBusinessCategoryData, setValues]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={BusinessCategoryEditModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Edit Business Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Edit Category</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="category"
                  placeholder="Edit Category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.category && touched.category ? (
                <p className="errors_msg_p">{errors.category} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Edit Business Category model end here
// ? Delete Business Category model start here
export const DeleteBusinessCategoryModel = () => {
  const {
    BusinessCategoryDeleteModel,
    setBusinessCategoryDeleteModel,
    SelectedBusinessCategoryData,
    setSelectedBusinessCategoryData,
    BusinessCategoryReload,
    setBusinessCategoryReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setBusinessCategoryDeleteModel(false);
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const DeleteBusinessCategoryapi = async () => {
    setloading(true);
    try {
      const Response = await axios.post(
        "master/manage-business-category",
        {
          type: "Delete",
          name: SelectedBusinessCategoryData.name,
          id: SelectedBusinessCategoryData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );

      setBusinessCategoryReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const handleDeletcall = () => {
    DeleteBusinessCategoryapi();
    handleClose();
  };

  return (
    <>
      <Modal
        size="md"
        show={BusinessCategoryDeleteModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title>Delete Business Category</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>Are you sure, you want to Delete this Business Category ?</p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleDeletcall()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Delete Business Category model end here

// ! Sections All models
// ? Add Section model start here
export const AddSectionModel = () => {
  const {
    SectionsDataAddModel,
    setSectionsDataAddModel,

    SectionsDataReload,
    setSectionsDataReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSectionsDataAddModel(false);
  };

  const initialValues = {
    section: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "section/manage-section",
        {
          type: "Add",
          name: values.section,
          id: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      resetForm();
      setSectionsDataReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddSectionSchemas,
    onSubmit,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={SectionsDataAddModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>Add Section</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Add Section</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="section"
                  placeholder="Add Section"
                  value={values.section}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.section && touched.section ? (
                <p className="errors_msg_p">{errors.section} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Add Section model end here
// ? Edit Section model start here
export const EditSectionModel = () => {
  const {
    SectionsDataEditModel,
    setSectionsDataEditModel,
    SelectedSectionsData,
    setSelectedSectionsData,
    SectionsDataReload,
    setSectionsDataReload,
  } = useContext(GlobalContext);

  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSectionsDataEditModel(false);
  };

  const initialValues = {
    section: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "section/manage-section",
        {
          type: "Edit",
          name: values.section,
          id: SelectedSectionsData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      resetForm();
      setSectionsDataReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: AddSectionSchemas,
    onSubmit,
  });
  useEffect(() => {
    if (SelectedSectionsData) {
      setValues({
        section: SelectedSectionsData?.section_name,
      });
    }
  }, [SelectedSectionsData, setValues]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={SectionsDataEditModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Edit Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Edit Section</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="section"
                  placeholder="Edit Section"
                  value={values.section}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.section && touched.section ? (
                <p className="errors_msg_p">{errors.section} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

// ? Edit Section model end here
// ? Delete Section model start here
export const DeleteSectionModel = () => {
  const {
    SectionsDataDeleteModel,
    setSectionsDataDeleteModel,

    SelectedSectionsData,
    setSelectedSectionsData,

    SectionsDataReload,
    setSectionsDataReload,
  } = useContext(GlobalContext);
  console.log(
    "🚀 ~ DeleteSectionModel ~ SelectedSectionsData:",
    SelectedSectionsData
  );
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSectionsDataDeleteModel(false);
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const DeleteSectionapi = async () => {
    setloading(true);
    try {
      const Response = await axios.post(
        "section/manage-section",
        {
          type: "Delete",
          name: SelectedSectionsData.section_name,
          id: SelectedSectionsData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );

      setSectionsDataReload(true);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const handleDeletcall = () => {
    DeleteSectionapi();
    handleClose();
  };

  return (
    <>
      <Modal
        size="md"
        show={SectionsDataDeleteModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Delete Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>Are you sure, you want to Delete this Section ?</p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleDeletcall()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Delete Section model end here

// ! Sections items All models
// ? Add Section items model start here
export const AddSectionItemsModel = () => {
  const {
    SectionsItemsAddModel,
    setSectionsItemsAddModel,
    SectionsItemsReload,
    setSectionsItemsReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSectionsItemsAddModel(false);
  };

  const initialValues = {
    question: "",
    answer: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const sectionId = JSON.parse(localStorage.getItem("sectionId"));

  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "section/manage-section-data",
        {
          type: "Add", // Add , Edit , Delete
          id: 0, // if type= Add then send 0 , for other send a id
          section_id: sectionId,
          question: values.question,
          answer: values.answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      handleClose();
      setloading(false);
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      setSectionsItemsReload(true);
      resetForm();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddSectionItemsSchemas,
    onSubmit,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={SectionsItemsAddModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Add Section Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Add Question</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="question"
                  placeholder="Add Question"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.question && touched.question ? (
                <p className="errors_msg_p">{errors.question} </p>
              ) : null}
            </div>
            <div className="main_input_container">
              <label htmlFor=""> Add Answer</label>
              <div className="textarea_box">
                <textarea
                  name="answer"
                  placeholder="Add Answer"
                  value={values.answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div>
              {errors.answer && touched.answer ? (
                <p className="errors_msg_p">{errors.answer} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Add Section items model end here
// ? Edit Section items model start here
export const EditSectionItemsModel = () => {
  const {
    SectionsItemsEditModel,
    setSectionsItemsEditModel,
    SelectedSectionsItemsData,
    setSelectedSectionsItemsData,
    SectionsItemsReload,
    setSectionsItemsReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSectionsItemsEditModel(false);
  };

  const initialValues = {
    question: "",
    answer: "",
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const SectionId = JSON.parse(localStorage.getItem("sectionId"));

  const onSubmit = async (value, { resetForm }) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "section/manage-section-data",
        {
          type: "Edit", // Add , Edit , Delete
          id: SelectedSectionsItemsData.id, // if type= Add then send 0 , for other send a id
          section_id: SectionId,
          question: values.question,
          answer: values.answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ onSubmit ~ Response:", Response);
      resetForm();
      setSectionsItemsReload(true);
      setSelectedSectionsItemsData(null);

      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const {
    values,
    handleBlur,
    handleChange: formikHandleChange,
    touched,
    handleSubmit,
    resetForm,
    errors,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddSectionItemsSchemas,
    onSubmit,
  });
  useEffect(() => {
    if (SelectedSectionsItemsData) {
      setValues({
        question: SelectedSectionsItemsData?.question,
        answer: SelectedSectionsItemsData?.answer,
      });
    }
  }, [SelectedSectionsItemsData, setValues]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    formikHandleChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <Modal
        size="md"
        show={SectionsItemsEditModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Edit Section Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <form action="" className="main_hastag_div" onSubmit={handleSubmit}>
            <div className="main_input_container">
              <label htmlFor=""> Edit Question</label>
              <div className="Input_box">
                <input
                  type="text"
                  name="question"
                  placeholder="Edit Question"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.question && touched.question ? (
                <p className="errors_msg_p">{errors.question} </p>
              ) : null}
            </div>
            <div className="main_input_container">
              <label htmlFor=""> Edit Answer</label>
              <div className="textarea_box">
                <textarea
                  name="answer"
                  placeholder="Edit Answer"
                  value={values.answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div>
              {errors.answer && touched.answer ? (
                <p className="errors_msg_p">{errors.answer} </p>
              ) : null}
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
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Edit Section items model end here
// ? Delete Section items model start here
export const DeleteSectionItemsModel = () => {
  const {
    SectionsItemsDeleteModel,
    setSectionsItemsDeleteModel,
    SelectedSectionsItemsData,
    setSelectedSectionsItemsData,
    SectionsItemsReload,
    setSectionsItemsReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSectionsItemsDeleteModel(false);
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const SectionId = JSON.parse(localStorage.getItem("sectionId"));
  const DeleteSectionItemsapi = async () => {
    setloading(true);
    try {
      const Response = await axios.post(
        "section/manage-section-data",
        {
          type: "Delete",
          id: SelectedSectionsItemsData.id,
          section_id: SectionId,
          question: SelectedSectionsItemsData.question,
          answer: SelectedSectionsItemsData.answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );

      setSectionsItemsReload(true);
      setSelectedSectionsItemsData(null);
      console.log("🚀 ~ DeleteSectionItemsapi ~ Response:", Response);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const handleDeletcall = () => {
    DeleteSectionItemsapi();
    handleClose();
  };

  return (
    <>
      <Modal
        size="md"
        show={SectionsItemsDeleteModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Delete Section Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>Are you sure, you want to Delete this Section Item ?</p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleDeletcall()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Delete Section items model end here

// ? for Support view data model in this model  we have to show the support data like ( name , email , subject, description, screenshot image )
export const SupportViewDataModel = () => {
  const {
    SupportsViewModel,
    setSupportsViewModel,
    SupportsCheckModel,
    setSupportsCheckModel,
    SupportsReload,
    setSupportsReload,
    SelectedSupportsdata,
    setSelectedSupportsdata,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSupportsViewModel(false);
  };

  return (
    <>
      <Modal
        size="md"
        show={SupportsViewModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Support View Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbg_hastag">
          <div className="support_view_data_div">
            <p>
              <span>Name:</span> {SelectedSupportsdata?.name}
            </p>
            <p>
              <span>Email:</span> {SelectedSupportsdata?.email}
            </p>
            <p>
              <span>Subject:</span> {SelectedSupportsdata?.subject}
            </p>
            <p>
              <span>Description:</span> {SelectedSupportsdata?.description}
            </p>
            <div className="support_view_data_image_div">
              <span>Screenshot:</span>
              {SelectedSupportsdata?.screenshot ? (
                <img
                  src={SelectedSupportsdata?.screenshot}
                  alt="screenshot"
                  className="support_view_data_image"
                />
              ) : (
                <p className="no_image_p">
                  The user did not attach a screenshot for this request.
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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
// ? Support view data model end here

// ? Support check model in this model we have to check  this data is is read by admin we have intigrati to one post method api upport/contactus-mark-as-read this my end point and this api will take id and show tost message those message we get and in resposnse
export const SupportCheckModel = () => {
  const {
    SupportsCheckModel,
    setSupportsCheckModel,
    SelectedSupportsdata,
    setSelectedSupportsdata,
    SupportsReload,
    setSupportsReload,
  } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setSupportsCheckModel(false);
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const SupportCheckApi = async () => {
    setloading(true);
    try {
      const Response = await axios.post(
        "support/contactus-mark-as-read",
        {
          id: SelectedSupportsdata.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ SupportCheckApi ~ Response:", Response);
      setSupportsReload(true);
      setSelectedSupportsdata(null);
      setloading(false);
      handleClose();
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  const handleCheckcall = () => {
    SupportCheckApi();
    handleClose();
  };

  return (
    <>
      <Modal
        size="md"
        show={SupportsCheckModel}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        style={{ backgroundColor: "rgba(32, 32, 32, 0.55)" }}
      >
        <Modal.Header closeButton className="model_title">
          <Modal.Title style={{ textAlign: "center" }}>
            Support Check Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton className="modelbg">
          <div className="Delete_text_p">
            <p>Are you sure, you want to mark this support as read ?</p>
          </div>

          <div className="btn_of_delte_model">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="primary"
              style={{ background: "var(--primary-color-lightgreen)" }}
              onClick={() => handleCheckcall()}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {loading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#000000bd",
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

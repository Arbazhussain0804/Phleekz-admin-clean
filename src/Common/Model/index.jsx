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
} from "../../schemas/index";
import axios from "../../Common/Api/Api";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Loader from "../loader/index";

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

import React, { useState, useContext } from "react";
import "./Login.css";
import logo from "../../Assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { LoginSchemas } from "../../schemas/index";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { GlobalContext } from "../../GlobalContext";
import CircularProgress from "@mui/material/CircularProgress";
// import loadingPat from "../../Assets/loader.gif";
import Loader from "../../Common/loader/index";
import { toast, Toaster } from "react-hot-toast";
import axios from "../../Common/Api/Api";
import CanvasBackground from "../../Common/CanvasBackground";
const initialValues = {
  Email: "",
  Password: "",
};
const Index = () =>
{
  const { forgotPasswordModel, setForgotPasswordModel } =
    useContext(GlobalContext);
  const [loading, setloading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () =>
  {
    setPasswordShown((passwordShown) => !passwordShown);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = async (values) =>
  {
    setloading(true);
    try {
      const response = await axios.post(
        "auth/sign-in",
        {
          email: values.Email,
          password: values.Password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("check success response ===>", response);
      if (response.status === 200) {
        toast.success(response?.data?.message, {
          position: "top-right",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/Home");

        localStorage.setItem(
          "Login Response",
          JSON.stringify(response?.data?.data?.detail)
        );
        localStorage.setItem(
          "MYtokan",
          JSON.stringify(response?.data?.data?.token)
        );
      }
      setloading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        style: {
          background: "#333",
          color: "#fff",
        },
      });

      setloading(false);
      console.log("check error ===>", error);
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
    validationSchema: LoginSchemas,
    onSubmit,
    // onSubmit: (values, { resetForm }) => {
    //   console.log(values);
    //   navigate("/Home");
    //   resetForm();
    // },
  });
  const [selectedAdmin, setSelectedAdmin] = useState("");

  const handleSelectChange = (event) =>
  {
    const { value } = event.target;
    setFieldValue("Admin", value);
  };

  return (
    <>
      <Toaster />
      <div className="main_div">
        <CanvasBackground />

        <div className="sub_main_div">
          <div className="login_card">
            <div className="logo_box">
              <img src={logo} alt="" />
            </div>
            <div className="text_div">
              <h1>Welcome</h1>
              <h4>Please Login to Admin Dashboard</h4>
            </div>
            <div className="form_div">
              <form onSubmit={handleSubmit}>
                <div className="Email_box">
                  <label htmlFor="email">Email</label>
                  <div className="input_div">
                    <input
                      type="email"
                      id="email"
                      name="Email"
                      value={values.Email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.Email && touched.Email ? (
                    <p className="errors_msg_p">{errors.Email} </p>
                  ) : null}
                </div>
                <div className="Email_box">
                  <label htmlFor="email">Password</label>
                  <div className="input_div_pass">
                    <input
                      type={passwordShown ? "text" : "password"}
                      id="Password"
                      name="Password"
                      value={values.Password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <i
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}>
                      <FontAwesomeIcon
                        icon={passwordShown ? faEyeSlash : faEye}
                        style={{ color: "black" }}
                      />
                    </i>
                  </div>
                  {errors.Password && touched.Password ? (
                    <p className="errors_msg_p">{errors.Password} </p>
                  ) : null}
                </div>
                {/* <div className="Email_box">
                <label htmlFor="admin-select">Select Admin</label>
                <div className="select_div">
                  <select
                    id="admin-select"
                    className="select_div_inner"
                    value={values.Admin}
                    onChange={handleSelectChange}>
                    <option value="">Please select an admin</option>
                    <option value="1">Supper Admin</option>
                    <option value="2">App Admin</option>
                    <option value="3">Garage</option>
                    <option value="4">Showroom</option>
                  </select>
                </div>
                {errors.Admin && touched.Admin ? (
                  <p className="errors_msg_p">{errors.Admin} </p>
                ) : null}
                 onClick={() => setForgotPasswordModel(true)}
              </div> */}
                <div className="Forgot_text">
                  <p onClick={() => setForgotPasswordModel(true)}>
                    Forgotten Your password ?
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn_primry"
                  style={{ textAlign: "center" }}>
                  Login
                </button>
              </form>
            </div>
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
              backgroundColor: "#000000bd",
            }}
            open={true}>
            <Loader />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default Index;

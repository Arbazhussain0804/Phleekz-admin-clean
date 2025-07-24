import * as Yup from "yup";

export const LoginSchemas = Yup.object().shape({
  Email: Yup.string()
    .email("Invalid email address, please add @ or .com")
    .required("Please Enter Your Email"),
  Password: Yup.string().required("Please Enter Your Password"),
});

export const ForgotSchemas = Yup.object().shape({
  Email: Yup.string().email("Invalid email address, please add @ or .com"),
});
export const EditprofileSchemas = Yup.object().shape({
  Fristname: Yup.string("Please Enter Your First name"),
  Lastname: Yup.string("Please Enter Your Last name"),
  Number: Yup.number("Please Enter Your Number"),
});
export const ChnagepasswordSchemas = Yup.object().shape({
  oldpassword: Yup.string().required("Please Enter Your old Password"),
  Newpassword: Yup.string().required("Please Enter Your New Password"),
  confirmpassword: Yup.number().required("Please Enter Your Confirm Password"),
});
export const AddHastagSchemas = Yup.object().shape({
  Hastagname: Yup.string().required("Please Enter Your Hastag"),
});

export const BanuserSchemas = Yup.object().shape({
  Reason: Yup.string().required("Please Enter Your Ban Reason"),
  Duration: Yup.string().required("Please Select Your Ban Duration"),
});
export const BlueTickRejectSchemas = Yup.object().shape({
  Reason: Yup.string().required("Please Enter Your Blue Tick Reject Reason"),
});
export const NotificationSchemas = Yup.object().shape({
  Title: Yup.string().required("Please enter your title"),
  Desc: Yup.string().required("Please enter your description"),
});
export const MailSchemas = Yup.object().shape({
  Title: Yup.string().required("Please enter Subject"),
  Desc: Yup.string().required("Please enter Message "),
});
export const AddFaqsSchemas = Yup.object().shape({
  question: Yup.string().required("Please enter your question"),
  answer: Yup.string().required("Please enter your answer"),
});
export const AddBusinessCategorySchemas = Yup.object().shape({
  category: Yup.string().required("Please enter your business category"),
});
export const AddSectionSchemas = Yup.object().shape({
  section: Yup.string().required("Please enter your section name"),
});

export const AddSectionItemsSchemas = Yup.object().shape({
  question: Yup.string().required("Please enter your question"),
  answer: Yup.string().required("Please enter your answer"),
});

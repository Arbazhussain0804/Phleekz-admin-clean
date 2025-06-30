import React, { useState, useContext, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Common/loader";

import { toast, Toaster } from "react-hot-toast";
import axios from "../../../Common/Api/Api";
import Backdrop from "@mui/material/Backdrop";
import { GlobalContext } from "../../../GlobalContext";

const Privacy = () =>
{
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setloading] = useState(false);
  const [ApiData, setApiData] = useState();
  const navigate = useNavigate();
  const { editorPPData, setEditorPPData } = useContext(GlobalContext);
  const handleEditorChange = (event, editor) =>
  {
    const data = editor.getData();
    setEditorPPData(data);
  };

  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));

  const Privcydata = async () =>
  {
    setloading(true);
    try {

      const response = await axios.post(
        "cms/manage",
        {
          cms_id: 1,
          cms_data: editorPPData
        },
        {
          headers: {
            Authorization: ` ${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ Tremsdata ~ response:", response);
      setloading(false);
      if (response.data.status === 1) {
        toast.success(response.data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log("🚀 ~ Tremsdata ~ error:", error);
      setloading(false);
    }
  };

  const handleSubmit = () =>
  {
    Privcydata();
    setIsSubmitted(true);
    console.log("Submitted data: ", editorPPData);
  };

  const GetApidata = async () =>
  {
    setloading(true);
    try {
      const res = await axios.post(
        "cms/get", { cms_id: 1 }
      );
      console.log("🚀 ~ Apidata ~ res:", res);
      setloading(false);
      setApiData(res.data.data);
    } catch (error) {
      console.log("🚀 ~ Apidata ~ error:", error);
      setloading(false);
    }
  };
  useEffect(() =>
  {
    GetApidata();
  }, []);

  return (
    <>
      <Toaster />
      <div className="container">
        <div className="editor-container">
          <h2>Privacy Policy</h2>
          <CKEditor
            editor={ClassicEditor}
            // dangerouslySetInnerHTML={{ __html: ApiData }}
            data={ApiData}
            onReady={(editor) =>
            {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={handleEditorChange}
            onBlur={(event, editor) =>
            {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) =>
            {
              console.log("Focus.", editor);
            }}
          />
          <div className="btn-container">
            <Button
              type="submit"
              variant="primary"
              style={{
                background: "var(--primary-color-lightgreen)",
              }}
              onClick={handleSubmit}>
              Submit
            </Button>
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
            open={true}>
            <Loader />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default Privacy;


import { children, createContext, useState } from "react";
export const GlobalContext = createContext(global);

const GlobalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [editorPPData, setEditorPPData] = useState("");
  const [editorTCData, setEditorTCData] = useState("");
  const [forgotPasswordModel, setForgotPasswordModel] = useState(false);
  const [changePasswordshow, setchangePasswordshow] = useState(false);
  const [LogoutModalshow, setLogoutModalshow] = useState(false);
  // ? post details model show
  const [PostDetailsmodelshow, setPostDetailsmodelshow] = useState(false);

  // ? Hastag models
  const [HashtagModel, setHashtagModel] = useState(false);
  const [EditHashtagModel, setEditHashtagModel] = useState(false);
  const [SelectedHashtagData, setSelectedHashtagData] = useState([]);
  const [HashtagReload, setHashtagReload] = useState(false);
  const [DeleteHashtag, SetdeleteHashtag] = useState(false);

  // ? User All MOdels

  const [UserDeleteModel, setUserDeleteModel] = useState(false);
  const [SelectedUser, setSelectedUser] = useState();
  const [UserListReload, setUserListReload] = useState(false);
  const [UserBenModel, setUserBenModel] = useState(false);
  const [UserUNBenModel, setUserUNBenModel] = useState(false);
  const [blueTickAcceptModel, setblueTickAcceptModel] = useState(false);
  const [blueTickRejectModel, setblueTickRejectModel] = useState(false);
  const [CommentDeletemodel, setCommentDeletemodel] = useState(false);
  const [seletedCommentsData, setseletedCommentsData] = useState();

  return (
    <GlobalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        //  for CMS page
        editorPPData,
        setEditorPPData,
        editorTCData,
        setEditorTCData,
        //  for CMS page
        // forgotpassword model
        forgotPasswordModel,
        setForgotPasswordModel,
        // Chnagepasword model
        changePasswordshow,
        setchangePasswordshow,
        //  Log out model
        LogoutModalshow,
        setLogoutModalshow,
        // ? post details model
        PostDetailsmodelshow,
        setPostDetailsmodelshow,
        // ? hashtag model
        HashtagModel,
        setHashtagModel,
        EditHashtagModel,
        setEditHashtagModel,
        SelectedHashtagData,
        setSelectedHashtagData,
        HashtagReload,
        setHashtagReload,
        DeleteHashtag,
        SetdeleteHashtag,

        // ? User module All model
        UserDeleteModel,
        setUserDeleteModel,
        SelectedUser,
        setSelectedUser,
        UserListReload,
        setUserListReload,
        UserBenModel,
        setUserBenModel,
        blueTickAcceptModel,
        setblueTickAcceptModel,
        blueTickRejectModel,
        setblueTickRejectModel,
        UserUNBenModel,
        setUserUNBenModel,

        // ? Comments
        CommentDeletemodel,
        setCommentDeletemodel,
        seletedCommentsData,
        setseletedCommentsData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;

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

  // ? Faqs all models
  const [FaqsAddModel, setFaqsAddModel] = useState(false);
  const [FaqsDeleteModel, setFaqsDeleteModel] = useState(false);
  const [FaqsEditModel, setFaqsEditModel] = useState(false);
  const [SelectedFaqsData, setSelectedFaqsData] = useState();
  const [FaqsReload, setFaqsReload] = useState(false);
  // ? Business category all models
  const [BusinessCategoryAddModel, setBusinessCategoryAddModel] =
    useState(false);
  const [BusinessCategoryDeleteModel, setBusinessCategoryDeleteModel] =
    useState(false);
  const [BusinessCategoryEditModel, setBusinessCategoryEditModel] =
    useState(false);
  const [SelectedBusinessCategoryData, setSelectedBusinessCategoryData] =
    useState();
  const [BusinessCategoryReload, setBusinessCategoryReload] = useState(false);
  // ? Sections data all models
  const [SectionsDataAddModel, setSectionsDataAddModel] = useState(false);
  const [SectionsDataDeleteModel, setSectionsDataDeleteModel] = useState(false);
  const [SectionsDataEditModel, setSectionsDataEditModel] = useState(false);
  const [SelectedSectionsData, setSelectedSectionsData] = useState();
  const [SectionsDataReload, setSectionsDataReload] = useState(false);
  // ? Sections items all models
  const [SectionsItemsAddModel, setSectionsItemsAddModel] = useState(false);
  const [SectionsItemsDeleteModel, setSectionsItemsDeleteModel] =
    useState(false);
  const [SectionsItemsEditModel, setSectionsItemsEditModel] = useState(false);
  const [SelectedSectionsItemsData, setSelectedSectionsItemsData] = useState();
  const [SectionsItemsReload, setSectionsItemsReload] = useState(false);

  // ? Supports all models
  const [SupportsViewModel, setSupportsViewModel] = useState(false);
  const [SupportsCheckModel, setSupportsCheckModel] = useState(false);
  const [SupportsReload, setSupportsReload] = useState(false);
  const [SelectedSupportsdata, setSelectedSupportsdata] = useState();
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

        // ? for Faqs all models
        FaqsAddModel,
        setFaqsAddModel,
        FaqsDeleteModel,
        setFaqsDeleteModel,
        FaqsEditModel,
        setFaqsEditModel,
        SelectedFaqsData,
        setSelectedFaqsData,
        FaqsReload,
        setFaqsReload,

        // ? for Business category all models
        BusinessCategoryAddModel,
        setBusinessCategoryAddModel,
        BusinessCategoryDeleteModel,
        setBusinessCategoryDeleteModel,
        BusinessCategoryEditModel,
        setBusinessCategoryEditModel,
        SelectedBusinessCategoryData,
        setSelectedBusinessCategoryData,
        BusinessCategoryReload,
        setBusinessCategoryReload,

        // ? for sections data all models
        SectionsDataAddModel,
        setSectionsDataAddModel,
        SectionsDataDeleteModel,
        setSectionsDataDeleteModel,
        SectionsDataEditModel,
        setSectionsDataEditModel,
        SelectedSectionsData,
        setSelectedSectionsData,
        SectionsDataReload,
        setSectionsDataReload,

        // ? for sections items All models
        SectionsItemsAddModel,
        setSectionsItemsAddModel,
        SectionsItemsEditModel,
        setSectionsItemsEditModel,
        SectionsItemsDeleteModel,
        setSectionsItemsDeleteModel,
        SelectedSectionsItemsData,
        setSelectedSectionsItemsData,
        SectionsItemsReload,
        setSectionsItemsReload,
        // ? for supports  All models
        SupportsViewModel,
        setSupportsViewModel,
        SupportsCheckModel,
        setSupportsCheckModel,
        SupportsReload,
        setSupportsReload,
        SelectedSupportsdata,
        setSelectedSupportsdata,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;

import React from "react";
import "./SectionsID.css";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../GlobalContext";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../../../../Common/loader/index";
import Backdrop from "@mui/material/Backdrop";
import axios from "../../../../Common/Api/Api";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoSearch } from "react-icons/io5";

const SectionById = () => {
  const location = useLocation();
  const { state } = location;
  const sectionId = state?.id;
  const sectionName = state?.section_name;
  useEffect(() => {
    if (sectionId) {
      localStorage.setItem("sectionId", JSON.stringify(sectionId));
    }
  }, [sectionId]);
  const ico = (
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
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_151">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const delet = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_10_207)">
        <path
          d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_207">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const {
    // ? Business category all models

    // ! ? Sections items all models
    SectionsItemsAddModel,
    setSectionsItemsAddModel,
    SectionsItemsDeleteModel,
    setSectionsItemsDeleteModel,
    SectionsItemsEditModel,
    setSectionsItemsEditModel,
    SelectedSectionsItemsData,
    setSelectedSectionsItemsData,
    SectionsItemsReload,
    setSectionsItemsReload,
  } = useContext(GlobalContext);
  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const SectionId = JSON.parse(localStorage.getItem("sectionId"));

  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // const [Pagination, setPagination] = useState();
  const [SectionsTtemslist, setSectionsTtemslist] = useState();
  const [SectionsTtems, setSectionsTtems] = useState();

  const [UserlistsShow, setUserlistsShow] = useState(0);
  const view = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.445 9.03C16.105 3.323 7.895 3.323 4.555 9.03C4.02801 9.93107 3.75027 10.9561 3.75027 12C3.75027 13.0439 4.02801 14.0689 4.555 14.97C7.895 20.677 16.105 20.677 19.445 14.97C19.972 14.0689 20.2497 13.0439 20.2497 12C20.2497 10.9561 19.972 9.93107 19.445 9.03ZM3.26 8.272C7.18 1.576 16.82 1.576 20.74 8.272C21.4016 9.40299 21.7503 10.6897 21.7503 12C21.7503 13.3103 21.4016 14.597 20.74 15.728C16.82 22.424 7.18 22.424 3.26 15.728C2.59837 14.597 2.24965 13.3103 2.24965 12C2.24965 10.6897 2.59837 9.40299 3.26 8.272ZM12 9.197C10.46 9.197 9.193 10.467 9.193 12.061C9.193 13.653 10.461 14.923 11.999 14.923C13.539 14.923 14.807 13.653 14.807 12.061C14.807 10.467 13.539 9.197 11.999 9.197H12ZM7.693 12.061C7.693 9.661 9.61 7.697 11.999 7.697C14.389 7.697 16.307 9.661 16.307 12.061C16.307 14.46 14.389 16.423 11.999 16.423C9.609 16.423 7.693 14.459 7.693 12.061Z"
        fill="white"
      />
    </svg>
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const SectionsTtem = async (search) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "section/get-section-by-id",
        {
          page: activePage,
          keyword: search,
          section_id: SectionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ Response:", Response);
      setSectionsTtemslist(Response.data.data);
      setSectionsTtems(Response.data);
      setloading(false);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  useEffect(() => {
    SectionsTtem();
  }, []);
  useEffect(() => {
    SectionsTtem();
  }, [activePage, SectionId]);
  useEffect(() => {
    if (SectionsItemsReload === true) {
      SectionsTtem();
      setSectionsItemsReload(false);
    }
  }, [SectionsItemsReload]);
  useEffect(() => {
    if (searchTerm.length > 2 || searchTerm.length === 0) {
      const delayDebounceFn = setTimeout(() => {
        SectionsTtem(searchTerm);
      });

      return () => clearTimeout(delayDebounceFn);
    }
  }, [activePage, searchTerm]);
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= SectionsTtems?.pagedata?.totalpage) {
      setActivePage(pageNumber);
    }
  };

  const renderPaginationItems = () => {
    const totalPages = SectionsTtems?.pagedata?.totalpage || 1;
    const pageLimit = 5; // Show only 5 numbers

    let startPage = Math.max(1, activePage - Math.floor(pageLimit / 2));
    let endPage = Math.min(totalPages, startPage + pageLimit - 1);

    if (endPage - startPage + 1 < pageLimit) {
      startPage = Math.max(1, endPage - pageLimit + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    ).map((pageNumber) => (
      <MDBPaginationItem key={pageNumber} active={pageNumber === activePage}>
        <MDBPaginationLink onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </MDBPaginationLink>
      </MDBPaginationItem>
    ));
  };
  const handleEditModel = (id) => {
    setSectionsItemsEditModel(true);
    setSelectedSectionsItemsData(id);
  };
  const handleDeleteModel = (id) => {
    setSectionsItemsDeleteModel(true);
    setSelectedSectionsItemsData(id);
  };

  return (
    <>
      <Toaster />
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="heding_div">
            <div className="addbtn_div">
              <span
                onClick={() => {
                  localStorage.removeItem("sectionId");
                  navigate(-1);
                }}
                className="secondary_btn"
              >
                Back
              </span>

              <NavLink
                onClick={setSectionsItemsAddModel}
                className="secondary_btn"
              >
                Add Section Items
              </NavLink>
            </div>
            <div className="search_main_div">
              <div className="input_box">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <span>
                <IoSearch />
              </span>
            </div>
          </div>
          <div className="tabell_bo table_body_user">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Question</th>

                  <th scope="col">Answer</th>

                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody className="table_body">
                {SectionsTtemslist?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No user data available at this time
                    </td>
                  </tr>
                ) : (
                  SectionsTtemslist?.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td style={{ width: "40%" }}>{item.question}</td>
                        <td style={{ width: "40%" }}>{item.answer}</td>
                        <td style={{ width: "20%" }}>
                          <MDBBtn
                            color="dark"
                            rounded
                            size="sm"
                            style={{ marginRight: "1rem" }}
                            onClick={() => handleEditModel(item)}
                          >
                            {ico}
                          </MDBBtn>
                          <MDBBtn
                            style={{
                              background: "var(--primary-color-lightgreen)",
                            }}
                            rounded
                            size="sm"
                            onClick={() => handleDeleteModel(item)}
                          >
                            {delet}
                          </MDBBtn>
                        </td>
                      </tr>
                    );
                  })
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
          <div className="pagination_div">
            <div className="totoalpage_show_div">
              <p>Total Pages: {SectionsTtems?.pagedata?.totalpage}</p>
            </div>
            <nav aria-label="Page navigation example">
              <MDBPagination className="mb-0">
                {/* Previous Button */}
                <MDBPaginationItem disabled={activePage === 1}>
                  <MDBPaginationLink
                    onClick={() => handlePageClick(activePage - 1)}
                  >
                    Previous
                  </MDBPaginationLink>
                </MDBPaginationItem>

                {/* Page Numbers (Only 5 are displayed dynamically) */}
                {renderPaginationItems()}

                {/* Next Button */}
                <MDBPaginationItem
                  disabled={activePage === SectionsTtems?.pagedata?.totalpage}
                >
                  <MDBPaginationLink
                    onClick={() => handlePageClick(activePage + 1)}
                  >
                    Next
                  </MDBPaginationLink>
                </MDBPaginationItem>
              </MDBPagination>
            </nav>
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
            open={true}
          >
            <Loader />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default SectionById;

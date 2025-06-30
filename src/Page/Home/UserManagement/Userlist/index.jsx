import React from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../GlobalContext";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../../../../Common/loader/index";
import Backdrop from "@mui/material/Backdrop";

import "./UserList.css";
import axios from "../../../../Common/Api/Api";
import { IoSearch } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaBan } from "react-icons/fa6";
import { BiSortAlt2 } from "react-icons/bi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const {
    UserDeleteModel,
    setUserDeleteModel,
    SelectedUser,
    setSelectedUser,
    UserListReload,
    setUserListReload,
    UserBenModel,
    setUserBenModel,
  } = useContext(GlobalContext);

  const ico = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.031 14.617L20.314 18.899L18. 899  20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z"
        fill="#000"
      />
    </svg>
  );
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
  const ban = (
    // <svg
    //   width="18"
    //   height="18"
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M4 13C4 14.224 4.24 15.388 4.72 16.492C5.2 17.596 5.836 18.556 6.628 19.372C7.42 20.188 8.38 20.83 9.508 21.298C10.636 21.766 11.8 22 13 22C14.2 22 15.364 21.766 16.492 21.298C17.62 20.83 18.58 20.188 19.372 19.372C20.164 18.556 20.8 17.596 21.28 16.492C21.76 15.388 22 14.224 22 13C22 11.776 21.76 10.612 21.28 9.508C20.8 8.404 20.164 7.444 19.372 6.628C18.58 5.812 17.626 5.176 16.51 4.72C15.394 4.264 14.224 4.024 13 4C11.776 4 10.612 4.24 9.508 4.72C8.404 5.2 7.444 5.836 6.628 6.628C5.812 7.42 5.176 8.38 4.72 9.508C4.264 10.636 4.024 11.8 4 13ZM6.25 13C6.25 11.584 6.67 10.288 7.51 9.112L16.906 18.508C15.718 19.336 14.416 19.75 13 19.75C11.776 19.75 10.648 19.45 9.616 18.85C8.584 18.25 7.762 17.434 7.15 16.402C6.538 15.37 6.238 14.236 6.25 13ZM9.094 7.51C10.282 6.67 11.584 6.25 13 6.25C14.224 6.25 15.352 6.556 16.384 7.168C17.416 7.78 18.238 8.596 18.85 9.616C19.462 10.636 19.762 11.764 19.75 13C19.75 14.428 19.33 15.73 18.49 16.906L9.094 7.51Z"
    //     fill="white"
    //   />
    // </svg>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M12.2 12C13.8568 12 15.2 10.6569 15.2 9C15.2 7.34315 13.8568 6 12.2 6C10.5431 6 9.19995 7.34315 9.19995 9C9.19995 10.6569 10.5431 12 12.2 12Z"
        stroke="white"
        stroke-width="1.25"
      />
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="white"
        stroke-width="1.25"
      />
      <path
        d="M18.364 18.364C19.9926 16.7353 21 14.4853 21 12C21 7.02944 16.9706 3 12 3C9.51472 3 7.26472 4.00736 5.63604 5.63604M18.364 18.364C16.7353 19.9926 14.4853 21 12 21C7.02944 21 3 16.9706 3 12C3 9.51472 4.00736 7.26472 5.63604 5.63604M18.364 18.364L5.63604 5.63604"
        stroke="white"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.5"
        d="M18 18C17.8401 16.2651 16.9502 15 12 15C7.04984 15 6.15997 16.2651 6 18"
        stroke="white"
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
  const unban = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.65"
        d="M12 12.0001C13.4912 12.0001 14.7 10.7913 14.7 9.3001C14.7 7.80893 13.4912 6.6001 12 6.6001C10.5089 6.6001 9.30005 7.80893 9.30005 9.3001C9.30005 10.7913 10.5089 12.0001 12 12.0001Z"
        stroke="white"
        stroke-width="1.75"
      />
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="white"
        stroke-width="2.25"
      />
      <path
        opacity="0.65"
        d="M17.3722 19.2002C17.229 16.5978 16.4322 14.7002 11.9999 14.7002C7.56769 14.7002 6.77092 16.5978 6.62769 19.2002"
        stroke="white"
        stroke-width="1.75"
        stroke-linecap="round"
      />
    </svg>
  );
  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("most_likes"); // default value
  // const [Pagination, setPagination] = useState();
  const [userDataslist, setUserDataslist] = useState();
  const [userDatas, setUserDatas] = useState();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setActivePage(1); // Optional: Reset to first page on sort change
    // PostData(e.target.value); // Immediately fetch new sorted data
  };

  const handleDeleteModel = (item) => {
    setUserDeleteModel(true);
    setSelectedUser(item);
  };
  const handelbanModel = (item) => {
    setUserBenModel(true);
    setSelectedUser(item);
  };

  const UserData = async (search) => {
    setloading(true);
    try {
      const Response = await axios.post(
        "user/get",
        {
          page: activePage,
          keyword: search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MyToken}`,
          },
        }
      );
      console.log("🚀 ~ Response:", Response);
      setUserDataslist(Response.data.data);
      setUserDatas(Response.data);
      setloading(false);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setloading(false);
    }
  };
  useEffect(() => {
    UserData();
  }, []);
  useEffect(() => {
    UserData();
  }, [activePage]);
  useEffect(() => {
    if (UserListReload === true) {
      UserData();
      setUserListReload(false);
    }
  }, [UserListReload]);
  useEffect(() => {
    if (searchTerm.length > 2 || searchTerm.length === 0) {
      const delayDebounceFn = setTimeout(() => {
        UserData(searchTerm);
      });

      return () => clearTimeout(delayDebounceFn);
    }
  }, [activePage, searchTerm]);
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= userDatas?.totalPages) {
      setActivePage(pageNumber);
    }
  };

  const renderPaginationItems = () => {
    const totalPages = userDatas?.totalPages || 1;
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

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(userDataslist);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "UserList.xlsx");

    // Next tab open karne wala code hata diya gaya
  };

  return (
    <>
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="heding_div">
            <div className="addbtn_div">
              <h1>All User List </h1>
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
            <div className="search_main_div">
              <div className="select_sort_item_main_box">
                <select
                  name="sort"
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="most_likes">Most Likes</option>
                  <option value="most_comments">Most Comments</option>
                  <option value="date_asc">Date Oldest to Newest</option>
                  <option value="date_desc">Date Newest to Oldest</option>
                  <option value="view_asc">Most Viewed</option>
                  <option value="view_desc">Lowest Viewed</option>
                  <option value="report_desc">Most Reported</option>
                </select>
              </div>
              {/* <div className="input_box">
                            <input
                              type="text"
                              //   value={searchTerm}
                              //   onChange={handleInputChange}
                            />
                          </div> */}
              <span className="sorticon">
                <BiSortAlt2 />
              </span>
            </div>
            <NavLink className="secondary_btn" onClick={handleExport}>
              Export
            </NavLink>
          </div>

          <div className="tabell_bo table_body_user">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name & User Name </th>
                  <th scope="col">Email & Mobile Number</th>
                  <th scope="col">Login Type</th>
                  <th scope="col">Followers</th>
                  <th scope="col">Following</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody className="table_body">
                {userDataslist?.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No user data available at this time
                    </td>
                  </tr>
                ) : (
                  userDataslist?.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="profile_pic">
                              <img src={item.profile_picture} alt="" />
                              <span>
                                <MdVerified />
                              </span>
                            </div>
                            <div className="ms-3">
                              <div className="name_div">
                                <p className="fw-bold mb-1">
                                  {item.name} {item.lastName}
                                </p>
                              </div>
                              <p className="text-muted mb-0">{item.username}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.login_type === "PhoneNumber"
                            ? item.phone_number
                            : item.email}
                        </td>
                        <td>{item.login_type}</td>
                        <td>
                          <div className="d-flex align-items-centerr justify-content-center fw-bold mb-0">
                            {item.followers}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-centerr justify-content-center fw-bold mb-0">
                            {item.following}
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-centerr justify-content-center fw-bold mb-0">
                            <MDBBtn
                              color="dark"
                              rounded
                              size="sm"
                              style={{ marginRight: "1rem" }}
                              onClick={() =>
                                navigate("/Home/UserDetails", { state: item })
                              }
                            >
                              {view}
                            </MDBBtn>
                            <MDBBtn
                              style={{
                                marginRight: "1rem",
                                background: "var(--primary-color-lightgreen)",
                              }}
                              onClick={() => handleDeleteModel(item)}
                              rounded
                              size="sm"
                            >
                              {delet}
                            </MDBBtn>
                            <MDBBtn
                              style={{
                                // fontSize: "13px",
                                background: "var(--primary-color-lightgreen)",
                              }}
                              rounded
                              size="sm"
                              onClick={() => handelbanModel(item)}
                            >
                              {ban}
                              {/* <FaBan /> */}
                            </MDBBtn>
                          </div>
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
              <p>Total Pages: {userDatas?.totalPages}</p>
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
                  disabled={activePage === userDatas?.totalPages}
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

export default Index;

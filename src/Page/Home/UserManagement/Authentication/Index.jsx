import React from "react";
import "./Authentication.css";
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
import axios from "../../../../Common/Api/Api";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
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
    blueTickAcceptModel,
    setblueTickAcceptModel,
    blueTickRejectModel,
    setblueTickRejectModel,
    UserUNBenModel,
    setUserUNBenModel,
  } = useContext(GlobalContext);
  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // const [Pagination, setPagination] = useState();
  const [userDataslist, setUserDataslist] = useState();
  const [userDatas, setUserDatas] = useState();
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
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handelUnBan = (item) => {
    setUserUNBenModel(true);
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

  return (
    <>
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="heding_div">
            <div className="addbtn_div">
              <h1>Ban User List </h1>
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
                  <th scope="col">Name & User Name </th>
                  {/* <th scope="col">Email & Mobile Number</th> */}
                  <th scope="col">Login Attempts</th>
                  <th scope="col">Locations</th>
                  <th scope="col">Security Risks</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody className="table_body">
                {userDataslist?.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.profile_picture}
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
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
                        <div className="d-flex align-items-centerr justify-content-center fw-bold mb-0">
                          3
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-centerr justify-content-center fw-bold mb-0">
                          city, state, country
                        </div>
                      </td>
                      <td>
                        {(() => {
                          const isHigh = Math.random() > 0.5; // generate once per render
                          return (
                            <div className="d-flex align-items-center justify-content-center fw-bold mb-0">
                              <span
                                className={`badge rounded-pill d-inline ${
                                  isHigh ? "badge-danger" : "badge-success"
                                }`}
                              >
                                {isHigh ? "High" : "Low"}
                              </span>
                            </div>
                          );
                        })()}
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
                          {/* <MDBBtn
                            style={{
                              marginRight: "1rem",
                              background: "var(--primary-color-lightgreen)",
                            }}
                            rounded
                            size="sm"
                            onClick={() => handelUnBan(item)}
                          >
                            {unban}
                          </MDBBtn> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
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

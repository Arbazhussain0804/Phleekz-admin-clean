import React from "react";
import
{
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import
{
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../../../Common/loader/index";
import Backdrop from "@mui/material/Backdrop";
import { GlobalContext } from "../../../GlobalContext";
import "./UserList.css";
import axios from "../../../Common/Api/Api";

const Index = () =>
{
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { HashtagModel, setHashtagModel, HashtagReload, setHashtagReload, EditHashtagModel, setEditHashtagModel, SetdeleteHashtag,
    SelectedHashtagData, setSelectedHashtagData, } =
    useContext(GlobalContext);
  const ico = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
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
  const view = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z"
        fill="#000"
      />
    </svg>
  );
  const delet = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
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
  const MyToken = JSON.parse(localStorage.getItem("MYtokan"));
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // const [Pagination, setPagination] = useState();
  const [HastagDataslist, setHastagDataslist] = useState();
  const [HastagDatas, setHastagDatas] = useState();
  const handleInputChange = (e) =>
  {
    const value = e.target.value;
    setSearchTerm(value);
  };
  const handlePageClick = (pageNumber) =>
  {
    setActivePage(pageNumber);
  };

  const HastagData = async (search) =>
  {
    setloading(true)
    try {
      const Response = await axios.post(
        "master/get-hashtag", {
        // page: activePage,
        keyword: search
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MyToken}`,
        },
      }
      )
      setHastagDataslist(Response.data.data)
      setHastagDatas(Response.data)
      setloading(false)
    } catch (error) {
      setloading(false)

    }
  }
  useEffect(() =>
  {
    HastagData();
  }, []);
  useEffect(() =>
  {
    HastagData();
  }, [activePage]);
  useEffect(() =>
  {
    if (HashtagReload === true) {
      HastagData();
      setHashtagReload(false);
    }
  }, [HashtagReload]);
  useEffect(() =>
  {
    if (searchTerm.length > 2 || searchTerm.length === 0) {
      const delayDebounceFn = setTimeout(() =>
      {
        HastagData(searchTerm);
      });

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleEditModel = (id) =>
  {
    setEditHashtagModel(true);
    setSelectedHashtagData(id)
  }
  const handleDeleteModel = (id) =>
  {
    SetdeleteHashtag(true);
    setSelectedHashtagData(id)
  }
  return (
    <>
      <div className="All-Conatinor-perfect-divv">
        <div className="All-Containor-perfect-second-divv">
          <div className="heding_div">
            <div className="addbtn_div">
              <NavLink onClick={setHashtagModel} className="secondary_btn">
                {/* { onClick={setAddProfileModelshow}} */}
                Add Hastag +
              </NavLink>
              {/* <h1>Hastag List</h1> */}
            </div>
            <div className="search_main_div">
              <div className="input_box">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <NavLink>{view}</NavLink>
            </div>
          </div>
          <div className="tabell_bo table_body_user">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Hastag</th>
                  <th scope="col">Hastag Usage Count</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody className="table_body">
                {HastagDataslist?.map((item, index) =>
                {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>


                        <p className="fw-bold mb-0">
                          #{item.name}
                        </p>



                      </td>
                      <td>
                        <div className="d-flex align-items-center " style={{ marginLeft: "4rem" }} >
                          <p className="fw-bold mb-0">

                            {item.usage_count}
                          </p>
                        </div>
                      </td>
                      <td>{item.status}</td>


                      <td>
                        <MDBBtn
                          color="dark"
                          rounded
                          size="sm"
                          style={{ marginRight: "1rem" }}
                          onClick={() => handleEditModel(item)}>
                          {ico}
                        </MDBBtn>
                        <MDBBtn
                          style={{
                            background: "var(--primary-color-lightgreen)",
                          }}
                          rounded
                          size="sm"
                          onClick={() => handleDeleteModel(item)}>
                          {delet}
                        </MDBBtn>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </div>

          {/* <div className="pagination_div">
            <div className="pagination_div">
              <nav aria-label="Page navigation example">
                <MDBPagination className="mb-0">
                  <MDBPaginationItem disabled={activePage === 1}>
                    <MDBPaginationLink
                      onClick={() => handlePageClick(activePage - 1)}>
                      Previous
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                  {Array?.from(
                    { length: HastagDatas?.totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <MDBPaginationItem
                      key={pageNumber}
                      active={pageNumber === activePage}>
                      <MDBPaginationLink onClick={() => handlePageClick(pageNumber)}>
                        {pageNumber}
                      </MDBPaginationLink>
                    </MDBPaginationItem>
                  ))}
                  <MDBPaginationItem
                    disabled={activePage === HastagDatas?.totalPages}>
                    <MDBPaginationLink
                      onClick={() => handlePageClick(activePage + 1)}>
                      Next
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                </MDBPagination>
              </nav>
            </div>
          </div> */}
        </div>
      </div >
      {!loading && <div></div>
      }
      {
        loading && (
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
        )
      }
    </>
  );
};

export default Index;

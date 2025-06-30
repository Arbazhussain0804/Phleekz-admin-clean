import React from "react";
import "./Notification.css";

import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
const Notification = () => {
  return (
    <div className="All-Conatinor-perfect-divv">
      <div className="All-Containor-perfect-second-divv">
        <div className="heding_div">
          <div className="heding_text">
            <h1>Notification</h1>
          </div>
          <div className="addbtn_div">
            <NavLink className="secondary_btn">Delete</NavLink>
          </div>
        </div>
        <div className="tabell_bo table_body_user">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>

                <th scope="col" className="action_heading_teg">
                  Actions
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>1</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">John Doe</p>
                      <p className="text-muted mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quae, quod!
                      </p>
                      <div className="">
                        <p className="text-muted mt-1">1hr ago</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">John Doe</p>
                      <p className="text-muted mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi doloribus ipsa quam repellendus accusantium
                        error!
                      </p>
                      <div className="">
                        <p className="text-muted mt-1">1hr 10min ago</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">John Doe</p>
                      <p className="text-muted mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi doloribus ipsa quam repellendus accusantium
                        error!
                      </p>
                      <div className="">
                        <p className="text-muted mt-1">1hr 10min ago</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">John Doe</p>
                      <p className="text-muted mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi doloribus ipsa quam repellendus accusantium
                        error!
                      </p>
                      <div className="">
                        <p className="text-muted mt-1">1hr 10min ago</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
};

export default Notification;

import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap"
import { Link } from "react-router-dom"

import { useHistory } from 'react-router';
// Custom Scrollbar
// import SimpleBar from "simplebar-react";

// import images
// import servicesIcon1 from "../../assets/images/services-icon/01.png";
// import servicesIcon2 from "../../assets/images/services-icon/02.png";
// import servicesIcon3 from "../../assets/images/services-icon/03.png";
// import servicesIcon4 from "../../assets/images/services-icon/04.png";
// import user2 from "../../assets/images/users/user-2.jpg";
// import user3 from "../../assets/images/users/user-3.jpg";
// import user4 from "../../assets/images/users/user-4.jpg";
// import user5 from "../../assets/images/users/user-5.jpg";
// import user6 from "../../assets/images/users/user-6.jpg";
// import smimg1 from "../../assets/images/small/img-1.jpg";
// import smimg2 from "../../assets/images/small/img-2.jpg";

// Charts
// import LineAreaChart from "../AllCharts/apex/lineareachart";
// import RadialChart from "../AllCharts/apex/apexdonut";
// import Apexdonut from "../AllCharts/apex/apexdonut1";
// import SparkLine from "../AllCharts/sparkline/sparkline";
// import SparkLine1 from "../AllCharts/sparkline/sparkline1";
// import Salesdonut from "../AllCharts/apex/salesdonut";

// import "chartist/dist/scss/chartist.scss";

//i18n
// import { withTranslation } from "react-i18next"
// import { use } from 'echarts';

const Dashboard = ({ authorized }) => {
  const [menu, setMenu] = useState(false)
  const [userdetails, setUserDetails] = useState([])
  const toggle = () => {
    setMenu(!menu)
  }
  // const navigate = useHistory()
  // if(!authorized){
  //   return navigate.push("/login")
  // }

  useEffect(() => {
    fetch("https://hrms-tai.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data.users);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  console.log(userdetails)
  console.log(userdetails.length)

  // const deleteuser = async (email) => {
  //   const newUsers = userdetails.filter((del) => {
  //     return del.email !== email;
  //   });
  //   setUserDetails(newUsers)
  // }
  return (
    <React.Fragment>
      <div className="page-content">

        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>

                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item ">Welcome to The App Ideas Dashboard</li>
                </ol>
              </Col>


            </Row>
          </div>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      {/* <img src={servicesIcon1} alt="" /> */}
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Employee
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {userdetails.length}+{" "}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    {/* <div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div> */}
                  </div>

                </CardBody>
              </Card>
            </Col>


          </Row>


          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title text-center justify-content-center mb-4">Employe Detail</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>

                          <th scope="col">Employe Name</th>
                          <th scope="col">Designation</th>
                          <th scope="col" colSpan="2">
                            Open report
                          </th>
                          {/* <th scope="col" colSpan="2">
                            Remove Employee
                          </th> */}
                        </tr>
                      </thead>




                      <tbody>
                        {userdetails.map((usrname) => (<>
                          <tr key={usrname.email}>

                            <td>
                              <div>
                                {/* <img
                                   src={user2}
                                   alt=""
                                   className="avatar-xs rounded-circle me-2"
                                 />{" "} */}
                                {usrname.username}

                              </div>
                            </td>

                            <td>
                              <span className="badge bg-success">
                                {usrname.designation}
                              </span>
                            </td>
                            <td>
                              <div>
                                <Link to="/Report/${id}" className="btn btn-primary btn-sm">
                                  Open
                                </Link>
                              </div>
                            </td>
                            {/* <td>
                              <div>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={deleteuser}
                                >
                                  Remove
                                </button>
                              </div>
                            </td> */}
                          </tr>


                        </>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>

    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any
}

// export default withTranslation()(Dashboard)
export default Dashboard
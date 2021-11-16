import React, { useContext, useEffect, useState, Fragment } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
} from "react-bootstrap";
import { MetaTags } from "react-meta-tags";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { number } from "yup";
import { RoleContext } from "../../../Contexts/RoleContext";
import { UserContext } from "../../../Contexts/UserContext";
import ReportTable from "./ReportTable";

const DesignerReport = () => {
  /// context api
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { userRole } = useContext(RoleContext);
  const click = () => {
    console.log(userRole);
  };

  /// states....
  const [defaultData, setDefaultData] = useState([
    {
      id: v4(),
      no: 1,
      taskList: "Logo Creation",
      taskDesc: "",
      hourSpent: "",
      status: "",
    },
    {
      id: v4(),
      no: 2,
      taskList: "Banner Creation",
      taskDesc: "",
      hourSpent: "",
      status: "",
    },
    {
      id: v4(),
      no: 3,
      taskList: "Mobile App Design Creation",
      taskDesc: "",
      hourSpent: "",
      status: "",
    },
    {
      id: v4(),
      no: 4,
      taskList: "Website Design Creation",
      taskDesc: "",
      hourSpent: "",
      status: "",
    },
    {
      id: v4(),
      no: 5,
      taskList: "Social Media Banner Creation",
      taskDesc: "",
      hourSpent: "",
      status: "",
    },
  ]);
  const [reportData, setReportData] = useState([]);
  const [designerReport, setDesignerReport] = useState({
    no: number,
    id: v4(),
    taskList: "",
    taskDesc: "",
    hourSpent: "",
    status: "",
  });
  // const [editItem, setEditItem] = useState(false);

  /// Add report data
  const handleAddData = (e) => {
    e.preventDefault();
    // if (editItem) {
    //   setEditItem(true);
    // }
    if (
      designerReport.no === "" ||
      designerReport.hourSpent === "" ||
      designerReport.taskList === "" ||
      designerReport.taskDesc === "" ||
      designerReport.status === ""
    ) {
      toast("All field should be filled...", { type: "error" });
      return null;
    }
    setReportData([...reportData, { ...designerReport }]);
    setDesignerReport({
      no: "",
      id: v4(),
      hourSpent: "",
      taskDesc: "",
      status: "",
      taskList: "",
    });
    // setEditItem(false);
  };

  /// remove report data
  const removeReportData = (id) => {
    const newReportData = reportData.filter((report) => {
      return report.id !== id;
    });
    setReportData(newReportData);
  };

  /// edit report data
  // const editReportData = (id) => {
  //   const newReportData = reportData.filter((report) => {
  //     return report.id !== id;
  //   });
  //   const newEditReportData = reportData.find((report) => {
  //     return report.id === id;
  //   });
  //   setReportData(newReportData);
  //   setDesignerReport({
  //     hourSpent: newEditReportData.hourSpent,
  //     id: id,
  //     taskDesc: newEditReportData.taskDesc,
  //     taskList: newEditReportData.taskList,
  //     status: newEditReportData.status,
  //   });
  //   setEditItem(true);
  // };

  /// input change handler
  const handleInputChange = (e) => {
    e.preventDefault();
    const values = { ...designerReport };
    values[e.target.name] = e.target.value;
    setDesignerReport(values);
  };

  /// change taskdesc
  const changeTaksDesc = (e, index) => {
    const values = [...defaultData];
    values[index]["taskDesc"] = e.target.value;
    setDefaultData(values);
  };

  /// change hourspent
  const changehourspent = (e, index) => {
    const values = [...defaultData];
    values[index]["hourSpent"] = e.target.value;
    setDefaultData(values);
  };

  /// change status
  const changestatus = (e, index) => {
    const values = [...defaultData];
    values[index]["status"] = e.target.value;
    setDefaultData(values);
  };

  const handleSubmitDefaultdata = () => {
    const arr = defaultData.map((item) =>
      item.taskDesc === "" && item.hourSpent === "" && item.status === ""
        ? ""
        : setReportData([...defaultData])
    );

    if (arr) {
      // toast("All fields should be filled!!!", { type: "warning" });
      console.log("filled first");
      return false;
    } else {
      toast("submiteed");
      return true;
    }
  };

  /// cleardefaultdata
  const clearDefaultData = () => {
    const clear = defaultData.map((item) => {
      return {
        ...item,
        number: "",
        hourSpent: "",
        status: "",
      };
    });
    setDefaultData(clear);
  };

  console.log(defaultData);
  return (
    <Fragment>
      <MetaTags>
        <title>Report Send</title>
      </MetaTags>
      <Container>
        <Form>
          <header className="text-center mb-5">
            <h3>Add Daily Work Report</h3>
          </header>
          <table>
            <thead>
              <tr>
                <th style={{ fontWeight: "bold" }}>No</th>
                <th style={{ fontWeight: "bold" }}>TaskList</th>
                <th style={{ fontWeight: "bold" }}>TaskDescription</th>
                <th style={{ fontWeight: "bold" }}>Hour Spent</th>
                <th style={{ fontWeight: "bold" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {defaultData.map((data, index) => (
                <tr key={data.id}>
                  <td style={{ fontWeight: "bold" }}>{data.no}</td>
                  <td style={{ fontWeight: "bold" }}>{data.taskList}</td>
                  <td
                    style={{
                      fontWeight: "bold",
                      borderRadius: 5,
                      position: "relative",
                    }}
                    className="text-center"
                  >
                    <textarea
                      type="text"
                      // te
                      style={{ width: "100%", minHeight: 50 }}
                      name="taskDesc"
                      onChange={(e) => {
                        changeTaksDesc(e, index);
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      max="9"
                      min="1"
                      onChange={(e) => {
                        changehourspent(e, index);
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <select
                      name="status"
                      required
                      onChange={(e) => {
                        changestatus(e, index);
                      }}
                      value={defaultData.status}
                      style={{ height: 40, borderRadius: 5 }}
                    >
                      <option defaultValue>Select Task Status</option>
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Col className="text-center">
            <Button
              // type="submit"
              onClick={handleSubmitDefaultdata}
              className="mr-3"
            >
              Submit
            </Button>
            <Button type="reset" onClick={clearDefaultData}>
              Clear
            </Button>
          </Col>{" "}
          <Card className="p-3 mt-5">
            <Card.Header>
              <Card.Title className="text-center">
                Add Daily Work Report
              </Card.Title>
              {/* <Button onClick={() => click()}>Check user</Button> */}
            </Card.Header>
            <Card.Body>
              <Row className="m-3">
                <Col sm={2}>
                  <Form.Group>
                    <Form.Label>
                      <strong>No.</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="no"
                      value={designerReport.no}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group>
                    <Form.Label>
                      <strong>TaskList</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="taskList"
                      value={designerReport.taskList}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>
                      <strong>TaskDescription</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      value={designerReport.taskDesc}
                      style={{ minHeight: 80 }}
                      onChange={handleInputChange}
                      name="taskDesc"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group>
                    <Form.Label>
                      <strong>HourSpent</strong>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="hourSpent"
                      value={designerReport.hourSpent}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Label>
                    <strong>TaskStatus</strong>
                  </Form.Label>
                  <Form.Group>
                    <select
                      name="status"
                      required
                      onChange={handleInputChange}
                      value={designerReport.status}
                      style={{ height: 40, borderRadius: 5 }}
                    >
                      <option defaultValue>Select Task Status</option>
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button
                    variant="primary"
                    onClick={handleAddData}
                    className="mt-4"
                  >
                    Add Details
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>

        <ReportTable
          reportData={reportData}
          removeReportData={removeReportData}
          // editReportData={editReportData}
          setReportData={setReportData}
        />
      </Container>
    </Fragment>
  );
};

export default DesignerReport;

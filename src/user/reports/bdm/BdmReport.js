import React, { useContext, useState } from "react";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { v4 } from "uuid";
import { number } from "yup";

/// context
import { RoleContext } from "../../../Contexts/RoleContext";
import { UserContext } from "../../../Contexts/UserContext";

/// component
import ReportTable from "./ReportTable";
const BdmReport = () => {
  /// context api
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { userRole } = useContext(RoleContext);

  /// states....
  const [defaultData, setDefaultData] = useState([
    {
      id: v4(),
      no: 1,
      taskList: "Emails Sent",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 2,
      taskList: "Upwork Bid",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 3,
      taskList: "Freelancer Bid",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 4,
      taskList: "PPH Bid",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 5,
      taskList: "Linkedin in mail",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 6,
      taskList: "Linkedin contact requests send ",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 7,
      taskList: "Data finds",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 8,
      taskList: "Leads generated",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 9,
      taskList: "Total calls done",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 10,
      taskList: "Proposal created",
      number: "",
      hourSpent: "",
    },
    {
      id: v4(),
      no: 11,
      taskList: "Features list created",
      number: "",
      hourSpent: "",
    },
  ]);
  const [reportData, setReportData] = useState([]);
  const [DevReport, setDevReport] = useState({
    no: number,
    id: v4(),
    taskList: "",
    hourSpent: "",
    number: "",
  });
  // const [editItem, setEditItem] = useState(false);

  /// Add report data
  const handleAddData = (e) => {
    e.preventDefault();
    // if (editItem) {
    //   setEditItem(true);
    // }

    if (
      DevReport.no === "" ||
      DevReport.hourSpent === "" ||
      DevReport.taskList === "" ||
      DevReport.number === ""
    ) {
      toast("All field should be filled...", { type: "error" });
      return null;
    }
    console.log("dev report", DevReport);
    setReportData((prev) => [...prev, { ...DevReport }]);

    setDevReport({
      no: "",
      id: v4(),
      hourSpent: "",
      number: "",
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
  //   });,de
  //   setReportData(newReportData);
  //   setDevReport({
  //     hourSpent: newEditReportData.hourSpent,
  //     id: id,
  //     taskList: newEditReportData.taskList,
  //     number: newEditReportData.number,
  //   });
  //   setEditItem(true);
  // };

  /// input change handler
  const handleInputChange = (e) => {
    e.preventDefault();
    const values = { ...DevReport };
    values[e.target.name] = e.target.value;
    setDevReport(values);
  };

  /// changenumber
  const changeNumbers = (e, index) => {
    const values = [...defaultData];
    values[index]["number"] = e.target.value;
    setDefaultData(values);
  };

  /// changehourspent
  const changeHourSpent = (e, index) => {
    const values = [...defaultData];
    values[index]["hourSpent"] = e.target.value;
    setDefaultData(values);
  };

  /// handlesubmitdefaultdata
  const handleSubmitDefaultdata = () => {
    const arr = defaultData.map((item) =>
      item.number === "" && item.hourSpent === ""
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
      };
    });
    setDefaultData(clear);
  };
  // console.log(defaultData);
  // const regex = `^\d{1}$|^\d{2}$`
  // const regex = new RegExp(/^[0-9\b]+$/)
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Form>
        <Card>
          <Card.Title className="text-center">
            <Card.Header>Add Your Daily Work</Card.Header>
          </Card.Title>
          <Card.Body>
            <table>
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold" }}>No</th>
                  <th style={{ fontWeight: "bold" }}>TaskList</th>
                  <th style={{ fontWeight: "bold" }}>Numbers</th>
                  <th style={{ fontWeight: "bold" }}>HoursSpent</th>
                </tr>
              </thead>
              {defaultData.map((data, index) => (
                <tbody>
                  <tr key={data.id}>
                    <td className="text-center">{data.no}</td>
                    <td className="pl-4" style={{ fontWeight: "bolder" }}>
                      {data.taskList}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        className="mx-auto d-flex"
                        // maxLength={9}
                        pattern="[\d]{1}"
                        // pattern="/^[0-9\b]+$/"
                        onChange={(e) => {
                          changeNumbers(e, index);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="9"
                        className="mx-auto d-flex"
                        onChange={(e) => {
                          changeHourSpent(e, index);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
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
            </Col>
          </Card.Body>
        </Card>
        <Card className="p-3 ">
          <Card.Header>
            <Card.Title className="text-center">Add Other Activity</Card.Title>
            {/* <Button onClick={() => click()}>Check user</Button> */}
          </Card.Header>
          <Card.Body>
            <Row className="m-3">
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>
                    <strong>No.</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="no"
                    // value={DevReport.no}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>
                    <strong>TaskList</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="taskList"
                    // value={DevReport.taskList}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col sm={3}>
                <Form.Group>
                  <Form.Label>
                    <strong>Number</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    // value={DevReport.number}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>
                    <strong>HourSpent</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="hourSpent"
                    maxLength="3"
                    // value={DevReport.hourSpent}
                    onChange={handleInputChange}
                    required
                  />
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
  );
};

export default BdmReport;

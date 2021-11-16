import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { RoleContext } from "../../../Contexts/RoleContext";
import { UserContext } from "../../../Contexts/UserContext";
// import { UserContext } from "../../../Contexts/UserContext";
import ReportTable from "./ReportTable";

const DeveloperReport = () => {
  /// context api
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { userRole } = useContext(RoleContext);
  const click = () => {
    console.log(userRole);
  };
  /// states....
  const [reportData, setReportData] = useState([]);
  const [DevReport, setDevReport] = useState({
    id: v4(),
    taskList: "",
    taskDesc: "",
    hourSpent: "",
    status: "",
  });
  const [editItem, setEditItem] = useState(false);

  /// Add report data
  const handleAddData = (e) => {
    e.preventDefault();
    if (editItem) {
      setEditItem(true);
    }
    if (
      DevReport.hourSpent === "" ||
      DevReport.taskList === "" ||
      DevReport.taskDesc === "" ||
      DevReport.status === ""
    ) {
      toast("All field should be filled...", { type: "error" });
      return null;
    }
    setReportData([...reportData, { id: v4(), ...DevReport }]);
    setDevReport({
      id: v4(),
      hourSpent: "",
      taskDesc: "",
      status: "",
      taskList: "",
    });
    setEditItem(false);
  };

  /// remove report data
  const removeReportData = (id) => {
    const newReportData = reportData.filter((report) => {
      return report.id !== id;
    });
    setReportData(newReportData);
  };

  /// edit report data
  const editReportData = (id) => {
    const newReportData = reportData.filter((report) => {
      return report.id !== id;
    });
    const newEditReportData = reportData.find((report) => {
      return report.id === id;
    });
    setReportData(newReportData);
    setDevReport({
      hourSpent: newEditReportData.hourSpent,
      id: id,
      taskDesc: newEditReportData.taskDesc,
      taskList: newEditReportData.taskList,
      status: newEditReportData.status,
    });
    setEditItem(true);
  };

  /// input change handler
  const handleInputChange = (e) => {
    e.preventDefault();
    const values = { ...DevReport };
    values[e.target.name] = e.target.value;
    setDevReport(values);
  };

  return (
    <Container>
      <Form>
        <Card className="p-3">
          <Card.Header>
            <Card.Title className="text-center">
              Add Daily Work Report
            </Card.Title>
            {/* <Button onClick={() => click()}>Check user</Button> */}
          </Card.Header>
          <Card.Body>
            <Row className="m-3">
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>
                    <strong>TaskList</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="taskList"
                    placeholder="Enter Taskname"
                    value={DevReport.taskList}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col sm={5}>
                <Form.Group>
                  <Form.Label>
                    <strong>TaskDescription</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Description about Task....."
                    value={DevReport.taskDesc}
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
                    value={DevReport.hourSpent}
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
                    value={DevReport.status}
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
        editReportData={editReportData}
        setReportData={setReportData}
      />
    </Container>
  );
};

export default DeveloperReport;

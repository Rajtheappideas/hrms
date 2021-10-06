import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Table,
  Badge,
  Dropdown,
} from "react-bootstrap";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { v4 } from "uuid";

const DevloperReport = () => {
  const [reportData, setReportData] = useState([
    {
      id: v4(),
      date: "",
      taskdetail: "",
      taskstatus: "",
    },
  ]);
  const [addData, setAddData] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setReportData([{ date: "", taskdetail: "", taskstatus: "", id: v4() }]);
    console.log("data", reportData);
    // localStorage.setItem("REPORTDATA", JSON.stringify([...reportData]));
  };

  const handleInputChange = (i, e) => {
    e.preventDefault();
    const values = [...reportData];
    values[i][e.target.name] = e.target.value;
    setReportData(values);
  };

  const AddRow = () => {
    setReportData([
      ...reportData,
      { id: v4(), date: "", taskdetail: "", taskstatus: "" },
    ]);
  };

  const removeRow = (i) => {
    const values = [...reportData];
    values.splice(i, 1);
    setReportData([...values]);
  };
  return (
    <Container>
      <h2 className="text-center mb-5">Add Daily Report</h2>

      <Form onSubmit={onSubmit}>
        {reportData.map((field, i) => (
          <div key={field.id}>
            <Card>
              <Row className="m-3">
                <Col md>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={field.date}
                      onChange={(e) => handleInputChange(i, e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>TaskDetails</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      style={{ width: "auto", minHeight: 50 }}
                      name="taskdetail"
                      value={field.taskdetail}
                      onChange={(e) => handleInputChange(i, e)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md>
                  <Form.Label>TaskStatus</Form.Label>
                  <Form.Group>
                    <select
                      name="taskstatus"
                      value={field.taskstatus}
                      required
                      style={{ height: 40, borderRadius: 5 }}
                      onChange={(e) => handleInputChange(i, e)}
                    >
                      <option defaultValue>Choose Task Status</option>
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" className="mt-4">
                    Add Details
                  </Button>
                </Col>
                {/* <Col>
                  <Button
                    onClick={() => AddRow(i)}
                    className="mt-4 mr-2 btn-warning"
                  >
                    <FiPlusCircle size={20} />
                  </Button>

                  <Button
                    disabled={reportData.length === 1}
                    onClick={() => removeRow(i)}
                    className="mt-4 btn-danger"
                  >
                    <FiMinusCircle size={20} />
                  </Button>
                </Col>
             */}
              </Row>
            </Card>

            <hr />
          </div>
        ))}
        {/* <div className="text-center">
          <Button type="submit" variant="success">
            Submit
          </Button>
        </div> */}
      </Form>
      <Table responsive="md">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>TaskDetails</th>
            <th>TaskStatus</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>11-4-2021</td>
            <td>nothing done...</td>
            <td>Pending</td>
            <td>
              <Badge variant="success light">Successful</Badge>
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  className="light sharp icon-false"
                >
                  <HiOutlineDotsHorizontal size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        
          <tr>
            <td>1.</td>
            <td>11-4-2021</td>
            <td>nothing done...</td>
            <td>Pending</td>
            <td>
              <Badge variant="warning light">Pending</Badge>
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle
                  variant="warning"
                  className="light sharp icon-false"
                >
                  <HiOutlineDotsHorizontal size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        
        </tbody>
      </Table>
    </Container>
  );
};

export default DevloperReport;

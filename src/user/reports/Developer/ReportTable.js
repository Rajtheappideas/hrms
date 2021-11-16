import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

/// react bootstarp
import { Dropdown, Badge, Card, Form, Button, Spinner } from "react-bootstrap";

/// react icons
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiMailSendLine } from "react-icons/ri";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// import styled from 'styled'
import "./Table.css";

const ReportTable = ({
  reportData,
  setReportData,
  removeReportData,
  editReportData,
}) => {
  const [loading, setLoading] = useState(false);
  const getToken = () => {
    const tokenToString = localStorage.getItem("token");
    const token = JSON.parse(tokenToString);
    return token;
  };
  console.log(reportData);

  const navigate = useHistory();
  const SendReportData = async () => {
    if (!localStorage.getItem("token")) {
      return navigate.push("/login");
    }
    if (reportData.length === 0) {
      toast("⚠ Add something...", { type: "warning" });
      return null;
    }
    setLoading(true);
    await fetch("https://hrms-tai.herokuapp.com/reports/dev", {
      method: "POST",
      body: JSON.stringify(reportData),

      headers: {
        Authorization: getToken(),
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.json());
      })
      .catch((err) => console.log(err.message));
    setLoading(false);

    toast("✔ Report Send Successful..", { type: "success" });

    setReportData([]);
  };

  return (
    <div>
      <Form onSubmit={SendReportData}>
        <header className="h2 text-center my-3">Report Table</header>
        {/* <Card>
          <Card.Header>
            <Card.Title>Report Table</Card.Title>
          </Card.Header>
          <Card.Body> */}
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
        <table>
          <thead>
            <tr>
              <th>TaskList</th>
              <th>TaskDescription</th>
              <th>HourSpent</th>
              <th>TaskStatus</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((data, index) => (
              <tr key={index}>
                {/* {console.log(data.id)} */}
                <td className="text-center">{data.taskList}</td>
                <td className="text-center">{data.taskDesc}</td>
                <td className="text-center">{data.hourSpent}</td>
                {data.status === "pending" ? (
                  <td className="text-center">
                    <Badge variant="warning light">{data.status}</Badge>
                  </td>
                ) : (
                  <td className="text-center">
                    <Badge variant="success light">{data.status}</Badge>
                  </td>
                )}
                {data.status === "pending" ? (
                  <td className="text-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="warning"
                        className="light sharp icon-false"
                      >
                        <HiOutlineDotsHorizontal size={20} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => editReportData(data.id)}>
                          <FiEdit color="blue" size={20} /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => removeReportData(data.id)}
                        >
                          <FiTrash2 color="red" size={20} />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                ) : (
                  <td className="text-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        className="light sharp icon-false"
                      >
                        <HiOutlineDotsHorizontal size={20} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => editReportData(data.id)}>
                          <FiEdit color="blue" size={20} /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => removeReportData(data.id)}
                        >
                          <FiTrash2 color="red" size={20} /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {/* </Card.Body>
        </Card> */}
        <div className="text-center mb-5">
          <Button
            style={{ width: "auto" }}
            onClick={SendReportData}
            variant="primary"
          >
            {loading ? (
              <Spinner className="mr-2" animation="border" size="sm" />
            ) : null}
            SEND
            <RiMailSendLine size={20} className="ml-2" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ReportTable;

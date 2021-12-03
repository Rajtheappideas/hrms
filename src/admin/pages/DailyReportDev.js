import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Table } from "reactstrap";
import moment from "moment";
const DailyReportDev = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchSingleReport = async () => {
    setLoading(true);
    await axios
      .get("https://hrms-tai.herokuapp.com/reports/dev")
      .then((res) => {
        setUsers(res.data.reports);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  // try {
  //   setLoading(true);
  //   const response = await axios.get(
  //     "https://hrms-tai.herokuapp.com/reports/dev"
  //   );
  //   const data = await response.data;
  //   setUsers(data);
  //   console.log(users);
  //   setLoading(false);
  // } catch (error) {
  //   console.log(error);
  // }

  useEffect(() => {
    fetchSingleReport();
  }, []);
  console.log(users);
  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  return (
    <main>
      <Table>
        <thead>
          <tr>
            <th>Tasklist</th>
            <th>TaskDesc</th>
            <th>HourSpent</th>
            <th>TaskStatus</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.length === 0 ? (
          <h1>Loading...</h1>
        ) : ( */}
          {users.map((user) => {
            const date = user.date;
            return (
              <tr key={user._id}>
                <td>{user.taskList}</td>
                <td>{user.taskDesc}</td>
                <td className="text-center">{user.hourSpent}</td>
                <td
                  className={
                    user.status === "complete"
                      ? "text-success text-center"
                      : "text-warning text-center"
                  }
                >
                  {user.status}
                </td>

                <td>
                  {/* {date.toLocaleString("en-IN")} */}
                  {moment(date.toLocaleString("en-IN")).format(
                    "MMMM do YYYY, h:mm:ss a"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </main>
  );
};

export default DailyReportDev;

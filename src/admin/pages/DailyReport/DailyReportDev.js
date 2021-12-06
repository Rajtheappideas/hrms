import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MetaTags } from "react-meta-tags";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));
const DailyReportDev = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);

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

  useEffect(() => {
    fetchSingleReport();
  }, []);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <MetaTags>
          <title>DailyReport</title>
        </MetaTags>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Tasklist</StyledTableCell>
              <StyledTableCell align="center">TaskDesc</StyledTableCell>
              <StyledTableCell align="center">HourSpent</StyledTableCell>
              <StyledTableCell align="center">TaskStatus</StyledTableCell>
              <StyledTableCell align="center">date</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {toggle
              ? users.map((user) => {
                  const date = user.date;
                  return (
                    <StyledTableRow key={user._id}>
                      <StyledTableCell align="center">
                        {user.taskList}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.taskDesc}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.hourSpent}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={
                          user.status === "complete"
                            ? "text-success "
                            : "text-warning "
                        }
                      >
                        {user.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {" "}
                        {moment(date.toLocaleString("en-IN")).format(
                          "MMMM do YYYY, h:mm:ss a"
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              : users.slice(0, 10).map((user) => {
                  const date = user.date;
                  return (
                    <StyledTableRow key={user._id}>
                      <StyledTableCell align="center">
                        {user.taskList}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.taskDesc}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.hourSpent}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={
                          user.status === "complete"
                            ? "text-success "
                            : "text-warning "
                        }
                      >
                        {user.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {" "}
                        {moment(date.toLocaleString("en-IN")).format(
                          "MMMM do YYYY, h:mm:ss a"
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
        <div className="text-center">
          <button
            className="btn btn-primary "
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? "Show less" : "Show More"}
          </button>
        </div>
      </TableContainer>
    </>
  );
};

export default DailyReportDev;

import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import Sidebar from "../../../admin/Components/Sidebar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";
import useToken from "../../../hooks/useToken";

const KokiNav = ({ title }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  const { userRole } = useToken();
  return (
    <Fragment>
      <NavHader />
      {/* {userRole === "Admin" ? <Sidebar /> : <SideBar />} */}
      <SideBar />
      <Header
        onNote={() => onClick("chatbox")}
        onActivity={() => onClick("activity")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
      />
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
    </Fragment>
  );
};

export default KokiNav;

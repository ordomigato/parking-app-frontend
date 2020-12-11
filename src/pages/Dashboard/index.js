import React from "react";
import CardContainer from "../../components/Layout/CardContainer";
import AccountInfo from "../../components/Dashboard/AccountInfo";
import SingleUserPermitInfo from "../../components/Dashboard/SingleUserPermitInfo";

const Dashboard = () => {
  return (
    <CardContainer>
      <AccountInfo />
      <SingleUserPermitInfo />
    </CardContainer>
  );
};

export default Dashboard;

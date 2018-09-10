import React from "react";

import Layout from "../components/Layout";
import Typography from "@material-ui/core/Typography";

const Dashboard = ({ history, classes }) => {
  return (
    <Layout drawer={true} routerHistory={history}>
      <Typography variant="display1">Welcome to Bonus Calculator</Typography>
    </Layout>
  );
};

export default Dashboard;

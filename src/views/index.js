import React from "react";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout>
    <Hero
      titleText="Bonus Calculator"
      subtitleText={<span>Register and Login to see it in action</span>}
      primaryBtnText="Login"
      primaryBtnLink="/login"
      GuestBtnText="Guest"
      GuestBtnLink="/GuestBonusCalculator"
    />
  </Layout>
);

export default IndexPage;

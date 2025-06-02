import React from "react";
import "../styles/dashboard.css";
import ChuckNorrisCard from "./dashboardCards/ChuckNorrisCard";
import DashboardRecipesCards from "./dashboardCards/DashboardRecipesCards";
import DashboarsAdviceCard from "./dashboardCards/DashboardAdviceCard";
import DashboardBoredCard from "./dashboardCards/DashboardBoredCard";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📂 Welcome to your dashboard</h1>
      <p>Here you'll see your tools and activity.</p>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <ChuckNorrisCard />
          <DashboardRecipesCards />
          <DashboarsAdviceCard />
          <DashboardBoredCard />
        </div>
      </div>
    </div>
  );
}

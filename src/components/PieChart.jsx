import { Chart } from "chart.js";
import React, { useEffect } from "react";

const PieChart = () => {
  useEffect(() => {
    const pieCtx = document
      .getElementById("chartjs-dashboard-pie")
      .getContext("2d");
    new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Chrome", "Firefox", "IE"],
        datasets: [
          {
            data: [4306, 3801, 1689],
            backgroundColor: ["#007bff", "#ffc107", "#dc3545"],
            borderWidth: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
      },
    });
  }, []);
  return <canvas id="chartjs-dashboard-pie" width="200" height="200"></canvas>;
};

export default PieChart;

import { Chart } from "chart.js";
import React, { useEffect } from "react";

const BarChart = () => {
  useEffect(() => {
    const barCtx = document
      .getElementById("chartjs-dashboard-bar")
      .getContext("2d");
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "This year",
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { display: false },
            beginAtZero: true,
            ticks: { stepSize: 20 },
          },
        },
      },
    });
  }, []);
  return <canvas id="chartjs-dashboard-bar" width="600" height="200"></canvas>;
};

export default BarChart;

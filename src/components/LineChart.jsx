import { Chart, registerables } from "chart.js";
import React, { useEffect } from "react";

// Register Chart.js components
Chart.register(...registerables);

const LineChart = () => {
  useEffect(() => {
    const lineCtx = document
      .getElementById("chartjs-dashboard-line")
      .getContext("2d");
    const gradient = lineCtx.createLinearGradient(0, 0, 0, 225);
    gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
    gradient.addColorStop(1, "rgba(215, 227, 244, 0)");

    new Chart(lineCtx, {
      type: "line",
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
            label: "Sales ($)",
            fill: true,
            backgroundColor: gradient,
            borderColor: "#007bff",
            data: [
              2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917,
              3327,
            ],
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
            ticks: { stepSize: 1000 },
          },
        },
      },
    });
  }, []);
  return <canvas id="chartjs-dashboard-line" width="600" height="200"></canvas>;
};

export default LineChart;

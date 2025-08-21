import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({dashItem}) => {
    if (!dashItem) {
    return <p>Loading chart...</p>;
  }
  const data = {
    labels: ["Delivered", "Pending", "In Progress", "Total Projects", "Clients"],
    datasets: [
      {
        label: "Projects",
        data: [
          dashItem.deliveredProjects || 0,
          dashItem.pendingProject || 5,
          dashItem.inProgessProjects || 4, 
          dashItem.totalProject || 3,
          dashItem.totalClient || 6,
        ], 
        backgroundColor: ["#155724", "#856404", "#2196F3", "#9C27B0", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", // makes it look like a donut
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="w-80 mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;

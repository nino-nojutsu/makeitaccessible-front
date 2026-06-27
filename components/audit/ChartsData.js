import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function ChartsData(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  let chartData = {};

  props.tests.forEach((rule) => {
    const labels = [...rule.category];

    // Violations regroupées par niveau d'importance
    const rulesCriticalDatas = [
      ...rule.incomplete.filter(r => r.impact === 'critical'),
      ...rule.violations.filter(r => r.impact === 'critical'),
      ...rule.passes.filter(r => r.impact === 'critical'),
    ];
    const rulesMajorDatas = [
      ...rule.incomplete.filter(r => r.impact === 'major'),
      ...rule.violations.filter(r => r.impact === 'major'),
      ...rule.passes.filter(r => r.impact === 'major'),
    ];

    chartData = {
      labels,
      datasets: [
        {
          label: 'Critique',
          data: labels.map(() => rulesCriticalDatas.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Majeur',
          data: labels.map(() => rulesMajorDatas.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ]
    }
  });

  return (
    <>
      <h4>Répartition des anomalies par thématique RGAA</h4>

      <Bar
        options={options}
        data={chartData}
      />
    </>
  );
}

export default ChartsData;
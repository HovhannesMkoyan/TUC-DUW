import { useState } from "react";
import { useQuery } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ChartType,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Switch from "react-switch";

import { fetchUserReadBooksStatisticsKey } from "../../../../utils/queryKeys";
import { fetchUserReadBooksStats } from "../../../../services/user.service";
import DotsLoader from "../../../HelperComponents/DotsLoader/DotsLoader";
import groupByMonth from "../../../../helpers/group-by-month";
import "./Statistics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const optionsWithoutLines = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      offset: true,
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 1,
        beginAtZerO: true,
      },
    },
  },
};

const optionsWithLines = JSON.parse(JSON.stringify(optionsWithoutLines));
optionsWithLines.scales.x.grid.display = true;
optionsWithLines.scales.y.grid.display = true;

const monthsArray = [
  "Հունվար",
  "Փետրվար",
  "Մարտ",
  "Ապրիլ",
  "Մայիս",
  "Հունիս",
  "Հուլիս",
  "Օգոստոս",
  "Սեպտեմբեր",
  "Հոկտեմբեր",
  "Նոյեմբեր",
  "Դեկտեմբեր",
];

export default function Statistics(props: any) {
  const [data, setData] = useState<any>({
    labels: monthsArray.slice(0, new Date().getMonth() + 1),
    datasets: [],
  });
  const [type, setType] = useState<ChartType>("bar");
  const [showLines, setShowLines] = useState<boolean>(false);

  const { isLoading } = useQuery(
    fetchUserReadBooksStatisticsKey,
    () => fetchUserReadBooksStats(),
    {
      onSuccess: async (arr) => {
        const a = await groupByMonth(arr);
        const b: number[] = [];
        for (const property in a) {
          b.push(a[property]);
        }

        setData({
          ...data,
          datasets: [
            {
              label: "Կարդացված գրքերի քանակը",
              data: b,
              backgroundColor: "#00b7ad",
              borderColor: "#00b7ad",
              pointRadius: 5,
              tension: 0,
              barPercentage: 0.5,
            },
          ],
        });
      },
    }
  );

  return (
    <div className="eb-readBooks-stats_container">
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <DotsLoader size="xl" />
        </div>
      ) : (
        <>
          {type === "line" && (
            <Line
              options={showLines ? optionsWithLines : optionsWithoutLines}
              data={data}
            />
          )}
          {type === "bar" && (
            <Bar
              options={showLines ? optionsWithLines : optionsWithoutLines}
              data={data}
            />
          )}
        </>
      )}

      <Switch
        onChange={() => {
          if (type === "line") {
            setType("bar");
          } else if (type === "bar") {
            setType("line");
          }
        }}
        checked={type === "line"}
        onColor="#00b7ad"
        offColor="#00b7ad"
        uncheckedIcon={<span className="eb-stats-switch-bar">&#10073;</span>}
        checkedIcon={<span className="eb-stats-switch-line">&#124;</span>}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="none"
        className="eb-readBooks-stats-switch"
      />

      <Switch
        onChange={() => setShowLines(!showLines)}
        checked={showLines}
        onColor="#00b7ad"
        checkedIcon={
          <span className="eb-stats-switch-grid eb-stats-switch-grid-checked">
            &#9638;
          </span>
        }
        uncheckedIcon={<span className="eb-stats-switch-grid">&#9638;</span>}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="none"
        className="eb-readBooks-stats-switch"
      />
    </div>
  );
}

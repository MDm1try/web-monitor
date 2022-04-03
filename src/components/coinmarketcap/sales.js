import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useTopSearchChart from "src/hooks/coinmarketcap/useTopSearchChart";
import useMostVisitedChart from "src/hooks/coinmarketcap/useMostVisitedChart";

import formatDate from "date-fns/format";

export const Sales = (props) => {
  const theme = useTheme();

  const [name, setTokenName] = useState("");
  const [chart, setChart] = useState("Trending");

  const { data: topSearchData } = useTopSearchChart(chart === "Trending" ? name : "");
  const { data: mostVisitedData } = useMostVisitedChart(chart === "Most Visited" ? name : "");

  const chartData = chart === "Trending" ? topSearchData : mostVisitedData;

  const handleChangeTokenName = (event, newValue) => {
    setTokenName(newValue);
  };

  const data = {
    datasets: [
      {
        backgroundColor: "#D14343",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: chartData.chart.increased.map((item) => item.rank),
        label: "Missing",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: chartData.chart.decreased.map((item) => item.rank),
        label: "Rank",
        maxBarThickness: 10,
      },
    ],
    labels: chartData.chart.all.map((item) =>
      formatDate(new Date(item.updatedAt.slice(0, -1)), "kk.mm.ss - yy.MM.dd")
    ),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxis: {
        min: 1,
        max: 12,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const handleChangeChart = (v) => {
    setTokenName("");
    setChart(v.target.value);
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Autocomplete
            disablePortal
            value={name || chartData.name}
            onChange={handleChangeTokenName}
            options={chartData.names}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Token Name" />}
          />
        }
        title={
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>Chart</InputLabel>
            <Select value={chart} label="Chart" onChange={handleChangeChart}>
              <MenuItem value="Trending">Trending</MenuItem>
              <MenuItem value="Most Visited">Most Visited</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

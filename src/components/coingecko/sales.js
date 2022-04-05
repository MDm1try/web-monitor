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
import useTopTrendingUkChart from "src/hooks/coingecko/useTopTrendingUkChart";
import useTopTrendingUsChart from "src/hooks/coingecko/useTopTrendingUsChart";
import useTrendingSearchChart from "src/hooks/coingecko/useTrendingSearchChart";

import formatDate from "date-fns/format";

function selectData(token, data) {
  switch (token) {
    case "Trending Search": {
      return data.trendingSearch;
    }
    case "Top Trending Cryptocurrencies In United States": {
      return data.topTrendingUs;
    }
    case "Top Trending Cryptocurrencies In United Kingdom": {
      return data.topTrendingUk;
    }
    default:
      return data.trendingSearch;
  }
}

export const Sales = (props) => {
  const theme = useTheme();

  const [name, setTokenName] = useState("");
  const [chart, setChart] = useState("Trending Search");

  const { data: topTrendingUk } = useTopTrendingUkChart(
    chart === "Top Trending Cryptocurrencies In United Kingdom" ? name : ""
  );
  const { data: topTrendingUs } = useTopTrendingUsChart(
    chart === "Top Trending Cryptocurrencies In United States" ? name : ""
  );
  const { data: trendingSearch } = useTrendingSearchChart(chart === "Trending Search" ? name : "");

  const chartData = selectData(chart, {
    trendingSearch,
    topTrendingUk,
    topTrendingUs,
  });

  const handleChangeTokenName = (event, newValue) => {
    setTokenName(newValue);
  };

  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: chartData.chart.all.map((item) => item.rank),
        label: "Rank",
        maxBarThickness: 10,
      },
    ],
    labels: chartData.chart.all.map((item) =>
      formatDate(new Date(item.updatedAt.slice(0, -1)), "kk:mm:ss - yy.MM.dd")
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
        min: 0,
        max: 15,
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
              <MenuItem value="Trending Search">Trending Search</MenuItem>
              <MenuItem value="Top Trending Cryptocurrencies In United States">
                Top Trending Cryptocurrencies In United States
              </MenuItem>
              <MenuItem value="Top Trending Cryptocurrencies In United Kingdom">
                Top Trending Cryptocurrencies In United Kingdom
              </MenuItem>
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

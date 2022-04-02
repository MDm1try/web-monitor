import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import usePinkSaleChart from "src/hooks/pinksale/usePinkSaleChart";
import formatDate from "date-fns/format";

export const Sales = (props) => {
  const theme = useTheme();

  const [tokenName, setTokenName] = useState("");

  const { data: pinkSaleChart } = usePinkSaleChart(tokenName);

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
        data: pinkSaleChart.chart.increased.map((item) => item.rank),
        label: "Rank",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: pinkSaleChart.chart.decreased.map((item) => item.rank),
        label: "Missing",
        maxBarThickness: 10,
      },
    ],
    labels: pinkSaleChart.chart.all.map((item) =>
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

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Autocomplete
            disablePortal
            value={tokenName || pinkSaleChart.tokenName}
            onChange={handleChangeTokenName}
            options={pinkSaleChart.tokenNames}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Token Name" />}
          />
        }
        title="Chart"
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

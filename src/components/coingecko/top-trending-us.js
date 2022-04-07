import { useEffect, useMemo } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useTopTrendingUsTable from "src/hooks/coingecko/useTopTrendingUsTable";
import { SeverityPill } from "../severity-pill";
import getColorRank from "src/utils/get-color-rank";
import useTime from "src/hooks/useTime";

export const TopTrendingUs = (props) => {
  const { data, isLoading } = useTopTrendingUsTable();
  const [refreshTime, setRefreshTime] = useTime(data.expectedUpdate, 1000);

  useEffect(() => {
    setRefreshTime(data.expectedUpdate);
  }, [data.expectedUpdate, data.updatedAt, setRefreshTime]);

  const timestamp = useMemo(() => {
    return data.updatedAt
      ? parseInt((Date.now() - new Date(data.updatedAt).getTime()) / 1000, 10)
      : "";
  }, [data.updatedAt]);

  return (
    <Card {...props}>
      <CardHeader
        title="Top Trending Cryptocurrencies In United States"
        subheader={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="textPrimary" variant="body1">
              {`${timestamp}s`}
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {`Expected Update: in ${parseInt(refreshTime / 60, 10)} minutes`}
            </Typography>
          </Box>
        }
      />

      <PerfectScrollbar>
        <Box sx={{ minWidth: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Current RANK</TableCell>
                <TableCell align="center">Token Name</TableCell>
                <TableCell align="center">OLD RANK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                data.list?.map((order, idx) => (
                  <TableRow key={order.id} hover>
                    <TableCell align="center">#{idx + 1}</TableCell>
                    <TableCell align="center">{order.name}</TableCell>
                    <TableCell align="center">
                      <SeverityPill color={getColorRank(order.previousRank)}>
                        {order.previousRank}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

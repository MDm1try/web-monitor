import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TopTrendingUk } from "../components/coingecko/top-trending-uk";
import { TopTrendingUs } from "../components/coingecko/top-trending-us";
import { TrendingSearch } from "../components/coingecko/trending-search";
import { Sales } from "../components/coingecko/sales";
import { DashboardLayout } from "../components/dashboard-layout";

const CoinmarketCap = () => (
  <>
    <Head>
      <title>Coingecko | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Sales />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <TrendingSearch />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <TopTrendingUk />
          </Grid>
          <Grid item xl={4} md={12} xs={12}>
            <TopTrendingUs />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

CoinmarketCap.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CoinmarketCap;

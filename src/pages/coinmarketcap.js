import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Trending } from "../components/coinmarketcap/trending";
import { MostVisited } from "../components/coinmarketcap/most-visited";
import { Sales } from "../components/coinmarketcap/sales";
import { DashboardLayout } from "../components/dashboard-layout";

const CoinmarketCap = () => (
  <>
    <Head>
      <title>CoinmarketCap | Material Kit</title>
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
          <Grid item md={6} xs={12}>
            <Trending />
          </Grid>
          <Grid item md={6} xs={12}>
            <MostVisited />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

CoinmarketCap.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CoinmarketCap;

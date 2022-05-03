import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Grid } from "@mui/material";

import { TopSearched } from "../components/playtoearn/top-searched";
import { MostVisited } from "../components/playtoearn/most-visited";
import { DashboardLayout } from "../components/dashboard-layout";

const Sales = dynamic(() => import("../components/playtoearn/sales"), { ssr: false });

const PlayToEarn = () => (
  <>
    <Head>
      <title>PlayToEarn | Monitor</title>
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
            <TopSearched />
          </Grid>
          <Grid item md={6} xs={12}>
            <MostVisited />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

PlayToEarn.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PlayToEarn;

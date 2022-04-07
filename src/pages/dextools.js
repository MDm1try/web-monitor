import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Grid } from "@mui/material";

import { Arbitrium } from "../components/dextools/arbitrium";
import { Ethereum } from "../components/dextools/ethereum";
import { Bsc } from "../components/dextools/bsc";
import { DashboardLayout } from "../components/dashboard-layout";

const Sales = dynamic(() => import("../components/dextools/sales"), { ssr: false });

const Dextools = () => (
  <>
    <Head>
      <title>Dextools | Material Kit</title>
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
            <Ethereum />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <Arbitrium />
          </Grid>
          <Grid item xl={4} md={12} xs={12}>
            <Bsc />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dextools.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dextools;

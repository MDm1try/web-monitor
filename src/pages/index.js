import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Grid } from "@mui/material";

import { LatestOrders } from "../components/pinksale/latest-orders";
import { DashboardLayout } from "../components/dashboard-layout";

const Sales = dynamic(() => import("../components/pinksale/sales"), { ssr: false });

const Pinksale = () => (
  <>
    <Head>
      <title>Pinksale | Material Kit</title>
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
          <Grid item md={12} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Pinksale.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Pinksale;

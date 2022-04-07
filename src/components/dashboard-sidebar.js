import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Dextools } from "../icons/dextools";

import { Logo } from "./logo";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/",
    icon: (
      <Avatar src="/static/images/pinksale.png" sx={{ width: 20, height: 20 }} alt="Pinksale" />
    ),
    title: "Pinksale",
  },
  {
    href: "/coinmarketcap",
    icon: (
      <Avatar
        src="/static/images/coinmarketcap.png"
        sx={{ width: 22, height: 22 }}
        alt="CoinmarketCap"
      />
    ),
    title: "CoinmarketCap",
  },
  {
    href: "/coingecko",
    icon: (
      <Avatar src="/static/images/coingecko.png" sx={{ width: 20, height: 20 }} alt="Coingecko" />
    ),
    title: "Coingecko",
  },
  {
    href: "/dextools",
    icon: <Dextools fontSize="small" />,
    title: "Dextools",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

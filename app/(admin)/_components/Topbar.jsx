"use client";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import { TOPBAR_HEIGHT } from "../_lib/theme";

export default function Topbar({ onOpenNav }) {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ minHeight: TOPBAR_HEIGHT, px: { xs: 2, lg: 3 } }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            onClick={onOpenNav}
            sx={{ display: { xs: "inline-flex", lg: "none" } }}
            aria-label="Open navigation"
          >
            <MenuRoundedIcon />
          </IconButton>

          <Tooltip title="Search">
            <IconButton aria-label="Search">
              <SearchRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Notifications">
            <IconButton aria-label="Notifications">
              <Badge color="error" variant="dot">
                <NotificationsNoneRoundedIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: 14 }}>
            HF
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  );
}

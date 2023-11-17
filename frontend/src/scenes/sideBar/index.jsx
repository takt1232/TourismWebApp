import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const SideBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.background.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <Box
        top="0"
        position="absolute"
        display="flex"
        flexDirection="column"
        backgroundColor={alt}
        width="250px"
        height="100vh"
        boxShadow="4px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box display="flex" flexDirection="column" gap="1.75rem" padding="1rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            FanHubCraft
          </Typography>
          <Typography>{fullName}</Typography>
        </Box>

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box display="none"></Box>
        )}
      </Box>
    </>
  );
};

export default SideBar;

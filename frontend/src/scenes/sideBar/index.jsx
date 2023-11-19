import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TouristWidget from "scenes/widgets/TouristWidget";

const SideBar = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const primaryLight = theme.palette.background.light;
  const alt = theme.palette.background.alt;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor={alt}
        width="250px"
        height="100vh"
        boxShadow="4px 4px 10px rgba(0, 0, 0, 0.1)"
        zIndex="2"
        position="fixed"
      >
        <Box display="flex" flexDirection="column" gap="1.75rem" padding="1rem">
          <Box>
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
          </Box>
          <Divider />
          <TouristWidget />
        </Box>

        {/* MOBILE NAV */}
        {!isNonMobileScreens && <Box display="none"></Box>}
      </Box>
    </>
  );
};

export default SideBar;

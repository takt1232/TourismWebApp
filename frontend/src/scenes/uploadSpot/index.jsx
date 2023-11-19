import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import TouristSpotForm from "./Form.jsx";

const UploadSpotPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          TourismWebApp
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          color="primary"
        >
          Upload your Tourist Spot
        </Typography>
        <TouristSpotForm />
      </Box>
    </Box>
  );
};

export default UploadSpotPage;

/* eslint-disable no-unused-vars */
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import SpotEditForm from "./Form.jsx";

const EditSpotPage = () => {
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
        width="90%"
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
          Edit your Tourist Spot
        </Typography>
        <SpotEditForm />
      </Box>
    </Box>
  );
};

export default EditSpotPage;

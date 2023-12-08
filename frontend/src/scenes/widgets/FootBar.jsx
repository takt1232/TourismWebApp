/* eslint-disable no-unused-vars */
const { useMediaQuery, Box, Typography } = require("@mui/material");

const FootBar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      sx={{ backgroundColor: "#333333" }}
      justifyContent={"space-evenly"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        width={"300px"}
        padding={"1rem"}
        mt={"2rem"}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          LOCATION
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          CONTACT
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          EMAIL
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          ABOUT
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        width={"300px"}
        padding={"1rem"}
        mt={"2rem"}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          CHECK GIFT CARD BALANCE
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          GIFT CARD TERMS & CONDITIONS
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          PRIVACY POLICY
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        width={"300px"}
        padding={"1rem"}
        mt={"2rem"}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#ffffff",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          FOLLOW US ON:
        </Typography>
      </Box>
    </Box>
  );
};

export default FootBar;

/* eslint-disable no-unused-vars */
import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlexBetween from "components/FlexBetween";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";

const EmptyTopBar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const navigate = useNavigate();

  return (
    <Box height={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        padding={"2rem"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={"1rem"}
          width={"320px"}
        >
          <Typography
            fontSize={"24px"}
            sx={{
              color: "#AA1F2E",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Admin
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          padding={"1rem"}
        >
          <Typography
            fontSize={"48px"}
            sx={{
              color: "#AA1F2E",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            RESORT NI NEIL
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          padding={"1rem"}
          gap={"0.5rem"}
        >
          <Box
            display={"flex"}
            width={"100%"}
            justifyContent={"flex-end"}
            gap={"1rem"}
          >
            <PersonOutlineIcon
              sx={{
                fontSize: "1.75rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
            <ShoppingBagIcon
              sx={{
                fontSize: "1.75rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
          <FlexBetween>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              size="small"
            />
            <Box padding={"0.5rem"} sx={{ backgroundColor: "#489BAF" }}>
              <SearchIcon
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#E8E8E8",
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          </FlexBetween>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={"2rem"}
        justifyContent={"center"}
        width={"100%"}
        backgroundColor="#489BAF"
        padding={"1rem"}
      ></Box>
    </Box>
  );
};

export default EmptyTopBar;

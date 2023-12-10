/* eslint-disable no-unused-vars */
import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlexBetween from "components/FlexBetween";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useEffect, useState } from "react";

const TopBar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const navigate = useNavigate();

  const role = useSelector((state) => state.user?.role);
  const user = useSelector((state) => state?.user);
  const token = useSelector((state) => state?.token);

  const dispatch = useDispatch();

  const [cartCount, setCartCount] = useState(null);

  const getCartCount = async () => {
    if (user?._id) {
      const response = await fetch(
        `http://localhost:3001/book/count/${user?._id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      setCartCount(data);
    }
  };

  useEffect(() => {
    getCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          padding={"1rem"}
          width={"320px"}
        ></Box>
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
            RESORT NI NIEL
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
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
            <Box position={"relative"}>
              <ShoppingBagIcon
                onClick={() => {
                  navigate("/shopping/cart");
                }}
                sx={{
                  fontSize: "1.75rem",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
              {cartCount?.totalEntries > 0 && (
                <Box
                  position="absolute"
                  bottom="2px"
                  right="-5px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="#489BAF"
                  width="18px"
                  height="18px"
                  borderRadius="50%"
                  zIndex="1"
                >
                  <Typography sx={{ color: "#ffffff" }}>
                    {cartCount?.totalEntries}
                  </Typography>
                </Box>
              )}
            </Box>
            <PowerSettingsNewIcon
              onClick={() => {
                dispatch(setLogout());
                window.location.reload();
              }}
              sx={{
                fontSize: "1.75rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
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
      >
        <Typography
          onClick={() => navigate("/")}
          sx={{
            fontSize: "16px",
            color: "#FFFFFF",
            "&:hover": {
              color: "#E8E8E8",
              cursor: "pointer",
            },
          }}
        >
          HOME
        </Typography>
        <Typography
          onClick={() => navigate("/services")}
          sx={{
            fontSize: "16px",
            color: "#FFFFFF",
            "&:hover": {
              color: "#E8E8E8",
              cursor: "pointer",
            },
          }}
        >
          SERVICES
        </Typography>
        <Typography
          onClick={() => navigate("/checkout")}
          sx={{
            fontSize: "16px",
            color: "#FFFFFF",
            "&:hover": {
              color: "#E8E8E8",
              cursor: "pointer",
            },
          }}
        >
          CHECKOUT
        </Typography>
        {role === "admin" && (
          <>
            <Typography
              onClick={() => navigate("/manage/services")}
              sx={{
                fontSize: "16px",
                color: "#FFFFFF",
                "&:hover": {
                  color: "#E8E8E8",
                  cursor: "pointer",
                },
              }}
            >
              ADMIN MANAGE SERVICES
            </Typography>
            <Typography
              onClick={() => navigate("/manage/user")}
              sx={{
                fontSize: "16px",
                color: "#FFFFFF",
                "&:hover": {
                  color: "#E8E8E8",
                  cursor: "pointer",
                },
              }}
            >
              ADMIN MANAGE USER
            </Typography>
            <Typography
              onClick={() => navigate("/manage/checkout")}
              sx={{
                fontSize: "16px",
                color: "#FFFFFF",
                "&:hover": {
                  color: "#E8E8E8",
                  cursor: "pointer",
                },
              }}
            >
              ADMIN MANAGE CHECKOUT
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TopBar;

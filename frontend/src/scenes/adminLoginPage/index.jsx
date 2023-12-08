/* eslint-disable no-unused-vars */
import { Box, useMediaQuery } from "@mui/material";
import EmptyTopBar from "scenes/widgets/EmptyTopBar";
import LoginForm from "./LoginForm";

const AdminLoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  return (
    <Box>
      <EmptyTopBar />
      <Box
        display={"flex"}
        justifyContent={"center"}
        padding={"4rem"}
        width={"100%"}
        height={"100%"}
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default AdminLoginPage;

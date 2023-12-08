/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TopBar from "scenes/widgets/TopBar";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import Form from "./Form";
import { useDispatch } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [OpenAddModal, setOpenAddModal] = useState(false);

  const handleClose = () => {
    setOpenAddModal(false);
  };

  return (
    <>
      <TopBar />
      <Box
        padding={"2rem"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <IconButton
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          <AddBoxIcon />
        </IconButton>
        <Typography>Add Service</Typography>
      </Box>
      <Box
        padding={"2rem"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <IconButton
          onClick={() => {
            dispatch(setLogout());
            navigate("/");
          }}
        >
          <AddBoxIcon />
        </IconButton>
        <Typography>Logout</Typography>
      </Box>
      <Dialog open={OpenAddModal} onClose={handleClose}>
        <DialogTitle>Add Service</DialogTitle>
        <DialogContent>
          <Form />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminPage;

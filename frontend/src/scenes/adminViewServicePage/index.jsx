/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FootBar from "scenes/widgets/FootBar";
import TopBar from "scenes/widgets/TopBar";
import EditServiceForm from "./Form";

const AdminViewServicePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  const [loading, setLoading] = useState(true);

  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  const handleDescription = () => {
    setDescription(true);
    setDetails(false);
  };

  const handleDetails = () => {
    setDescription(false);
    setDetails(true);
  };

  const handleCloseModal = () => {
    setEditModal(false);
    setDeleteModal(false);
  };

  const getService = async () => {
    const response = await fetch(
      `http://localhost:3001/services/${serviceId}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (response) {
      setService(data);
      setLoading(false);
    }
  };

  const deleteService = async () => {
    const response = await fetch(
      `http://localhost:3001/services/delete/${service._id}`,
      {
        method: "DELETE",
      }
    );

    const deleted = await response.json();
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <Box>
      <TopBar />
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
        height={"100%"}
        padding={"2rem 0rem 1rem 2rem"}
      >
        <Typography
          onClick={() => {
            navigate("/");
          }}
          sx={{
            color: "#7D7D7D",
            fontSize: "1rem",
            mr: "0.25rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Resort Ni Neil
        </Typography>
        <Typography
          onClick={() => {
            navigate("/services");
          }}
          sx={{
            color: "#7D7D7D",
            fontSize: "1rem",
            mr: "0.25rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          / Services
        </Typography>
        <Typography
          sx={{
            color: "#7D7D7D",
            fontSize: "1rem",
            mr: "0.25rem",
          }}
        >
          / {service?.title}
        </Typography>
      </Box>
      <Divider />
      {loading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            padding={"1rem 0rem 0rem 2rem"}
          >
            <Typography variant="h4">View Service</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            padding={"2rem 4rem"}
            gap={"2rem"}
          >
            <Box width={"650px"} height={"650px"}>
              <img
                src={`http://localhost:3001/assets/${service.image}`}
                alt="service-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              width={"50%"}
            >
              <Typography variant="h1" sx={{ fontSize: "24px" }}>
                {service.title}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: "24px" }}>
                PHP ₱ {service.price}
              </Typography>

              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-around"}
                margin={"0rem 1rem"}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    handleDescription();
                  }}
                >
                  Description
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    handleDetails();
                  }}
                >
                  Details
                </Typography>
              </Box>
              <Divider sx={{ margin: "1rem 0rem" }} />
              {description && <Typography>{service.description}</Typography>}
              {details && <Typography>{service.details}</Typography>}
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                gap={"1rem"}
              >
                <Button
                  onClick={() => {
                    setEditModal(true);
                  }}
                  sx={{
                    backgroundColor: "#489BAF",
                    color: "#ffffff",
                    padding: "1rem",
                    "&:hover": {
                      backgroundColor: "#489BAF",
                    },
                  }}
                >
                  EDIT SERVICE
                </Button>
                <Button
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  sx={{
                    backgroundColor: "#B63332",
                    color: "#ffffff",
                    padding: "1rem",
                    "&:hover": {
                      backgroundColor: "#B63332",
                    },
                  }}
                >
                  DELETE SERVICE
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
      <FootBar />
      <Dialog open={deleteModal} onClose={handleCloseModal}>
        <DialogTitle>{"DELETE SERVICE"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this service
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Disagree</Button>
          <Button
            onClick={() => {
              deleteService();
              handleCloseModal();
              navigate("/dashboard");
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editModal} onClose={handleCloseModal}>
        <DialogTitle>ADD SERVICE</DialogTitle>
        <DialogContent>
          <EditServiceForm
            id={service?._id}
            title={service?.title}
            service_category={service?.service_category}
            description={service?.description}
            details={service?.details}
            price={service?.price}
            image={service?.image}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminViewServicePage;

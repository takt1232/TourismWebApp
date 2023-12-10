/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TopBar from "scenes/widgets/TopBar";
import { useEffect, useState } from "react";
import Form from "./Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [OpenAddModal, setOpenAddModal] = useState(false);

  const handleClose = () => {
    setOpenAddModal(false);
  };

  const getCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/services/categories",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      } else {
        console.error("Failed to fetch categories:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:3001/services", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data || []);
      } else {
        console.error("Failed to fetch services:", response.status);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getServices();
  }, []);

  return (
    <>
      <TopBar />
      <Box padding={"2rem"}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          padding={"1rem 0rem 1rem 2rem"}
        >
          <Typography
            variant="h4"
            sx={{ color: "#7D7D7D", fontWeight: "bold" }}
          >
            ADMIN MANAGE SERVICES
          </Typography>
        </Box>
        <Box
          boxShadow={"0px 0px 4px 2px rgba(0, 0, 0, 0.1)"}
          borderRadius={"5px"}
        >
          <Box padding={"1rem"}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={"1rem"}
            >
              <Typography variant="h3">SERVICES</Typography>
              <Button
                onClick={() => {
                  setOpenAddModal(true);
                }}
                sx={{
                  backgroundColor: "#489BAF",
                  color: "#ffffff",
                  padding: "0.5rem",
                  "&:hover": {
                    backgroundColor: "#489BAF",
                  },
                }}
              >
                ADD SERVICE
              </Button>
            </Box>
            <Divider sx={{ mb: "1rem" }} />
            <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
              {loading ? (
                <Typography variant="h3">Loading...</Typography>
              ) : (
                categories.map((category, categoryIndex) => (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"1rem"}
                    key={categoryIndex}
                  >
                    <Box>
                      <Typography variant="h4">
                        {category.toUpperCase()}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                      gap={"1rem"}
                    >
                      {services
                        .filter(
                          (service) => service.service_category === category
                        )
                        .map((service, serviceIndex) => (
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            minWidth={"300px"}
                            maxWidth={"300px"}
                            minHeight={"300px"}
                            maxHeight={"300px"}
                            gap={"0.5rem"}
                            key={serviceIndex}
                          >
                            <Box width={"100%"} height={"200px"}>
                              <img
                                src={`http://localhost:3001/assets/${service?.image}`}
                                alt="service-img"
                                style={{
                                  width: "300px",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                            <Typography variant="h4">
                              {service.title.toUpperCase()}
                            </Typography>
                            <Typography variant="h5">
                              PHP ₱{service.price}
                            </Typography>
                            <Typography variant="h6">
                              QUANTITY: {service.quantity}
                            </Typography>
                            <Button
                              onClick={() => {
                                navigate(`/admin/booking/${service._id}`);
                              }}
                              sx={{
                                backgroundColor: "#489BAF",
                                color: "#ffffff",
                                padding: "0.5rem",
                                "&:hover": {
                                  backgroundColor: "#489BAF",
                                },
                              }}
                            >
                              VIEW MORE
                            </Button>
                          </Box>
                        ))}
                    </Box>
                    <Divider />
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog open={OpenAddModal} onClose={handleClose}>
        <DialogTitle>ADD SERVICE</DialogTitle>
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

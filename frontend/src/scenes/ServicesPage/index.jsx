/* eslint-disable no-unused-vars */
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import TopBar from "scenes/widgets/TopBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        <Box display={"flex"} flexDirection={"row"} width={"100%"}>
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
          <Typography sx={{ color: "#7D7D7D", fontSize: "1rem" }}>
            / Services
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          padding={"1rem 0rem 0rem 2rem"}
        >
          <Typography
            variant="h4"
            sx={{ color: "#7D7D7D", fontWeight: "bold" }}
          >
            SERVICES
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            columnGap={"2rem"}
            justifyContent={"flex-start"}
            width={"100%"}
            height={"600px"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              padding={"1rem"}
            >
              {loading ? (
                <Typography variant="h3">Loading...</Typography>
              ) : (
                categories.map((category, index) => (
                  <Box
                    boxShadow={"0px 0px 4px 2px rgba(0, 0, 0, 0.1)"}
                    borderRadius={"5px"}
                    key={index}
                    padding={"2rem"}
                  >
                    <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
                      {category.toUpperCase()}
                    </Typography>
                    <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
                      {services
                        .filter(
                          (service) => service.service_category === category
                        )
                        .map((service, serviceIndex) => (
                          <Box
                            key={serviceIndex}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            width={"300px"}
                            height={"562px"}
                            onClick={() => navigate(`/booking/${service?._id}`)}
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Box width={"300px"} height={"300px"}>
                              <img
                                src={`http://localhost:3001/assets/${service?.image}`}
                                alt="Uploaded"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                            <Typography variant="h4" sx={{ mt: "1rem" }}>
                              {service.title.toUpperCase()}
                            </Typography>
                            <Typography variant="h4" sx={{ mt: "1rem" }}>
                              PHP ₱ {service.price}{" "}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: "1rem" }}>
                              QUANTITY: {service.quantity}{" "}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                    <Divider sx={{ margin: "1rem 0rem" }} />
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ServicesPage;

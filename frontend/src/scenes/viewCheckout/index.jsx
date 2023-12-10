/* eslint-disable no-unused-vars */
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopBar from "scenes/widgets/TopBar";
import CheckoutLoginForm from "./Form";

const ViewCheckoutPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [accounts, setAccounts] = useState({});

  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);

  const [checkout, setCheckout] = useState({});

  const getUserCheckout = () => {
    if (checkout.length > 0 && user?._id) {
      return checkout.filter((payment) => payment.id_account === user._id);
    }
    return [];
  };

  const userCheckout = getUserCheckout();

  const getAllPayment = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3001/payments/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data) {
      setCheckout(data);
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

  const getAllAccount = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3001/tourists/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data) {
      setAccounts(data);
      setLoading(false);
    }
  };

  const deletePayment = async (paymentId) => {
    const response = await fetch(
      `http://localhost:3001/payments/delete/${paymentId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    if (data) {
      window.location.reload();
    }
  };

  const getAccountById = (accountId) => {
    if (accounts.length > 0) {
      return accounts.find((account) => account._id === accountId);
    }
  };

  const getServiceById = (serviceId) => {
    if (services.length > 0) {
      return services.find((service) => service._id === serviceId);
    }
  };

  useEffect(() => {
    getAllPayment();
    getServices();
    getAllAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
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
              CHECKOUT
            </Typography>
          </Box>
          {user ? (
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
                  <Typography variant="h3">CHECKOUT</Typography>
                </Box>
                <Divider sx={{ mb: "1rem" }} />
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  flexWrap={"wrap"}
                  gap={"2rem"}
                >
                  {loading ? (
                    <Typography variant="h3">Loading...</Typography>
                  ) : userCheckout.length > 0 ? (
                    userCheckout.map((payment, index) => {
                      const service = getServiceById(payment.id_services);
                      const account = getAccountById(payment.id_account);

                      return (
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          minWidth={"300px"}
                          minHeight={"300px"}
                          gap={"0.5rem"}
                          key={index}
                        >
                          <Box width={"100%"} height={"200px"}>
                            <img
                              src={`http://localhost:3001/assets/${service?.image}`}
                              alt="account-img"
                              style={{
                                width: "300px",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Typography variant="h4">
                            {service?.title.toUpperCase()}
                          </Typography>
                          <Typography variant="h5">
                            PHP ₱{service?.price}
                          </Typography>
                          <Typography variant="h5">
                            BOUGHT BY: {account?.firstName} {account?.lastName}
                          </Typography>
                        </Box>
                      );
                    })
                  ) : (
                    <Typography variant="h5">NO CHECKOUT YET</Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              padding={"0rem 4rem"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                padding={"1rem 0rem 1rem 2rem"}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#7D7D7D", fontWeight: "bold" }}
                >
                  YOU MUST LOGIN IN ORDER TO SEE YOUR CHECKOUT
                </Typography>
              </Box>
              <CheckoutLoginForm />
            </Box>
          )}
        </Box>
      </>
    </Box>
  );
};

export default ViewCheckoutPage;

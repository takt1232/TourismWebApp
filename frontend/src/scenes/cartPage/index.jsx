/* eslint-disable no-unused-vars */
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import TopBar from "scenes/widgets/TopBar";
import CartLoginForm from "./Form";
import { useEffect, useState } from "react";

const CartPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [cart, setCart] = useState([]);
  const [emptyCart, setEmptyCart] = useState("");
  const [services, setServices] = useState([]);

  const isAuth = useSelector((state) => Boolean(state.token));
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user?._id); // Ensure state.user exists before accessing _id

  const getServices = async (servicesIds) => {
    try {
      const servicesPromises = servicesIds.map(async (serviceId) => {
        const serviceResponse = await fetch(
          `http://localhost:3001/services/${serviceId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return serviceResponse.json();
      });

      const servicesData = await Promise.all(servicesPromises);
      return servicesData;
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  };

  const getBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/book/getBook/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const cartData = await response.json();
      if (cartData.message) {
        setEmptyCart(cartData.message);
        setCart([]);
      } else {
        setCart(cartData);
        setEmptyCart("");

        const servicesIds = cartData.map((item) => item.id_services);
        const fetchedServices = await getServices(servicesIds.flat()); // Flatten servicesIds array if it's nested
        setServices(fetchedServices);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setEmptyCart("Error fetching cart data");
      setCart([]);
    }
  };

  useEffect(() => {
    if (userId && token) {
      getBook();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  return (
    <Box>
      <TopBar />
      <Box padding={"2rem"}>
        <Typography variant="h4">Shopping Cart</Typography>
      </Box>
      {isAuth ? (
        <>
          {cart.length > 0 ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              padding={"0rem 2rem"}
            >
              {cart.map((item, index) => (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"1rem"}
                  borderRadius={"5px"}
                  boxShadow={"0px 0px 4px 1px rgba(0, 0, 0, 0.1)"}
                  key={item._id}
                  padding={"1rem"}
                >
                  <Typography variant="h5">{services[index]?.title}</Typography>
                  <Divider />
                  <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
                    <Box width={"200px"} height={"200px"}>
                      <img
                        src={`http://localhost:3001/assets/${services[index]?.image}`}
                        alt="service-img"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Typography>{services[index]?.service_category}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>{emptyCart}</Typography>
          )}
        </>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          padding={"2rem"}
          gap={"2rem"}
        >
          <Typography variant="h4">Please Login to View Cart</Typography>
          <CartLoginForm />
        </Box>
      )}
    </Box>
  );
};

export default CartPage;

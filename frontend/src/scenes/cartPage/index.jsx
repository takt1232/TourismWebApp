/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import TopBar from "scenes/widgets/TopBar";
import CartLoginForm from "./Form";
import { useEffect, useState } from "react";
import PaymentModal from "../cartPage/PaymentModal";

const CartPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [cart, setCart] = useState([]);
  const [emptyCart, setEmptyCart] = useState("");
  const [services, setServices] = useState([]);

  const [totalAmount, setTotalAmount] = useState(null);

  const [isCheckOut, setIsCheckOut] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const isAuth = useSelector((state) => Boolean(state.token));
  const token = useSelector((state) => state?.token);
  const userId = useSelector((state) => state.user?._id); // Ensure state.user exists before accessing _id
  const user = useSelector((state) => state?.user);

  const handleCloseCheckOutModal = () => {
    setIsCheckOut(false);
  };

  const handleCloseError = () => {
    setUpdateError("");
  };

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

  const deleteBook = async (serviceId) => {
    const response = await fetch(
      `http://localhost:3001/book/delete/${serviceId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    if (data) {
      getBook();
    }
  };

  const updateBook = async (serviceId, count) => {
    try {
      const response = await fetch(
        `http://localhost:3001/book/update/${serviceId}`, // Replace with the correct API endpoint path
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ count }), // Pass the count in the request body
        }
      );

      const data = await response.json();
      if (data.message) {
        setUpdateError(data.message);
      }

      getBook();
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error if needed
    }
  };

  const calculateSubtotal = (count, price) => {
    return count * price;
  };

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += calculateSubtotal(cart[i].count, services[i]?.price);
    }
    setTotalAmount(total);
    return total;
  };

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, services]);

  useEffect(() => {
    getBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <TopBar />
      <Box padding={"2rem 0rem 0rem 2rem"}>
        <Typography variant="h4">SHOPPING CART</Typography>
        <Divider sx={{ margin: "1rem 0rem" }} />
      </Box>
      {isAuth ? (
        <Box display={"flex"} flexDirection={"row"}>
          {cart?.length > 0 ? (
            <>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"1rem"}
                padding={"0rem 2rem"}
                width={"100%"}
              >
                {cart?.map((item, index) => (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"1rem"}
                    borderRadius={"5px"}
                    boxShadow={"0px 0px 4px 1px rgba(0, 0, 0, 0.1)"}
                    key={item._id}
                    padding={"1rem"}
                  >
                    <Typography variant="h5">PROVIDED BY THE RESORT</Typography>
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
                      <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"1rem"}
                        >
                          <Typography>
                            {services[index]?.title.toUpperCase()}
                          </Typography>
                          <Typography>
                            {services[index]?.service_category.toUpperCase()}
                          </Typography>
                        </Box>
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          alignItems={"center"}
                          gap={"0.5rem"}
                        >
                          <Typography variant="body1">Quantity</Typography>
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            gap={"0.5rem"}
                          >
                            <Button
                              variant="outlined"
                              onClick={() => {
                                if (item.count > 1 && !updateError) {
                                  // Decrement the quantity by 1
                                  const updatedCart = [...cart];
                                  updatedCart[index].count -= 1;
                                  updateBook(
                                    item._id,
                                    updatedCart[index].count
                                  );
                                }
                              }}
                            >
                              -
                            </Button>
                            <Typography variant="body1">
                              {item.count}
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                // Increment the quantity by 1
                                if (!updateError) {
                                  const updatedCart = [...cart];
                                  updatedCart[index].count =
                                    updatedCart[index].count + 1;
                                  updateBook(
                                    item._id,
                                    updatedCart[index].count
                                  );
                                }
                              }}
                            >
                              +
                            </Button>
                          </Box>
                          <Typography
                            variant="h7"
                            onClick={() => {
                              deleteBook(item._id);
                            }}
                            sx={{
                              textDecoration: "underline",
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            Remove
                          </Typography>
                        </Box>
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"1rem"}
                        >
                          <Typography>Subtotal</Typography>
                          <Typography>
                            PHP ₱
                            {calculateSubtotal(
                              item.count,
                              services[index]?.price
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                boxShadow={"0px 0px 4px 2px rgba(0, 0, 0, 0.1)"}
                borderRadius={"5px"}
                sx={{ backgroundColor: "#EDEDED" }}
                margin={"0rem 2rem"}
                padding={"1rem"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"2rem"}
                  padding={"1rem"}
                >
                  <Typography variant="h4">Personal Details:</Typography>
                  <Typography>Name</Typography>
                  <TextField
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={`${user.firstName} ${user.lastName}`}
                  />
                  <Typography>Email</Typography>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                  />
                  <Typography variant="h6">
                    Total: PHP ₱{totalAmount}
                  </Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                    gap={"1rem"}
                  >
                    <Button
                      onClick={() => {
                        setIsCheckOut(true);
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
                      CHECK OUT
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Typography variant="h5" padding={"0rem 2rem"}>
              NO SERVICES ADDED TO CART YET
            </Typography>
          )}
        </Box>
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
      <Dialog open={isCheckOut} onClose={handleCloseCheckOutModal}>
        <DialogTitle>PAYMENT</DialogTitle>
        <DialogContent>
          <PaymentModal cart={cart} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckOutModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateError} onClose={handleCloseError}>
        <DialogTitle>UPDATE ERROR</DialogTitle>
        <DialogContent>
          <Typography>{updateError}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartPage;

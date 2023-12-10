/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useSelector } from "react-redux";

const PaymentModal = (cart) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);

  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleExpiryDateChange = (newValue) => {
    setExpiryDate(newValue);
  };

  const handleCheckout = async () => {
    if (
      cardNumber &&
      cardName &&
      expiryDate &&
      cart["cart"] &&
      cart["cart"].length > 0
    ) {
      const reservationPromises = cart["cart"]?.map(async (item, index) => {
        const reservationData = {
          id_services: item.id_services,
          id_cart: item._id,
          id_account: user?._id,
          quantity: item.count,
          amount: item.amount,
        };

        const response = await fetch(
          "http://localhost:3001/payments/addPayment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reservationData),
          }
        );

        const data = await response.json();
        return data; // Returning reservation data or you can handle it as needed
      });

      const reservations = await Promise.all(reservationPromises);
      window.location.reload();
    } else {
      alert("Please fill in all card details and add items to cart.");
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      gap={"1rem"}
      width={"500px"}
    >
      <Typography variant="h4">PAYMENT DETAILS</Typography>
      <Typography variant="h6">Enter your card details to checkout</Typography>
      <Divider />
      <Typography variant="h5">Card Number</Typography>
      <TextField
        placeholder="**** **** **** ****"
        value={cardNumber}
        onChange={handleCardNumberChange}
      ></TextField>
      <Typography variant="h5">Name</Typography>
      <TextField
        placeholder="Name"
        value={cardName}
        onChange={handleCardNameChange}
      ></TextField>
      <Typography variant="h5">DATE EXPIRY</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker value={expiryDate} onChange={handleExpiryDateChange} />
      </LocalizationProvider>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={"1rem"}
      >
        <Button
          onClick={handleCheckout}
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
  );
};

export default PaymentModal;

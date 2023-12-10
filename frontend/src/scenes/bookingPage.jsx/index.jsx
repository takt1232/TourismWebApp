/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FootBar from "scenes/widgets/FootBar";
import TopBar from "scenes/widgets/TopBar";
import BookLoginForm from "./Form";
import DialogMessage from "components/DialogMessage";

const BookingPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [addError, setAddError] = useState("");

  const [loading, setLoading] = useState(true);
  const [bookDone, setBookDone] = useState(false);

  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(false);

  const [isBook, setIsBook] = useState(false);

  const isAuth = Boolean(useSelector((state) => state.token));
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleDescription = () => {
    setDescription(true);
    setDetails(false);
  };

  const handleDetails = () => {
    setDescription(false);
    setDetails(true);
  };

  const handleBook = () => {
    setIsBook(true);
  };

  const handleBookClose = () => {
    setBookDone(false);
    window.location.reload();
  };

  const handleCancelBook = () => {
    setIsBook(false);
  };

  const handleCloseError = () => {
    setAddError("");
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

  const addBook = async () => {
    const bookingData = {
      // Construct the booking data object with necessary details
      id_services: serviceId,
      id_account: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      count: 1,
      amount: service.price,
    };

    try {
      const response = await fetch("http://localhost:3001/book/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (data.message) {
        setAddError(data.message);
      } else if (data) {
        setBookDone(true);
      }
    } catch (error) {
      console.error("Error adding booking:", error);
    }
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
      ) : isAuth && user ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            padding={"1rem 0rem 0rem 2rem"}
          >
            <Typography
              variant="h4"
              sx={{ color: "#7D7D7D", fontWeight: "bold" }}
            >
              BUY SERVICE
            </Typography>
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
              <Typography variant="h4">
                {service.title.toUpperCase()}
              </Typography>
              <Typography variant="h4">PHP ₱ {service.price}</Typography>
              <Typography variant="h6">QUANTITY: {service.quantity}</Typography>

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
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  onClick={addBook}
                  sx={{
                    backgroundColor: "#489BAF",
                    color: "#ffffff",
                    padding: "1rem",
                    "&:hover": {
                      backgroundColor: "#489BAF",
                    },
                  }}
                >
                  BUY NOW
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"4rem"}
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
              YOU MUST LOGIN IN ORDER TO BUY
            </Typography>
          </Box>
          <BookLoginForm />
        </Box>
      )}
      <FootBar />
      <DialogMessage
        open={bookDone}
        handleClose={handleBookClose}
        title="Buy Done"
        content="Check Cart To Confirm"
      />
      <DialogMessage
        open={addError}
        handleClose={handleBookClose}
        title="Buy Error"
        content={addError}
      />
    </Box>
  );
};

export default BookingPage;

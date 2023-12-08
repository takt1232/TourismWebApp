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
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FootBar from "scenes/widgets/FootBar";
import TopBar from "scenes/widgets/TopBar";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import BookLoginForm from "./Form";
import DialogMessage from "components/DialogMessage";

const BookingPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const { serviceId } = useParams();
  const [service, setService] = useState(null);

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
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

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
      amount: service.price,
      reservation: state[0].startDate, // Assuming the start date is in the first object of state array
      reservationcompletion: state[0].endDate, // Assuming the end date is in the first object of state array
      // Add more booking details as needed
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
    } catch (error) {
      console.error("Error adding booking:", error);
    }

    setBookDone(true);
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
        height={"100px"}
        padding={"2rem"}
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
          / {serviceId}
        </Typography>
      </Box>
      {loading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : isBook && isAuth && user ? (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          justifyContent={"center"}
          padding={"0rem 4rem 4rem 4rem"}
          gap={"2rem"}
        >
          {/* Date pickers for reservation dates */}
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            minDate={addDays(new Date(), -30)}
            maxDate={addDays(new Date(), 90)}
            direction="vertical"
            scroll={{ enabled: true }}
          />
          {/* Input fields for booking information */}
          <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
            <TextField
              type="text"
              name="name"
              placeholder="Name"
              value={`${user.firstName} ${user.lastName}`}
            />
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
            />

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
              CONFIRM BOOKING
            </Button>
          </Box>
          {/* Add more input fields for booking information as needed */}
        </Box>
      ) : isBook ? (
        <Box display={"flex"} justifyContent={"center"} padding={"4rem"}>
          <BookLoginForm />
        </Box>
      ) : (
        <>
          <Box
            display={"flex"}
            flexDirection={"row"}
            padding={"2rem 4rem"}
            gap={"2rem"}
          >
            <Box width={"700px"} height={"700px"}>
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
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  onClick={() => {
                    handleBook();
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
                  BOOK NOW
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
      <FootBar />
      <DialogMessage
        open={bookDone}
        handleClose={handleBookClose}
        title="Book Done"
        content="Check Cart To Confirm"
      />
    </Box>
  );
};

export default BookingPage;

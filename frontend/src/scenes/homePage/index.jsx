/* eslint-disable no-unused-vars */
import {
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlexBetween from "components/FlexBetween";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TopBar from "scenes/widgets/TopBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FootBar from "scenes/widgets/FootBar";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <TopBar />
      <Box position="relative" width={"100%"} height={"500px"}>
        <img
          src="http://localhost:3001/assets/home-img.jpg"
          alt="home-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          position="absolute"
          top="30%"
          left="10%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
          width="80%"
        >
          <Typography
            variant="h4"
            sx={{ fontSize: "3rem", fontWeight: "bold" }}
          >
            Beautiful Resort
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1rem" }}>
            "Escape to a world where tranquility meets adventure; where every
            sunset paints a new canvas of memories. Discover serenity, indulge
            in luxury, and let nature be your guide at our exquisite resort,
            where relaxation and adventure intertwine."
          </Typography>
        </Box>
        <Box mt={"4rem"}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant="h2" sx={{ fontSize: "2rem" }}>
              POPULAR SERVICES
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={"2rem"}
              mt={"4rem"}
            >
              {loading ? (
                <Typography variant="h3">Loading...</Typography>
              ) : (
                categories.map((category, index) => (
                  <Box
                    key={index}
                    sx={{ "&:hover": { color: "#62A9BA", cursor: "pointer" } }}
                    onClick={() => {
                      navigate("/services");
                    }}
                  >
                    <Box
                      width={"338px"}
                      height={"338px"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <img
                        src={`http://localhost:3001/assets/${category}.jpg`}
                        alt={category}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{ fontSize: "1.5rem", mt: "1rem" }}
                      >
                        {category}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
        <Box position="relative" width={"100%"} height={"500px"} mt={"4rem"}>
          {/* Image with dark overlay */}
          <img
            src={`http://localhost:3001/assets/home-img1.jpg`}
            alt="home-img1"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              padding: "2rem",
            }}
          />
          <Box
            position="absolute"
            top="30%"
            left="10%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            color="white"
            width="80%"
          >
            <Typography
              variant="h4"
              sx={{ fontSize: "3rem", fontWeight: "bold" }}
            >
              Discover Paradise: A Luxurious Escape at Our Resort
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1rem" }}>
              "Embrace serenity and luxury in a sanctuary where nature's embrace
              meets unparalleled comfort. Indulge in unforgettable moments at
              our resort, where every sunset narrates stories of tranquility and
              adventure."
            </Typography>
          </Box>
        </Box>
        <FootBar />
      </Box>
    </>
  );
};

export default HomePage;

import { Box, Button, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Sidebar from "scenes/sideBar";
import TopBar from "scenes/topBar";
import { useNavigate } from "react-router-dom";
import SpotsWidget from "scenes/widgets/SpotsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const { _id, picturePath } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const userId = _id;

  const [isScrolled, setIsScrolled] = useState(false);

  const [user, setUser] = useState(null);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/tourists/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();

    const handleScroll = () => {
      if (isNonMobileScreens) {
        setIsScrolled(window.scrollY > 140);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNonMobileScreens]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Sidebar />
        <Box width="100%" marginLeft="250px">
          <TopBar />
          <Box display="Flex" flexDirection="column" justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                navigate("/upload/post");
              }}
            >
              Upload Spot
            </Button>
            <SpotsWidget userId={_id} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;

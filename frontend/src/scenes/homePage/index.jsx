import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Sidebar from "scenes/sideBar";
import TopBar from "scenes/topBar";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userId = _id;

  const [isScrolled, setIsScrolled] = useState(false);

  const [user, setUser] = useState(null);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
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
      <Box>
        <TopBar />
        <Sidebar />
      </Box>
    </>
  );
};

export default HomePage;

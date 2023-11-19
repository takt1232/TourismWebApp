import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useEffect, useState } from "react";

const Friend = ({ friendId, name, location }) => {
  const [picturePath, setPicturePath] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getPicturePath = async () => {
    const id = friendId;
    const response = await fetch(`http://localhost:3001/${id}/picturePath`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const picturePath = await response.json();
    setPicturePath(picturePath);
  };

  useEffect(() => {
    getPicturePath();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;

import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SpotWidget = ({
  spotId,
  spotOwnerId,
  name,
  location,
  description,
  picturePath,
  pricingStructure,
}) => {
  const [owner, setOwner] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const getTourist = async () => {
    const id = spotOwnerId;
    const response = await fetch(`http://localhost:3001/tourists/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setOwner(data);
  };

  useEffect(() => {
    getTourist();
  });

  return (
    <>
      <WidgetWrapper boxShadow="0px 0px 10px 5px rgba(0, 0, 0, 0.1)">
        <FlexBetween>
          {picturePath && (
            <img
              width="100%"
              height="360px"
              alt="post"
              style={{ borderRadius: "0.75rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
        </FlexBetween>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          marginLeft="2rem"
        >
          <Typography fontSize="1rem" fontWeight="Bold">
            {name}
          </Typography>
          <Typography fontSize="1rem">{location}</Typography>
          <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
          <Typography color={main} sx={{ mt: "1rem" }}>
            Price: {pricingStructure}
          </Typography>
          <Typography color={main} sx={{ mt: "1rem" }}>
            Owned By: {owner}
          </Typography>
        </Box>
      </WidgetWrapper>
    </>
  );
};

export default SpotWidget;

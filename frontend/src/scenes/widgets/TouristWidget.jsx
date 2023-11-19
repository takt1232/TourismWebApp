import { useSelector } from "react-redux";
import { Box, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage";

const TouristWidget = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        padding="1rem"
        boxShadow="0px 0px 20px 5px rgba(0, 0, 0, 0.1)"
        borderRadius="10px"
      >
        <Box display="flex" flexDirection="row" gap="1rem" alignItems="center">
          <UserImage image={user.picturePath} />
          <Typography
            fontWeight="bold"
            fontSize="1rem"
            onClick={() => navigate(`/profile/${user._id}`)}
            sx={{
              "&:hover": {
                color: "grey",
                cursor: "pointer",
              },
            }}
          >
            {fullName}
          </Typography>
        </Box>
        <Divider />
        <Typography>Email: {user.email}</Typography>
        <Typography>Contact Number: {user.contact_number}</Typography>
      </Box>
    </>
  );
};

export default TouristWidget;

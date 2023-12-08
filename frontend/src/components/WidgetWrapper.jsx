import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "1rem",
}));

export default WidgetWrapper;

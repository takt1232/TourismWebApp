import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";

const touristSpotSchema = yup.object().shape({
  userId: yup.string().required(),
  picture: yup.mixed().required("Image is required"),
  name: yup.string().required("Description is required"),
  location: yup.string().required("Description is required"),
  description: yup.string().required("Description is required"),
  pricingStructure: yup.string().required("Pricing Structure is required"),
});

const initialValues = {
  userId: "",
  picture: null,
  name: "",
  location: "",
  description: "",
  pricingStructure: "",
};

const TouristSpotForm = () => {
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const uploadSpot = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch("http://localhost:3001/upload/spot", {
      method: "POST",
      body: formData,
    });
    const savedSpot = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedSpot) {
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    uploadSpot(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={touristSpotSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Spot Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
              multiline
              rows={4}
            />

            <TextField
              label="Location"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.location}
              name="location"
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              sx={{ gridColumn: "span 4" }}
              multiline
              rows={4}
            />

            <Box gridColumn="span 4">
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <Typography>Add Image Here</Typography>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
              {touched.picture && errors.picture && (
                <Typography variant="caption" color="error">
                  {errors.picture}
                </Typography>
              )}
            </Box>

            <TextField
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
              multiline
              rows={4}
            />

            <TextField
              label="Pricing Structure"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pricingStructure}
              name="pricingStructure"
              error={
                Boolean(touched.pricingStructure) &&
                Boolean(errors.pricingStructure)
              }
              helperText={touched.pricingStructure && errors.pricingStructure}
              sx={{ gridColumn: "span 4" }}
              multiline
              rows={4}
            />
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              marginTop: "2rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            UPLOAD TOURIST SPOT
          </Button>

          <input type="hidden" name="userId" value={(values.userId = _id)} />
        </form>
      )}
    </Formik>
  );
};

export default TouristSpotForm;

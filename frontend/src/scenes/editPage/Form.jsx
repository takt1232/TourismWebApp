/* eslint-disable no-unused-vars */
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
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";

const touristSpotSchema = yup.object().shape({
  userId: yup.string().required(),
  picture: yup.mixed().required("Image is required"),
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
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

const SpotEditForm = () => {
  const { _id } = useSelector((state) => state.user);
  const [spot, setSpot] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { spotId } = useParams();

  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getSpot = async () => {
    const response = await fetch(`http://localhost:3001/spots/${spotId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setSpot(data);
  };

  const editSpot = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture);

    const editResponse = await fetch(
      `http://localhost:3001/edit/spot/${spotId}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const editSave = await editResponse.json();
    onSubmitProps.resetForm();
    if (editSave) {
      navigate("/home");
    }
  };

  const uploadImage = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("picturePath", file.name);

    try {
      const uploadResponse = await fetch("http://localhost:3001/upload/image", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const imageResponse = await uploadResponse.json();
        return imageResponse;
      } else {
        // Handle upload failure
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteSpot = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/spots/delete/${spotId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token} ` },
        }
      );

      const deletedSpot = await response.json();
      if (deletedSpot) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    getSpot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update initial form values when 'spot' state changes
    if (spot) {
      setInitialFormValues({
        userId: spot.userId,
        picture: spot.picturePath,
        name: spot.name,
        location: spot.location,
        description: spot.description,
        pricingStructure: spot.pricingStructure,
      });
      setLoading(false);
    }
  }, [spot]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    editSpot(values, onSubmitProps);
  };

  if (loading) {
    return <Typography>Fetching Data</Typography>;
  }

  return (
    <Formik
      initialValues={initialFormValues}
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
        <>
          {isNonMobileScreens ? (
            <Box width="100%" display="flex">
              <WidgetWrapper>
                <Typography>Click The Photo to Change</Typography>
                <Box gridColumn="span 4" height="200px" width="200px">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={async (acceptedFiles) => {
                      // Initiate image upload on drop
                      const imageUrl = await uploadImage(acceptedFiles);
                      if (imageUrl) {
                        setFieldValue("picture", imageUrl.imageUrl);
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        width="200px"
                        height="200px"
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography>Add Image Here</Typography>
                        ) : (
                          // Display the uploaded image
                          <>
                            <img
                              src={`http://localhost:3001/assets/${values.picture}`}
                              alt="Uploaded"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </>
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
              </WidgetWrapper>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
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
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                    multiline
                    rows={4}
                  />

                  <TextField
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={
                      Boolean(touched.description) &&
                      Boolean(errors.description)
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
                    helperText={
                      touched.pricingStructure && errors.pricingStructure
                    }
                    sx={{ gridColumn: "span 4" }}
                    multiline
                    rows={4}
                  />
                </Box>

                <FlexBetween>
                  <Button
                    width="100%"
                    type="submit"
                    variant="contained"
                    sx={{
                      marginTop: "2rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                  >
                    EDIT TOURIST SPOT
                  </Button>
                  <Button
                    width="100%"
                    onClick={deleteSpot}
                    variant="contained"
                    sx={{
                      marginTop: "2rem",
                      backgroundColor: "red",
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                  >
                    DELETE TOURIST SPOT
                  </Button>
                </FlexBetween>

                <input
                  type="hidden"
                  name="userId"
                  value={(values.userId = _id)}
                />
              </form>
            </Box>
          ) : (
            <Box width="100%" display="flex">
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
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
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                    multiline
                    rows={4}
                  />

                  <TextField
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={
                      Boolean(touched.description) &&
                      Boolean(errors.description)
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
                    helperText={
                      touched.pricingStructure && errors.pricingStructure
                    }
                    sx={{ gridColumn: "span 4" }}
                    multiline
                    rows={4}
                  />
                </Box>

                <WidgetWrapper alignItems="center">
                  <Typography>Click The Photo to Change</Typography>
                  <Box gridColumn="span 4" height="200px" width="200px">
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={async (acceptedFiles) => {
                        // Initiate image upload on drop
                        const imageUrl = await uploadImage(acceptedFiles);
                        if (imageUrl) {
                          setFieldValue("picture", imageUrl.imageUrl);
                        }
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                          width="200px"
                          height="200px"
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <Typography>Add Image Here</Typography>
                          ) : (
                            // Display the uploaded image
                            <>
                              <img
                                src={`http://localhost:3001/assets/${values.picture}`}
                                alt="Uploaded"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </>
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
                </WidgetWrapper>

                <FlexBetween>
                  <Button
                    width="100%"
                    type="submit"
                    variant="contained"
                    sx={{
                      marginTop: "2rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                  >
                    EDIT TOURIST SPOT
                  </Button>
                  <Button
                    width="100%"
                    onClick={deleteSpot}
                    variant="contained"
                    sx={{
                      marginTop: "2rem",
                      backgroundColor: "red",
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                  >
                    DELETE TOURIST SPOT
                  </Button>
                </FlexBetween>

                <input
                  type="hidden"
                  name="userId"
                  value={(values.userId = _id)}
                />
              </form>
            </Box>
          )}
        </>
      )}
    </Formik>
  );
};

export default SpotEditForm;

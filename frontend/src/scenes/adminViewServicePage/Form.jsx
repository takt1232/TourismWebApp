/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

const ServiceSchema = yup.object().shape({
  title: yup.string().required("title required"),
  service_category: yup.string().required("category required"),
  description: yup.string().required("description required"),
  details: yup.string().required("details required"),
  price: yup.number().required("price required"),
  image: yup.string().required("image required"),
  quantity: yup.number().required("quantity required"),
});

const EditServiceForm = ({
  id,
  title,
  service_category,
  description,
  details,
  price,
  image,
  quantity,
}) => {
  const initialServiceSchema = {
    id,
    title: title,
    service_category: service_category,
    description: description,
    details: details,
    price: price,
    image: image,
    quantity: quantity,
  };

  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const editService = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const postResponse = await fetch(
      `http://localhost:3001/update/service/${id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const postSave = await postResponse.json();
    onSubmitProps.resetForm();
    if (postSave) {
      window.location.reload();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    editService(values, onSubmitProps);
  };

  const uploadImage = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("image", file.name);

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

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialServiceSchema}
      validationSchema={ServiceSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
            mt={"1rem"}
          >
            <>
              <TextField
                label="Service Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={Boolean(touched.title) && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                sx={{ gridColumn: "span 2" }}
                error={
                  Boolean(touched.service_category) &&
                  Boolean(errors.service_category)
                }
              >
                <InputLabel
                  id="service-category-label"
                  shrink={!!values.service_category}
                >
                  Service Category
                </InputLabel>
                <Select
                  labelId="service-category-label"
                  id="service-category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.service_category}
                  name="service_category"
                  label="Service Category"
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="Accommodation">Accommodation</MenuItem>
                  <MenuItem value="Dining">Dining</MenuItem>
                  <MenuItem value="Spa">Spa</MenuItem>
                  <MenuItem value="Transportation">Transportation</MenuItem>
                  {/* Add other categories as MenuItem components */}
                </Select>
                {touched.service_category && errors.service_category && (
                  <FormHelperText>{errors.service_category}</FormHelperText>
                )}
              </FormControl>
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
              />
              <TextField
                label="Details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                name="details"
                error={Boolean(touched.details) && Boolean(errors.details)}
                helperText={touched.details && errors.details}
                sx={{ gridColumn: "span 4" }}
                multiline
              />
              <TextField
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={Boolean(touched.price) && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={Boolean(touched.quantity) && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={async (acceptedFiles) => {
                    // Initiate image upload on drop
                    const imageUrl = await uploadImage(acceptedFiles);
                    if (imageUrl) {
                      setFieldValue("image", imageUrl.imageUrl);
                    }
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.image ? (
                        <Typography>Add Image Here</Typography>
                      ) : (
                        // Display the uploaded image
                        <>
                          <img
                            src={`http://localhost:3001/assets/${values.image}`}
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
              </Box>
            </>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              EDIT SERVICE
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditServiceForm;

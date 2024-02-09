import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
  Select,
  Typography,
  Input,
  Paper,
  Avatar,
  OutlinedInput
} from "@mui/material";
import { getBase64 } from "../../utils/helperFunc";
import { Image } from "@mui/icons-material";

const EventForm = ({ value, onSubmitForm }) => {
  let dateValue = "";
  console.log("data from form", value);
  if (value && value.date !== null) {
    console.log(new Date(value.date).getUTCDate());
    let day = new Date(value.date).getUTCDate();
    let month = new Date(value.date).getUTCMonth();
    let year = new Date(value.date).getUTCFullYear();

    if (day < 10) {
      day = day.toString().padStart(2, "0");
    }
    if (month < 10) {
      month = month.toString().padStart(2, "0");
    }
    dateValue = `${year}-${month}-${day}`;
  }

  const handleSubmit = async e => {
    console.log(e);
    let base64 = value?.eventImage || "";
    const { event, name, date, description, eventImage } = e.target.elements;
    const imageFile = eventImage.files[0];

    // function getBase64(file) {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = error => reject(error);
    //   });
    // }
    console.log(imageFile);
    if (imageFile) {
      // function getBase64(file) {
      //   return new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = () => resolve(reader.result);
      //     reader.onerror = error => reject(error);
      //   });
      // }

      // var file = document.querySelector('#files > input[type="file"]').files[0];
      base64 = await getBase64(imageFile);
      console.log(base64);
    }
    onSubmitForm({
      event: event.value,
      name: name.value,
      date: date.value,
      description: description.value,
      eventImage: base64
    });
  };
  return (
    <>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="50%"
        height="100%"
        gap={2}
        marginLeft="auto"
        marginRight="auto"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(e);
        }}>
        <Typography textAlign="center" variant="h3">
          {value ? "Edit" : "Add"} sky event
        </Typography>
        <FormControl required fullWidth>
          <InputLabel id="eventType">event type</InputLabel>
          <Select
            fullWidth
            name="event"
            labelId="eventType"
            id="events"
            label="event type"
            defaultValue={value?.event || ""}>
            <MenuItem value="comet">Comet</MenuItem>
            <MenuItem value="asteroid">Asteroid</MenuItem>
            <MenuItem value="meteor_shower">Meteor Shower</MenuItem>
            <MenuItem value="solar_eclipse">Solar Eclipse</MenuItem>
            <MenuItem value="lunar_eclipse">Lunar Eclipse</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          fullWidth
          name="name"
          label="event name"
          defaultValue={value?.name || ""}
        />
        <TextField
          fullWidth
          name="date"
          type="date"
          label="event date"
          defaultValue={dateValue}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          name="description"
          multiline
          rows={5}
          defaultValue={value?.description || ""}
          label="description"
        />
        <Box display="flex" gap={2} width="100%" alignItems="center">
          <Avatar src={value?.eventImage || value?.image} variant="rounded">
            <Image />
          </Avatar>
          <OutlinedInput
            fullWidth
            variant="outlined"
            type="file"
            name="eventImage"
            accept="image/png, image/jpeg, image/jpg"
          />
        </Box>
        {/* <TextField
          fullWidth
          name="image"
          label="image"
          defaultValue={value?.image || ""}
        /> */}
        <Button fullWidth type="submit">
          Save
        </Button>
      </Box>
    </>
  );
};

EventForm.propTypes = {
  value: PropTypes.object,
  onSubmitForm: PropTypes.func.isRequired
};

export default EventForm;

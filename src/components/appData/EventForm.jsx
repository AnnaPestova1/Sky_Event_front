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
  Typography
} from "@mui/material";

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

  const handleSubmit = e => {
    const { event, name, date, description, image } = e.target.elements;
    onSubmitForm({
      event: event.value,
      name: name.value,
      date: date.value,
      description: description.value,
      image: image.value
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
        <Typography variant="h3">Add sky event</Typography>
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
        <TextField
          fullWidth
          name="image"
          label="image"
          defaultValue={value?.image || ""}
        />
        <Button fullWidth type="submit">
          {value ? "Edit" : "Add"}
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

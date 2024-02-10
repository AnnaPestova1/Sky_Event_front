import React from "react";
import PropTypes from "prop-types";
import { Button, TextField, MenuItem, Select } from "@mui/material";

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
    const { event, name, date, description } = e.target.elements;
    onSubmitForm({
      event: event.value,
      name: name.value,
      date: date.value,
      description: description.value
    });
  };
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(e);
        }}>
        <Select
          name="event"
          label="Event Type"
          defaultValue={value?.event || ""}>
          <MenuItem value="comet">Comet</MenuItem>
          <MenuItem value="asteroid">Asteroid</MenuItem>
          <MenuItem value="meteor_shower">Meteor Shower</MenuItem>
          <MenuItem value="solar_eclipse">Solar Eclipse</MenuItem>
          <MenuItem value="lunar_eclipse">Lunar Eclipse</MenuItem>
        </Select>
        <TextField
          required
          name="name"
          label="event name"
          defaultValue={value?.name || ""}
        />
        <TextField
          name="date"
          type="date"
          label="event date"
          defaultValue={dateValue}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="description"
          multiline
          rows={3}
          defaultValue={value?.description || ""}
          label="description"
        />
        <Button type="submit">{value ? "Edit" : "Add"}</Button>
      </form>
    </>
  );
};

EventForm.propTypes = {
  value: PropTypes.object,
  onSubmitForm: PropTypes.func.isRequired
};

export default EventForm;

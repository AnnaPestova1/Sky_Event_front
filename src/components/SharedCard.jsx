import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Drawer,
  IconButton,
  Fade,
  Grid,
  Grow,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Slide,
  SwipeableDrawer,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import {
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  MoreVert
} from "@mui/icons-material";

const SharedCard = ({ data, handleDelete, handleEdit, handleSave, saved }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  let eventDate = "";
  const eventMap = [
    { value: "comet", displayName: "Comet" },
    { value: "asteroid", displayName: "Asteroid" },
    {
      value: "meteor_shower",
      displayName: "Meteor Shower"
    },
    {
      value: "solar_eclipse",
      displayName: "Solar Eclipse"
    },
    {
      value: "lunar_eclipse",
      displayName: "Lunar Eclipse"
    }
  ];
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const eventDetails = eventMap.find(event => event.value === data.event);

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  if (data.date) {
    if (!handleSave) {
      eventDate = new Date(data.date).toLocaleDateString(undefined, {
        timeZone: "UTC"
      });
    } else {
      eventDate = new Date(data.date).toLocaleDateString();
    }
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          elevation={0}
          sx={{
            // maxWidth: 350,
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
          <CardHeader
            sx={{
              "overflow": "hidden",
              "& [class *='MuiCardHeader-content']": {
                overflow: "hidden"
              }
            }}
            title={data.name}
            titleTypographyProps={{
              variant: "body",
              title: data.name,
              sx: {
                fontWeight: "bold",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
              }
            }}
            subheader={eventDetails.displayName}
            subheaderTypographyProps={{ variant: "body2" }}
            action={
              handleDelete && (
                <IconButton
                  aria-label="buttons"
                  id="card-header-buttons"
                  aria-controls={open ? "card-header-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              )
            }
          />
          <Menu
            id="card-header-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "card-header-buttons"
            }}>
            <MenuItem onClick={handleEdit}>
              <Button startIcon={<Edit />}>Edit</Button>
            </MenuItem>
            <MenuItem onClick={handleOpenConfirmation}>
              <Button startIcon={<Delete />}>Delete</Button>
            </MenuItem>
          </Menu>
          <CardMedia
            component="img"
            height="200"
            image={data.image}
            alt={eventDetails.value}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flexGrow: 1
            }}>
            {data.date ? (
              <>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="span">
                  event date: {eventDate}
                </Typography>
              </>
            ) : null}

            <Typography variant="body2" component="div">
              {data.description}
            </Typography>
          </CardContent>

          {handleSave && (
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                startIcon={saved ? <Favorite /> : <FavoriteBorder />}
                size="small"
                disabled={saved ? true : false}
                onClick={handleSave}>
                Save
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
      {/* confirm delete */}
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        // aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-confirmation">
        <DialogContent>
          <DialogContentText id="delete-dialog-confirmation">
            Delete this sky event?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseConfirmation}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/* <Draggable
          handle="#draggable-dialog-title"
          cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper {...props} />
        </Draggable> */}
    </>
  );
};

SharedCard.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  saved: PropTypes.bool
};

export default SharedCard;

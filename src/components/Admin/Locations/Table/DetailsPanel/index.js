import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addSublocation,
  deleteSublocation,
} from "../../../../../store/actions/locations";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
} from "@material-ui/core";
import Modal from "../../../../Modal/ModalContainer";
import EditSublocation from "./EditSublocation";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const DetailsPanel = ({ locationData, addSublocation, deleteSublocation }) => {
  const [sublocationValue, setSublocationValue] = useState([]);
  const [selectedSublocation, setSelectedSublocation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    addSublocation({
      locationId: locationData.id,
      sublocationName: sublocationValue,
    });
  };

  const handleEdit = sub => {
    setSelectedSublocation(sub);
    setShowEditModal(true);
  };

  const handleDelete = id => {
    console.log(id);
    deleteSublocation([id], locationData.id);
  };

  return (
    <>
      {showEditModal && (
        <Modal setShowModal={setShowEditModal}>
          {selectedSublocation && (
            <EditSublocation sublocation={selectedSublocation} />
          )}
        </Modal>
      )}
      <Grid container className="px-4">
        <Grid item xs={12} md={6} className="py-4">
          {locationData.sublocations && (
            <List>
              {locationData.sublocations.length > 0 &&
                locationData.sublocations.map(sub => (
                  <ListItem button key={sub.id}>
                    <ListItemText primary={sub.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(sub)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(sub.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              value={sublocationValue}
              type="text"
              onChange={e => setSublocationValue(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

DetailsPanel.propTypes = {
  addSublocation: PropTypes.func.isRequired,
  deleteSublocation: PropTypes.func.isRequired,
};

export default connect(null, { addSublocation, deleteSublocation })(
  DetailsPanel
);

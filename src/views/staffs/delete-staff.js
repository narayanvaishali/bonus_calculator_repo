import React, { Component } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//actions
import { deleteStaff } from "../../utils/staffUtils";

class DeleteStaff extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { id } = this.props.match.params;
    deleteStaff(id, (err, response) => {
      console.log(response);
      if (!err) {
        this.props.history.push("/staffs");
      }
    });
  }

  render() {
    const BackToList = props => <Link to={"/staffs"} {...props} />;

    return (
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove branch? Please click confirm to
            remove.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            autoFocus
            onClick={this.handleSubmit}
          >
            Save
          </Button>
          <Button color="secondary" component={BackToList}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteStaff;

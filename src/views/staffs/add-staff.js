import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//actions
import { createStaff } from "../../utils/staffUtils";

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit * 2
  },
  formMargin: {
    padding: "80px"
  }
});

class AddStaff extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      initials: "",
      name: "",
      designation: "",
      email: "",
      phone: "",
      code: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { initials, name, designation, email, phone, code } = this.state;
    const _staff = {
      initials,
      name,
      designation,
      email,
      phone,
      code
    };

    createStaff(_staff, (err, response) => {
      console.log(response);
      if (!err) {
        this.props.history.push("/staffs");
      }
    });
  }

  render() {
    const { classes } = this.props;
    const BackToList = props => <Link to={"/staffs"} {...props} />;
    return (
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Add Branch</DialogTitle>
        <DialogContent className={classes.formMargin}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="initials">Initials</InputLabel>
            <Input
              id="initials"
              value={this.state.initials}
              type="text"
              onChange={this.handleChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={this.state.name}
              type="text"
              onChange={this.handleChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="designation">Designation</InputLabel>
            <Input
              id="designation"
              value={this.state.designation}
              type="text"
              onChange={this.handleChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={this.state.email}
              type="text"
              onChange={this.handleChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input
              id="phone"
              value={this.state.phone}
              type="text"
              onChange={this.handleChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="code">Code</InputLabel>
            <Input
              id="code"
              value={this.state.code}
              type="text"
              onChange={this.handleChange}
            />
          </FormControl>

          <DialogContentText id="alert-dialog-description">
            Please enter detail of new branch
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

export default withStyles(styles)(AddStaff);

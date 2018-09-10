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
import DialogTitle from "@material-ui/core/DialogTitle";

//actions
import { getBranch, updateBranch } from "../../utils/branchUtils";

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit * 2
  }
});

class EditBranch extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      branchname: "",
      target: 0
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

    const { id } = this.props.match.params;
    const { branchname, target } = this.state;
    const _branch = {
      branchname,
      target
    };

    updateBranch(id, _branch, (err, response) => {
      console.log(response);
      if (!err) {
        this.props.history.push("/branches");
      }
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getBranch(id, data => {
      const { branchname, target } = data;
      this.setState({
        branchname,
        target
      });
    });
  }

  render() {
    const { classes } = this.props;
    const BackToList = props => <Link to={"/branches"} {...props} />;
    return (
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Add Branch</DialogTitle>
        <DialogContent>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="branchname">Name</InputLabel>
            <Input
              id="branchname"
              value={this.state.branchname}
              type="text"
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="target">Target</InputLabel>
            <Input
              id="target"
              value={this.state.target}
              type="number"
              onChange={this.handleChange}
            />
          </FormControl>
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

export default withStyles(styles)(EditBranch);

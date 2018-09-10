import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";


//actions
import { getBranches } from "../../utils/branchUtils";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  button: {
    margin: theme.spacing.unit
  },
  addButton: {
    margin: theme.spacing.unit * 2,
    float: "right"
  }
});

class BranchList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      branches: []
    };

    this.handleEditBranch = this.handleEditBranch.bind(this);
  }

  handleEditBranch(id) {
    this.props.history.push(`/branches/${id}`);
  }

  handleDeleteBranch(id) {
    this.props.history.push(`/branches/${id}/delete`);
  }

  componentDidMount() {
    getBranches(list => {
      this.setState({ branches: list });
    });
  }

  componentDidUpdate() {
    getBranches(list => {
      this.setState({ branches: list });
    });
  }

  render() {
    const { classes } = this.props;
    const { branches } = this.state;

    const AddStaffLink = props => <Link to={"/branches/add"} {...props} />;

    return (
      <Layout drawer={true} routerHistory={this.props.history}>
        <Typography variant="display1">Branch List</Typography>

        <Paper className={classes.root}>
          <Button
            className={classes.addButton}
            variant="fab"
            mini
            aria-label="Add"
            color="primary"
            component={AddStaffLink}
          >
            <AddIcon />
          </Button>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Target</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.map(b => {
                return (
                  <TableRow key={b.key}>
                    <TableCell component="th" scope="row">
                      {b.branchname}
                    </TableCell>
                    <TableCell numeric>{b.target}</TableCell>
                    <TableCell>
                      <Button
                        variant="fab"
                        aria-label="Edit"
                        className={classes.button}
                        mini
                        color="primary"
                        onClick={() => this.handleEditBranch(b.key)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="fab"
                        aria-label="Delete"
                        className={classes.button}
                        mini
                        color="secondary"
                        onClick={() => this.handleDeleteBranch(b.key)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Layout>
    );
  }
}

export default withStyles(styles)(BranchList);


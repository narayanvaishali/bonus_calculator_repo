import React, { Component } from "react";
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
import Layout from "../../components/Layout";
import { getStaffs } from "../../utils/staffUtils";

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

class StaffList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      staffs: []
    };

    this.handleEditBranch = this.handleEditBranch.bind(this);
  }

  handleEditBranch(id) {
    this.props.history.push(`/staffs/${id}`);
  }

  handleDeleteBranch(id) {
    this.props.history.push(`/staffs/${id}/delete`);
  }

  componentDidMount() {
    getStaffs(list => {
      this.setState({ staffs: list });
    });
  }

  componentDidUpdate() {
    getStaffs(list => {
      this.setState({ staffs: list });
    });
  }

  render() {
    const { classes } = this.props;
    const { staffs } = this.state;

    return (
      <Layout drawer={true} routerHistory={this.props.history}>
        <Typography variant="display1">Staff List</Typography>

        <Paper className={classes.root}>
          <Button
            className={classes.addButton}
            variant="fab"
            mini
            aria-label="Add"
            color="primary"
            onClick={() => this.props.history.push("/staffs/add")}
          >
            <AddIcon />
          </Button>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Initials</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Code</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.map(s => {
                return (
                  <TableRow key={s.id}>
                    <TableCell>{s.initials}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.designation}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell>{s.code}</TableCell>
                    <TableCell>
                      <Button
                        variant="fab"
                        aria-label="Edit"
                        className={classes.button}
                        mini
                        color="primary"
                        onClick={() => this.handleEditBranch(s.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="fab"
                        aria-label="Delete"
                        className={classes.button}
                        mini
                        color="secondary"
                        onClick={() => this.handleDeleteBranch(s.id)}
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

export default withStyles(styles)(StaffList);

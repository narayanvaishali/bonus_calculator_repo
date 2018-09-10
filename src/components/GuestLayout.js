import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Sidebar from "./Sidebar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  main: {
    flex: "1 0 auto"
  },
  toolbar: theme.mixins.toolbar
});

class Layout extends Component {
  render() {
    const { classes, drawer, title, routerHistory } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        {drawer ? <Sidebar routerHistory={routerHistory} /> : null}
        <main
          className={classNames({
            [classes.content]: drawer,
            [classes.main]: !drawer
          })}
        >
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

Layout.defaultProps = {
  title: "Bonus Calculator",
  drawer: false
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  drawer: PropTypes.bool.isRequired,
  routerHistory: PropTypes.object
};

export default withStyles(styles)(Layout);

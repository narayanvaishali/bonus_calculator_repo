import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ReportIcon from "@material-ui/icons/Report";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import { logout } from "../utils/auth";

const drawerWidth = 240;
const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  }
});

const handleLogout = history => {
  logout()
    .then(res => {
      console.log(res);
      if (history) history.push("/login");
    })
    .catch(err => {
      console.log(err);
    });
};

const handleClick = (to, history) => {
  if (to && history) {
    history.push(to);
  }
};

const Sidebar = ({ classes, routerHistory }) => {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          onClick={() => handleClick("/dashboard", routerHistory)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleClick("/staffs", routerHistory)}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Staff" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleClick("/branches", routerHistory)}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Branch" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleClick("/bonus-calculator", routerHistory)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Bonus" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleLogout(routerHistory)}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);

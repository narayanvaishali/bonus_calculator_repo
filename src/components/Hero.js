import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  parallax: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    backgroundAttachment: "fixed",
    [theme.breakpoints.down("md")]: {
      backgroundAttachment: "scroll"
    },
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  heroBtn: {
    display: "flex",
    justifyContent: "center"
  },
  invertedBtn: {
    color: "#fff",
    backgroundColor: "transparent",
    border: "2px #fff solid",
    boxShadow: "none"
  },
  white: {
    color: "#fff"
  }
});

class Hero extends Component {
  render() {
    const {
      classes,
      titleText,
      subtitleText,
      primaryBtnText,
      primaryBtnLink,
      GuestBtnText,
      GuestBtnLink
    } = this.props;

    const Title = (
      <Typography variant="display2" className={classes.white} gutterBottom>
        {titleText}
      </Typography>
    );

    const Subtitle = (
      <Typography
        className={classes.white}
        variant="subheading"
        style={{ fontWeight: 500, fontSize: "22px", marginBottom: "1.35em" }}
        gutterBottom
      >
        {subtitleText}
      </Typography>
    );

    const PrimaryLink = props => <Link to={primaryBtnLink} {...props} />;
    const GuestLink = props => <Link to={GuestBtnLink} {...props} />;

    const PrimaryBtn = (
      <Grid item className={classes.heroBtn} xs={12}>
        <Button
          title={primaryBtnText}
          className={classes.invertedBtn}
          style={{ width: "192px" }}
          component={PrimaryLink}
        >
          {primaryBtnText}
        </Button>
      </Grid>
    );
     const GuestBtn = (
      <Grid item className={classes.heroBtn} xs={12}>
        <Button
          title={GuestBtnText}
          className={classes.invertedBtn}
          style={{ width: "192px" }}
          component={GuestLink}
        >
          {GuestBtnText}
        </Button>
      </Grid>
     );
    return (
      <div
        className={classes.parallax}
        style={{
          backgroundImage: `linear-gradient(rgb(148, 132, 223), rgba(13, 97, 146, 0.89))`,
          minHeight: "100vh"
        }}
      >
        {titleText && Title}
        {subtitleText && Subtitle}

        {primaryBtnText ? (
          <Grid container style={{ width: "100%" }} spacing={16}>
            {primaryBtnText && primaryBtnLink ? PrimaryBtn : null}
          </Grid>
        ) : null}

        {GuestBtnText ? (
          <Grid container style={{ width: "100%" }} spacing={16}>
            {GuestBtnText && GuestBtnLink ? GuestBtn : null}
          </Grid>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(Hero);

import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Layout from "../components/Layout";
import { getBranches } from "../utils/branchUtils";
import { bonusCalculator } from "../utils/bonusCalculator";
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

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

  root: {
    marginTop: theme.spacing.unit * 2,
    //overflowX: "auto",
    padding: "30px"
  },
  formControl: {
    marginBottom: theme.spacing.unit * 2
  },
  floatRight: {
    textAlign: "right"
  },

   button: {
    margin: theme.spacing.unit * 2,
     float: "right"
  },
  input: {
    display: 'none',
  }
});

class GuestBonusCalculator extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      branchkey : "",
      branchtarget: 0,
      noOfShift: 0,
      grossProfit: 0,
      branch: "",
      branches: [],
      bonus: 0,
      msg: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCalculateBonus = this.handleCalculateBonus.bind(this);
  }

  handleBack (e)
  {
      e.preventDefault();
      this.props.history.push("/");
  }
  handleReset ()
  {
      this.setState({
            branchkey : "",
            branchname : "",
            branchtarget: 0,
            noOfShift: 0,
            grossProfit: 0,
            branch: "",
           // branches: [],
            bonus: 0,
            msg: undefined
    });  
          
  }
   handleChange1(e) {
     //console.log(e.target.name);
     // console.log(e.target.value);
     this.setState({ [e.target.name]: e.target.value });
   }
  handleChange(e) {
   /* console.log('here');
    console.log(e.target.name);
    console.log(e.target.value);*/
    const { branches } = this.state;
    this.setState({ [e.target.name]: e.target.value });

    if(e.target.value != "")
      {
          const branch = branches.find(b => b.key === e.target.value);
        // console.log(branch);

          this.setState({
                  branchkey : branch.key,
                  branch: branch.branchname,
                  branchtarget: branch.target
          });  
      }
  }

  handleCalculateBonus() {
    const { branchtarget, noOfShift, grossProfit } = this.state;
   // console.log('handleCalculateBonus ');
    //console.log(this.state);
    if(branchtarget != "" && noOfShift != "" && grossProfit != "")
        {
          bonusCalculator(branchtarget, noOfShift, grossProfit, (errMsg, bonus) => {
            if (errMsg) {
              this.setState({ bonus: bonus, msg: errMsg });
              return;
            }

            this.setState({
              bonus: bonus,
              msg: undefined
            });
          });
        }
  }

  componentDidMount() {
    getBranches(list => this.setState({ branches: list }));
  }

  render() {
    const { classes } = this.props;
    const { branches } = this.state;
    let optionTemplate = branches.map(v => (
        //console.log(v.Target);
        <option value={v.target} key={v.key}>{v.branchname}</option>
      ));

    let menuItem = branches.map(v => (
        //console.log(v.Target);
        <MenuItem value={v.key} >{v.branchname}</MenuItem>
         
      ));

    return (
    <div
        className={classes.parallax}
        style={{
          backgroundImage: `linear-gradient(rgb(148, 132, 223), rgba(13, 97, 146, 0.89))`,
          minHeight: "100vh"
        }}
      >

      <Layout drawer={false} routerHistory={this.props.history} >
        <Paper className={classes.root} >
          {/*<pre>{JSON.stringify(branches, null, 2)}</pre>*/}
          {/*<pre>{optionTemplate}</pre>*/}
          <form>
            <FormControl  fullWidth className={classes.formControl}>
              <div align="right">
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleCalculateBonus}>
                        Calculate Bonus
                 </Button>
                 <Button variant="contained" color="primary" className={classes.button} onClick={this.handleReset}>
                        Reset
                 </Button>
                  <Button variant="contained" color="primary" className={classes.button} onClick={this.handleBack}>
                        Back
                 </Button>
              </div>
                 <br/><br/>
              </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="branchname">Branch</InputLabel><br/><br/>
              <Select
                value={this.state.branchname}
                onChange={this.handleChange}
                inputProps={{
                  name: 'branchname',
                  id: 'branchname',
                }}
                autoWidth                
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
                {menuItem}
            </Select>
            </FormControl>

            {/* <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="branchtarget">Target</InputLabel>
              <Input readOnly
                inputProps={{
                  name: "branchtarget",
                  id: "branchtarget"
                }}
                value={this.state.branchtarget}
                type="number"
              />
            </FormControl> */}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="noOfShift">No. of Shifts</InputLabel>
              <Input
                inputProps={{
                  name: "noOfShift",
                  id: "noOfShift"
                }}
                value={this.state.noOfShift}
                type="number"
                onChange={this.handleChange1}
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="grossProfit">
                GP Achieved (&pound;)
              </InputLabel>
              <Input
                inputProps={{
                  name: "grossProfit",
                  id: "grossProfit"
                }}
                value={this.state.grossProfit}
                type="number"
                onChange={this.handleChange1}
              />
            </FormControl>
          </form>
        </Paper>
        <Paper className={classes.root} >
          {this.state.msg ? (
            <Typography variant="display3" align="center">{this.state.msg}</Typography>
          ) : null}
          {this.state.bonus ? (
            <Typography variant="display3" align="center">
              Bonus: &pound;{this.state.bonus}
            </Typography>
          ) : null}
        </Paper>
      </Layout>
      </div>
    );
  }
}

export default withStyles(styles)(GuestBonusCalculator);

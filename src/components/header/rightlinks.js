/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../actions/authActions";

import Avatar from "@material-ui/core/Avatar";

import img1 from "../../assets/img/avatar1.jpeg";
import img2 from "../../assets/img/avatar2.jpeg";
import img3 from "../../assets/img/avatar3.jpeg";
// @material-ui/icons
import { Person } from "@material-ui/icons";

// core components

import Button from "../CustomButtons/Button";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";

const ITEM_HEIGHT = 48;
// initial test user data
const options = ["Jhon Doe", "Fred Jhon", "Alfred Smith"];

class RightLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selected: options[0],
      loading: false
    };
  }

  handleClick = el => {
    this.setState({
      anchorEl: el.currentTarget
    });
  };

  componentDidMount() {
    // if there is not recored or auth token attempt to login
    if (localStorage.getItem("currentUser") === null) {
      this.setState({ selected: options[0] });
      this.props.loginUser(1);
    }
  }

  handleSubMenu = i => {
    // setting value of anchor element to the state
    // trigger to the click event
    this.setState({ selected: options[i], anchorEl: null });
    this.props.loginUser(i);
  };
  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, selected, loading } = this.state;
    const open = Boolean(anchorEl);

    /// these expressions Ned to chng
    let img;
    if (selected === "Fred Jhon") {
      img = img1;
    } else if (selected === "John Doe") {
      img = img2;
    } else if (selected === "Alfred Smith") {
      img = img3;
    } else {
      img = img3;
    }
    return (
      <div>
        <ClickAwayListener onClickAway={this.handleClose}>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200
              }
            }}
          >
            <Typography
              variant="overline"
              align="left"
              style={{ paddingLeft: 10 }}
            >
              Login as
            </Typography>
            {options.map((option, i) => (
              <MenuItem
                key={option}
                selected={option === selected}
                onClick={this.handleSubMenu.bind(null, i)}
              >
                <Person className={classes.icons} />
                <Typography variant="caption" align="right">
                  Login As {option}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </ClickAwayListener>
        <Typography
          variant="overline"
          inline={true}
          style={{ paddingRight: 10 }}
        >
          <span style={{ display: "flex", justifyContent: "base-line" }}>
            <Avatar
              alt={selected}
              src={img}
              className={classes.bigAvatar}
              style={{ width: 30, height: 30, marginRight: 5 }}
            >
              {" "}
            </Avatar>
            Welcome {selected}
            <Button
              color="transparent"
              aria-label="More"
              aria-owns={open ? "long-menu" : undefined}
              aria-haspopup="true"
              className={classes.navLink}
              onClick={this.handleClick}
              style={{ padding: 0 }}
            >
              <Typography variant="caption">
                <MoreVertIcon className={classes.icons} />
              </Typography>
            </Button>
          </span>
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(withStyles(headerLinksStyle)(RightLinks));

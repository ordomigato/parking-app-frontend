import React, { useState } from "react";
import { Avatar, Button, TextField, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/actions/auth";
import ErrorMessage from "../Message/ErrorMessage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ login, errors }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const { loginId, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(loginId, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h2 component="h1" variant="h5">
          Sign in
        </h2>
        <div className="w-full">
          {errors
            ? errors.map((error) => (
                <ErrorMessage message={error} key={error} />
              ))
            : null}
        </div>
        <form
          className={classes.form}
          method="post"
          onSubmit={(e) => onSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="loginId"
            label="Email"
            type="text"
            name="loginId"
            value={loginId}
            autoComplete="off"
            onChange={(e) => onChange(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors.login,
});

export default connect(mapStateToProps, { login })(Login);

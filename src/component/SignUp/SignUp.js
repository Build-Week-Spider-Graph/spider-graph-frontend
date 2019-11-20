import "date-fns";
import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connect } from "react-redux"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { register } from "../../store/actions"
import "./SignUp.scss"

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1492515114975-b062d1a270ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)",
      backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "left"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    color: 'white !important',
    borderColor: 'white !important'
  }
}));

const SignUp = ({ values, loading, error, isSubmitting }) => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid sm={4} md={7} className={classes.image} />
      <Grid md={5} elevation={6} square>
        <div className='form-container'>
        <div className='sign-up-spacer'></div>
        <Typography component="h1" variant="h5">
            Spider Graph
          </Typography>
          <em><p>Create an account:</p></em>
          <Form className={classes.form} noValidate>
          <Field className='signup-input'
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="firstname"
              label="Firstname"
              id="firstname"
              InputProps={{
                classes: { notchedOutline: classes.input },
                className: classes.input
              }}
              InputLabelProps={{ className: classes.input }}
              />
              <Field className='signup-input'
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="lastname"
              label="Lastname"
              id="lastname"
              InputProps={{
                classes: { notchedOutline: classes.input },
                className: classes.input
              }}
              InputLabelProps={{ className: classes.input }}
              />
              <Field className='signup-input'
              component={TextField}
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              id="email"
              InputProps={{
                classes: { notchedOutline: classes.input },
                className: classes.input
              }}
              InputLabelProps={{ className: classes.input }}
              />
            <Field className='signup-input'
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Username"
              name="username"
              autoFocus
              InputProps={{
                classes: { notchedOutline: classes.input },
                className: classes.input
              }}
              InputLabelProps={{ className: classes.input }}
              />

              <Field className='signup-input'
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                classes: { notchedOutline: classes.input },
                className: classes.input
              }}
              InputLabelProps={{ className: classes.input }}
              />

            <MuiPickersUtilsProvider utils={DateFnsUtils}></MuiPickersUtilsProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={loading}
              >
              {!loading 
                ? 'Sign Up' 
                : <Loader
                    type="ThreeDots"
                    color="white"
                    height={15}
                    width={50}
                  />}
            </Button>
            <Grid container>
                <Link to="/" className="sign-up-link">
                  {"Already have an account?"}
                </Link>
            </Grid>
            <Box mt={5}>
            </Box>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
};
const FormikSignUp = withFormik({

  mapPropsToValues({ username, password, firstname, lastname, email }) {
    return {
      username: username || "",
      password: password || "",
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required('Password is required'),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required'),
  }),

  //You can use this to see the values
  handleSubmit(values, {resetForm, ...rest}) {
    rest.props.register(values);
    resetForm();
  }
  
})(SignUp);

const mapStateToProps = state => {
  console.log(state)
  return {
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps, {register})(FormikSignUp);

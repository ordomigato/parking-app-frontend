import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
import { getLocations } from "../../store/actions/locations";
import {
  initializeVRFormData,
  submitVRFormData,
  clearErrors,
} from "../../store/actions/registerFormData";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormPartOne from "./FormPartOne";
import FormPartTwo from "./FormPartTwo";
import FormPartThree from "./FormPartThree";
import FormConfirmation from "./FormConfirmation";
import ErrorMessage from "../Message/ErrorMessage";
import ConfirmationReview from "../Message/ConfirmationReview";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    maxWidth: "768px",
    margin: "0 auto",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Contact Information",
    "Vehicle Information",
    "Visiting Information",
    "Confirmation",
  ];
}

function getStepContent(step, setNextButtonState) {
  switch (step) {
    case 0:
      return <FormPartOne setNextButtonState={setNextButtonState} />;
    case 1:
      return <FormPartTwo setNextButtonState={setNextButtonState} />;
    case 2:
      return <FormPartThree setNextButtonState={setNextButtonState} />;
    case 3:
      return <FormConfirmation setNextButtonState={setNextButtonState} />;
    default:
      return "Oops! Something went wrong";
  }
}

const RegisterVehicleFormContainer = ({
  getLocations,
  submitVRFormData,
  initializeVRFormData,
  formData,
  errors,
  clearErrors,
  auth: { user, isAuthenticated },
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [nextButtonState, setNextButtonState] = useState(false);

  useEffect(() => {
    getLocations();
    isAuthenticated && initializeForm(user);
  }, [user]);

  const initializeForm = user => {
    const formattedInfo = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      defaultPhone: user.defaultPhone || "",
    };
    initializeVRFormData(formattedInfo);
  };

  const handleNext = () => {
    clearErrors();
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    clearErrors();
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    clearErrors();
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    clearErrors();
    await submitVRFormData(formData, user.id).then(({ success }) => {
      success ? handleNext() : null;
    });
  };

  return (
    <form className={classes.root}>
      {errors &&
        errors.map(error => <ErrorMessage message={error} key={error} />)}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div className="py-4">
                <Typography component={`div`}>
                  {getStepContent(index, setNextButtonState)}
                </Typography>
              </div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    disabled={!nextButtonState}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <ConfirmationReview />
          <Button onClick={handleReset} className={classes.button}>
            Register Another Vehicle
          </Button>
        </Paper>
      )}
    </form>
  );
};

RegisterVehicleFormContainer.propTypes = {
  getLocations: PropTypes.func.isRequired,
  initializeVRFormData: PropTypes.func.isRequired,
  submitVRFormData: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  formData: state.registerVRFormData.formData,
  submittedPermit: state.registerVRFormData.submittedPermit,
  errors: state.registerVRFormData.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getLocations,
  initializeVRFormData,
  submitVRFormData,
  clearErrors,
})(RegisterVehicleFormContainer);

import React from "react";
import parkingImage from "../../assets/images/parking.JPG";
import websiteImage from "../../assets/images/website.JPG";
import LandingCard from "../../components/Card";
import { Container, Grid } from "@material-ui/core";

const Homepage = () => {
  return (
    <Container className="my-6">
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <LandingCard
            image={parkingImage}
            title={"Parking Permit Registration"}
            description={
              "If you wish to register your vehicle for one of our locations, please use the link below."
            }
            buttonText={"Registration Form"}
            link={"register-vehicle"}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <LandingCard
            image={websiteImage}
            title={"Skyview Security Website"}
            description={"Visit our website for all your security needs."}
            redirect={"https://skyviewsecurity.ca/"}
            buttonText={"Our Website"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;

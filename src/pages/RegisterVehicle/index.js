import React from "react";
import FormContainer from "../../components/RegisterVehicleForm/FormContainer";

const RegisterVehicle = () => {
  return (
    <div>
      <h1 className="text-center uppercase my-5 font-semibold">
        Register Vehicle
      </h1>
      <p className="text-center">* indicates required information</p>
      <FormContainer />
    </div>
  );
};

export default RegisterVehicle;

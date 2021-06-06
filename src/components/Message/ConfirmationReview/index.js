import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const EntryField = ({ name, value }) => {
  return (
    <>
      {value && (
        <div className="flex w-full">
          <span className="font-bold">{name}: </span>
          <span className="ml-auto">{value}</span>
        </div>
      )}
    </>
  );
};

const ConfirmationReview = ({
  registerVRFormData: { submittedPermit, loading },
}) => {
  return (
    <div>
      {!loading && (
        <div className="w-full bg-blue-50 shadow-md rounded-md">
          <div className="w-full p-4">
            <h2 className="font-bold text-center">Permit Submitted!</h2>
            <h2 className="text-center">REF #{submittedPermit.id}</h2>
            <div>
              <EntryField
                name={"Name"}
                value={`${submittedPermit.firstName} ${submittedPermit.lastName}`}
              />
              <EntryField name={"Email"} value={submittedPermit.email} />
              <EntryField name={"Phone Number"} value={submittedPermit.phone} />
              <EntryField
                name={"Vehicle's Plate Number"}
                value={submittedPermit.vplate}
              />
              <EntryField
                name={"Vehicle's Color"}
                // ${submittedPermit.vmake} / ${submittedPermit.vmodel}
                value={`${submittedPermit.vcolor}`}
              />
              <EntryField
                name={"Location"}
                value={`${submittedPermit.location.name} ${
                  submittedPermit.sublocation
                    ? `/ ${submittedPermit.sublocation.name}`
                    : ""
                }`}
              />
              <EntryField name={"Unit"} value={`${submittedPermit.unit}`} />
              <EntryField
                name={"Permit Expiry Date"}
                value={`${moment(submittedPermit.expDate).format(
                  "MMMM Do YYYY, h:mm a"
                )}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  registerVRFormData: state.registerVRFormData,
});

export default connect(mapStateToProps, null)(ConfirmationReview);

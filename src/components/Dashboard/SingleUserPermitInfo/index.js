import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { getUsersPermits } from "../../../store/actions/permits";

const Entry = ({ permit }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div>
              <div className="text-sm font-medium text-gray-900">{`${permit.firstName} ${permit.lastName}`}</div>
              <div className="text-sm text-gray-500">{`${permit.email} | ${permit.phone}`}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{permit.vplate}</div>
          <div className="text-sm text-gray-500">
            {`${permit.vmake} ${permit.vmodel} ${permit.vcolor}`}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {moment().format("YYYY-MM-DD HH:mm:ss") < permit.expDate ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
              Expired
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div>{`Submitted: ${moment(permit.createdAt).format(
            "MMMM Do YYYY, h:mm a"
          )}`}</div>
          <div>{`Expires: ${moment(permit.expDate).format(
            "MMMM Do YYYY, h:mm a"
          )}`}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
          {permit.id}
        </td>
      </tr>
    </tbody>
  );
};

const SingleUserPermitInfo = ({
  permits: { loading, usersPermits },
  getUsersPermits,
}) => {
  useEffect(() => {
    getUsersPermits();
  }, []);

  return (
    <div className="mt-4">
      {!loading && (
        <>
          <p className="text-center py-4 font-semibold">Permit History</p>
          {usersPermits ? (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 sm:rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Vehicle
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Dates
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right"
                          >
                            REF #
                          </th>
                        </tr>
                      </thead>
                      {usersPermits.map((permit) => (
                        <Entry permit={permit} key={permit.id} />
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "No Permits Found"
          )}
        </>
      )}
    </div>
  );
};

SingleUserPermitInfo.propTypes = {
  getUsersPermits: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  permits: state.permits,
});

export default connect(mapStateToProps, { getUsersPermits })(
  SingleUserPermitInfo
);

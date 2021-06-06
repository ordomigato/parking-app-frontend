import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../../store/actions/users";
import AccountsTable from "./Table";

const AccountsPage = ({ users: { accounts, loading }, getUsers }) => {
  useEffect(() => {
    console.log(accounts);
    // getUsers();
  }, [getUsers]);

  return (
    <>
      <div className="m-4">
        <AccountsTable users={accounts} />
      </div>
    </>
  );
};

AccountsPage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  accounts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(AccountsPage);

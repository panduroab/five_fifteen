import React, { Component } from 'react';
import Link from 'next/link';
import {
  Modal,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core';
import { Formik } from "formik";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{
        firstName: 'Topo',
        lastName: 'Chico',
        email: "topo_chico@fivefifteen.io",
      }],
      isCreateUserOpen: false
    };
  }
  _handleOpenCreateNewUser = () => {
    this.setState({
      isCreateUserOpen: true
    });
  }
  _handleCloseCreateNewUser = () => {
    this.setState({
      isCreateUserOpen: false
    });
  }
  render() {
    const MODAL_CREATE_USER =
      <Modal style={{
        backgroundColor: "#FFFFFF"
      }} open={this.state.isCreateUserOpen}>
        <div>
          <p>
            Create new User modal box
          </p>
          <Formik
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.setState((prevState) => {
                  const _state = Object.assign({}, prevState);
                  _state.isCreateUserOpen = false;
                  _state.users.push({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email
                  });
                  return _state;
                });
                setSubmitting(false);
              }, 400);
            }}
          >
            {
              //Child render function (?)
              ({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <button type="submit">Submit with formik</button>
                  </form>
                )
            }
          </Formik>
          <button
            onClick={this._handleCloseCreateNewUser}
          >
            Close
          </button>
        </div>
      </Modal>;
    return (
      <div>
        {MODAL_CREATE_USER}
        <p>
          Users
          </p>
        <p>
          <button
            onClick={this._handleOpenCreateNewUser}
          >
            Create a new User
          </button>
        </p>
        <p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Full Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.users.map((user, i) => {
                  const fullName = `${user.firstName || ''} ${user.lastName || ''}`;
                  return (<TableRow key={i}>
                    <TableCell>
                      {fullName}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                  </TableRow>)
                })
              }
            </TableBody>
          </Table>
        </p>
        <p>
          <Link href="/">
            <a>Home</a>
          </Link>
        </p>
      </div>
    );
  }
};

export default Users;
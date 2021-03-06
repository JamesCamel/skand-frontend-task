import React, { useCallback, useState } from "react";
import { requestUserList, requestDeleteUser } from "./../actions/UserList";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import PageviewIcon from '@material-ui/icons/Pageview';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Container, Toolbar, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { requestUserDetail } from "../actions/User";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  search: {
    marginleft: 0,
    position: 'relative',
    width: '100%',
  }
});


const isLogin = () => {
  return localStorage.getItem('token') ? true : false
}

const UserList = (props) => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.UserList)
  const [page, setPage] = useState(0)
  const [emailFilter, setEmailFilter] = useState("")
  const [activeFilter, setActiveFileter] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  const dispatchInHook = useCallback((action) => {
    dispatch(action)
  }, [dispatch])

  const redirectInHook = useCallback((path) => {
    return props.history.push(path)
  }, [props.history])

  React.useEffect(() => {
    if (!isLogin()) {
      redirectInHook('/login')
    } else {
      dispatchInHook(requestUserList())
    }
  }, [redirectInHook, dispatchInHook])

  let rows = []
  if (!_.isEmpty(userList)) {
    userList.filter(user => {
      return (!activeFilter || user.active)
    }).map(user => {
      if (user.email.search(emailFilter) > -1) {
        rows.push({
          id: user.id,
          email: user.email,
          jobsCount: user.jobs_count,
          active: user.active
        })
      }
      return true
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeEmailFilter = (str) => {
    setEmailFilter(prev => str)
  }

  const handleChangeActiveFilter = () => {
    setActiveFileter(prev => !prev)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <Container maxWidth="xm">
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            User List
        </Typography>
          <Tooltip>
            <IconButton>
              <AddIcon onClick={() => props.history.push('/users/new')} />
            </IconButton>
          </Tooltip>
          <InputBase
            placeholder="Search by email…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => handleChangeEmailFilter(e.target.value)}
          />
          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" />}
            label="Active users"
            labelPlacement="end"
            onChange={() => handleChangeActiveFilter()}
          />
        </Toolbar>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Jobs Count</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.jobsCount}</TableCell>
                  <TableCell align="right">{row.active ? "true" : "false"}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="View user">
                      <PageviewIcon
                        onClick={() => {
                          // Preload user detail before redirect
                          dispatch(requestUserDetail(row.id))
                          // Delay to finish preloading data
                          setTimeout(() => { props.history.push(`/users/${row.id}`) }, 450)
                        }}
                      />
                    </IconButton>
                    <IconButton aria-label="Edit user">
                      <EditIcon
                        onClick={() => {
                          // Preload user detail before redirect
                          dispatch(requestUserDetail(row.id))
                          // Delay to finish preloading data
                          setTimeout(() => { props.history.push(`/users/${row.id}/edit`) }, 450)
                        }}
                      />
                    </IconButton>
                    <IconButton aria-label="Delete user">
                      <DeleteIcon
                        onClick={() => {
                          const isConfirmed = window.confirm("Are you sure to delete this user?")
                          if (isConfirmed) {
                            dispatch(requestDeleteUser(row.id))
                          }
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}

export default UserList

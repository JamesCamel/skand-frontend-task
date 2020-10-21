import React, { useCallback } from "react";
import { requestUserDetail } from "./../actions/User"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  outerGrid: {
    spacing: 0,
    direction: "column",
    alignItems: "center",
    justify: "center",
    marginTop: theme.spacing(30)
  }
}));

const User = (props) => {
  const userId = props.match.params.id
  const dispatch = useDispatch()
  const user = useSelector(state => state.User)
  const requestUserDetailInHook = useCallback(() => {
    dispatch(requestUserDetail(userId))
  }, [dispatch, userId])

  React.useEffect(() => {
    requestUserDetailInHook()
  }, [requestUserDetailInHook])


  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Container component="main" maxWidth="xs" >
      <Grid container className={classes.outerGrid}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              id: {user.id}
            </Typography>
            <Typography variant="h5" component="h2">
              {user.first_name} {bull} {user.last_name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {user.active === true ? 'active' : 'inactive'}
            </Typography>
            <Typography variant="body2" component="p">
              Slack: {user.slack_username}
              <br />
              Jobs: {user.jobs_count}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              {user.email}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Container>
  );
}

export default User



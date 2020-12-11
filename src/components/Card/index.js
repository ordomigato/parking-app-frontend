import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  card: {
    height: "100%",
  },
});

const LandingCard = ({
  image,
  title,
  description,
  link,
  redirect,
  buttonText,
}) => {
  const classes = useStyles();

  return (
    <Card>
      {link ? (
        <Link className={classes.link} to={link}>
          <CardActionArea className="focus:outline-none">
            <CardMedia
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      ) : (
        <a className={classes.link} href={redirect}>
          <CardActionArea className="focus:outline-none">
            <CardMedia
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      )}
      <CardActions>
        <Button size="small" color="primary">
          {link ? (
            <Link className={classes.link} to={link}>
              {buttonText}
            </Link>
          ) : (
            <a className={classes.link} href={redirect}>
              {buttonText}
            </a>
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default LandingCard;

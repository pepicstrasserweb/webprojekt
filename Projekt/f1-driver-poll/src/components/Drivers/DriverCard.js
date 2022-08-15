import React from "react";

//import Card from "../UI/Card";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import "./DriverCard.css";
import DriverCardCollapse from "./DriverCardCollapse";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const styles = {
  card: {
    display: "flex",
  },
};

const DriverCard = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      style={{
        backgroundColor: "white",
        margin: 10,
        padding: 0,
        borderRadius: 15,
      }}
    >
      <div className="driver-card">
        <CardMedia
          style={{
            width: "auto",
          }}
          className="driver-card__image"
          component="img"
          src={props.driverImg}
          alt="DriverImg"
        />
        <CardMedia
          style={{
            width: "auto",
          }}
          className="driver-card__flag"
          component="img"
          src={props.flag}
          alt="FlagImg"
        />
        <CardContent className="driver-card__info">
          <Typography variant="h5">{props.name}</Typography>
          <Typography variant="body2">{props.team}</Typography>
        </CardContent>

        <CardContent className="driver-card__actions">
          {props.usersVote === props.driverId ? 
            <EmojiEventsIcon style={{color:"gold", margin:5}}></EmojiEventsIcon> :
            <EmojiEventsIcon style={{color:"red", margin:5}}></EmojiEventsIcon>}
          <Typography variant="h5">Votes / {props.voteCount}</Typography>

          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </CardContent>
      </div>
      <div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <DriverCardCollapse
            gpEntered={props.gpEntered}
            podiums={props.podiums}
            usersVote={props.usersVote}
            driverId={props.driverId}
            country={props.country}
            team={props.team}
            voteCount={props.voteCount}
            dob={props.dob}
          />
        </Collapse>
      </div>
    </Card>

    // <Card className="driver-card">
    //   <div className="driver-card__image">Slika</div>
    //   <div>
    //     <h2>{props.name}</h2>
    //   </div>
    //   <div>
    //     <h2>{props.team}</h2>
    //   </div>
    //   <div>
    //     <h2>&#8595;</h2>
    //   </div>

    // </Card>
  );
};

export default withStyles(styles)(DriverCard);

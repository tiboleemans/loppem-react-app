import React from "react";
import {Button, Grid} from "@mui/material";
import {styled} from "@mui/system";
import {Link} from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import useTabs from "../vacations/useTabs";

const PREFIX = 'MyGalleryDiv';

const classes = {
  cardHolder: `${PREFIX}-cardHolder`,
  cardOverlay: `${PREFIX}-cardOverlay`,
}

const StyledDiv = styled('div')(({theme}) => ({
  [`&.${classes.cardHolder}`]: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    "&:hover $cardOverlay": {
      opacity: 1,
    },
  },
  [`&.${classes.cardOverlay}`]: {
    padding: "0px 1rem",
    transition: "all 250ms ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    borderRadius: 8,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    color: theme.palette.primary.contrastText,
    background: "rgba(0,0,0,0.67)",
    zIndex: 0,
  }
}));

const Gallery = () => {
  const {bodyActiveTab, tabTitles} = useTabs([{
    id: 'ACTIVITIES',
    title: "Activiteiten",
    body: [{
      title: "",
      subtitle: "Er worden tal van leuke spelen georganiseerd",
      image: require("../../images/monitrek.jpg"),
    }, {
      title: "",
      subtitle: "Een uitstap naar Brugge om de doeltaal in praktijk te gebruiken",
      image: require("../../images/vacations/5.jpg"),
    }, {
      title: "",
      subtitle: "Interactieve lessen in klassen van maximaal 10 leerlingen",
      image: require("../../images/klasfoto.jpg"),
    }, {
      title: "",
      subtitle: "Waterspelen om even af te koelen",
      image: require("../../images/water.jpg"),
    }, {
      title: "",
      subtitle: "Sportieve spelen om je helemaal uit te leven",
      image: require("../../images/rugby.jpg"),
    }, {
      title: "",
      subtitle: "Spelletjes waar we plezier in de verf zetten",
      image: require("../../images/verf.jpg"),
    }]
  }, {
    id: 'TEAM',
    title: "Team",
    body: [{
      title: "Thibault Leemans - voorzitter",
      subtitle: "Thibault is de voorzitter van Loppem Conversa en neemt het initiatief voor de organisatie van de verschillende aspecten doorheen het jaar." +
        "Tijdens de stage is hij coördinator, die mee inspringt waar nodig.",
      image: require("../../images/Thibault.JPG"),
    }, {
      title: "Bob Beuls - secretaris",
      subtitle: "Bob is de secretaris van Loppem Conversa",
      image: require("../../images/Thibault.JPG"),
    }, {
      title: "Briek Deblaere - penningmeester",
      subtitle: "Briek beheert de financiën",
      image: require("../../images/briek.jpg"),
    }]
  }, {
    id: "VIDEO",
    title: "Video's",
    body: [{
      title: "",
      subtitle: "Spelletjes waar we plezier in de verf zetten",
      image: require("../../images/domein.mp4"),
    },
      {
        title: "",
        subtitle: "Spelletjes waar we plezier in de verf zetten",
        image: require("../../images/domein.mp4"),
      },
      {
        title: "",
        subtitle: "Spelletjes waar we plezier in de verf zetten",
        image: require("../../images/domein.mp4"),
      },
      {
        title: "",
        subtitle: "Spelletjes waar we plezier in de verf zetten",
        image: require("../../images/domein.mp4"),
      },
      {
        title: "",
        subtitle: "Spelletjes waar we plezier in de verf zetten",
        image: require("../../images/domein.mp4"),
      },
      {
        title: "",
        subtitle: "Spelletjes waar we plezier in de verf zetten",
        image: require("../../images/domein.mp4"),
      },
      {
        title: "",
        subtitle: "Spelletjes waar we plezier in de verf zetten",
        image: require("../../images/domein.mp4"),
      }]
  }], 'TEAM');


  return (<div className="section" id="gallery1">
    <div className="section bg-light-gray">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-normal text-44 mt-0">Loppem Conversa in beeld</h1>
        </div>
        {tabTitles}

        <Grid container spacing={3}>
          {bodyActiveTab?.map((item, ind) => (<Grid key={ind} item lg={4} md={4} sm={4} xs={12}>
            {
              item.image.endsWith(".mp4") ?
                <CardMedia
                  style={{
                    width: '90%',
                    margin: "150px auto 0px auto"
                  }}
                  component="video"
                  image={item.image}
                  title={item.title}
                  controls
                /> : <StyledDiv className={classes.cardHolder}>
                  <img className="w-full block" src={item.image} alt=""/>
                  <StyledDiv className={classes.cardOverlay}>
                    <h3 className="m-0">{item.title}</h3>
                    <p className="text-inherit">{item.subtitle}</p>
                  </StyledDiv>
                </StyledDiv>
            }

          </Grid>))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item sm={2}/>
          <Grid item sm={4}>
            <Link to={{pathname: "https://www.google.com"}}
                  target="_blank"><i className="icon icon-twitter"/>

              <Button
                className="rounded px-10 mt-16"
                variant="contained"
                color="primary"
              >
                Bekijk alle foto's van juli 2019
              </Button>
            </Link>
          </Grid>
          <Grid item sm={2}/>
          <Grid item sm={4}>
            <Link to={{pathname: "https://www.google.com"}}
                  target="_blank"><i className="icon icon-twitter"/>

              <Button
                className="rounded px-10 mt-16"
                variant="contained"
                color="primary"
              >
                Bekijk alle foto's van augustus 2019
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  </div>);
};

export default Gallery;

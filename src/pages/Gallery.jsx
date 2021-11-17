import React, {useState} from "react";
import {Grid, Button} from "@material-ui/core";
import {lighten, makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Section from "../components/Section";

const useStyles = makeStyles(({
                                  palette,
                                  ...theme
                              }) => ({
    cardHolder: {
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        "&:hover $cardOverlay": {
            opacity: 1,
        },
    },
    cardOverlay: {
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
        color: palette.primary.contrastText,
        background: "rgba(0,0,0,0.67)",
        zIndex: 5,
    },
    buttonGroupBG: {
        background: lighten(palette.primary.light, 0.9),
        "&>div": {
            transition: "all 250ms ease",
            "&:hover": {
                background: palette.primary.main,
                color: palette.primary.contrastText,
                borderRadius: 8,
            },
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
                width: "100%",
            },
        },
    },
}));

const Gallery = () => {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);

    const sections = [{
        title: "Team"
    }, {
        title: "Team2"
    }];

    const imageList = [[{
        title: "",
        subtitle: "Er worden tal van leuke spelen georganiseerd",
        image: require("../images/monitrek.jpg"),
    }, {
        title: "",
        subtitle: "Een uitstap naar Brugge om de doeltaal in praktijk te gebruiken",
        image: require("../images/brugge.jpg"),
    }, {
        title: "",
        subtitle: "Interactieve lessen in klassen van maximaal 10 leerlingen",
        image: require("../images/klasfoto.jpg"),
    }, {
        title: "",
        subtitle: "Waterspelen om even af te koelen",
        image: require("../images/water.jpg"),
    }, {
        title: "",
        subtitle: "Sportieve spelen om je helemaal uit te leven",
        image: require("../images/rugby.jpg"),
    }, {
        title: "",
        subtitle: "Spelletjes waar we plezier in de verf zetten",
        image: require("../images/verf.jpg"),
    }],
        [{
            title: "Thibault Leemans - voorzitter",
            subtitle: "Thibault is de voorzitter van Loppem Conversa en neemt het initiatief voor de organisatie van de verschillende aspecten doorheen het jaar." +
                "Tijdens de stage is hij coördinator, die mee inspringt waar nodig.",
            image: require("../images/Thibault.JPG"),
        }, {
            title: "Bob Beuls - secretaris",
            subtitle: "Bob is de secretaris van Loppem Conversa",
            image: require("../images/Thibault.JPG"),
        }, {
            title: "Briek Deblaere - penningmeester",
            subtitle: "Briek beheert de financiën",
            image: require("../images/briek.jpg"),
        }],
        [{
            title: "",
            subtitle: "Spelletjes waar we plezier in de verf zetten",
            image: require("../images/domein.mp4"),
        },
            {
                title: "",
                subtitle: "Spelletjes waar we plezier in de verf zetten",
                image: require("../images/domein.mp4"),
            },
            {
                title: "",
                subtitle: "Spelletjes waar we plezier in de verf zetten",
                image: require("../images/domein.mp4"),
            },
            {
                title: "",
                subtitle: "Spelletjes waar we plezier in de verf zetten",
                image: require("../images/domein.mp4"),
            },
            {
                title: "",
                subtitle: "Spelletjes waar we plezier in de verf zetten",
                image: require("../images/domein.mp4"),
            },
            {
                title: "",
                subtitle: "Spelletjes waar we plezier in de verf zetten",
                image: require("../images/domein.mp4"),
            },
            {
                title: "",
                subtitle: "Spelletjes waar we plezier in de verf zetten",
                image: require("../images/domein.mp4"),
            }]
    ];

    return (<section className="section" id="gallery1">
        <div className="section bg-light-gray">
            <div className="container">
                <div className="mb-8">
                    <h1 className="font-normal text-44 mt-0">Loppem Conversa in beeld</h1>
                </div>
                <div className="inline-block mb-10">
                    <div
                        className={`flex flex-wrap items-center border-radius-8 ${classes.buttonGroupBG}`}
                    >
                        <Section data={sections}/>
                        <div
                            className="px-6 py-2 cursor-pointer"
                            onClick={() => setTabIndex(0)}
                        >
                            Activiteiten
                        </div>
                        <div
                            className="px-6 py-2 cursor-pointer"
                            onClick={() => setTabIndex(1)}
                        >
                            Team
                        </div>
                        <div
                            className="px-6 py-2 cursor-pointer"
                            onClick={() => setTabIndex(2)}
                        >
                            Videos
                        </div>
                    </div>
                </div>

                <Grid container spacing={3}>
                    {imageList[tabIndex].map((item, ind) => (<Grid key={ind} item lg={4} md={4} sm={4} xs={12}>
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
                                />
                                :
                                <div className={classes.cardHolder}>
                                    <img className="w-full block" src={item.image} alt=""/>
                                    <div className={classes.cardOverlay}>
                                        <h3 className="m-0">{item.title}</h3>
                                        <p className="text-inherit">{item.subtitle}</p>
                                    </div>
                                </div>
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
    </section>);
};

export default Gallery;

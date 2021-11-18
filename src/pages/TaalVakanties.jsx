import React, {useState} from "react";

import {Card, CardContent} from "@material-ui/core";
import Carousel from "../common/Carousel";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import DoneIcon from '@material-ui/icons/Done';
import green from "@material-ui/core/colors/green";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import useTabs from "./useTabs";
import {makeStyles} from "@material-ui/core/styles";

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
    }
}));

const TaalVakanties = () => {
        const {body, header} = useTabs([{
            id: 'WHAT',
            title: "Wat?",
            body: {
                title: "Loppem Conversa organiseert",
                images: [require("../images/class.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg")],
                sections:
                    [
                        {
                            title: "Taalvakanties Nederlands / Engels",
                            text: "Loppem Conversa organiseert conversatiecursussen Nederlands en Engels voor jongeren van 10 tot 18 jaar in de prachtige groene omgeving van de abdijschool van Zevenkerken, in de nabijheid van Brugge.",
                        },
                        {
                            title: "Kwaliteit",
                            text: "Wij staan garant voor kwaliteitsvolle, interactieve conversatiecursussen in klassen van maximum tien leerlingen. De lessen worden afgewisseld met een waaier aan sporten, kleine en grote spelen, muzikale activiteiten en shows, onder leiding van een toegewijde monitorenploeg. Zo creëren we keer op keer een sfeervolle en onvergetelijke vakantie voor jongeren.",
                        },
                        {
                            title: "Taalbad",
                            text: "Bij Loppem Conversa wordt de gekozen taal altijd en overal gesproken. Wij zijn pas tevreden als de jongeren in de doeltaal dromen.\","
                        }
                    ]
            },
        }, {
            id: 'WHEN',
            title: 'Wanneer?',
            body: {
                title: "Zomervakantie",
                images: [require("../images/class.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg")],
                sections:
                    [
                        {
                            title: "2 - 12 juli 2022",
                            text: "De stages Engels/Nederlands gaan door van 2 tot 12 juli. De leerlingen worden de eerste dag verwacht tussen 9 en 11 uur en worden de laatste dag terug opgehaald tussen 9 en 11 uur.",
                        },
                        {
                            title: "2 - 12 augustus 2022",
                            text: "De stages Engels/Nederlands gaan door van 2 tot 12 augustus. De leerlingen worden de eerste dag verwacht tussen 9 en 11 uur en worden de laatste dag terug opgehaald tussen 9 en 11 uur.",
                        },
                    ]
            },
        }, {
            id: 'WHERE',
            title: 'Waar?',
            body: {
                title: "De abdijschool van Zevenkerken",
                images: [require("../images/class.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg")],
                sections:
                    [
                        {
                            title: "Het domein",
                            text: "De stages gaan door in de abdijschool van Zevenkerken, gelegen in de prachtige groene omgeving van de Brugse rand. De gezonde buitenlucht draagt bij tot een bruisend vakantiegevoel.",
                        },
                        {
                            title: "Geschikt voor sport & spel",
                            text: "Het domein omvat onder andere drie grote voetbalvelden, een hockeyveld, twee basketbalpleinen, drie tennisvelden en een grote vernieuwde sportzaal. Deze terreinen waar de leerlingen zich onder begeleiding kunnen uitleven, zijn omringd door prachtige bossen. Verder is er een grote speelruimte met vier ping pongtafels en drie kickertafels. Hiernaast bevindt zich het monitorenlokaal met een ruim aanbod van materiaal de gebruikt mag worden tijdens de vrije momenten en de activiteiten.",
                        },
                        {
                            title: "De klaslokalen",
                            text: "De interactieve lessen gaan door in goed uitgeruste klaslokalen in klasgroepen van maximaal 10 leerlingen.",
                        },
                        {
                            title: "De overnachting",
                            text: "Alle leerlingen slapen in individuele éénpersoonskamers.",
                        }
                    ]
            },
        }, {
            id: 'WHY',
            title: 'Waarom?',
            body: {
                title: "Een duidelijke voorsprong",
                images: [require("../images/class.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg"), require("../images/slider-image1.jpg")],
                sections: [{
                    title: "Een duidelijke voorsprong",
                    text: "Loppem Conversa is een springplank naar de toekomst en geeft uw kind een duidelijke voorsprong in het spreken van de gekozen taal. Deze meerwaarde vraagt op persoonlijk niveau en op studievlak een duidelijke inspanning van de leerlingen. Zo opent het spreken van vreemde talen mogelijkheden naar verdere studies en de beroepswereld."
                },
                ]
            }
        }]);

        const classes = useStyles();

        return (
            <div className="section bg-light-gray" id="taalvakanties">
                <div className="container">
                    <div className="section__header">
                        <h2>Onze taalvakanties</h2>
                    </div>

                    {header}
                    <Grid container spacing={3}>
                        {
                            <Card className="px-6 card">
                                <Grid container>
                                    <Grid item xs={6}>
                                        <CardHeader title={body?.title}/>
                                        <CardContent>
                                            {body?.sections.map((section, i) =>
                                                <div>
                                                    <h4> {section.title}</h4>
                                                    <p className="text-16"> {section.text}</p>
                                                </div>
                                            )}

                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid className="m-4" container spacing={3}>
                                            {
                                                body?.images.map((image, index) => (
                                                    <Grid key={index} item lg={6} md={6} sm={6} xs={12}>
                                                        {image.endsWith("mp4") ?
                                                            <CardMedia
                                                                style={{
                                                                    width: '90%',
                                                                    margin: "50px"
                                                                }}
                                                                component="video"
                                                                image={image.url}
                                                                title='title'
                                                                controls
                                                            /> :
                                                            <Card className="relative card m-2">
                                                                <div className={classes.cardHolder}>
                                                                    <img className="w-full block" src={image} alt=""/>
                                                                </div>
                                                            </Card>
                                                        }
                                                    </Grid>
                                                ))
                                            }</Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        }
                    </Grid>
                </div>

            </div>
        )
            ;
    }
;

export default TaalVakanties;

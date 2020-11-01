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

const TaalVakanties = () => {

    const [showMore, setShowMore] = useState('Meer informatie');

    const informationList = [
        {
            title: "Aanbod Loppem Conversa",
            listItems: [
                {
                    primaryText: "taalvakanties Nederlands / Engels",
                    secondaryText: "leerrijk & leuk"
                },
                {
                    primaryText: "voor anderstalige jongeren van 10 tot 18 jaar",
                    secondaryText: "elk niveau"
                },
                {
                    primaryText: "interactieve lessen en uitdagende werkvormen",
                    secondaryText: "klassen met maximaal 10 leerlingen"
                },
                {
                    primaryText: "via immersie: de doeltaal wordt altijd en overal gesproken",
                    secondaryText: "de jongeren worden ondergedompeld in een taalbad"
                },
                {
                    primaryText: "gedurende 10 dagen",
                    secondaryText: "de jongeren overnachten in comfortabele éénpersoonskamers"
                },
            ],
            imgUrl: require("../images/class.jpg"),
            fullText: "Loppem Conversa organiseert conversatiecursussen Nederlands en Engels voor jongeren van 10 tot 18 jaar in de prachtige groene omgeving van de abdijschool van Zevenkerken, in de nabijheid van Brugge." +
                "\n" +
                "Wij staan garant voor kwaliteitsvolle, interactieve conversatiecursussen in klassen van maximum tien leerlingen. De lessen worden afgewisseld met een waaier aan sporten, kleine en grote spelen, muzikale activiteiten en shows, onder leiding van een toegewijde monitorenploeg. Zo creëren we keer op keer een sfeervolle en onvergetelijke vakantie voor jongeren.\n" +
                "\n" +
                "Bij Loppem Conversa wordt de gekozen taal altijd en overal gesproken. Wij zijn pas tevreden als de jongeren in de doeltaal dromen.",
        },
        {
            title: "De abdijschool van Zevenkerken",
            listItems: [
                {
                    primaryText: "meer dan 100 individuele kamers",
                    secondaryText: "elke slaapkamer heeft een bed, bureau, kast & lavabo"
                },
                {
                    primaryText: "tientallen klaslokaal",
                    secondaryText: "elk klaslokaal is uitgerust met een krijtbord, beamer, geluidsinstallatie"
                },
                {
                    primaryText: "veel sportvelden",
                    secondaryText: "twee voetbalvelden, hockeyveld, rugbyveld, basketbalveld, volleybalveld, badmintonveld & drie tennisvelden op steen"
                },
                {
                    primaryText: "grote speelruimte",
                    secondaryText: "uitgerust met vier pingpong tafels en 3 kickertafels"
                },
                {
                    primaryText: "monitorenlokaal",
                    secondaryText: "met ruim aanbod van materiaal dat gebruikt mag worden"
                },
                {
                    primaryText: "omgeven door een prachtig bos",
                    secondaryText: "geschikt voor bosspelen & een nachtspel voor de ouderen"
                },
            ],
            imgUrl: require("../images/domein.mp4"),
            fullText: "De school en de sportvelden bevinden zich in een groene omgeving aan de Brugse rand. Gezonde buitenlucht draagt bij tot een bruisend vakantiegevoel. De terreinen waar de leerlingen zich onder begeleiding kunnen uitleven, zijn omringd door prachtige bossen. Het domein omvat ook 4 voetbalvelden, 2 basketbalpleinen, 4 tennisvelden en een sportzaal.",
        },
        {
            title: "Sport en ambiance",
            listItems: [
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
            ],
            imgUrl: require("../images/domein.mp4"),
            fullText: "Een enthousiast team monitoren organiseert sport- en ontspanningsactiviteiten. Op deze manier komen de talenten van elke leerling naar boven en wordt een dynamisch en positief groepsgevoel gestimuleerd. Balsporten, zwemmen, knutselen, film en muzikaal entertainment staan zeker op het programma. De creativiteit van de leerlingen primeert ook tijdens een interactief stadsspel in de historische binnenstad van Brugge. Loppem Conversa zorgt op deze manier voor een unieke sfeer.",
        },
        {
            title: "Een duidelijke voorsprong",
            listItems: [
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
                {
                    primaryText: "primaryText",
                    secondaryText: "secondaryText"
                },
            ],
            imgUrl: require("../images/domein.mp4"),
            fullText: "Loppem Conversa is een springplank naar de toekomst en geeft uw kind een duidelijke voorsprong in het spreken van de gekozen taal. Deze meerwaarde vraagt op persoonlijk niveau en op studievlak een duidelijke inspanning van de leerlingen. Zo opent het spreken van vreemde talen mogelijkheden naar verdere studies en de beroepswereld.",
        },
    ];

    const toggleShowMore = () => {
        if (showMore === 'Meer informatie')
            setShowMore('Minder informatie');
        else
            setShowMore('Meer informatie');
    }

    return (
        <div className="section" id="testimonial1">
            <div className="container">
                <div className="section__header">
                    <h2>Onze taalvakanties</h2>
                </div>

                <Carousel carouselId="testimonial-1">
                    {informationList.map((information, index) => (
                        <Card className="px-6 card" key={index}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <CardHeader title={information.title}/>
                                    <CardContent className="flex-column justify-between">
                                        <List dense={true}>
                                            {information.listItems.map((listItem, i) => (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <DoneIcon style={{color: green[500]}}/>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={listItem.primaryText}
                                                        secondary={listItem.secondaryText}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={6} >
                                    {
                                        information.imgUrl.endsWith("mp4") ?
                                            <CardMedia
                                                style={{width: '90%', margin: "150px auto 0px auto"}}
                                                component="video"
                                                image={information.imgUrl}
                                                title='title'
                                                controls
                                            /> :
                                            <Card className="relative card m-6" key={index}>
                                                <img
                                                    className="w-full"
                                                    src={information.imgUrl}
                                                    alt={information.title}
                                                    style={{display: 'block'}}
                                                />
                                            </Card>
                                    }


                                </Grid>
                                <Grid item xs={12} className="mb-6">
                                    {
                                        showMore === 'Minder informatie' ?
                                            <CardContent>
                                                <p className="text-16"> {information.fullText}
                                                </p>
                                            </CardContent>
                                            : null
                                    }
                                    <CardActions>
                                        <Button
                                            key={index}
                                            variant="contained"
                                            className={"rounded px-6 relative mx-auto text-center flex-column justify-center items-center"}
                                            color="primary"
                                            onClick={toggleShowMore}
                                        >{showMore}</Button>
                                    </CardActions>
                                </Grid>

                            </Grid>

                        </Card>
                    ))}
                </Carousel>
            </div>

        </div>
    );
};

export default TaalVakanties;

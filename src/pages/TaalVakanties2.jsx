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

    const [showMore, setShowMore] = useState(true);

    const informationList = [
      {
        title: "Loppem Conversa organiseert",
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
        imgUrl: require("../images/slider-image1.jpg"),
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
      {
        title: "Het team",
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
        imgUrl: require("../images/3bollen.png"),
        sections: [
          {
            title: "Sport & ambiance",
            text: "Een enthousiast team monitoren organiseert sport- en ontspanningsactiviteiten. Op deze manier komen de talenten van elke leerling naar boven en wordt een dynamisch en positief groepsgevoel gestimuleerd. Balsporten, zwemmen, knutselen, film en muzikaal entertainment staan zeker op het programma. De creativiteit van de leerlingen primeert ook tijdens een interactief stadsspel in de historische binnenstad van Brugge. Loppem Conversa zorgt op deze manier voor een unieke sfeer. De monitoren bevinden zich op elk mogelijk moment tussen de leerlingen."
          },
          {
            title: "Leerrijk",
            text: "Een goed opgeleid leerkrachten team is verantwoordelijk voor de taalverwerving van de doeltaal. Dit kan door middel van interactieve leervormen."
          },
          {
            title: "Welkom in Loppem",
            text: "Het coördinerend team zorgt ervoor dat iedereen zich thuis voelt in Loppem Conversa en de waarden & normen worden gerespecteerd. Er wordt toegekeken dat vriendschappen snel gevormd worden, dat de doeltaal altijd & overal gesproken wordt. "
          },
          {
            title: "Veilig",
            text: "Op elk moment van de stage is een verpleegkundige in de buurt die de eerste zorgen kan toedienen bij ongelukken. "
          },
        ]
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
        imgUrl: require("../images/class.jpg"),
        sections: [{
          title: "Een duidelijke voorsprong",
          text: "Loppem Conversa is een springplank naar de toekomst en geeft uw kind een duidelijke voorsprong in het spreken van de gekozen taal. Deze meerwaarde vraagt op persoonlijk niveau en op studievlak een duidelijke inspanning van de leerlingen. Zo opent het spreken van vreemde talen mogelijkheden naar verdere studies en de beroepswereld."
        },
        ]
      },
    ];

    const toggleShowMore = () => {
      if (showMore)
        setShowMore(false);
      else
        setShowMore(true);
    }

    return (
      <div className="section bg-light-gray" id="taalvakanties">
        <div className="container">
          <div className="section__header">
            <h2>Onze taalvakanties</h2>
          </div>

          <Carousel slidesPerView="1" delay="10000" carouselId="taalvakanties-1">
            {informationList.map((information, index) => (
              <Card className="px-6 card" key={index}>
                <Grid container>
                  <Grid item xs={6}>
                    <CardHeader title={information.title}/>
                    {
                      showMore ?
                        <CardContent>
                          {information.sections.map((section, i) =>
                            <div>
                              <h4> {section.title}</h4>
                              <p className="text-16"> {section.text}</p>
                            </div>
                          )}

                        </CardContent>
                        :
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
                    }
                  </Grid>
                  <Grid item xs={6}>
                    {
                      information.imgUrl.endsWith("mp4") ?
                        <CardMedia
                          style={{
                            width: '90%',
                            margin: "150px auto 0px auto"
                          }}
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

                    <CardActions>
                      <Button
                        key={index}
                        variant="contained"
                        className={"rounded px-6 relative mx-auto text-center flex-column justify-center items-center"}
                        color="primary"
                        onClick={toggleShowMore}
                      >{showMore ? 'Minder informatie' : 'Meer informatie'}</Button>
                    </CardActions>
                  </Grid>

                </Grid>

              </Card>
            ))}
          </Carousel>
        </div>

      </div>
    )
      ;
  }
;

export default TaalVakanties;

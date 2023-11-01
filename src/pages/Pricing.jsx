import React from "react";
import {Card, CardContent, Divider, Grid,} from "@mui/material";
import {styled} from "@mui/system";
import clsx from "clsx";

const PREFIX = 'MyCard';

const classes = {
  card: `${PREFIX}-card`,
}

const StyledCard = styled(Card)(({theme}) => ({
  [`&.${classes.card}`]: {
    "& .card-header": {
      background: "rgba(0, 0, 0, 0.024)",
    },
    "& .card-header-highlighted": {
      background: "rgba(var(--primary),1)",
      "& span": {
        color: "#fff",
      },
    },
  },
}));

const Pricing1 = () => {

  return (
    <div className="p-15" id="pricing">
      <div className="container">
        {/*<Card className="p-6 card">*/}
        <Grid container>
          <Grid item xs={12}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <StyledCard className={clsx("text-center card", classes.card)}>
                        <div className="card-header flex-column items-center p-3 card-header-highlighted">
                          <span className="text-24">Nederlands</span>
                        </div>
                        <Divider className="mb-2"/>
                        <CardContent className="pricing1__card-content">
                          <h1 className="mt-0 mb-4 text-24">7 - 17 juli 2024</h1>
                          <Divider className="mb-2"/>
                          <div className="px-3 py-2">
                            <Grid container spacing={2}>
                              <Grid container item justifyContent="flex-end" md={7}><span
                                className="text-20"><strong>Basisprijs</strong></span></Grid>
                              <Grid container item justifyContent="flex-end" md={4}><span
                                className="text-20"><strong>€ 760</strong></span></Grid>
                              <Grid md={7} container item justifyContent="flex-end">Tijdelijke korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                              <Grid md={7} container item justifyContent="flex-end">Speciale korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€50</Grid>
                            </Grid>
                          </div>
                        </CardContent>
                      </StyledCard>
                    </Grid>

                    <Grid item md={6}>
                      <StyledCard className={clsx("text-center card", classes.card)}>
                        <div className="card-header flex-column items-center p-3 card-header-highlighted">
                          <span className="text-24">Nederlands</span>
                        </div>
                        <Divider className="mb-2"/>
                        <CardContent className="pricing1__card-content">
                          <h1 className="mt-0 mb-4 text-24">4 - 14 augustus 2024</h1>
                          <Divider className="mb-2"/>
                          <div className="px-3 py-2">
                            <Grid container spacing={2}>
                              <Grid container item justifyContent="flex-end" md={7}><span
                                className="text-20"><strong>Basisprijs</strong></span></Grid>
                              <Grid container item justifyContent="flex-end" md={4}><span
                                className="text-20"><strong>€ 760</strong></span></Grid>
                              <Grid md={7} container item justifyContent="flex-end">Tijdelijke korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                              <Grid md={7} container item justifyContent="flex-end">Speciale korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€50</Grid>
                            </Grid>
                          </div>
                        </CardContent>
                      </StyledCard>
                    </Grid>

                    <Grid item md={6}>
                      <StyledCard className={clsx("text-center card", classes.card)}>
                        <div className="card-header flex-column items-center p-3 card-header-highlighted">
                          <span className="text-24">Engels</span>
                        </div>
                        <Divider className="mb-2"/>
                        <CardContent className="pricing1__card-content">
                          <h1 className="mt-0 mb-4 text-24">7 - 17 juli 2024</h1>
                          <Divider className="mb-2"/>
                          <div className="px-3 py-2">
                            <Grid container spacing={2}>
                              <Grid container item justifyContent="flex-end" md={7}><span
                                className="text-20"><strong>Basisprijs</strong></span></Grid>
                              <Grid container item justifyContent="flex-end" md={4}><span
                                className="text-20"><strong>€ 760</strong></span></Grid>
                              <Grid md={7} container item justifyContent="flex-end">Tijdelijke korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                              <Grid md={7} container item justifyContent="flex-end">Speciale korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€50</Grid>
                            </Grid>
                          </div>
                        </CardContent>
                      </StyledCard>
                    </Grid>

                    <Grid item md={6}>
                      <StyledCard className={clsx("text-center card", classes.card)}>
                        <div className="card-header flex-column items-center p-3 card-header-highlighted">
                          <span className="text-24">Engels</span>
                        </div>
                        <Divider className="mb-2"/>
                        <CardContent className="pricing1__card-content">
                          <h1 className="mt-0 mb-4 text-24">4 - 14 augustus 2024</h1>
                          <Divider className="mb-2"/>
                          <div className="px-3 py-2">
                            <Grid container spacing={2}>
                              <Grid container item justifyContent="flex-end" md={7}><span
                                className="text-20"><strong>Basisprijs</strong></span></Grid>
                              <Grid container item justifyContent="flex-end" md={4}><span
                                className="text-20"><strong>€ 760</strong></span></Grid>
                              <Grid md={7} container item justifyContent="flex-end">Tijdelijke korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                              <Grid md={7} container item justifyContent="flex-end">Speciale korting</Grid>
                              <Grid md={4} container item justifyContent="flex-end">-€50</Grid>
                            </Grid>
                          </div>
                        </CardContent>
                      </StyledCard>
                    </Grid>

                    <Grid item md={12}>
                      <StyledCard className={clsx("text-left card", classes.card)}>
                        <div className="card-header flex-column items-center p-3 card-header-highlighted">
                          <span className="text-24">Betalingsdetails</span>
                        </div>
                        <Divider className="mb-2"/>
                        <CardContent className="pricing1__card-content">
                          <p className="text-left">U betaalt het voorschot onmiddellijk na de inschrijving en het saldo voor
                            één juni 2022. U kan verschillende kortingen combineren.
                          </p>
                          <Divider className="mb-2"/>
                          <p className="text-left">Sommige ziekenfondsen komen tussenbeide in de inschrijvingskosten.
                            Informeer bij uw ziekenfonds. </p>
                          <Divider className="mb-2"/>
                          <p className="text-left">Voor leerlingen tot 14 jaar wordt een fiscaal attest voor opvang
                            opgeleverd.</p>
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <StyledCard className={clsx("text-center card", classes.card)}>
                        <div className="card-header flex-column items-center p-3 card-header-highlighted">
                          <span className="text-24">Speciale korting</span>
                        </div>
                        <Divider className="mb-2"/>
                        <CardContent className="pricing1__card-content text-left">
                          <h1 className="text-20"> € 50 korting bij het aanbrengen van een nieuwe leerling</h1>
                          <Divider className="mb-2"/>
                          <p>Onder de volgende voorwaarden: </p>
                          <ul>
                            <li>Uw kind is zelf ingeschreven.</li>
                            <li>De nieuw aangebrachte leerling heeft nog nooit een stage bij Loppem Conversa gevolgd.</li>
                            <li>De nieuw aangebrachte leerling behoort niet tot hetzelfde gezin (dus inwonend op hetzelfde
                              adres).
                            </li>
                            <li>U vermeldt de naam van deze leerling duidelijk in het inschrijvingsformulier op de website
                              in
                              het
                              daartoe bestemde vakje.
                            </li>
                            <li>U kunt elkaar niet wederzijds aanbrengen.</li>
                          </ul>
                          <Divider className="mb-2"/>
                          <p> Deze korting wordt pas toegekend en <strong>terugbetaald NA de stage </strong>.</p>
                        </CardContent>
                      </StyledCard>
                    </Grid>
                    <Grid item md={6}>
                      <StyledCard className={clsx("text-center card", classes.card)}>
                        <div className="card-header flex-column items-center p-3 card-header-highlighted">
                          <span className="text-24">Tijdelijke korting</span>
                        </div>
                        <Divider className="mb-2"/>
                        <CardContent className="pricing1__card-content text-left">
                          <h1 className="text-18">Schrijf in voor 1 februari en geniet van 20 euro korting</h1>
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    </div>
  )
    ;
};

export default Pricing1;

import React from "react";
import {Button, Card, CardContent, Divider, Grid,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import EuroIcon from '@material-ui/icons/Euro';
import useTabs from "./useTabs";

const useStyles = makeStyles(({palette, ...theme}) => ({
    card: {
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

    const classes = useStyles();

    const {body, header} = useTabs([
        {
            id: 'PERIODES',
            title: 'Periodes',
            body:
                <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Card className={clsx("text-center card", classes.card)}>
                            <div className="card-header flex-column items-center p-3 card-header-highlighted">
                                <span className="text-16">2 - 12 juli 2021</span>
                                <span className="text-small">met overnachting</span>
                            </div>
                            <Divider className="mb-2"/>
                            <CardContent className="pricing1__card-content">
                                <h1 className="mt-0 mb-4 text-24"> Nederlands / Engels</h1>
                                <Divider className="mb-2"/>
                                <div className="px-3 py-2">
                                    <Grid container spacing={2}>
                                        <Grid container item justifyContent="flex-end" md={7}><span
                                            className="text-20"><strong>Basisprijs</strong></span></Grid>
                                        <Grid container item justifyContent="flex-end" md={4}><span
                                            className="text-20"><strong>€ 740</strong></span></Grid>
                                        <Grid md={7} container item justifyContent="flex-end">Tijdelijke korting</Grid>
                                        <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                                        <Grid md={7} container item justifyContent="flex-end">Speciale korting</Grid>
                                        <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                                    </Grid>
                                </div>
                                <Button className="mt-4" color="primary" variant="contained">
                                    Inschrijven
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Card className={clsx("text-center card", classes.card)}>
                            <div className="card-header flex-column items-center p-3 card-header-highlighted">
                                <span className="text-16">2 - 12 augustus 2021</span>
                                <span className="text-small">met overnachting</span>
                            </div>
                            <Divider className="mb-2"/>
                            <CardContent className="pricing1__card-content">
                                <h1 className="mt-0 mb-4 text-24"> Nederlands / Engels</h1>
                                <Divider className="mb-2"/>
                                <div className="px-3 py-2">
                                    <Grid container spacing={2}>
                                        <Grid container item justifyContent="flex-end" md={7}><span
                                            className="text-20"><strong>Basisprijs</strong></span></Grid>
                                        <Grid container item justifyContent="flex-end" md={4}><span
                                            className="text-20"><strong>€ 690</strong></span></Grid>
                                        <Grid md={7} container item justifyContent="flex-end">Tijdelijke korting</Grid>
                                        <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                                        <Grid md={7} container item justifyContent="flex-end">Speciale korting</Grid>
                                        <Grid md={4} container item justifyContent="flex-end">-€20</Grid>
                                    </Grid>
                                </div>
                                <Button className="mt-4" color="primary" variant="contained">
                                    Inschrijven
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        }, {
            id: 'REDUCTIONS',
            title: 'Kortingen',
            body:
                <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Card className="py-8 px-6 card">
                            <h4 className="text-gray">Tijdelijke korting</h4>
                            <p className="m-0">Schrijf in voor 1 februari en geniet van 20 euro korting</p>
                        </Card>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}/>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Card className="py-8 px-6 card">
                            <h4 className="text-gray">Speciale korting</h4>
                            <p className="m-0">€ 20 bij het aanbrengen van een nieuwe leerling, onder de volgende voorwaarden: </p>
                            <ul>
                                <li>Uw kind is zelf ingeschreven.</li>
                                <li>De nieuw aangebrachte leerling heeft nog nooit een stage bij Loppem Conversa gevolgd.</li>
                                <li>De nieuw aangebrachte leerling behoort niet tot hetzelfde gezin (dus inwonend op hetzelfde adres).
                                </li>
                                <li>U vermeldt de naam van deze leerling duidelijk in het inschrijvingsformulier op de website in het
                                    daartoe bestemde vakje.
                                </li>
                                <li>U kunt elkaar niet wederzijds aanbrengen.</li>
                            </ul>
                            <p> Deze korting wordt pas toegekend en <strong>terugbetaald NA de stage </strong>.</p>
                        </Card>
                    </Grid>

                </Grid>
        },
        {
            id: 'DETAILS',
            title: 'Details',
            'body':
                <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Card className="py-8 px-6 card">
                            <h4 className="text-gray"><EuroIcon fontSize="small"/> Hoe betalen?</h4>
                            <p className="m-0">U betaalt het voorschot onmiddellijk na de inschrijving en het saldo voor één juni
                                2021. U kan verschillende kortingen combineren tot een maximum van 40 euro per inschrijving.
                                Sommige ziekenfondsen komen tussenbeide in de inschrijvingskosten. Informeer bij uw ziekenfonds. Voor
                                leerlingen tot 12 jaar wordt een fiscaal attest voor opvang opgeleverd.</p>
                        </Card>
                    </Grid>
                </Grid>
        }
    ])

    return (
        <div className="section section-pricing1" id="pricing1">
            <div className="container">
                <div className="mb-6">
                    <h2>Onze prijzen</h2>
                </div>
                {header}
                {body}
            </div>
        </div>
    )
        ;
};

export default Pricing1;

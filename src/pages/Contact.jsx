import React from "react";
import {Button, Card, Grid, TextField} from "@material-ui/core";
import ContactMap1 from "../sections/ContactMap1";

const Contact = () => {
    return (
        <section className="section" id="contact">
            <div className="container">
                <div className="section__header">
                    <h2>Contactinformatie</h2>
                </div>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <Card className="py-10 px-6" elevation={3}>
                            <Grid container spacing={3}>
                                <Grid container item md={4} justify="flex-end">Correspondent:</Grid>
                                <Grid container item md={8}>Thibault Leemans</Grid>
                                <Grid container item md={4} justify="flex-end">Emailadres:</Grid>
                                <Grid container item md={8}>info@loppemconversa.be</Grid>
                                <Grid container item md={4} justify="flex-end">Gsm:</Grid>
                                <Grid container item md={8}>0478 51 93 44 <br/> (bij voorkeur buiten de kantooruren)</Grid>
                                <Grid container item md={4} justify="flex-end">Naam vereniging:</Grid>
                                <Grid container item md={8}>VZW Taalstages CV</Grid>
                                <Grid container item md={4} justify="flex-end">KBO:</Grid>
                                <Grid container item md={8}>0714.900.490</Grid>
                                <Grid container item md={4} justify="flex-end">Maatschappelijke zetel:</Grid>
                                <Grid container item md={8}>Koolskampstraat 37 <br/> 8820 Torhout</Grid>
                                <Grid container item md={4} justify="flex-end">Adres van de stage:</Grid>
                                <Grid container item md={8}>Abdijschool van Zevenkerken < br/> Zevenkerken 4 < br/> 8200 Brugge</Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <ContactMap1
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div className="h-full"/>}
                            containerElement={<div className="h-full"/>}
                            mapElement={<div className="h-full"/>}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <Card className="py-10 px-6" elevation={3}>
                            <h3>Contacteer ons</h3>
                            <form>
                                <TextField
                                    className="mb-4"
                                    label="Your Name"
                                    placeholder="First Name"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mb-4"
                                    label="Your Email"
                                    placeholder="Your Email"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mb-4"
                                    label="Message"
                                    placeholder="Message"
                                    size="small"
                                    multiline
                                    rows={8}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button className="w-full" variant="contained" color="primary">
                                    SEND MESSAGE
                                </Button>
                            </form>
                        </Card>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Card className="py-10 px-6" elevation={3}>
                            <h3>Contacteer een kennis</h3>
                            <form>
                                <TextField
                                    className="mb-4"
                                    label="Your Name"
                                    placeholder="First Name"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mb-4"
                                    label="Your Email"
                                    placeholder="Your Email"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mb-4"
                                    label="Message"
                                    placeholder="Message"
                                    size="small"
                                    multiline
                                    rows={8}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button className="w-full" variant="contained" color="primary">
                                    SEND MESSAGE
                                </Button>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </section>
    );
};

export default Contact;

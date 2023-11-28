import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Card, Grid,} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ScrollTo from "../common/ScrollTo";
import "./pricing.css"
import {Trans, useTranslation} from "react-i18next";

const Pricing = () => {
  const {t} = useTranslation();
  const [expanded, setExpanded] = React.useState('accordion-1');

  const accordions = [
    {
      id: "accordion-1",
      summary: t("pricing.accordion.1.summary"),
      details: [
        {
          title: t("pricing.accordion.1.details.title.1"),
          text: t("pricing.accordion.1.details.text.1")
        },
        {
          title: t("pricing.accordion.1.details.title.2"),
          text: t("pricing.accordion.1.details.text.2")
        },
        {
          title: t("pricing.accordion.1.details.title.3"),
          text: t("pricing.accordion.1.details.text.3")
        }
      ]
    },
    {
      id: "accordion-2",
      summary: t("pricing.accordion.2.summary"),
      details: [
        {
          title: t("pricing.accordion.2.details.title.1"),
          text: <Trans i18nKey="pricing.accordion.2.details.text.1" />
        },
        {
          title: t("pricing.accordion.2.details.title.2"),
          text: <Trans i18nKey="pricing.accordion.2.details.text.2" />
        },
        {
          title: t("pricing.accordion.2.details.title.3"),
          text: <Trans i18nKey="pricing.accordion.2.details.text.3" />
        },
        {
          title: t("pricing.accordion.2.details.title.4"),
          text: <Trans i18nKey="pricing.accordion.2.details.text.4" />
        }
      ]
    },
    {
      id: "accordion-3",
      summary: t("pricing.accordion.3.summary"),
      details: [
        {
          title: t("pricing.accordion.3.details.title.1"),
          text: t("pricing.accordion.3.details.text.1")
        },
        {
          title: t("pricing.accordion.3.details.title.2"),
          text: t("pricing.accordion.3.details.text.2")
        },
        {
          title: t("pricing.accordion.3.details.title.3"),
          text: t("pricing.accordion.3.details.text.3")
        },
      ]
    }
  ]

  const cardContent = [
    {
      language: t("pricing.card.camp.content.language.1"),
      period: t("pricing.card.camp.content.period.1"),
      available: t("pricing.card.camp.content.available.1"),
    },
    {
      language: t("pricing.card.camp.content.language.2"),
      period: t("pricing.card.camp.content.period.2"),
      available: t("pricing.card.camp.content.available.2"),
    },
    {
      language: t("pricing.card.camp.content.language.3"),
      period: t("pricing.card.camp.content.period.3"),
      available: t("pricing.card.camp.content.available.3"),
    },
    {
      language: t("pricing.card.camp.content.language.4"),
      period: t("pricing.card.camp.content.period.4"),
      available: t("pricing.card.camp.content.available.4"),
    }
  ]

  return (
    <div className="section" id="pricing">
      <div className="container">
        <Card className="card-container">
          <h1>{t("pricing.title")}</h1>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={5}>
              {cardContent.map((element, i) =>
                <div key={i} className="card card-camp">
                  <Grid container>
                    <Grid item xs={9} className="card-camp-grid">
                      <Grid container columnSpacing={2}>
                        <Grid item xs={4}>
                          <p className="card-camp-label">{t("pricing.card.camp.label.language")}</p>
                        </Grid>
                        <Grid item xs={8}>
                          <p className="card-camp-content">{element.language}</p>
                        </Grid>
                        <Grid item xs={4}>
                          <p className="card-camp-label">{t("pricing.card.camp.label.period")}</p>
                        </Grid>
                        <Grid item xs={8}>
                          <p className="card-camp-content">{element.period}</p>
                        </Grid>
                        <Grid item xs={5}>
                          <p className="card-camp-label">{t("pricing.card.camp.label.available")}</p>
                        </Grid>
                        <Grid item xs={7}>
                          <p className="card-camp-content"><CheckIcon color={element.available}/></p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={3}>
                      <div className="card-header-price">
                        {t("pricing.card.camp.label.price")}
                      </div>
                      <ScrollTo to="inscription">
                        <div className="card-button-price">
                          {t("pricing.card.camp.label.enroll")}
                        </div>
                      </ScrollTo>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
            <Grid item sm={7}>
              <div className="pricing-content">
                {accordions.map((accordion, i) =>
                  <Accordion
                    key={i}
                    className="accordion card"
                    onChange={(e, expanded) =>
                      expanded ? setExpanded(accordion.id) : setExpanded(null)
                    }
                    expanded={expanded === accordion.id}
                  >
                    <AccordionSummary className="accordion-summary">
                      {accordion.summary}
                    </AccordionSummary>
                    <AccordionDetails className="accordion-details">
                      {accordion.details.map((detail, j) =>
                        <div key={j}>
                          <h4>{detail.title}</h4>
                          <div className="vacations-content">
                            {detail.text}
                          </div>
                        </div>
                      )}
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  )
    ;
};

export default Pricing;

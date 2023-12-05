import React from "react";
import {Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import useTabs from "./useTabs";
import {Trans, useTranslation} from "react-i18next";
import ImageCarousel from "./ImageCarousel";
import "./vacations.css";
import VacationDetails from "./VacationDetails";
import WhereDetails from "./WhereDetails";

const Vacations = () => {
    const {t} = useTranslation();
    const {bodyActiveTab, tabTitles} = useTabs(
      [{
        id: 'vacations-what',
        title: t("vacations.what.title"),
        body: {
          sections:
            [
              {
                title: t("vacations.what.section.one.title"),
                text: <Trans i18nKey="vacations.what.section.one.text" components={{enter: <br/>}}/>
              },
              {
                title: t("vacations.what.section.two.title"),
                text: <Trans i18nKey="vacations.what.section.two.text" components={{enter: <br/>}}/>
              }
            ],
          dialog: <VacationDetails/>
        },
      }, {
        id: 'vacations-where',
        title: t("vacations.where.title"),
        body: {
          sections:
            [
              {
                title: t("vacations.where.section.one.title"),
                text: t("vacations.where.section.one.text"),
              },
              {
                title: t("vacations.where.section.two.title"),
                text: t("vacations.where.section.two.text"),
              }
            ],
          dialog: <WhereDetails/>
        },
      }, {
        id: 'vacations-why',
        title: t("vacations.why.title"),
        body: {
          sections: [
            {
              title: t("vacations.why.section.one.title"),
              text: t("vacations.why.section.one.text"),
            },
            {
              title: t("vacations.why.section.two.title"),
              text: t("vacations.why.section.two.text"),
            },
          ]
        },
      }, {
        id: 'vacations-who',
        title: t("vacations.who.title"),
        body: {
          sections:
            [
              {
                title: t("vacations.who.section.one.title"),
                text: <Trans i18nKey="vacations.who.section.one.text" />
              },
              {
                title: t("vacations.who.section.two.title"),
                text: <Trans i18nKey="vacations.who.section.two.text" />
              },
            ]
        },
      },

      ]
    );

    return (
      <div className="section" id="vacations">
        <div className="container">
          <Card className="card-container">
            <h1>{t("vacations.title")}</h1>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <div id="vacations-grid" className="vacations-grid">
                  {tabTitles}
                </div>
                <CardContent>
                  {bodyActiveTab?.sections.map((section, i) =>
                    <div key={i}>
                      <h4 className="vacations-title">{section.title}</h4>
                      <p className="vacations-content">{section.text}</p>
                    </div>
                  )}
                  <div className="vacations-details-button-container">
                    {bodyActiveTab?.dialog}
                  </div>
                </CardContent>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="image-grid">
                  <ImageCarousel/>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
;

export default Vacations;

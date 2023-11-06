import React from "react";
import {Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import useTabs from "./useTabs";
import {useTranslation} from "react-i18next";
import ImageCarousel from "./ImageCarousel";
import "./vacations.css";

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
                text: t("vacations.what.section.one.text"),
              },
              {
                title: t("vacations.what.section.two.title"),
                text: t("vacations.what.section.two.text"),
              },
              {
                title: t("vacations.what.section.three.title"),
                text: t("vacations.what.section.three.text"),
              }
            ],
        },
      }, {
        id: 'vacations-when',
        title: t("vacations.when.title"),
        body: {
          sections:
            [
              {
                title: t("vacations.when.section.one.title"),
                text: t("vacations.when.section.one.text"),
              },
              {
                title: t("vacations.when.section.two.title"),
                text: t("vacations.when.section.two.text"),
              },
            ]
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
              },
              {
                title: t("vacations.where.section.three.title"),
                text: t("vacations.where.section.three.text"),
              },
              {
                title: t("vacations.where.section.four.title"),
                text: t("vacations.where.section.four.text"),
              }
            ]
        },
      }, {
        id: 'vacations-why',
        title: t("vacations.why.title"),
        body: {
          sections: [{
            title: t("vacations.why.section.one.title"),
            text: t("vacations.why.section.one.text"),
          },
          ]
        }
      }]
    );

    return (
      <div className="vacations" id="vacations">
        <div className="container">
          <Card className="vacations-card card-container">
            <Grid container>
              <Grid item xs={6}>
                <div id="vacations-grid" className="vacations-grid">
                  {tabTitles}
                </div>
                <CardContent>
                  {bodyActiveTab?.sections.map((section, i) =>
                    <div key={i}>
                      <h4>{section.title}</h4>
                      <p className="vacations-content">{section.text}</p>
                    </div>
                  )}
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <ImageCarousel/>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
;

export default Vacations;

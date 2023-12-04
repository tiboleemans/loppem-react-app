import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Card, Grid,} from "@mui/material";
import "./practicalInfo.css"
import {Trans, useTranslation} from "react-i18next";
import ScrollTo from "../common/ScrollTo";

const PracticalInfo = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const {t} = useTranslation();

  const categoryList = [
    {
      title: t("practical.tab.1.title"),
      faqs: [
        {
          question: t("practical.tab.1.content.card.1.title"),
          answer: <Trans i18nKey="practical.tab.1.content.card.1.body" components={{scrollTo: <ScrollTo to="inscription" className="link"/>, header: <h3/>}}/>,
        },
        {
          question: t("practical.tab.1.content.card.2.title"),
          answer: <Trans i18nKey="practical.tab.1.content.card.2.body" components={{header: <h3/>}}/>,
        },
        {
          question: t("practical.tab.1.content.card.3.title"),
          answer: <Trans i18nKey="practical.tab.1.content.card.3.body" components={{header: <h3/>}}/>,
        },
        {
          question: t("practical.tab.1.content.card.4.title"),
          answer: t("practical.tab.1.content.card.4.body"),
        }
      ]
    },
    {
      title: t("practical.tab.2.title"),
      faqs: [
        {
          question: t("practical.tab.2.content.card.1.title"),
          answer: t("practical.tab.2.content.card.1.body"),
        },
        {
          question: t("practical.tab.2.content.card.2.title"),
          answer: t("practical.tab.2.content.card.2.body"),
        },
        {
          question: t("practical.tab.2.content.card.3.title"),
          answer: t("practical.tab.2.content.card.3.body"),
        },
        {
          question: t("practical.tab.2.content.card.4.title"),
          answer: t("practical.tab.2.content.card.4.body"),
        },
        {
          question: t("practical.tab.2.content.card.5.title"),
          answer: t("practical.tab.2.content.card.5.body"),
        },
        {
          question: t("practical.tab.2.content.card.6.title"),
          answer: t("practical.tab.2.content.card.6.body"),
        },
        {
          question: t("practical.tab.2.content.card.7.title"),
          answer: t("practical.tab.2.content.card.7.body"),
        }
      ]
    },
    {
      title: t("practical.tab.3.title"),
      faqs: [
        {
          question: t("practical.tab.3.content.card.1.title"),
          answer: t("practical.tab.3.content.card.1.body"),
        }
      ]
    },
    {
      title: t("inscription.extra.label.conditions.general.dialog.title"),
      faqs: [
        {
          question: t("inscription.extra.label.conditions.general.dialog.1.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.1.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.general.dialog.2.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.2.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.general.dialog.3.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.3.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.general.dialog.4.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.4.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.general.dialog.5.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.5.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.general.dialog.6.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.6.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.general.dialog.7.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.7.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.general.dialog.8.subtitle"),
          answer: t("inscription.extra.label.conditions.general.dialog.8.paragraph"),
        }
      ]
    },
    {
      title: t("inscription.extra.label.conditions.privacy.dialog.title"),
      faqs: [
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.1.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.1.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.2.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.2.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.3.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.3.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.4.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.4.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.5.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.5.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.6.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.6.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.7.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.7.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.8.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.8.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.9.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.9.paragraph"),
        },
        {
          question: t("inscription.extra.label.conditions.privacy.dialog.10.subtitle"),
          answer: t("inscription.extra.label.conditions.privacy.dialog.10.paragraph"),
        }
      ]
    },
    {
      title: t("inscription.extra.label.pictures.dialog.title"),
      faqs: [
        {
          question: t("inscription.extra.label.pictures.dialog.1.subtitle"),
          answer: t("inscription.extra.label.pictures.dialog.1.paragraph"),
        },
        {
          question: t("inscription.extra.label.pictures.dialog.2.subtitle"),
          answer: t("inscription.extra.label.pictures.dialog.2.paragraph"),
        },
        {
          question: t("inscription.extra.label.pictures.dialog.3.subtitle"),
          answer: t("inscription.extra.label.pictures.dialog.3.paragraph"),
        },
        {
          question: t("inscription.extra.label.pictures.dialog.4.subtitle"),
          answer: t("inscription.extra.label.pictures.dialog.4.paragraph"),
        },
        {
          question: t("inscription.extra.label.pictures.dialog.5.subtitle"),
          answer: t("inscription.extra.label.pictures.dialog.5.paragraph"),
        },
        {
          question: t("inscription.extra.label.pictures.dialog.6.subtitle"),
          answer: t("inscription.extra.label.pictures.dialog.6.paragraph"),
        }
      ]
    }
  ];

  return (
    <div className="section" id="info">
      <div className="container">
        <Card className="card-container">
          <h1>{t("practical.title")}</h1>
          <div className="practical-info-grid">
            <Grid container spacing={3}>
              <Grid item md={3} sm={4} xs={12}>
                <div>
                  {categoryList.map((item, ind) => (
                    <div key={ind}
                         className={`card info-index-table ${tabIndex === ind ? 'active' : ''}`}
                         onClick={() => {
                           setTabIndex(ind);
                           setExpandedIndex(0);
                         }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid item md={9} sm={8} xs={12}>
                {<div className="practical-info-content">
                  {categoryList[tabIndex].faqs.map((faq, ind) => (
                    <Accordion
                      key={ind}
                      className="accordion card"
                      onChange={(e, expanded) =>
                        expanded ? setExpandedIndex(ind) : setExpandedIndex(null)
                      }
                      expanded={expandedIndex === ind}
                    >
                      <AccordionSummary className="accordion-summary">
                        {faq.question}
                      </AccordionSummary>
                      <AccordionDetails className="accordion-details">
                        {faq.answer}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
                }
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PracticalInfo;

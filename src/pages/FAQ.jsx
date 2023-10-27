import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(({palette, ...theme}) => ({
  bgLightGray: {
    background: "rgba(0,0,0,0.05)",
  },
}));

const FAQ = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const classes = useStyles();

  const categoryList = [
    {
      title: "Inschrijvingen",
      faqs: [
        {
          question: "Hoe inschrijven?",
          answer: "Klik op \"inschrijven\" op de navigatiebalk van onze website en vul het formulier in. Zorg ervoor dat u alle verplichte velden hebt ingevuld en het cursusreglement hebt aanvaard. In geval van vragen: contacteer ons\n" +
            "- via e-mail: info@loppemconversa.be\n" +
            "- telefonisch: 0478/51.93.44\n" +
            "Na de inschrijving krijgt u een melding en een bevestigingsmail dat de inschrijving werd geregistreerd."
        },
        {
          question: "Wanneer betalen?",
          answer: "U betaalt het voorschot binnen de tien dagen na inschrijving. Het saldo (€ 400) wordt volstort vóór 1 juni 2020. Wanneer u na 1 juni 2020 inschrijft, betaalt u het volledige bedrag onmiddellijk.\n" +
            "Ons rekeningnummer is BE16 0018 5319 2474. Om te weten welk voorschot u dient te betalen, afhankelijk van een mogelijke korting, klikt u op \"informatie\" in de navigatiebalk van onze website of klikt u op de vraag hieronder."
        },
        {
          question: "Heb ik recht op bepaalde kortingen?",
          answer: "SPECIALE KORTING:\n" +
            "€ 20 bij het aanbrengen van een nieuwe leerling, onder de volgende voorwaarden:\n" +
            "Uw kind is zelf ingeschreven.\n" +
            "De nieuw aangebrachte leerling heeft nog nooit een stage bij Loppem Conversa gevolgd en behoort niet tot hetzelfde gezin (dus inwonend op hetzelfde adres).\n" +
            "U vermeldt de naam van deze leerling duidelijk in het inschrijvingsformulier op de website in het daartoe bestemde vakje.\n" +
            "U kunt elkaar niet wederzijds aanbrengen.\n" +
            "\n" +
            "Deze korting wordt pas toegekend en terugbetaald NA de stage."
        }
      ]
    },
    {
      title: "Stage",
      faqs: [
        {
          question: "Voor welke stages is er plaats?",
          answer: "Onze stages gaan enkel door in de zomervakantie tussen 2 - 12 juli & 2 - 12 augustus \n" +
            "In het inschrijvingsformulier worden de keuzes van de beschikbare stages getoond. Zolang de stageperiode in het inschrijvingsformulier zichtbaar is, betekent dit dat er plaats is voor deze stage."
        }
      ]
    },
    {
      title: "Administratie",
      faqs: [
        {
          question: "Komt mijn ziekenfonds tussen?",
          answer: "Sommige ziekenfondsen bieden een tegemoetkoming aan. Informeer bij uw ziekenfonds. Voor leerlingen tot 12 jaar wordt een fiscaal attest voor opvang opgeleverd."
        }
      ]
    },
  ];

  return (
    <section className="section" id="faq1">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-normal text-44 mt-0">Veel gestelde vragen</h1>
          <p className="mb-16">
            Hieronder vindt u het antwoord op veelgestelde vragen.
          </p>
        </div>

        <Grid container spacing={3}>
          <Grid item md={3} sm={4} xs={12}>
            <div>
              {categoryList.map((item, ind) => (
                <div
                  key={ind}
                  className={clsx({
                    "px-4 py-2 mb-3 text-center border-radius-8 hover-bg-primary cursor-pointer": true,
                    "bg-primary text-white": tabIndex === ind,
                    [classes.bgLightGray]: true,
                  })}
                  onClick={() => {
                    setTabIndex(ind);
                    setExpandedIndex(null);
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </Grid>
          <Grid item md={9} sm={8} xs={12}>
            {<div>
              {categoryList[tabIndex].faqs.map((faq, ind) => (
                <Accordion
                  key={ind}
                  className={clsx({
                    "border-radius-4 mb-6": true,
                    "elevation-z3": expandedIndex === ind,
                    "box-shadow-none": expandedIndex !== ind,
                  })}
                  onChange={(e, expanded) =>
                    expanded ? setExpandedIndex(ind) : setExpandedIndex(null)
                  }
                  expanded={expandedIndex === ind}
                >
                  <AccordionSummary
                    className={clsx({
                      "hover-bg-primary": true,
                      [classes.bgLightGray]: true,
                      "bg-primary text-white": expandedIndex === ind,
                    })}
                  >
                    {faq.question}
                  </AccordionSummary >
                  <AccordionDetails>
                    <p>
                      {faq.answer}
                    </p>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
            }
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default FAQ;

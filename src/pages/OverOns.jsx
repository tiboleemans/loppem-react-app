import React from "react";
import {Avatar, Card, Grid} from "@mui/material";

const OverOns = () => {
  const cardList = [
    {
      title: "Kwaliteit & ambiance gegarandeerd",
      text:
        "Lorem ipsum dolor sit amet, vim quidam blandit voluptaria no, has eu lorem convenire incorrupte. Vis mutat altera percipit ad.",
      user: {
        imageUrl: "./assets/images/face-1.jpg",
        name: "Dan Shwartz",
        position: "Software engineer",
      },
    },
    {
      title: "Prachtig domein",
      text:
        "Lorem ipsum dolor sit amet, vim quidam blandit voluptaria no, has eu lorem convenire incorrupte. Vis mutat altera percipit ad.",
      user: {
        imageUrl: "./assets/images/face-4.jpg",
        name: "Hellen Miller",
        position: "Accountant",
      },
    },
    {
      title: "Ongelooflijk team met passie",
      text:
        "Lorem ipsum dolor sit amet, vim quidam blandit voluptaria no, has eu lorem convenire incorrupte. Vis mutat altera percipit ad.",
      user: {
        imageUrl: "./assets/images/face-3.jpg",
        name: "Jane Guzmann",
        position: "CEO",
      },
    },
    {
      title: "Relatief goedkoper",
      text:
        "Lorem ipsum dolor sit amet, vim quidam blandit voluptaria no, has eu lorem convenire incorrupte. Vis mutat altera percipit ad.",
      user: {
        imageUrl: "./assets/images/face-2.jpg",
        name: "Anthony Leblanc",
        position: "ounder at Hereby",
      },
    },
  ];

  return (
    <div className="section bg-white" id="overons">
      <div className="container">
        <div className="section__header">
          <h2>Onze troeven</h2>
        </div>
        <Grid container spacing={4}>
          {cardList.map((card, index) => (
            <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
              <Card className="py-8 px-6 card">
                <h4 className="text-gray">{card.title}</h4>
                <p>{card.text}</p>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar className="h-48 w-48" src={card.user.imageUrl} />
                  </Grid>
                  <Grid item>
                    <strong>{card.user.name}</strong>
                    <p className="m-0"> {card.user.position} </p>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default OverOns;

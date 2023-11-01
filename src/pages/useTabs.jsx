import React, {useEffect, useState} from 'react';
import {lighten} from '@mui/material/styles';
import {styled} from "@mui/system";

const PREFIX = 'MyTabs';

const classes = {
  buttonGroupBG: `${PREFIX}-buttonGroupBG`,
  tab: `${PREFIX}-tab`
}
const StyledTabs = styled('div')(({theme}) => ({
  [`&.${classes.buttonGroupBG}`]: {
    // ".border-radius-8": {borderRadius: "8px !important", overflow: "hidden"},
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: "pointer",
    background: lighten(`${theme.palette.primary.light}`, 0.5),
    '&.active': {
      background: `${theme.palette.primary.main}`,
    },
    '&>div': {
      transition: 'all 250ms ease',
      '&:hover': {
        background: `${theme.palette.primary.main}`,
        color: `${theme.palette.primary.contrastText}`,
        borderRadius: 8,
      },
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        width: '100%',
      },
    },
  },
  [`&.${classes.tab}`]: {
    padding: "0.75rem 1.5rem",
  }
}));

const TabsContainer = ({tabs, activeTab, setActiveTabId}) => <div>
  {tabs.map((tab, index) => (
    <div id="tab-div" className="tab-div" key={index}>
      <StyledTabs onClick={() => setActiveTabId(tab.id)} className={`${classes.buttonGroupBG} ${activeTab?.id === tab.id ? 'active' : ''}`}>
        <StyledTabs className={classes.tab}>
          {tab.title}
        </StyledTabs>
      </StyledTabs>
    </div>
  ))}
</div>;

const useTabs = (tabs) => {
  const [activeTabId, setActiveTabId] = useState();
  useEffect(() => {
    if (!activeTabId) {
      setActiveTabId(tabs[0].id);
    }
  }, [activeTabId, setActiveTabId]);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return {
    activeTabId,
    tabTitles: <TabsContainer tabs={tabs} activeTab={activeTab} setActiveTabId={setActiveTabId}/>, // [link, link, link]
    bodyActiveTab: activeTabId ? activeTab.body : null, // Geselecteerde bodyActiveTab obv tabIndex
  };
};

export default useTabs;

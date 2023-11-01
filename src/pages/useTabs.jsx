import React, {useEffect, useState} from 'react';
import {lighten} from '@mui/material/styles';
import {styled} from "@mui/system";

const PREFIX = 'MyTabs';

const classes = {
  buttonGroupBG: `${PREFIX}-buttonGroupBG`
}
const StyledTabs = styled('div')(({theme}) => ({
  [`&.${classes.buttonGroupBG}`]: {
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
}));

const TabsContainer = ({tabs, selectedTab, setSelectedTabId}) => <div>
  {tabs.map((tab, index) => (
    <div id="tab-div" className="tab-div" key={index}>
      <StyledTabs onClick={() => setSelectedTabId(tab.id)}
           className={`lex flex-wrap items-center border-radius-8 ${classes.buttonGroupBG} ${selectedTab?.id === tab.id ? 'active' : ''}`}>
        <div
          className="px-6 py-2 cursor-pointer"
        >
          {tab.title}
        </div>
      </StyledTabs>
    </div>
  ))}
</div>;

const useTabs = (tabs) => {
  const [selectedTabId, setSelectedTabId] = useState();
  useEffect(() => {
    if (!selectedTabId) {
      setSelectedTabId(tabs[0].id);
    }
  }, [selectedTabId, setSelectedTabId]);

  const selectedTab = tabs.find((tab) => tab.id === selectedTabId);

  return {
    selectedTabId,
    header: <TabsContainer tabs={tabs} selectedTab={selectedTab} setSelectedTabId={setSelectedTabId}/>, // [link, link, link]
    body: selectedTabId ? selectedTab.body : null, // Geselecteerde body obv tabIndex
  };
};

export default useTabs;

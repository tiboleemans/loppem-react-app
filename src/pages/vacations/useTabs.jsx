import React, {useEffect, useState} from 'react';

const TabsContainer = ({tabs, activeTab, setActiveTabId}) => <div>
  {tabs.map((tab, index) => (
    <div id="tab-div" className="tab-div" key={index}>
      <div onClick={() => setActiveTabId(tab.id)} className={`vacations-tabs ${activeTab?.id === tab.id ? 'active' : ''}`}>
        {tab.title}
      </div>
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

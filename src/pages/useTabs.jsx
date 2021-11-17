import React, {useState, useEffect} from "react";

const TabsContainer = ({ tabs, selectedTab }) => <div>
  {tabs.map((tab) => (
    <div className={`lex flex-wrap items-center border-radius-8 ${selectedTab === tab.id ? 'active' : ''}`}>
      {tab.title}
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
    header: <TabsContainer tabs={tabs} selectedTab={selectedTab} />, // [link, link, link]
    body: selectedTabId ? selectedTab.body : null // Geselecteerde body obv tabIndex
  }
};

export default useTabs;

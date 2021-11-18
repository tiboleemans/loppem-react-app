import React, {useState, useEffect} from "react";

const TabsContainer = ({ tabs, selectedTab, setSelectedTabId }) => <div>
  {tabs.map((tab) => (
    <div onClick={() => setSelectedTabId(tab.id)} className={`lex flex-wrap items-center border-radius-8 ${selectedTab === tab.id ? 'active' : ''}`}>
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
    header: <TabsContainer tabs={tabs} selectedTab={selectedTab} setSelectedTabId={setSelectedTabId}/>, // [link, link, link]
    body: selectedTabId ? selectedTab.body : null // Geselecteerde body obv tabIndex
  }
};

export default useTabs;

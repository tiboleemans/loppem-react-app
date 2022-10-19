import React, {useState, useEffect} from "react";
import {lighten, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(({
                                  palette,
                                  ...theme
                              }) => ({
    buttonGroupBG: {
        background: lighten(palette.primary.light, 0.9),
        "&>div": {
            transition: "all 250ms ease",
            "&:hover": {
                background: palette.primary.main,
                color: palette.primary.contrastText,
                borderRadius: 8,
            },
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
                width: "100%",
            },
        },
    },
}));

const TabsContainer = ({tabs, selectedTab, setSelectedTabId, classes}) => <div>
    {tabs.map((tab, index) => (
        <div className="inline-block mb-10" key={index}>
            <div onClick={() => setSelectedTabId(tab.id)}
                 className={`lex flex-wrap items-center border-radius-8 ${classes.buttonGroupBG} ${selectedTab === tab.id ? 'active' : ''}`}>
                <div
                    className="px-6 py-2 cursor-pointer"
                >
                    {tab.title}
                </div>
            </div>
        </div>
    ))}
</div>;

const useTabs = (tabs) => {
    const [selectedTabId, setSelectedTabId] = useState();
    const classes = useStyles();
    useEffect(() => {
        if (!selectedTabId) {
            setSelectedTabId(tabs[0].id);
        }
    }, [selectedTabId, setSelectedTabId]);

    const selectedTab = tabs.find((tab) => tab.id === selectedTabId);

    return {
        selectedTabId,
        header: <TabsContainer tabs={tabs} selectedTab={selectedTab} setSelectedTabId={setSelectedTabId} classes={classes}/>, // [link, link, link]
        body: selectedTabId ? selectedTab.body : null // Geselecteerde body obv tabIndex
    }
};

export default useTabs;

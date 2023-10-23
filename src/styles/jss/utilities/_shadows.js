import { styled } from "@mui/system";

export const shadowStyles = styled(({ palette, ...theme }) => ({
  "@global": {
    ...generateShadows(theme),
  },
}));

const generateShadows = (theme) => {
  const classList = {};

  theme.shadows.map((shadow, ind) => {
    classList[`.elevation-z${ind}`] = {
      boxShadow: `${shadow} !important`,
    };
  });

  return classList;
};

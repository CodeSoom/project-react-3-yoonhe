import styled from '@emotion/styled';

import { getMediaQuery } from '../../utils';

const breakpoints = [768];
const mediaQuery = getMediaQuery(breakpoints);

const CenterSection = styled.section(({ fullHeight }) => ({
  padding: '4rem 2rem',
  marginLeft: '250px',
  height: fullHeight && '100%',
  [mediaQuery[768]]: {
    marginLeft: 'auto',
    padding: '6rem 1.1rem 2rem',
  },
}));

export default CenterSection;

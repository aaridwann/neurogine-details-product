import { render } from '@testing-library/react-native';

import BadgeComponent from './Badge.component';

const configs = [
  {
    desc: 'should render with default values',
    props: {},
  },
  {
    desc: 'should render with text props',
    props: {
      text: 'Product',
    },
  },
  {
    desc: 'should render with backgroundColor props',
    props: {
      backgroundColor: '#FF0000',
    },
  },
  {
    desc: 'should render with color props',
    props: {
      color: '#FF0000',
    },
  },
];

describe('Badge Component Snapshot', () => {
  it.each(configs)('$desc', ({ props }) => {
    const { toJSON } = render(
      <BadgeComponent
        text="Product"
        {...props}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
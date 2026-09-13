import { describe, expect, it, test } from 'vitest';

import BadgeComponent from './Badge.component';

const configs = [
  {
    props: {},
    desc: 'should render witch default values',
  },
  {
    props: { text: 'Product' },
    desc: 'should render with text props',
  },
  {
    props: { backgroundColor: '#FF0000' },
    desc: 'should render with backgroundColor props',
  },
  {
    props: { color: '#FF0000' },
    desc: 'should render with color props',
  },
  {
    props: { style: { margin: 10 } },
    desc: 'should render with style props',
  },
];

describe('Badge Component', () => {
  configs.map(({ props, desc }) => (
    it(desc, () => {

      render(<BadgeComponent {...props} text="Product" />);
    })
  ));
});
// test.each(configs)(`should render ${configs.desc}`, ({ props }) => {
//   expect(<BadgeComponent {...props} text="Product" />).toMatchSnapshot();
// });
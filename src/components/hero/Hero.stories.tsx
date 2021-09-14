import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Hero from './Hero';

export default {
  title: 'Example/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = args => <Hero {...args} />;

export const Index = Template.bind({});
Index.args = {
  title: 'Default Title',
  path: 'images/heros/hero-home.png',
  description:
    'This is a sample description for the hero component. Use it wisely.',
  backgroundColor: 'primary',
  // TODO: background images come from graphql how do we get those in stories?
  // backgroundImg: {heroImage},
  children: <p>Search Component (TBD)</p>,
};

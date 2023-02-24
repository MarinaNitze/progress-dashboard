import Hero from './Hero';
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Example/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = args => <Hero {...args} />;

export const Index = Template.bind({});
Index.args = {
  title: 'Default Title',
  path: 'images/heros/hero-home.png',
  backgroundColor: 'primary',
  children: <p>Search Component (TBD)</p>,
  alt: 'hero-home-image',
};

import Header from './Header';
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const headerLinks = [
  {
    to: '/topic',
    text: 'Topics',
  },
  {
    to: '/recommendations',
    text: 'Recommendations',
  },
  {
    to: '/compare',
    text: 'Compare',
  },
  {
    to: '/stories',
    text: 'Stories',
  },
  {
    to: '/search',
    text: 'Search',
    iconPath: 'images/header/search.svg',
    iconClassname: 'search-icon',
  },
];

export default {
  title: 'Example/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
  <Header headerLinks={headerLinks} />
);

export const Default = Template.bind({});
Default.args = {};

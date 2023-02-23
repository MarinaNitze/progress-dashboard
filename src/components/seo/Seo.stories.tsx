import React from 'react';
import Seo from './Seo';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Example/Seo',
  component: Seo,
  excludeStories: /.*Data$/,
} as ComponentMeta<typeof Seo>;

const Template: ComponentStory<typeof Seo> = args => <Seo {...args} />;

export const Default = Template.bind({});
Default.args = {
  description: 'A storybook implimentation for the Progress Dashboard website',
  lang: 'en',
  meta: [],
  keywords: ['test', 'storybook'],
  title: 'Progress Dashboard Storybook',
};

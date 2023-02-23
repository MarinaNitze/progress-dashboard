import Layout from './Layout';
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Example/Layout',
  component: Layout,
  excludeStories: /.*Data$/,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = args => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <h2>Default Layout child 1</h2>,
};

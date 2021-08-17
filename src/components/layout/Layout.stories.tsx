import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from './Layout';

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

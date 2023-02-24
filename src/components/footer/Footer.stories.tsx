import Footer from './Footer';
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Example/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Default = Template.bind({});
Default.args = {};

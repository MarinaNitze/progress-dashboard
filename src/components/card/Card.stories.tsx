import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from './Card';
import './Card.scss';

export default {
  title: 'Example/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => (
  <Card {...args}>
    <p>Card content</p>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  heading: 'Test heading',
};

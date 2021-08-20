import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import FeatureSection from './FeatureSection';

export default {
  title: 'Example/FeatureContainer',
  component: FeatureSection,
} as ComponentMeta<typeof FeatureSection>;

const Template: ComponentStory<typeof FeatureSection> = () => (
  <FeatureSection />
);

export const Default = Template.bind({});
Default.args = {};

import React from 'react';
import Table, { TableHeading } from './Table';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Recommendation } from '../../types/recommendation';

const columns: TableHeading<any>[] = [
  {
    dataKey: 'summary',
    sortable: true,
    heading: 'Recommendations',
  },
  {
    dataKey: 'about',
    sortable: true,
    heading: `What's needed (Time/Cost)`,
  },
  {
    dataKey: 'title',
    sortable: false,
    heading: 'Case study',
  },
];

const data: Partial<Recommendation>[] = [
  {
    about: 'Content1',
    summary: 'Start the background check process early',
    title: 'Title/URL1',
  },
  {
    about: 'ContentA',
    summary: 'Accept background checks electronically',
    title: 'Title/URL2',
  },
  {
    about: 'Content3',
    summary: 'Bring background check forms to orientation',
    title: 'Title/URL3',
  },
];

export default {
  title: 'Example/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const Index = Template.bind({});
Index.args = {
  columns,
  data,
};

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import CurvedButton from './index';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'CurvedButton',
  component: CurvedButton,
} as ComponentMeta<typeof CurvedButton>;

export const Primary: ComponentStory<typeof CurvedButton> = () => <CurvedButton>CurvedButton</CurvedButton>;
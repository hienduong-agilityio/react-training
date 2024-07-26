import type { Meta, StoryObj } from '@storybook/react';
import Chip, { CHIP_COLOR } from './index';

const meta = {
  title: 'Components/common/Chip',
  component: Chip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FireType: Story = {
  args: {
    label: 'fire',
    color: CHIP_COLOR.FIRE
  }
};

export const BugType: Story = {
  args: {
    label: 'bug',

    color: CHIP_COLOR.BUG
  }
};

export const WaterType: Story = {
  args: {
    label: 'water',
    color: CHIP_COLOR.WATER
  }
};

export const FlyingType: Story = {
  args: {
    label: 'flying',
    color: CHIP_COLOR.FLYING
  }
};

export const PoisonType: Story = {
  args: {
    label: 'poison',
    color: CHIP_COLOR.POISON
  }
};

export const RockType: Story = {
  args: {
    label: 'rock',
    color: CHIP_COLOR.ROCK
  }
};

export const GroundType: Story = {
  args: {
    label: 'ground',
    color: CHIP_COLOR.GROUND
  }
};

export const GhostType: Story = {
  args: {
    label: 'ghost',
    color: CHIP_COLOR.GHOST
  }
};

export const ElectricType: Story = {
  args: {
    label: 'electric',
    color: CHIP_COLOR.ELECTRIC
  }
};

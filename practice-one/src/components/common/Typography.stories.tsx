import { Story, Meta } from '@storybook/react';
import Text, { Props } from './Typography'; // Assuming 'Text.tsx' is in the same directory

export default {
	title: 'Typography/Text',
	component: Text,
} as Meta;

const Template: Story<Props> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
	content: 'Sample Text',
	fontSize: 'medium',
	fontWeight: 'normal',
	color: 'black',
};

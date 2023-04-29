import { Meta, Story } from "@storybook/react";
import GameItem, { GameItemProps } from "../../../../components/Molecules/GameItem";

export default {
    title: 'Components/Molecules/GameItem',
    component: GameItem
} as Meta;

const Template: Story<GameItemProps> = (args) => <GameItem {...args} />

export const Default = Template.bind({});

Default.args = {
    title: 'Super mech',
    category: 'Mobile',
    thumbnail:'/img/Thumbnail-1.png'
}

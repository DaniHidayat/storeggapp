import { Meta } from "@storybook/react";
import StepItem, { StepItemProps } from "../../../../components/Molecules/StepItem";

export default {
    title: 'Components/Molecules/StepItem',
    components: StepItem
} as Meta;

const Template = (args: StepItemProps) => <StepItem{...args} />

export const Default = Template.bind({});

Default.args = {
    title: '1. Start',
    icon: 'step1',
    desc1: 'Pilih salasatu games',
    desc2: 'yang ingin anda top up'


}
import type { Meta, StoryObj } from "@storybook/react";



import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../components/app/App";


const meta:Meta<typeof App> = {
  title: "App",
  component: App,
  parameters: {
    // layout: "centered",
  },
  
  tags: ["autodocs"],

  decorators: Story => <Provider store={store}>{Story()}</Provider>
  
} 

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleApp: Story = {
  
};
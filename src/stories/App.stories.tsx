import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";


import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../components/app/App";
import { AppWithProvider } from "../testComponents/helpFuction/providerDecorator";

const meta:Meta<typeof App> = {
  title: "App",
  component: AppWithProvider,
  parameters: {
    layout: "centered",
  },
  
  tags: ["autodocs"],

  
  
} 

export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleApp: Story = {
  
};
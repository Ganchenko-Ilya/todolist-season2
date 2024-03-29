import renderer from "react-test-renderer";

import { AppWithProvider } from "./helpFuction/providerDecorator";


test("test code Components", () => {
  const result = renderer.create(<AppWithProvider />).toJSON();
  expect(result).toMatchSnapshot();
});

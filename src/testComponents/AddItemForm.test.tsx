import renderer from "react-test-renderer";
import { InputAddItemForm } from "../components/otherComponents/inputAddItemForm/InputAddItemForm";




test("test code Components", () => {
  const result = renderer.create(<InputAddItemForm addItem={() => {}} helpText="add" />).toJSON();
  expect(result).toMatchSnapshot();
});
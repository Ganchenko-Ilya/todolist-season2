import renderer from "react-test-renderer";


import { EditableSpan } from "../components/otherComponents/editableSpan/EditableSpan";


test("test code Components", () => {
  const result = renderer.create(<EditableSpan editTitle={() => {}} title='text' />).toJSON();
  expect(result).toMatchSnapshot();
});
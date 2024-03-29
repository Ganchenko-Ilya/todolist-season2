import renderer from "react-test-renderer";


import { Task } from "../components/todolist/Task/Task";


test("test code Components", () => {
  const result = renderer.create(<Task deleteTask={() => {}} editTitle={() => {}} el={{id:'1',isDone:false,title:'css'} } onChangeStatus={() => {}} />).toJSON();
  expect(result).toMatchSnapshot();
});
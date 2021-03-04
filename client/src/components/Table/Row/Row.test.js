import React from "react";
import { shallow } from "enzyme";
import Row from "./Row";

describe("Row", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Row />);
    expect(wrapper).toMatchSnapshot();
  });
});

import * as React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MyInput from "./MyInput";

describe("MyInput", () => {
  it("should render correctly", () => {
    // MyInput 컴포넌트를 렌더링합니다.
    const wrapper = render(<MyInput label="test input" />);
    // wrapper.unmount() 함수를 호출해도 에러가 발생하지 않는지 확인합니다.
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const { getByRole } = render(
      <MyInput
        ref={ref}
        isClearable
        defaultValue="junior@nextui.org"
        label="test input"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(ref.current?.value)?.toBe("");
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });
});

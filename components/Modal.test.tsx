import * as React from "react";
import { act, render, fireEvent } from "@testing-library/react";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/modal";

const spy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("Modal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    expect(() => wrapper.unmount()).not.toThrow();

    expect(spy).toBeCalledTimes(0);
  });

  test("should have the proper 'aria' attributes", () => {
    const { getByRole, getByText } = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const modal = getByRole("dialog");

    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("role", "dialog");

    const modalHeader = getByText("Modal header");

    expect(modal).toHaveAttribute("aria-labelledby", modalHeader.id);

    const modalBody = getByText("Modal body");

    expect(modal).toHaveAttribute("aria-describedby", modalBody.id);
  });
  it("should hide the modal when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const modal = wrapper.getByRole("dialog");

    fireEvent.keyDown(modal, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

import React from "react";
import Counter from "./Counter";
import { render, fireEvent, screen } from "@testing-library/react";

test("count starts with 0", () => {
    const { getByTestId } = render(<Counter />);
    expect(getByTestId("count").textContent).toBe("Clicked 0 times");
});

test("clicking on button increments counter", () => {
    const { getByText, getByTestId } = render(<Counter />);
    const button = getByText("Increment");
    fireEvent.click(button);
    expect(getByTestId("count").textContent).toBe("Clicked 1 time");
    fireEvent.click(button);
    expect(getByTestId("count").textContent).toBe("Clicked 2 times");
});

describe("window title changes after every increment if checkbox is checked", () => {
    beforeEach(() => {
        global.window.document.title = "My Awesome App";
        render(<Counter />);
    });

    test("When checkbox is unchecked, incrementing has no effect", () => {
        fireEvent.click(screen.getByText("Increment"));
        expect(global.window.document.title).toBe("My Awesome App");
    });

    test("Check and assert the document title changes", () => {
        const checkbox = screen.getByLabelText(
            "Check to display count in document title",
        );
        fireEvent.click(checkbox);
        fireEvent.click(screen.getByText("Increment"));
        expect(global.window.document.title).toBe("Total number of clicks: 1");
    });

    test("Works if you increment multiple times", () => {
        const checkbox = screen.getByLabelText(
            "Check to display count in document title",
        );
        fireEvent.click(checkbox);
        fireEvent.click(screen.getByText("Increment"));
        fireEvent.click(screen.getByText("Increment"));
        expect(global.window.document.title).toBe("Total number of clicks: 2");
    });

    test("Unchecking will return to the original document title", () => {
        const checkbox = screen.getByLabelText(
            "Check to display count in document title",
        );
        fireEvent.click(checkbox);
        fireEvent.click(checkbox);
        expect(global.window.document.title).toBe("My Awesome App");
    });
});
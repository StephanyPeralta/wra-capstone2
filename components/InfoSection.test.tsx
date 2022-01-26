import { render, screen } from "@testing-library/react";

import InfoSection from "./InfoSection";

const dataMock = {
  date: "2022-01-24",
  title: "Test Title",
  explanation: "Test Explanation",
  media_type: "image",
  url: "https://test.com",
};

describe("InfoSection Component", () => {
  it("renders InfoSection properties", () => {
    render(<InfoSection {...dataMock} />);

    const image = screen.getByAltText(dataMock.title);

    expect(image).toBeInTheDocument();
    expect(screen.getByText(dataMock.title)).toBeInTheDocument();
    expect(screen.getByText(dataMock.date)).toBeInTheDocument();
    expect(screen.getByText(dataMock.explanation)).toBeInTheDocument();
  });
});

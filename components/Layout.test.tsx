import { render, screen } from "@testing-library/react";

import Layout from "./Layout";

const childrenMock = <div>A child element</div>;

describe("Layout Component", () => {
  it("renders Layout elements", () => {
    render(<Layout>{childrenMock}</Layout>);

    expect(screen.getByText("APOD APP")).toBeInTheDocument();
    expect(screen.getByText("A child element")).toBeInTheDocument();
  });
});

import React from "react";
import { render, cleanup } from "@testing-library/react";

import Appointment from "../Appointment";
import Form from "../Appointment/Form";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

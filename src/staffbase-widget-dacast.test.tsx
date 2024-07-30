import React from "react"
import {screen, render} from "@testing-library/react"

import {StaffbaseWidgetDacast} from "./staffbase-widget-dacast";

describe("StaffbaseWidgetDacast", () => {
    it("should render the component", () => {
        render(<StaffbaseWidgetDacast contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})

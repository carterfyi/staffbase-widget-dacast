import React from "react"
import {screen, render} from "@testing-library/react"

import {DacastEmbed} from "./dacast-embed";

describe("DacastEmbed", () => {
    it("should render the component", () => {
        render(<DacastEmbed contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})

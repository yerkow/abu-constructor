import type { Preview } from "@storybook/react";
import "react-quill/dist/quill.snow.css";
import "../src/app/globals.css"; // Here!
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

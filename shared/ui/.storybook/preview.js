import { ThemeProvider } from "../src/theme/ThemeProvider";

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  )
];

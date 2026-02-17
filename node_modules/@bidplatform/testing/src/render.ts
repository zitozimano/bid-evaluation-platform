import { render } from "@testing-library/react";
import { ThemeProvider } from "@bidplatform/ui";

export function renderWithProviders(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

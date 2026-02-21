export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    border: string;
  };
  fonts: {
    regular: string;
    bold: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  logo?: Buffer;
  publicName?: string;
}

export class ThemeBuilder {
  private theme: Theme = {
    colors: {
      primary: "#003366",
      secondary: "#999999",
      text: "#000000",
      border: "#DDDDDD",
    },
    fonts: {
      regular: "Helvetica",
      bold: "Helvetica-Bold",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
    },
  };

  setColors(primary?: string | null, secondary?: string | null) {
    if (primary) this.theme.colors.primary = primary;
    if (secondary) this.theme.colors.secondary = secondary;
    return this;
  }

  setLogo(buffer?: Buffer | null) {
    if (buffer) this.theme.logo = buffer;
    return this;
  }

  setPublicName(name?: string | null) {
    if (name) this.theme.publicName = name;
    return this;
  }

  build(): Theme {
    return this.theme;
  }
}

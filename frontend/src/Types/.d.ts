declare module "@mui/material/styles" {
  interface TypographyVariants {
    menuItems: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    menuItems?: React.CSSProperties;
  }

  interface Palette {
    colors: {
      violet: string;
      purple: string;
      pink: string;
      lightgray: string;
      darkgray: string;
      lightblack: string;
    };
  }

  interface PaletteOptions {
    colors?: {
      violet?: string;
      purple?: string;
      pink?: string;
      lightgray?: string;
      darkgray?: string;
      lightblack?: string;
    };
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    menuItems: true;
  }
}
// your-file-name.d.ts (you can name it whatever you want)
import '@mui/material/styles';

declare module "@mui/material/styles" {
  interface TypographyVariants {
    menuItems: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    menuItems?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    menuItems: true;
  }
}

declare module '@mui/material/styles' {
    interface TypeText {
        black: string;
        white: string;
    }

    interface PaletteText {
        black: string;
        white: string;
    }

    interface PaletteOptions {
        colors: {
            violet: string,
            purple: string,
            pink: string,
            lightgray: string,
            darkgray: string,
            lightblack: string,
        }
    }
}



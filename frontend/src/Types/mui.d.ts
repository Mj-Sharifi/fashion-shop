declare module '@mui/material/styles' {
    interface TypographyVariants {
      menuItems: React.CSSProperties;
    }
  
    // allow configuration using `createTheme()`
    interface TypographyVariantsOptions {
      menuItems?: React.CSSProperties;
    }
  }
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
      menuItems: true;
    }
  }
  
import { Grid } from '@mui/material'
import React from 'react'

export default function Shop() {
  return (
    <Grid container>
      <Grid item md={3} display={{xs:"none",md:"block"}}></Grid>
      <Grid item xs={12} md={9}></Grid>
    </Grid>
  )
}

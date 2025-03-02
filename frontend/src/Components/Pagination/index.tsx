import { Grid2, Pagination, Stack } from "@mui/material";
import React, { ChangeEvent } from "react";

type props = {
  count: number;
  page: number;
  handlePagination: (e: ChangeEvent, p: number) => void;
};
export default function PaginationContainer({
  count,
  page,
  handlePagination,
}: props) {
  return (
    <Grid2
      container
      sx={{
        mt: 6,
      }}
    >
      <Grid2 size={{ xs: 12, sm: 3 }}></Grid2>
      <Grid2 size={{ xs: 12, sm: 9 }}>
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={count}
            page={page}
            onChange={handlePagination}
            sx={{
              "& button.Mui-selected": {
                backgroundColor: "colors.violet",
                color: "text.white",
              },
            }}
          />
        </Stack>
      </Grid2>
    </Grid2>
  );
}

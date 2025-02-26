import React, { useEffect, useState } from "react";
import {
  Grid2,
  Stack,
  Rating,
  Typography,
  Input,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
export default function Comments({ productId }) {
  const mobileSize = useMediaQuery("(max-width:580px)");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_BASE_API +
        `comments?populate=*&filters[product][id][$eq]=${productId}`
    )
      .then((res) => res.json())
      .then((data) => setComments(data?.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid2 container columnSpacing={4} rowSpacing={2}>
      <Grid2 size={{xs:12,md:7}} >
        <Stack
          sx={{
            gap: 4,
            width: "100%"
          }}>
          {comments?.map((e, i) => (
            <Stack key={i} sx={{
              width: "100%"
            }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  gap: 2,
                  mb: 3,
                  width: "100%"
                }}>
                <Box
                  component={"img"}
                  src={`/assets/comments/${i + 1}.jpg`}
                  alt={e.attributes.authorName}
                  sx={{
                    width: { xs: "30%", sm: "20%" },
                    objectFit: "cover",
                    objectPosition: "center top"
                  }} />
                <Stack
                  sx={{
                    gap: 2,
                    width: { xs: "100%", sm: "80%" }
                  }}>
                  <Stack direction={"row"} sx={{
                    justifyContent: "space-between"
                  }}>
                    <Stack direction={"row"} sx={{
                      gap: { xs: 1, sm: 2, md: 3 }
                    }}>
                      <Typography variant="h5">
                        {e.attributes.authorName}
                      </Typography>
                      <Rating
                        size={mobileSize ? "small" : "medium"}
                        value={+e.attributes.rating}
                      />
                    </Stack>
                    <Button
                      sx={{
                        backgroundColor: "transparent",
                        padding: "0",
                        minWidth: "0",
                        height: "auto",
                        width: "auto",
                        color: "text.black",

                        "&:hover": {
                          color: "colors.violet",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Reply
                    </Button>
                  </Stack>
                  <Typography variant="body2" sx={{
                    textAlign: "justify"
                  }}>
                    {e.attributes.content}
                  </Typography>
                </Stack>
              </Stack>
              {e.attributes.replies.data?.map((m, n) => (
                <Stack
                  key={n}
                  direction={{ xs: "column", sm: "row" }}
                  sx={{
                    gap: 2,
                    marginBottom: "16px",
                    paddingLeft: { xs: 3, sm: 5 },
                    width: "100%"
                  }}>
                  <Box
                    component={"img"}
                    src={`/assets/comments/${i + 1}${n + 1}.jpg`}
                    alt={m.attributes.authorName}
                    sx={{
                      width: { xs: "30%", sm: "20%" },
                      objectFit: "cover",
                      objectPosition: "center top",
                      maxHeight: "120px"
                    }} />
                  <Stack
                    sx={{
                      gap: 2,
                      width: { xs: "100%", sm: "80%" }
                    }}>
                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        width: "100%"
                      }}>
                      <Stack direction={"row"} sx={{
                        gap: { xs: 1, sm: 2, md: 3 }
                      }}>
                        <Typography variant="h5">
                          {m.attributes.authorName}
                        </Typography>
                        <Rating
                          size={mobileSize ? "small" : "medium"}
                          value={+m.attributes.rating}
                        />
                      </Stack>
                      <Button
                        sx={{
                          backgroundColor: "transparent",
                          padding: "0",
                          minWidth: "0",
                          height: "auto",
                          width: "auto",
                          color: "text.black",

                          "&:hover": {
                            color: "colors.violet",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        Reply
                      </Button>
                    </Stack>
                    <Typography variant="body2" sx={{
                      textAlign: "justify"
                    }}>
                      {m.attributes.content}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Grid2>
      <Grid2 size={{xs:12,md:5}} >
        <Stack
          sx={{
            gap: 1,
            width: "100%"
          }}>
          <Typography variant="h5">Add a Review</Typography>
          <Rating value={5} />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              width: "100%",
              gap: 1,
              mt: 1
            }}>
            <Input
              placeholder="Name"
              name="author"
              sx={{
                "& input::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
                border: "1px solid",
                borderColor: "colors.darkgray",
                borderRadius: "5px",
                width: { xs: "100%", sm: "50%" },
                height: "45px",
                px: "10px",
              }}
            />
            <Input
              placeholder="Email"
              name="email"
              sx={{
                "& input::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
                border: "1px solid",
                borderColor: "colors.darkgray",
                borderRadius: "5px",
                width: { xs: "100%", sm: "50%" },
                height: "45px",
                px: "10px",
              }}
            />
          </Stack>
          <Input
            name="content"
            multiline
            placeholder="Message"
            sx={{
              alignItems: "start",
              "& textarea::placeholder": { opacity: "0.7 !important" },
              "&::after": { border: "none !important" },
              "&::before": { border: "none !important" },
              border: "1px solid",
              borderColor: "colors.darkgray",
              borderRadius: "5px",
              width: "100%",
              height: "200px",
              padding: "15px",
              "&.Mui-focused": {
                border: "1px solid !important",
                borderColor: "colors.lightblack",
              },
            }}
          />
          <Button
            disableRipple
            sx={{
              height: "45px",
              width: "135px",
              backgroundColor: "colors.violet",
              color: "text.white",
              "&:hover": { backgroundColor: "colors.lightblack" },
            }}
          >
            Submit
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
}

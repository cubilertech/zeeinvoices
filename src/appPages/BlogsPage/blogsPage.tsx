"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Container,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { TopBanner } from "./TopBanner";
import "@/Styles/sectionStyle.css";
import { BlogCard } from "@/components/BlogCard";
import { TrendingBlogCard } from "@/components/TrendingBlogCard";
import { Icon } from "@/components/Icon";

const blogCardData: BlogCard[] = [
  {
    onTitleClick: () => console.log("Title clicked for Blog 1"),
    imageSrc: "https://via.placeholder.com/150",
    category: "Technology",
    readingTime: "5 min read",
    title:
      "ZeeInvoices: Simplify your invoicing process and focus on what really matters",
    description:
      "Discover ZeeInvoices , a free and easy to use invoice generator and billing software custom designed to meet your business needs.",
    author: "Ali",
    postedOn: "2024-11-05",
    rating: 5,
    onShareClick: () => console.log("Shared Blog 1"),
  },
  {
    onTitleClick: () => console.log("Title clicked for Blog 2"),
    imageSrc: "https://via.placeholder.com/150",
    category: "General",
    readingTime: "8 min read",
    title: "ZeeInvoices is designed to streamline the billing process for businesses of all sizes",
    description:
      "from freelancers to large enterprises. With ZeeInvoices, you can create professional, custom invoices that align with your brand in just minutes.",
    author: "Mohsin",
    postedOn: "2024-011-3",
    rating: 5.0,
    onShareClick: () => console.log("Shared Blog 2"),
  },
  // {
  //   onTitleClick: () => console.log("Title clicked for Blog 3"),
  //   imageSrc: "https://via.placeholder.com/150",
  //   category: "General",
  //   readingTime: "6 min read",
  //   title: "Top 10 Destinations to Visit in 2024",
  //   description:
  //     "Explore the most breathtaking destinations to add to your travel bucket list in 2024.",
  //   author: "Emily Clark",
  //   postedOn: "2023-11-15",
  //   rating: 5,
  //   onShareClick: () => console.log("Shared Blog 3"),
  // },
];

const trendingBlogCardData: TrendingBlogCard[] = [
  {
    onClick: () => console.log("Title clicked for Blog 1"),
    title: "ZeeInvoices: Simplify your invoicing process and focus on what really matters",
    postedOn: "2024-11-05",
    rating: 5,
  },
  {
    onClick: () => console.log("Title clicked for Blog 1"),
    title: "ZeeInvoices: Simplify your invoicing process and focus on what really matters",
    postedOn: "2024-11-04",
    rating: 5,
  },
  {
    onClick: () => console.log("Title clicked for Blog 1"),
    title: "ZeeInvoices: Simplify your invoicing process and focus on what really matters",
    postedOn: "2024-11-03",
    rating: 5,
  },
  {
    onClick: () => console.log("Title clicked for Blog 1"),
    title: "ZeeInvoices: Simplify your invoicing process and focus on what really matters",
    postedOn: "2024-11-01",
    rating: 5,
  },
];

const BlogsPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <Head>
        <title>ZeeInvoices; your AI-powered invoicing partner</title>
        <meta
          name="description"
          content="Discover how ZeeInvoices empowers businesses with AI-powered invoicing tool and customizable invoice builder."
        />
      </Head>
      <Box
        sx={{
          minHeight: "50vh",
          mt: 8,
          backgroundColor: palette.base.white,
        }}
      >
        <TopBanner />
        <Container className="mainContainer" sx={{ my: 3 }}>
          <Typography
            variant="display-lg-bold"
            color={palette.color.gray[900]}
            my={{ sm: 5, xs: 1 }}
            component={"p"}
            sx={{
              fontFamily: "Product Sans,sans-serif",
              fontSize: { md: "48px", xs: "26px" },
              lineHeight: { md: "64px", xs: "32px" },
              fontWeight: { xs: 700 },
            }}
          >
            Latest{" "}
            <span
              style={{
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Blogs
            </span>
          </Typography>
          <Stack direction={"row"} gap={3}>
            {/* left section */}
            <Stack direction={"column"} gap={3} sx={{ alignItems: "center" }}>
              {blogCardData.map((data, index) => (
                <BlogCard
                  key={index}
                  onTitleClick={data.onTitleClick}
                  imageSrc={data.imageSrc}
                  category={data.category}
                  readingTime={data.readingTime}
                  title={data.title}
                  description={data.description}
                  author={data.author}
                  postedOn={data.postedOn}
                  rating={data.rating}
                  onShareClick={data.onShareClick}
                />
              ))}
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: palette.base.white,
                    borderColor: "White", // Border color
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    color: palette.base.white, // Selected text color
                    backgroundColor: palette.primary.main, // Selected background color
                    borderColor: "selectedBorderColor", // Selected border color
                  },
                }}
              />
            </Stack>
            {/* right section */}
            <Stack direction={"column"} sx={{ width: "500px" }}>
              <Typography
                variant="text-xl-semibold"
                sx={{
                  color: palette.color.gray[900],
                }}
              >
                Search
              </Typography>
              <TextField
                variant="standard"
                placeholder="Search"
                sx={{
                  width: "100%",
                  mt: "16px",
                  py: "10px",
                  px: "16px",
                  border: `1px solid ${palette.color.gray[5]}`,
                  borderRadius: "12px",
                  "& .MuiInputBase-input": {
                    border: "none",
                    height: "30px",
                    pl: "0px",
                    pr: "0px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: palette.color.gray[610],
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="searchIcon" width={20} height={20} />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                variant="text-xl-semibold"
                sx={{
                  mt: "24px",
                  color: palette.color.gray[900],
                }}
              >
                Trending blogs
              </Typography>
              {/* trending blogs */}
              <Stack direction={"column"} gap={2} sx={{ mt: "16px" }}>
                {trendingBlogCardData.map((data, index) => (
                  <TrendingBlogCard
                    key={index}
                    onClick={data.onClick}
                    title={data.title}
                    postedOn={data.postedOn}
                    rating={data.rating}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default BlogsPage;

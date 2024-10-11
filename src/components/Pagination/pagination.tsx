import { palette } from "@/theme/palette";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { FC } from "react";

interface PaginationProps {
  totalRecords: number;
  itemsPerPage: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalRecords,
  itemsPerPage,
  page = 1,
  setPage,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const MAX_PAGES_DISPLAYED = isMobile ? 3 : 5; // Display fewer pages on mobile
  const placeHolder = "...";

  const getPageNumbersToShow = () => {
    if (totalPages <= MAX_PAGES_DISPLAYED) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesToShow = [];
    const startPage = Math.max(1, page - 2); // Display three on the first side
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push(placeHolder); // Display ellipsis if there are skipped pages
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push(placeHolder); // Display ellipsis if there are skipped pages
      }
      pagesToShow.push(totalPages);
    }

    return pagesToShow;
  };

  const pageNumbersToShow = getPageNumbersToShow();

  const handlePreviousPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(page + 1, totalPages));
  };

  const handleSetPageNumber = (pageNumber: number | string) => {
    if (pageNumber !== placeHolder) {
      setPage(Number(pageNumber));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        // border: `1px solid ${palette.border.invoicesBorderColor}`,
        display: "flex",
        justifyContent: "center",
        px: isMobile ? "5px" : "24px",
        pt: isMobile ? "16px" : "44px",
        pb: isMobile ? "5px" : "16px",
        // borderTop: "1px solid #EAECF0",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          borderRadius: "4px",
          // border: `1px solid ${palette.border.borderPrimary}`,
        }}
      >
        <Button
          sx={{
            fontSize: { md: "14px !important", xs: "14px !important" },
            lineHeight: {
              md: "20px !important",
              xs: "20px !important",
            },
            fontWeight: 400,
            border: `1px solid ${palette.border.borderPrimary}`,
            color: palette.text.textSecondary,
            px: "16px !important",
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            textTransform: "capitalize",
            background: "white",
            minWidth: isMobile ? "0px" : "auto",
            padding: isMobile ? "6px" : "5px 15px",
            ":hover": {
              border: "1px solid #D0D5DD",
              color: "#344054",
            },
          }}
          variant="outlined"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          {page === 1 ? (
            <ArrowBack
              sx={{ color: "#344054", opacity: "0.3", fontSize: 20, mr: 1 }}
            />
          ) : (
            <ArrowBack sx={{ color: "#344054", fontSize: 20, mr: 1 }} />
          )}
          {isMobile ? "" : "Previous"}
        </Button>
        <Box sx={{ display: "flex", gap: isMobile ? "0px" : 0 }}>
          {pageNumbersToShow.map((pagenumber, index) => (
            <Box
              key={index}
              onClick={() => handleSetPageNumber(pagenumber)}
              sx={{
                fontSize: { md: "14px !important", xs: "14px !important" },
                lineHeight: {
                  md: "20px !important",
                  xs: "20px !important",
                },
                fontWeight: 400,
                backgroundColor:
                  page === pagenumber ? palette.primary.main : "white",
                color:
                  page === pagenumber
                    ? palette.base.white
                    : palette.text.textSecondary,
                width: "40px",
                height: "40px",
                borderRadius: "0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: pagenumber !== placeHolder ? "pointer" : "text",

                borderTop:
                  page === pagenumber
                    ? `1px solid ${palette.border.borderPrimary}`
                    : `1px solid ${palette.border.borderPrimary}`,
                borderBottom:
                  page === pagenumber
                    ? `1px solid ${palette.border.borderPrimary}`
                    : `1px solid ${palette.border.borderPrimary}`,
                borderRight: `0.5px solid ${palette.border.borderPrimary}`,
                borderLeft: `0.5px solid ${palette.border.borderPrimary}`,

                ":hover": {
                  backgroundColor: "#8183E4",
                  color: "white",
                },
              }}
            >
              {pagenumber}
            </Box>
          ))}
        </Box>
        <Button
          sx={{
            fontSize: { md: "14px !important", xs: "14px !important" },
            lineHeight: {
              md: "20px !important",
              xs: "20px !important",
            },
            fontWeight: 400,
            border: `1px solid ${palette.border.borderPrimary}`,
            color: palette.text.textSecondary,
            px: "16px !important",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            textTransform: "capitalize",
            background: "white",
            minWidth: isMobile ? "0px" : "auto",
            padding: isMobile ? "6px" : "5px 15px",
            ":hover": {
              border: `1px solid #D0D5DD`,
              color: "#344054",
            },
          }}
          onClick={handleNextPage}
          disabled={totalPages === page || totalPages === 0}
        >
          {isMobile ? "" : "Next"}
          {totalPages === page || totalPages === 0 ? (
            <ArrowForward
              sx={{ color: "#344054", opacity: "0.3", fontSize: 20, ml: 1 }}
            />
          ) : (
            <ArrowForward sx={{ color: "#344054", fontSize: 20, ml: 1 }} />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;

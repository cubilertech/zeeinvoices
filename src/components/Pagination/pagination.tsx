import { palette } from "@/theme/palette";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, useMediaQuery } from "@mui/material";
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
        marginBottom: "10px",
        border: `1px solid ${palette.border.invoicesBorderColor}`,
        display: "flex",
        justifyContent: "space-between",
        padding: isMobile ? "5px" : "10px",
        borderTop: "1px solid #EAECF0",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <Button
        sx={{
          border: "1px solid #D0D5DD",
          color: "#344054",
          borderRadius: "8px",
          textTransform: "capitalize",
          fontWeight: 500,
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
      <Box sx={{ display: "flex", gap: isMobile ? "5px" : 2 }}>
        {pageNumbersToShow.map((pagenumber, index) => (
          <Box
            key={index}
            onClick={() => handleSetPageNumber(pagenumber)}
            sx={{
              backgroundColor: page === pagenumber ? "#F5F6F7" : "white",
              color: page === pagenumber ? "#445164" : "#445164",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: pagenumber !== placeHolder ? "pointer" : "text",
              border:
                page === pagenumber ? "2px solid #EAECF0" : "1px solid #ffffff",
              ":hover": {
                backgroundColor:"#6183E4",
                color:"white",
              }
            }}
          >
            {pagenumber}
          </Box>
        ))}
      </Box>
      <Button
        sx={{
          border: "1px solid #D0D5DD",
          color: "#344054",
          borderRadius: "8px",
          textTransform: "capitalize",
          fontWeight: 500,
          background: "white",
          minWidth: isMobile ? "0px" : "auto",
          padding: isMobile ? "6px" : "5px 15px",
          ":hover": {
            border: "1px solid #D0D5DD",
            color: "#344054",
          },
        }}
        onClick={handleNextPage}
        disabled={totalPages === page}
      >
        {isMobile ? "" : "Next"}
        {totalPages === page ? (
          <ArrowForward
            sx={{ color: "#344054", opacity: "0.3", fontSize: 20, ml: 1 }}
          />
        ) : (
          <ArrowForward sx={{ color: "#344054", fontSize: 20, ml: 1 }} />
        )}
      </Button>
    </Box>
  );
};

export default Pagination;

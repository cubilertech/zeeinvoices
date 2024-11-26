"use client";

import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { i18n } from "@/components/LanguageProvider"; // Import the initialized i18next instance
import { palette } from "@/theme/palette";

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string>("en");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = async (lang: string) => {
    console.log("Changing language to:", lang);
    try {
      await i18n.changeLanguage(lang); // Await the change
      console.log("Language changed successfully");
      setLanguage(lang);
    } catch (error) {
      console.error("Error changing language:", error);
    }
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        sx={{
          py: "10px !important",
          px: "16px !important",
          borderRadius: "4px !important",
          fontFamily: "Product Sans, sans-serif !important",
          fontSize: "14px !important",
          lineHeight: {
            md: "18px !important",
            xs: "18px !important",
          },
          fontWeight: "700 !important",
          backgroundColor: palette.primary.main,
        }}
      >
        Select Language
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage("ar")}>Arabic</MenuItem>
        <MenuItem onClick={() => changeLanguage("fr")}>French</MenuItem>
        <MenuItem onClick={() => changeLanguage("de")}>German</MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;

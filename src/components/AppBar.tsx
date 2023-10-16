import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";

const pages = [
  { title: "Item 1", url: "/", isVisible: true },
  { title: "Item 2", url: "/", isVisible: true },
  { title: "Item 3", url: "/", isVisible: true },
  { title: "About", url: "/about", isVisible: true },
];

const WelcomeMessage = () => {
  return (
    <Box>
      <Typography variant="h6" className="new-points">
        +500 points
      </Typography>
      <Typography>
        {`Welcome! You have 500 points to make predictions with throughout the many
        matches of the thing""}.`}
      </Typography>
    </Box>
  );
};

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Title />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => navigate(page.url)}
                  disabled={window.location.href.includes(page.url)}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Title />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => navigate(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={""}
                // src="/static/images/avatar/2.jpg"
              >
                {undefined}
              </Avatar>
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box>
                <MenuItem onClick={() => null}>
                  <Typography textAlign="center">{"Sign up"}</Typography>
                </MenuItem>
                <MenuItem onClick={() => null}>
                  <Typography textAlign="center">{"Log in"}</Typography>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <AlertDialog
        open={showWelcome}
        setOpen={setShowWelcome}
        buttonText={"learn more"}
        content={<WelcomeMessage />}
        buttonClickHandler={() => navigate("/about")}
        title={"testing"}
        isLoading={false}
      />
    </AppBar>
  );
};
export default ResponsiveAppBar;

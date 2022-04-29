import React, { useEffect, useState } from "react";
import "../style/Navbar.css";
import { auth, signOut } from "../firebse";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import apiService from "../app/apiService";
import requests from "../requests";
import LoadingScreen from "./LoadingScreen";
import { Alert } from "@mui/material";
import { Stack } from "@mui/material";

function Navbar({ genres, setGenres }) {
  const [show, handleShow] = useState(false);
  let navigate = useNavigate();
  const [genresList, setGenresList] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorGenres, setAnchorGenres] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenGenres = (event) => {
    setAnchorGenres(event.currentTarget);
  };

  const handleCloseGenres = (e) => {
    setAnchorGenres(null);
    setGenres(e);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        return handleShow;
      });
    };
  }, []);

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        const res = await apiService(requests().genresList);
        setGenresList(res.data.genres);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovie();
  }, []);

  async function goHome() {
    navigate("/");
  }
  async function handleAccount() {
    navigate("/profile");
  }
  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        onClick={goHome}
        className="nav__logo"
        alt="Netflix Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
      />

      <Box className="nav__avatar" sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Netflix Avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography onClick={handleAccount} textAlign="center">
              Account
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={handleLogout}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      <Box className="nav__browser" sx={{ flexGrow: 0 }}>
        <Tooltip title="Open genres">
          <IconButton
            onClick={handleOpenGenres}
            sx={{ p: 0, color: "white", fontSize: 18 }}
          >
            Browser <ArrowDropDownOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{
            mt: "45px",
          }}
          id="menu-appbar"
          anchorEl={anchorGenres}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorGenres)}
          onClose={handleCloseGenres}
        >
          {loading ? (
            <LoadingScreen />
          ) : (
            genresList?.map((e) => (
              <MenuItem
                onClick={() => handleCloseGenres(e)}
                key={e.id}
                textalign="center"
                sx={{ cursor: "pointer" }}
              >
                <Typography>{e.name}</Typography>
              </MenuItem>
            ))
            // {!genresList && (
            //   <Typography variant="h6">404 Product not found</Typography>
            // )}
          )}
        </Menu>
      </Box>
    </div>
  );
}

export default Navbar;

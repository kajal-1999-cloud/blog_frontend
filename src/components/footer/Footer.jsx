import React from "react";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="">
      <div className="footer">
      <h2 className="logo" onClick={() => topFunction()}>
        BloggerSpace<span>.</span>
      </h2>
      <div className="social-links">
      <a href="https://github.com/kajal-1999-cloud" target="_blank" >
          <GitHubIcon className="social-link" />
        </a>
        <a href="/" target="_blank">
          <FacebookIcon className="social-link" />
        </a>
        <a href="mailto:kajalg1401@gmail.com" target="_blank">
          <EmailIcon className="social-link" />
        </a>
        <a href="/" target="_blank">
          <TwitterIcon className="social-link" />
        </a>
        <a href="https://www.instagram.com/kajalg1401/" target="_blank" >
  
          <InstagramIcon className="social-link" />
        </a>
      </div>
      </div>
    
    </div>
  );
}

export default Footer;
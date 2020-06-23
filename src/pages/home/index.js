import React from "react";

import useStyles from "./styles";

import MenuArtikel from "../../images/artikel-menu.png";
import MenuDiskusi from "../../images/diskusi-menu2.png";
import MenuDonasi from "../../images/donasi-menu2.png";

export default function Registrasi() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.daftarBlock}>
        <div classNmae={classes.menuBarisSatu}>
          <a href="https://muslimgoonline.com/yuk-ngaji/artikel">
            <img className={classes.logoBox} src={MenuArtikel} alt="" />
          </a>

          <a href="https://muslimgoonline.com/yuk-ngaji/event">
            <img className={classes.logoBox} src={MenuArtikel} alt="" />
          </a>

          <a href="https://muslimgoonline.com/yuk-ngaji/donasi">
            <img className={classes.logoBox} src={MenuArtikel} alt="" />
          </a>

          <a href="https://muslimgoonline.com/yuk-ngaji/jualan">
            <img className={classes.logoBox} src={MenuArtikel} alt="" />
          </a>
        </div>
      </div>
    </>
  );
}

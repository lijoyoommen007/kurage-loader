/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Header from "./header";
import localFont from "@next/font/local";
import "../styles/main.scss";
import  '../styles/loader.scss'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Images from "../public/Images/kurage-loader.svg";
import Images2 from "../public/Images/Kurage_logo_withoutBg.svg";

const sfRg = localFont({
  src: [
    {
      path: "../public/fonts/SF-Pro-Display-Regular.otf",
      // weight: "400",
    },
  ],
  variable: "--Sf-Rg",
});
const sfLt = localFont({
  src: [
    {
      path: "../public/fonts/SF-Pro-Display-Light.otf",
      // weight: "400",
    },
  ],
  variable: "--Sf-Lt",
});
const sfTh = localFont({
  src: [
    {
      path: "../public/fonts/SF-Pro-Display-Thin.otf",
      // weight: "400",
    },
  ],
  variable: "--Sf-Th",
});

export default function layout({ children }) {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (!hasVisited) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.setLineDash([5, 40]);

      let radius = 0;

      function animate() {
        requestAnimationFrame(animate);

        // clear canvas
        context.clearRect(0, -0, canvas.width, canvas.height);

        // calculate diagonal of canvas
        for (let i = 0; i < 200; i++) {
          let angle = (i / 200) * Math.PI * 4;
          let x1 = Math.cos(angle) * (canvas.height - radius + 10000);
          let y1 = Math.sin(angle) * (canvas.height - radius + 10000);
          let x2 = Math.cos(angle) * 150;
          let y2 = Math.sin(angle) * 150

          // create gradient for stroke style of line
          context.strokeStyle = "white";

          context.beginPath();
          context.moveTo(canvas.width / 2 + x1, canvas.height / 2 + y1);
          context.lineTo(canvas.width / 2 + x2, canvas.height / 2 + y2);
          context.lineWidth = 0.6;
          context.stroke();
        }

        // increase radius
        radius += 0.7;
      }

      animate();

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

        localStorage?.setItem("visited", true);
    }
  }, [isLoading]);

  // Check if the user has visited the website before
  const hasVisited = localStorage.getItem("visited");

  // If the user has visited before, don't render the loader
  if (!isLoading || hasVisited) {
    return (
      <html
      lang="en"
      className={`${sfRg.variable} ${sfLt.variable} ${sfTh.variable}`}
    >
      <head>
        <title>kurage</title>
      </head>
      <body>
        <Header />
        <div className="main_wrapper">{children}</div>
      </body>
    </html>
    );
  }

  return (
    <html
      lang="en"
      className={`${sfRg.variable} ${sfLt.variable} ${sfTh.variable}`}
    >
      <head>
        <title>kurage</title>
      </head>
      <body>
        <div
          className="main-loader"
        >
          <canvas
            className="canvas-loader"
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
          ></canvas>
          <div
            className="loader-div"
          >
            <Image
              className="loader-background"
              src={Images}
              alt=""
            />
            <Image
              className="loader-logo"
              src={Images2}
              alt=""
            />
            <h1
              className="loader-font"
            >
              WEBSITE  | MOBILE APPS  | DIGITAL BRANDING
            </h1>
          </div>
        </div>
      </body>
    </html>
  );
}
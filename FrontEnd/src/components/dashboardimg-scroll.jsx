"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll";
import dashboardImg from "../assets/dashboardimg.png";

export function DashBoardImgScroll() {
  return (
    (<div className="flex flex-col w-full overflow-hidden">
      <ContainerScroll>
        <img
          src={dashboardImg}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-fill h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>)
  );
}

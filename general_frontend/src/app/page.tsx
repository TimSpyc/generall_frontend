"use client";

import React from "react";
import dynamic from "next/dynamic";
import { defaultTheme, Provider } from '@adobe/react-spectrum';

import CustomAsset from "./assets/custom-asset";

const GridLayout = dynamic(() => import("./layout/grid-layout"), {ssr: false});

const Home = () => {
  return (
    <Provider theme={defaultTheme}>
      <div className="min-h-screen min-w-screen p-12">
        <GridLayout name="testing">
          <CustomAsset name="custom-asset"/>
        </GridLayout>
      </div>
    </Provider>
  );
};

export default Home;

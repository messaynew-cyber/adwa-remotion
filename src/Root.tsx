import React from "react";
import { Composition } from "remotion";
import { AdwaDemo } from "./AdwaDemo";
import { TobiaPromo } from "./TobiaPromo";
import { EthiopiaDemo } from "./EthiopiaDemo";
import { AfricaPromo } from "./AfricaPromo";
import MessayPromo from "./MessayPromo";
import { AddisAbaba } from "./AddisAbaba";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AdwaDemo"
        component={AdwaDemo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TobiaPromo"
        component={TobiaPromo}
        durationInFrames={980}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EthiopiaDemo"
        component={EthiopiaDemo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AfricaPromo"
        component={AfricaPromo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MessayPromo"
        component={MessayPromo}
        durationInFrames={630}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AddisAbaba"
        component={AddisAbaba}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

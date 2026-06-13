import React from "react";
import { Composition } from "remotion";
import { registerRoot } from "remotion";
import { AdwaDemo } from "./AdwaDemo";
import { TobiaPromo } from "./TobiaPromo";
import { EthiopiaDemo } from "./EthiopiaDemo";

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
    </>
  );
};

registerRoot(Root);

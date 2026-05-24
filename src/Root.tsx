import { Composition } from "remotion";
import { AdwaDemo } from "./AdwaDemo";

export const RemotionRoot = () => {
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
    </>
  );
};

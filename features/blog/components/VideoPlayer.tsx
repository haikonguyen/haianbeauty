"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

interface PlayerProps {
  url: string;
  width: string;
  height: string;
  controls: boolean;
  light: boolean;
  playing: boolean;
}

const ReactPlayer = dynamic(
  () =>
    import("react-player").then(
      (mod) => mod.default as ComponentType<PlayerProps>,
    ),
  { ssr: false },
);

interface VideoPlayerProps {
  url: string;
  title?: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        light={true}
        playing={false}
      />
    </div>
  );
}

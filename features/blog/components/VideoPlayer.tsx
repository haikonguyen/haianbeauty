"use client";

import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  title?: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        light // Show thumbnail until play
        playing={false}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
      />
    </div>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import type { ComponentType } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as ComponentType<{
  url: string;
  width?: string;
  height?: string;
  controls?: boolean;
  config?: {
    youtube?: {
      playerVars?: Record<string, number>;
    };
  };
}>;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const VIDEOS = [
  {
    url: "https://www.instagram.com/p/C_lssYLS_Rk/",
    type: "instagram" as const,
  },
  {
    url: "https://www.instagram.com/p/DAbh7p9vch0/",
    type: "instagram" as const,
  },
  {
    url: "https://www.instagram.com/p/DPEwSVijpOE/",
    type: "instagram" as const,
  },
];

export function SeuBarracoGallery() {
  const isMounted = useIsClient();

  return (
    <div className="space-y-4">
      <span className="text-xs text-muted uppercase font-bold tracking-widest block mb-4">
        Vídeos & Reels
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isMounted &&
          VIDEOS.map((video, i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-lg overflow-hidden bg-surface-1 border border-border group relative"
            >
              {video.type === "instagram" ? (
                <iframe
                  src={`${video.url}${video.url.endsWith("/") ? "" : "/"}embed/`}
                  className="w-full h-full border-0"
                  allow="encrypted-media"
                  title={`Demonstração de automação ${i + 1}`}
                />
              ) : (
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  config={{
                    youtube: {
                      playerVars: { modestbranding: 1, rel: 0 },
                    },
                  }}
                />
              )}
            </div>
          ))}
      </div>
      <p className="text-sm text-center text-muted mt-4">
        Acompanhe as demonstrações completas de{" "}
        <strong>automação residencial em Recife</strong> nas redes sociais.
      </p>
    </div>
  );
}

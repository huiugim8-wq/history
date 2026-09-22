"use client";

import { useState } from "react";
import Image from "next/image";
import { publicAssetPath } from "../../site-paths";

export default function TradingVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="trading-video">
      {playing ? (
        <iframe src="https://www.youtube.com/embed/8P4wiwDrvxs?autoplay=1&rel=0" title="실시간 투자 정보 플랫폼 시연 영상" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      ) : (
        <button className="trading-video-poster" type="button" onClick={() => setPlaying(true)} aria-label="실시간 투자 정보 플랫폼 시연 영상 재생">
          <Image src={publicAssetPath("/gops/portfolio/video-poster.png")} alt="실시간 투자 정보 플랫폼 유튜브 시연 영상" width={561} height={314} sizes="(max-width: 520px) calc(100vw - 40px), 630px" unoptimized priority />
        </button>
      )}
      <a className="trading-video-print" href="https://www.youtube.com/watch?v=8P4wiwDrvxs">
        <Image src={publicAssetPath("/gops/portfolio/video-poster.png")} alt="실시간 투자 정보 플랫폼 시연 영상 보기" width={561} height={314} unoptimized />
      </a>
    </div>
  );
}

import React from "react";
export default function ScoreBar({ value = 0 }: { value?: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (<div className="score-bar"><span style={{ width: `${v}%` }} /></div>);
}

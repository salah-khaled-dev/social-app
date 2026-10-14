import React from 'react'
import { useNetworkState } from "react-use";

export default function Offline() {
  const {online}   = useNetworkState();
  return (
    <>
   {!online && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center gap-3 rounded-2xl bg-slate-900/90 px-6 py-4 text-sm font-medium text-white shadow-2xl backdrop-blur-md border border-rose-500/30">
    <span className="relative flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500"></span>
    </span>
    <div className="flex flex-col">
      <span className="font-semibold text-rose-400">Network Disconnected</span>
      <span className="text-xs text-slate-300">Please check your internet connection</span>
    </div>
  </div>
)}
</>
  )
  
}

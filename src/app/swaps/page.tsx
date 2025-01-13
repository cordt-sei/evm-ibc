// src/app/swaps/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SwapsPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "skip"; // default "skip" if none

  const [activeTab, setActiveTab] = useState<"skip" | "evm-ibc">("skip");

  useEffect(() => {
    if (initialTab === "evm-ibc") setActiveTab("evm-ibc");
    else setActiveTab("skip");
  }, [initialTab]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Swaps</h1>

      {/* Simple tab toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab("skip")}
          className={`px-4 py-2 border rounded ${
            activeTab === "skip" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          Skip Widget
        </button>
        <button
          onClick={() => setActiveTab("evm-ibc")}
          className={`px-4 py-2 border rounded ${
            activeTab === "evm-ibc" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          EVM-IBC
        </button>
      </div>

      {activeTab === "skip" && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Skip Widget Tab</h2>
          <p>This is where you would show the skip widget content...</p>
        </div>
      )}
      {activeTab === "evm-ibc" && (
        <div>
          <h2 className="text-lg font-semibold mb-2">EVM-IBC Tab</h2>
          <p>This is where you’d render the EVM-IBC content or form...</p>
        </div>
      )}
    </div>
  );
}

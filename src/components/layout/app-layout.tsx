"use client";

import React, { useState, createContext, useContext } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { PageTransition } from "./page-transition";

/** Shared collapse state so Sidebar and main content stay in sync */
interface SidebarContextValue {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextValue>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <div className="flex">
          <Sidebar />
          {/* Padding tracks the animated sidebar width: 220px expanded, 64px collapsed */}
          <main
            className="flex-1 transition-all duration-300 ease-in-out"
            style={{
              paddingLeft: isCollapsed ? "64px" : "220px",
              minHeight: "calc(100vh - 3.5rem)",
            }}
            id="main-content"
          >
            <div className="max-w-5xl mx-auto px-8 py-10">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

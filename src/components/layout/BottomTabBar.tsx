"use client";

import React from "react";
import { LayoutDashboard, Camera, History, CalendarClock, MessageSquareText, FileBadge2, Settings } from "lucide-react";

export function BottomTabBar({ activeTab, onSelectTab }: { activeTab: string; onSelectTab: (tab: string) => void }) {
  const tabs = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "upload", label: "Scan", icon: Camera },
    { id: "timeline", label: "Timeline", icon: History },
    { id: "medications", label: "Meds", icon: CalendarClock },
    { id: "ask", label: "Ask", icon: MessageSquareText },
    { id: "brief", label: "Brief", icon: FileBadge2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? "text-primary font-bold scale-105" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "bg-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

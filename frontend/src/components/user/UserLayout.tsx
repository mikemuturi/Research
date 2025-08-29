"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  BarChart,
  Settings,
  HelpCircle,
  Bell,
  User,
  ChevronDown,
  MessageSquare,
  Globe,
} from "lucide-react";

import Dashboard from "./Dashboard";
import Surveyspage from "@/components/user/surveys/page";
import Submissionspage from "@/components/user/submissions/page";
import Resultspage from "@/components/user/results/page";
import Settingspage from "@/components/user/settings/page";

const mainTabs = [
  { name: "Dashboard", icon: LayoutDashboard, component: <Dashboard /> },
  { name: "Surveys", icon: ClipboardList, component: <Surveyspage /> },
  { name: "Submissions", icon: FileText, component: <Submissionspage /> },
  { name: "Results", icon: BarChart, component: <Resultspage /> },
  { name: "Messages", icon: MessageSquare, component: <div>Messages content</div> },
];

const bottomTabs = [
  { name: "Settings", icon: Settings, component: <Settingspage /> },
  { name: "Help", icon: HelpCircle, component: <div>Help content</div> },
];

export default function UserLayout() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [profileOpen, setProfileOpen] = useState(false);

  const activeComponent =
    [...mainTabs, ...bottomTabs].find((tab) => tab.name === activeTab)
      ?.component || <div>The content for {activeTab} appears here.</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 font-bold text-lg">User Panel</div>

        {/* Main nav */}
        <nav className="flex-1 px-2 space-y-1">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.name
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            );
          })}
        </nav>

        {/* Bottom nav (moved up slightly, not at the very bottom) */}
        <nav className="px-2 space-y-1 mb-12">
          {bottomTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.name
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 p-4 bg-white flex items-center justify-between">
          {/* Left side branding */}
          <div className="flex items-center space-x-3">
            <Globe className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-800">Rafsia</h1>
              <p className="text-sm text-gray-500">Assessment Tool</p>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-6 relative mr-6">
            {/* Notification bell */}
            <button className="relative text-gray-600 hover:text-gray-800">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <User className="h-6 w-6 text-gray-700" />
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setActiveTab("Account");
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Account
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("Settings");
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => alert("Logging out...")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">{activeComponent}</div>
      </main>
    </div>
  );
}

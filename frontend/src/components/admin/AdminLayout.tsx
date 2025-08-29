// 'use client';

// import React from 'react';
// import { BarChart3, FileText, ListChecks, Layers3, Users, ClipboardList } from 'lucide-react';

// type TabKey = 'submissions' | 'surveys' | 'questions' | 'answers' | 'projects' | 'users';

// const ICONS: Record<TabKey, React.ReactNode> = {
//   submissions: <BarChart3 className="h-4 w-4" />,
//   surveys: <ClipboardList className="h-4 w-4" />,
//   questions: <FileText className="h-4 w-4" />,
//   answers: <ListChecks className="h-4 w-4" />,
//   projects: <Layers3 className="h-4 w-4" />,
//   users: <Users className="h-4 w-4" />,
// };

// export default function AdminLayout({
//   tabs,
//   activeTab,
//   onTabChange,
//   children,
// }: {
//   tabs: TabKey[];
//   activeTab: TabKey;
//   onTabChange: (tab: TabKey) => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">RAFSIA Admin Dashboard</h1>
//         <p className="text-gray-600 mt-2">Monitor and manage readiness assessment data</p>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200 mb-6 overflow-x-auto">
//         <nav className="-mb-px flex space-x-6">
//           {tabs.map((t) => {
//             const active = t === activeTab;
//             return (
//               <button
//                 key={t}
//                 onClick={() => onTabChange(t)}
//                 className={`whitespace-nowrap pb-3 px-1 inline-flex items-center gap-2 border-b-2 text-sm font-medium ${
//                   active
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 {ICONS[t]}
//                 <span className="capitalize">{t}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Tab Content */}
//       {children}
//     </div>
//   );
// }

'use client';
import React from 'react';
import { BarChart3, FileText, ListChecks, Layers3, Users, ClipboardList } from 'lucide-react';

type TabKey = 'submissions' | 'surveys' | 'questions' | 'answers' | 'projects' | 'users';

const ICONS: Record<TabKey, React.ReactNode> = {
  submissions: <BarChart3 className="h-5 w-5" />,
  surveys: <ClipboardList className="h-5 w-5" />,
  questions: <FileText className="h-5 w-5" />,
  answers: <ListChecks className="h-5 w-5" />,
  projects: <Layers3 className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
};

const TAB_LABELS: Record<TabKey, string> = {
  submissions: 'Submissions',
  surveys: 'Surveys',
  questions: 'Questions',
  answers: 'Answers',
  projects: 'Projects',
  users: 'Users',
};

export default function AdminLayout({
  tabs,
  activeTab,
  onTabChange,
  children,
}: {
  tabs: TabKey[];
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">RAFSIA Admin</h1>
          <p className="text-sm text-gray-600 mt-1">Dashboard</p>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-1 px-3">
            {tabs.map((tab) => {
              const active = tab === activeTab;
              return (
                <li key={tab}>
                  <button
                    onClick={() => onTabChange(tab)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      active
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {ICONS[tab]}
                    <span>{TAB_LABELS[tab]}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              {ICONS[activeTab]}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{TAB_LABELS[activeTab]}</h2>
                <p className="text-sm text-gray-600 mt-1">Monitor and manage readiness assessment data</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
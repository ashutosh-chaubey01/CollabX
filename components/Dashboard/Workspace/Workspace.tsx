"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Templates from "@/components/Templates/templates";
import Editing from "@/components/Editing/editing";
import MyCard from "@/components/MyCard/MyCard";

interface WorkspaceProps {
  isTemplate: boolean;
  isEditing: boolean;
  isMyCard: boolean;
}

function Workspace({ isTemplate, isEditing, isMyCard }: WorkspaceProps) {
  const [showToast, setShowToast] = useState(false);
  const [template, setTemplate] = useState(2);

  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (isEditing) {
      return <Editing templateToUse={template} />;
    }
    if (isTemplate) {
      return <Templates template={template} setTemplate={setTemplate} />;
    }
    if (isMyCard) {
      return <MyCard />;
    }

    return (
      <div className="w-full h-full flex justify-center items-center">
        <Image
          className="opacity-30"
          src="/assets/images/db-bg.svg"
          width={300}
          height={300}
          alt=""
        />
      </div>
    );
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[300px] max-w-md">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚧</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Friends Feature is under development and will be available
                  soon!
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop / larger screens: keep original layout unchanged */}
      <main className="hidden md:flex w-full h-full justify-center items-center gap-10">
        {renderContent()}
      </main>
    </>
  );
}

export default Workspace;

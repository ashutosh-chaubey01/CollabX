"use client";
import Navbar from "@/components/Dashboard/NavigationBar";
import Sidebar from "@/components/Dashboard/Sidebar";
import Workspace from "@/components/Dashboard/Workspace/Workspace";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();

  const [activeView, setActiveView] = useState<
    "editing" | "template" | "pricing" | "friends" | "myCard"
  >("editing");

  const [isLoading, setIsLoading] = useState(true);

  const viewStates = {
    isEditing: activeView === "editing",
    isTemplate: activeView === "template",
    isMyCard: activeView === "myCard",
  };

  useEffect(() => {
    const controller = new AbortController();

    const verifySession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          setIsLoading(false); // ✅ CRITICAL
          router.replace("/auth");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setIsLoading(false); // ✅ CRITICAL
          router.replace("/auth");
        }
      }
    };

    void verifySession();
    return () => controller.abort();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#a0a5a5]/40">
        <p className="text-sm text-black/60">
          Loading your workspace…
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-[#a0a5a5]/80">
      <div className="w-[15%]">
        <Sidebar
          setIsTemplate={() => setActiveView("template")}
          setIsEditing={() => setActiveView("editing")}
          setIsMyCard={() => setActiveView("myCard")}
          isEditing={viewStates.isEditing}
        />
      </div>

      <div className="h-full w-[80%]">
        <Workspace {...viewStates} />
      </div>

      <Navbar
        toEditing={() => setActiveView("editing")}
        isTemplate={viewStates.isTemplate}
      />
    </div>
  );
}

export default Page;

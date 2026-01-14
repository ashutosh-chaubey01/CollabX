"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FiCreditCard,
  FiEdit,
  FiHome,
  FiLogOut,
  FiMonitor
} from "react-icons/fi";

interface SidebarProps {
  setIsTemplate: () => void;
  setIsEditing: () => void;
  // setIsFriends: () => void;
  // setIsPricing: () => void;
  setIsMyCard: () => void;
  isEditing: boolean;
}

function Sidebar({
  setIsTemplate,
  setIsEditing,
  // setIsPricing,
  // setIsFriends,
  setIsMyCard,
  isEditing,
}: SidebarProps) {
  const [selected, setSelected] = useState("Dashboard");
  const router = useRouter();

  const handleSelect = (view: string, onClick: () => void) => {
    setSelected(view);
    onClick();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error(error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("CollabX_user");
        localStorage.removeItem("CollabX_token");
      }
      router.push("/auth");
    }
  };

  React.useEffect(() => {
    if (isEditing) {
      setSelected("Edit Card");
    }
  }, [isEditing]);

  const open = true;

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen w-full shrink-0 border-r border-slate-300 bg-white/80 p-2 flex flex-col justify-between items-start"
      style={{
        width: "225px",
        fontFamily: "var(--font-lexend-variable)",
      }}>
      <div className="flex flex-col justify-start items-start w-full">
        <TitleSection />
        <div className="space-y-1 w-full">
          <Option
            open={open}
            Icon={FiHome}
            title="HomePage"
            selected={selected}
            setSelected={(view) => handleSelect(view, () => router.push("/"))}
          />
          {/* <Option
            open={open}
            Icon={FiDollarSign}
            title="Pricing"
            selected={selected}
            setSelected={(view) => handleSelect(view, setIsPricing)}
          /> */}
          <Option
            open={open}
            Icon={FiMonitor}
            title="Templates"
            selected={selected}
            setSelected={(view) => handleSelect(view, setIsTemplate)}
          />
          <Option
            open={open}
            Icon={FiEdit}
            title="Edit Card"
            selected={selected}
            setSelected={(view) => handleSelect(view, setIsEditing)}
          />
          {/* <Option
            open={open}
            Icon={FiUsers}
            title="Friends"
            selected={selected}
            setSelected={(view) => handleSelect(view, setIsFriends)}
          /> */}
          <Option
            open={open}
            Icon={FiCreditCard}
            title="My Card"
            selected={selected}
            setSelected={(view) => handleSelect(view, setIsMyCard)}
          />
        </div>
      </div>
      <Option
        open={open}
        Icon={FiLogOut}
        title="LogOut"
        selected={selected}
        setSelected={() => handleLogout()}
      />
    </motion.nav>
  );
}

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
}: {
  Icon: React.ComponentType;
  title: string;
  selected: string;
  setSelected: (value: string) => void;
  open: boolean;
}) => {
  const handleClick = () => {
    setSelected(title);
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-[#303030]"
          : "text-slate-500 hover:bg-slate-100"
      }`}>
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium">
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = () => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}>
            <span
              style={{ fontFamily: "var(--font-grifter-bold)" }}
              className="block uppercase text-[#2E2E2E] font-bold text-md tracking-wider hover:text-[#2E2E2E] hover:scale-[102%] active:scale-95 transition-colors duration-200 ease-in-out">
              CollabX
            </span>
            <span className="block text-xs text-slate-500">Dashboard</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 place-content-center rounded-md bg-[#d8dfde]">
      <Image src="/assets/icons/logo.svg" width={30} height={30} alt="" />
    </motion.div>
  );
};

export default Sidebar;

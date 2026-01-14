"use client";

import CardBack1 from "@/components/Editing/EditingCards/Card-1/CardBack1";
import CardFront1 from "@/components/Editing/EditingCards/Card-1/CardFront1";
import CardBack2 from "@/components/Editing/EditingCards/Card-2/CardBack2";
import CardFront2 from "@/components/Editing/EditingCards/Card-2/CardFront2";
import CardBack3 from "@/components/Editing/EditingCards/Card-3/CardBack3";
import CardFront3 from "@/components/Editing/EditingCards/Card-3/CardFront3";
import CardBack4 from "@/components/Editing/EditingCards/Card-4/CardBack4";
import CardFront4 from "@/components/Editing/EditingCards/Card-4/CardFront4";
import CardBack5 from "@/components/Editing/EditingCards/Card-5/CardBack5";
import CardFront5 from "@/components/Editing/EditingCards/Card-5/CardFront5";
import CardBack6 from "@/components/Editing/EditingCards/Card-6/CardBack6";
import CardFront6 from "@/components/Editing/EditingCards/Card-6/CardFront6";
import { useMemo, useState } from "react";
import ReactCardFlip from "react-card-flip";
import {
  FiAlertTriangle,
  FiCheck,
  FiCopy,
  FiRefreshCw,
  FiUserPlus,
} from "react-icons/fi";

const frontCards = [
  CardFront1,
  CardFront2,
  CardFront3,
  CardFront4,
  CardFront5,
  CardFront6,
];
const backCards = [
  CardBack1,
  CardBack2,
  CardBack3,
  CardBack4,
  CardBack5,
  CardBack6,
];

type PublicProfileViewProps = {
  user: {
    _id: string;
    fullName: string;
    jobTitle?: string;
    headline?: string;
    bio?: string;
    slug: string;
  };
  card?: {
    templateId: number;
    frontColors: { background: string; text: string };
    backColors: { background: string; text: string };
    links?: {
      linkedin?: string;
      twitter?: string;
      personal?: string;
      instagram?: string;
    };
    headline?: string;
    subHeadline?: string;
  };
  viewerId?: string | null;
  isFriend: boolean;
  shareUrl: string;
};

function PublicProfileView({
  user,
  card,
  viewerId,
  isFriend,
  shareUrl,
}: PublicProfileViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [friendState, setFriendState] = useState<
    "idle" | "loading" | "friend" | "error"
  >(isFriend ? "friend" : "idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const templateIndex = useMemo(() => {
    if (
      typeof card?.templateId === "number" &&
      card.templateId >= 0 &&
      card.templateId < frontCards.length
    ) {
      return card.templateId;
    }
    return 0;
  }, [card?.templateId]);

  const FrontCard = frontCards[templateIndex];
  const BackCard = backCards[templateIndex];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatusMessage("Copied share link to clipboard");
      setTimeout(() => setStatusMessage(null), 2000);
    } catch {
      setStatusMessage("Unable to copy link");
    }
  };

  const handleAddFriend = async () => {
    if (!viewerId) {
      setStatusMessage("Login to add this creator");
      return;
    }
    if (friendState === "loading" || friendState === "friend") return;
    try {
      setFriendState("loading");
      setStatusMessage(null);
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: user._id }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Unable to add friend");
      }
      setFriendState("friend");
      setStatusMessage("Added to your crew!");
    } catch (error) {
      setFriendState("error");
      setStatusMessage((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-100 flex flex-col items-center justify-start py-12 px-4 gap-10">
      <div className="w-full max-w-4xl flex flex-col items-center gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-black/40">
          CollabX profile
        </p>
        <h1 className="text-4xl font-semibold text-black/80 text-center">
          {user.fullName}
        </h1>
        <p className="text-black/60 text-sm">{user.jobTitle}</p>
        <p className="text-center text-black/60 max-w-2xl">
          {user.headline ||
            card?.headline ||
            "Digital identity that travels with you."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full border border-black/10 text-black/70 hover:bg-black/5">
            <FiCopy /> Copy share link
          </button>
          <button
            type="button"
            onClick={() => setIsFlipped((prev) => !prev)}
            className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full border border-black/10 text-black/70 hover:bg-black/5">
            <FiRefreshCw /> Flip card
          </button>
        </div>
        {statusMessage && (
          <p className="text-xs text-black/50">{statusMessage}</p>
        )}
      </div>

      <div className="w-full flex flex-col items-center gap-6">
        <div className="w-full flex justify-center">
          <div className="w-[600px] h-[400px] flex justify-center items-center">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
              <div onClick={() => setIsFlipped(true)}>
                <FrontCard
                  word={card?.headline || user.fullName}
                  bgColor={card?.frontColors?.background || "#131C2D"}
                  textColor={card?.frontColors?.text || "#FFFFFF"}
                />
              </div>
              <div onClick={() => setIsFlipped(false)}>
                <BackCard
                  name={user.fullName}
                  linkedin={card?.links?.linkedin || "#"}
                  twitter={card?.links?.twitter || "#"}
                  personal={card?.links?.personal || "#"}
                  jobTitle={card?.subHeadline || user.jobTitle || ""}
                  bio={user.bio || ""}
                  instagram={card?.links?.instagram || ""}
                  bgColor={card?.backColors?.background || "#131C2D"}
                  textColor={card?.backColors?.text || "#FFFFFF"}
                />
              </div>
            </ReactCardFlip>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-black/60">
            {viewerId === user._id
              ? "This is your card preview."
              : "Add this creator to your CollabX friends list."}
          </p>
          <button
            type="button"
            disabled={
              !viewerId || friendState === "loading" || viewerId === user._id
            }
            onClick={handleAddFriend}
            className="hidden items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors bg-black hover:bg-black/80">
            {friendState === "friend" ? (
              <>
                <FiCheck /> Connected
              </>
            ) : friendState === "loading" ? (
              <>
                <FiRefreshCw className="animate-spin" /> Sending request...
              </>
            ) : friendState === "error" ? (
              <>
                <FiAlertTriangle /> Retry
              </>
            ) : (
              <>
                <FiUserPlus /> Add friend
              </>
            )}
          </button>
          {!viewerId && (
            <p className="text-xs text-black/40">
              Sign in to connect with this creator.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicProfileView;

"use client";

import React, { useMemo, useState } from "react";
import ReactCardFlip from "react-card-flip";
import CardFront1 from "@/components/Editing/EditingCards/Card-1/CardFront1";
import CardFront2 from "@/components/Editing/EditingCards/Card-2/CardFront2";
import CardFront3 from "@/components/Editing/EditingCards/Card-3/CardFront3";
import CardFront4 from "@/components/Editing/EditingCards/Card-4/CardFront4";
import CardFront5 from "@/components/Editing/EditingCards/Card-5/CardFront5";
import CardFront6 from "@/components/Editing/EditingCards/Card-6/CardFront6";
import CardBack1 from "@/components/Editing/EditingCards/Card-1/CardBack1";
import CardBack2 from "@/components/Editing/EditingCards/Card-2/CardBack2";
import CardBack3 from "@/components/Editing/EditingCards/Card-3/CardBack3";
import CardBack4 from "@/components/Editing/EditingCards/Card-4/CardBack4";
import CardBack5 from "@/components/Editing/EditingCards/Card-5/CardBack5";
import CardBack6 from "@/components/Editing/EditingCards/Card-6/CardBack6";

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
    socials?: {
      linkedin?: string;
      twitter?: string;
      personal?: string;
      instagram?: string;
    };
  };
  card?: {
    templateId: number;
    frontColors: { background: string; text: string };
    backColors: { background: string; text: string };
    socials?: {
      linkedin?: string;
      twitter?: string;
      personal?: string;
      instagram?: string;
    };
    headline?: string;
    subHeadline?: string;
  };
  viewerId: string | null;
  isFriend: boolean;
  shareUrl: string;
};

function PublicProfileView({
  user,
  card,
  viewerId,
  isFriend: initialIsFriend,
  shareUrl,
}: PublicProfileViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFriend, setIsFriend] = useState(initialIsFriend);

  const templateIndex = useMemo(() => {
    if (
      card &&
      typeof card.templateId === "number" &&
      card.templateId >= 0 &&
      card.templateId < frontCards.length
    ) {
      return card.templateId;
    }
    return 0;
  }, [card]);

  const FrontCard = frontCards[templateIndex];
  const BackCard = backCards[templateIndex];

  const isOwnProfile = viewerId !== null && viewerId === user._id.toString();

  const handleAddFriend = async () => {
    if (!viewerId) {
      // Redirect to login with the current card URL as return destination
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `/auth?returnUrl=${returnUrl}`;
      return;
    }

    if (isOwnProfile) {
      alert("You cannot add yourself as a friend");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          friendId: user._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Session expired, redirect to login
          const returnUrl = encodeURIComponent(window.location.href);
          window.location.href = `/auth?returnUrl=${returnUrl}`;
          return;
        }
        alert(data.message || "Failed to add friend");
        return;
      }

      setIsFriend(true);
      alert(`${user.fullName} has been added to your friends!`);
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("An error occurred while adding friend");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.fullName}'s Profile`,
          text: `Check out ${user.fullName}'s profile`,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Profile link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        alert("Failed to copy link");
      }
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Adding...";
    if (isFriend) return "Friends ✓";
    return "Add Friend";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
      <div className="flex flex-col items-center gap-6 max-w-full">
        {/* Card container with rotation only on mobile */}
        <div className="flex justify-center items-center">
          <div
            className="md:transform-none transform rotate-90 origin-center"
            style={{
              width: "400px",
              height: "600px",
              maxWidth: "90vh",
              maxHeight: "90vw",
            }}>
            <div className="w-full h-full flex justify-center items-center">
              <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <div
                  onClick={() => setIsFlipped(true)}
                  className="cursor-pointer w-full h-full flex items-center justify-center">
                  <FrontCard
                    word={card?.headline || user.headline || user.fullName}
                    bgColor={card?.frontColors?.background || "#131C2D"}
                    textColor={card?.frontColors?.text || "#FFFFFF"}
                  />
                </div>
                <div
                  onClick={() => setIsFlipped(false)}
                  className="cursor-pointer w-full h-full flex items-center justify-center">
                  <BackCard
                    name={user.fullName}
                    linkedin={
                      card?.socials?.linkedin || user.socials?.linkedin || "#"
                    }
                    twitter={
                      card?.socials?.twitter || user.socials?.twitter || "#"
                    }
                    personal={
                      card?.socials?.personal || user.socials?.personal || "#"
                    }
                    jobTitle={card?.subHeadline || user.jobTitle || ""}
                    bio={user.bio || ""}
                    instagram={
                      card?.socials?.instagram || user.socials?.instagram || ""
                    }
                    bgColor={card?.backColors?.background || "#131C2D"}
                    textColor={card?.backColors?.text || "#FFFFFF"}
                  />
                </div>
              </ReactCardFlip>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <p className="text-sm text-gray-600">Click the card to flip it</p>

          <div className="flex flex-wrap gap-3 justify-center">
            {!isOwnProfile ? (
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddFriend}
                disabled={isLoading || isFriend}>
                {getButtonText()}
              </button>
            ) : (
              <p className="px-6 py-2 text-sm text-gray-500 italic">
                This is your profile
              </p>
            )}

            <button
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              onClick={handleShare}>
              Share Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfileView;

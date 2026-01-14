/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { normalizeUrl } from "@/lib/urls";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit3, FiSave, FiX } from "react-icons/fi";
import Pallate from "./Color/pallate";

interface editingProps {
  templateToUse: number;
}

function Editing({ templateToUse }: editingProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState("");
  const [isbg, setIsbg] = useState(false);
  const [isText, setIsText] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [frontBackgroundColor, setFrontBackgroundColor] = useState("#a1a1a1");
  const [frontTextColor, setFrontTextColor] = useState("#000000");
  const [backBackgroundColor, setBackBackgroundColor] = useState("#a1a1a1");
  const [backTextColor, setBackTextColor] = useState("#000000");
  const [sessionUser, setSessionUser] = useState<{
    _id: string;
    fullName: string;
  } | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [cardFields, setCardFields] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const hydrationRef = useRef(true);
  const [isLoadingCard, setIsLoadingCard] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".boxx", { opacity: 0 }, { opacity: 1, duration: 0.75 });
  }, [isFlipped]);

  useEffect(() => {
    const controller = new AbortController();

    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = await response.json();
        setSessionUser(data.user);

        if (data.user?._id) {
          const userResponse = await fetch(`/api/users/${data.user._id}`, {
            credentials: "include",
            signal: controller.signal,
          });
          if (userResponse.ok) {
            const userDataResponse = await userResponse.json();
            setUserData({
              fullName: userDataResponse.user.fullName,
              jobTitle: userDataResponse.user.jobTitle,
              bio: userDataResponse.user.bio,
              headline: userDataResponse.user.headline,
              socials: userDataResponse.user.socials,
            });
          }
        }
      } catch (error) {}
    };

    loadSession();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!isFlipped && isbg) setFrontBackgroundColor(selectedColor);
  }, [isFlipped, isbg, selectedColor]);

  useEffect(() => {
    if (!isFlipped && isText) setFrontTextColor(selectedColor);
  }, [isFlipped, isText, selectedColor]);

  useEffect(() => {
    if (isFlipped && isbg) setBackBackgroundColor(selectedColor);
  }, [isFlipped, isbg, selectedColor]);

  useEffect(() => {
    if (isFlipped && isText) setBackTextColor(selectedColor);
  }, [isFlipped, isText, selectedColor]);

  // Track changes but don't auto-save
  useEffect(() => {
    if (hydrationRef.current) return;
    setHasChanges(true);
  }, [
    frontBackgroundColor,
    frontTextColor,
    backBackgroundColor,
    backTextColor,
    cardFields,
  ]);

  useEffect(() => {
    if (!sessionUser) return;

    let mounted = true;

    const loadCard = async () => {
      try {
        setIsLoadingCard(true);

        const response = await fetch(`/api/cards?userId=${sessionUser._id}`, {
          credentials: "include",
        });

        const data = await response.json();

        const cards = data.cards || [];
        const sorted = [...cards].sort(
          (a: any, b: any) =>
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
        );
        const card = sorted[0];

        hydrationRef.current = true;

        if (card) {
          setFrontBackgroundColor(card.frontColors.background);
          setFrontTextColor(card.frontColors.text);
          setBackBackgroundColor(card.backColors.background);
          setBackTextColor(card.backColors.text);

          setCardFields({
            headline: card.headline || userData?.headline,
            subHeadline: card.subHeadline || userData?.jobTitle,
            links: card.links || userData?.socials,
            name: userData?.fullName,
          });
        } else if (userData) {
          setCardFields({
            headline: userData.headline,
            subHeadline: userData.jobTitle,
            links: userData.socials,
            name: userData.fullName,
          });
        }

        setHasChanges(false);
      } finally {
        if (mounted) setIsLoadingCard(false);
        hydrationRef.current = false;
      }
    };

    loadCard();
    return () => {
      mounted = false;
    };
  }, [sessionUser, templateToUse, userData]);

  const saveCard = useCallback(async () => {
    if (!sessionUser) {
      toast.error("Please log in to save");
      return;
    }

    if (!hasChanges) {
      toast("No changes to save", { icon: "ℹ️" });
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/cards", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: templateToUse,
          frontColors: {
            background: frontBackgroundColor,
            text: frontTextColor,
          },
          backColors: {
            background: backBackgroundColor,
            text: backTextColor,
          },
          headline: cardFields.headline,
          subHeadline: cardFields.subHeadline,
          links: cardFields.links
            ? {
                linkedin: cardFields.links.linkedin
                  ? normalizeUrl(cardFields.links.linkedin)
                  : undefined,
                twitter: cardFields.links.twitter
                  ? normalizeUrl(cardFields.links.twitter)
                  : undefined,
                personal: cardFields.links.personal
                  ? normalizeUrl(cardFields.links.personal)
                  : undefined,
                instagram: cardFields.links.instagram
                  ? normalizeUrl(cardFields.links.instagram)
                  : undefined,
              }
            : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error();

      await fetch("/api/cards/delete-multiple", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latestId: data.card._id }),
      });

      setHasChanges(false);
      toast.success("Card saved successfully!");
    } catch (error) {
      toast.error("Failed to save card");
    } finally {
      setIsSaving(false);
    }
  }, [
    sessionUser,
    hasChanges,
    templateToUse,
    frontBackgroundColor,
    frontTextColor,
    backBackgroundColor,
    backTextColor,
    cardFields,
  ]);

  // REMOVED: Auto-save useEffect that was triggering on hasChanges

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

  const FrontCard = frontCards[templateToUse];
  const BackCard = backCards[templateToUse];

  const handleColorClick = (color: string) => setSelectedColor(color);

  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      <Toaster position="top-right" />

      <div className="pallate z-50 w-full px-5">
        <Pallate onColorClick={handleColorClick} />
      </div>

      <div className="flex justify-center items-center">
        <div
          className={`relative flex flex-col justify-center items-center gap-5 ${
            isEditing === "editing" ? "translate-y-12" : "translate-y-0"
          } transition-transform duration-500`}>
          <div className="w-[600px] h-[400px] flex justify-center items-center cursor-pointer">
            <ReactCardFlip flipDirection="vertical" isFlipped={isFlipped}>
              <div onClick={() => setIsFlipped(!isFlipped)}>
                <FrontCard
                  word={cardFields.headline || "CollabX"}
                  bgColor={frontBackgroundColor}
                  textColor={frontTextColor}
                />
              </div>

              <div onClick={() => setIsFlipped(!isFlipped)}>
                <BackCard
                  name={cardFields.name || "User"}
                  linkedin={cardFields.links?.linkedin || "#"}
                  twitter={cardFields.links?.twitter || "#"}
                  personal={cardFields.links?.personal || "#"}
                  jobTitle={cardFields.subHeadline || ""}
                  bio={userData?.bio || ""}
                  instagram={cardFields.links?.instagram || "#"}
                  bgColor={backBackgroundColor}
                  textColor={backTextColor}
                />
              </div>
            </ReactCardFlip>
          </div>

          <div className="flex justify-center items-center gap-3">
            {isEditing === "editing" && (
              <div
                onClick={() => {
                  const turningOn = !isbg;
                  setIsbg(turningOn);
                  if (turningOn) {
                    setIsText(false);
                    setSelectedColor(
                      !isFlipped ? frontBackgroundColor : backBackgroundColor
                    );
                  }
                }}
                className={`boxx w-[150px] h-[40px] shadow rounded-md grid place-content-center text-sm cursor-pointer transition-colors duration-200 ${
                  isbg
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}>
                {!isFlipped ? "Front Background" : "Back Background"}
              </div>
            )}

            <div
              onClick={() =>
                setIsEditing(isEditing === "editing" ? "completed" : "editing")
              }
              className="size-10 grid place-content-center rounded-md bg-white cursor-pointer shadow hover:bg-gray-100 transition-colors duration-200">
              {isEditing === "editing" ? <FiX /> : <FiEdit3 />}
            </div>

            {isEditing === "editing" && (
              <div
                onClick={() => {
                  const turningOn = !isText;
                  setIsText(turningOn);
                  if (turningOn) {
                    setIsbg(false);
                    setSelectedColor(
                      !isFlipped ? frontTextColor : backTextColor
                    );
                  }
                }}
                className={`boxx w-[150px] h-[40px] shadow rounded-md grid place-content-center text-sm cursor-pointer transition-colors duration-200 ${
                  isText
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}>
                {!isFlipped ? "Front Text" : "Back Text"}
              </div>
            )}

            <div
              onClick={saveCard}
              className={`size-10 grid place-content-center rounded-md shadow cursor-pointer transition-all duration-200 relative ${
                isSaving
                  ? "opacity-50 cursor-not-allowed bg-gray-100"
                  : hasChanges
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}>
              <FiSave />
              {hasChanges && !isSaving && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editing;

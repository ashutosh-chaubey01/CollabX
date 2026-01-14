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
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FiCopy, FiShare2, FiX } from "react-icons/fi";

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

type SocialLinks = {
  linkedin?: string;
  twitter?: string;
  personal?: string;
  instagram?: string;
};

type CardData = {
  _id: string;
  templateId: number;
  frontColors: { background: string; text: string };
  backColors: { background: string; text: string };
  links?: SocialLinks;
  headline?: string;
  subHeadline?: string;
  updatedAt: string;
};

type UserProfile = {
  _id: string;
  fullName: string;
  jobTitle?: string;
  bio?: string;
  headline?: string;
  socials?: SocialLinks;
};

function MyCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState<CardData | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadCard = async () => {
      try {
        const sessionResponse = await fetch("/api/auth/session", {
          credentials: "include",
        });
        if (!sessionResponse.ok) {
          setIsLoading(false);
          return;
        }

        const sessionData = await sessionResponse.json();
        const userId: string = sessionData.user?._id;
        if (!userId) {
          setIsLoading(false);
          return;
        }

        setUserData({
          _id: userId,
          fullName: sessionData.user.fullName,
        });

        const cardsResponse = await fetch("/api/cards", {
          credentials: "include",
        });
        const cardsJson: { cards: CardData[] } = await cardsResponse.json();

        let savedCard: CardData | null = null;

        if (Array.isArray(cardsJson.cards) && cardsJson.cards.length > 0) {
          const sorted = [...cardsJson.cards].sort(
            (a, b) =>
              new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
          );

          savedCard = sorted[0];

          const oldCards = sorted.slice(1);

          if (oldCards.length > 0) {
            const ids = oldCards.map((c) => c._id);

            await fetch("/api/cards/delete-multiple", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids }),
            });
          }
        }

        if (savedCard) setCard(savedCard);

        const userResponse = await fetch(`/api/users/${userId}`, {
          credentials: "include",
        });

        if (userResponse.ok) {
          const userDataJson: { user: UserProfile } = await userResponse.json();
          setUserData({
            _id: userId,
            fullName: userDataJson.user.fullName,
            jobTitle: userDataJson.user.jobTitle,
            bio: userDataJson.user.bio,
            headline: userDataJson.user.headline,
            socials: userDataJson.user.socials,
          });
        }

        const protocol = window.location.protocol;
        const host = window.location.host;
        setShareUrl(`${protocol}//${host}/card/user/${userId}`);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCard();
  }, []);

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("Link copied!");
      setTimeout(() => setCopyStatus(null), 2000);
      setShowShareMenu(false);
    } catch {
      setCopyStatus("Failed to copy link");
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  const handleShowQRCode = () => {
    setShowQRCode(true);
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-sm text-black/60">Loading your card...</p>
      </div>
    );
  }

  if (!card && !userData) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <p className="text-sm text-black/60">No card found</p>
        <p className="text-xs text-black/40">
          Create and save a card in the Edit Card section first
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-black/90">My Card</h2>
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-stone-700 transition-colors">
            <FiShare2 />
            <span>Share</span>
          </button>

          {showShareMenu && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-[200px]">
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2 transition-colors">
                <FiCopy />
                <span>Copy Link</span>
              </button>
              <button
                onClick={handleShowQRCode}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2 transition-colors border-t border-gray-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <span>Show QR Code</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {copyStatus && (
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm">
          {copyStatus}
        </div>
      )}

      <div className="w-[600px] h-[400px] flex justify-center items-center">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <div onClick={() => setIsFlipped(true)} className="cursor-pointer">
            <FrontCard
              word={
                card?.headline ||
                userData?.headline ||
                userData?.fullName ||
                "CollabX"
              }
              bgColor={card?.frontColors.background || "#a1a1a1"}
              textColor={card?.frontColors.text || "#000"}
            />
          </div>

          <div onClick={() => setIsFlipped(false)} className="cursor-pointer">
            <BackCard
              name={userData?.fullName || "User"}
              linkedin={
                card?.links?.linkedin || userData?.socials?.linkedin || "#"
              }
              twitter={
                card?.links?.twitter || userData?.socials?.twitter || "#"
              }
              personal={
                card?.links?.personal || userData?.socials?.personal || "#"
              }
              jobTitle={card?.subHeadline || userData?.jobTitle || ""}
              bio={userData?.bio || ""}
              instagram={
                card?.links?.instagram || userData?.socials?.instagram || ""
              }
              bgColor={card?.backColors.background || "#a1a1a1"}
              textColor={card?.backColors.text || "#000"}
            />
          </div>
        </ReactCardFlip>
      </div>

      {showQRCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 relative">
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold">Scan to view card</h3>
            <QRCodeSVG value={shareUrl} size={256} />
            <p className="text-sm text-gray-600 text-center max-w-xs">
              Share this QR code to let others view your card
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCard;
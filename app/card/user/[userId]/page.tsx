import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Card from "@/models/Card";
import User from "@/models/User";
import PublicCardView from "@/components/PublicCardView/PublicCardView";

export default async function PublicCardPage({
  params,
}: {
  params: { userId: string };
}) {
  await connectToDatabase();
  const { userId } = params;

  // Validate userId format
  if (!userId || userId.length !== 24) {
    notFound();
  }

  // Get user
  const user = await User.findById(userId).lean();
  if (!user) {
    notFound();
  }

  // Get user's preferred template or first available card
  const preferredTemplate = user.cardPreferences?.defaultTemplateId;

  let card;
  if (preferredTemplate !== undefined) {
    card = await Card.findOne({
      userId: userId,
      templateId: preferredTemplate,
    }).lean();
  }

  if (!card) {
    card = await Card.findOne({ userId: userId }).lean();
  }

  return (
    <PublicCardView
      user={{
        _id: user._id.toString(),
        fullName: user.fullName,
        jobTitle: user.jobTitle,
        headline: user.headline,
        bio: user.bio,
        slug: user.slug,
        socials: user.socials,
      }}
      card={
        card
          ? {
              templateId: card.templateId,
              frontColors: card.frontColors,
              backColors: card.backColors,
              socials: card.socials,
              headline: card.headline,
              subHeadline: card.subHeadline,
            }
          : undefined
      }
      viewerId={null} // or your actual value, e.g., session user?
      isFriend={false} // or your actual logic here
      shareUrl="" // or the actual profile share URL
    />
  );
}

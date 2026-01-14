import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Card from "@/models/Card";
import Friend from "@/models/Friend";
import PublicProfileView from "@/components/PublicProfile/PublicProfileView";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";

type PublicProfilePageProps = {
  params: { slug: string };
};

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  await connectToDatabase();
  const user = await User.findOne({ slug: params.slug }).lean();
  if (!user) {
    notFound();
  }

  const preferredTemplate =
    user.cardPreferences?.defaultTemplateId ?? undefined;

  const card =
    (preferredTemplate !== undefined &&
      (await Card.findOne({
        userId: user._id,
        templateId: preferredTemplate,
      }).lean())) ||
    (await Card.findOne({ userId: user._id }).lean());

  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  let viewerId: string | null = null;
  if (token) {
    const payload = verifyAuthToken(token);
    if (payload) {
      viewerId = payload.userId;
    }
  }

  // Check if friendship exists in Friend collection
  let isFriend = false;
  if (viewerId) {
    const friendship = await Friend.findOne({
      userId: viewerId,
      friendId: user._id,
    }).lean();
    isFriend = !!friendship;
  }

  const headerStore = headers();
  const protocol =
    process.env.NEXT_PUBLIC_APP_URL?.startsWith("https://") ||
    headerStore.get("x-forwarded-proto") === "https"
      ? "https"
      : "http";
  const envHost = process.env.NEXT_PUBLIC_APP_URL?.replace(
    /^https?:\/\//,
    ""
  ).replace(/\/$/, "");
  const host =
    envHost ||
    headerStore.get("x-forwarded-host") ||
    headerStore.get("host") ||
    "localhost:3000";
  const shareUrl = `${protocol}://${host}/u/${user.slug}`;

  return (
    <PublicProfileView
      user={{
        _id: user._id.toString(),
        fullName: user.fullName,
        jobTitle: user.jobTitle,
        headline: user.headline,
        bio: user.bio,
        slug: user.slug,
      }}
      card={
        card
          ? {
              templateId: card.templateId,
              frontColors: card.frontColors,
              backColors: card.backColors,
              links: card.links,
              headline: card.headline,
              subHeadline: card.subHeadline,
            }
          : undefined
      }
      viewerId={viewerId}
      isFriend={isFriend}
      shareUrl={shareUrl}
    />
  );
}

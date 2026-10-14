import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  Mail,
  Shield,
  User,
  Sparkles,
  Users,
  Bookmark,
  RotateCw,
  AlertCircle,
  FileText,
 BadgeCheck, 
} from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { UserType } from "../Types/Profile";
import { PostType } from "../Types/Post.type";
import Loading from "./Loading/Loading";
import Avatars from "./Avatars";
import CreatePost from "./Posts/CreatePost";
import Posts from "./Posts/Posts";
import { getCurrentUserId } from "../utils/auth";

export default function Profile() {
  const { userLogin } = useContext(AuthContext);
  const token = localStorage.getItem("userToken");

  function getMyProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: token,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });

  const userData: UserType = data?.data?.data?.user || data?.data?.user;
  const currentUserId = userData?._id || userData?.id || getCurrentUserId();

  function getMyPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${currentUserId}/posts`,
      {
        headers: {
          token: token,
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
    refetch: refetchPosts,
    isFetching: isPostsFetching,
  } = useQuery({
    queryKey: ["getMyPosts", currentUserId],
    queryFn: getMyPosts,
    enabled: !!currentUserId && !!token,
  });

  const myPosts: PostType[] =
    postsData?.data?.posts || postsData?.data?.data?.posts || [];

  // Formatting dates safely
  const memberSince = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
      })
    : "2026";

  const birthDate = userData?.dateOfBirth
    ? new Date(userData.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  if (isLoading) {
    return <Loading text="Loading your profile data..." />;
  }

  if (isError) {
    return (
      <div
        className="max-w-md mx-auto my-20 p-8 rounded-3xl border text-center shadow-lg"
        style={{
          backgroundColor: "var(--surface-card)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Failed to load profile
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          {(error as Error)?.message ||
            "Something went wrong while fetching profile details."}
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-md shadow-purple-500/25 transition-all cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  const displayName = userData?.name || userLogin?.name || "Active Member";
  const displayUsername =
    userData?.username || userLogin?.username || "creator";
  const displayEmail =
    userData?.email || userLogin?.email || "user@social-app.com";
  const displayPhoto = userData?.photo || userLogin?.photo;

  return (
    <>
      <Helmet>
        <title>{displayName} | Profile</title>
        <meta name="description" content={`Profile page of ${displayName}`} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* ── Profile Header Card ── */}
        <div
          className="rounded-3xl border overflow-hidden shadow-xl"
          style={{
            backgroundColor: "var(--surface-card)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Cover Banner */}
          <div className="h-44 sm:h-56 w-full relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500">
            {userData?.cover ? (
              <img
                src={userData.cover}
                alt="Profile Cover"
                className="w-full h-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          </div>

          {/* Profile Details Container */}
          <div className="px-6 sm:px-10 pb-8 pt-0 relative">
            {/* Avatar row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              <div className="relative inline-block">
                <Avatars
                  src={displayPhoto}
                  name={displayName}
                  size="2xl"
                  showStatus={true}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl ring-4 ring-white dark:ring-neutral-900 shadow-xl shrink-0"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  title="Refresh profile"
                  className="p-2.5 rounded-xl border hover:opacity-80 transition-all cursor-pointer"
                  style={{
                    backgroundColor: "var(--surface-subtle)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-muted)",
                  }}
                >
                  <RotateCw
                    className={`w-4 h-4 ${isFetching ? "animate-spin text-purple-500" : ""}`}
                  />
                </button>
                <Link
                  to="/home"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-md shadow-purple-500/25 transition-all"
                >
                  <span>View Feed</span>
                </Link>
              </div>
            </div>

            {/* User Info */}
            <div>
              <div className="flex items-center gap-3">
                <h1
                  className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {displayName}
                </h1>
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{
                    backgroundColor: "var(--accent-purple-bg)",
                    borderColor: "var(--accent-purple-border)",
                    color: "var(--brand-primary)",
                  }}
                > 

               <div className="mt-1 "><BadgeCheck /> </div>
                  Verified
                </span>
              </div>
              

              <p
                className="text-sm mt-1 flex flex-wrap items-center gap-2"
                style={{ color: "var(--text-muted)" }}
              >
                <span>@{displayUsername}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {displayEmail}
                </span>
                {birthDate && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      <span>Born {birthDate}</span>
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Follow / Bookmarks Counters */}
            <div
              className="flex items-center gap-6 mt-5 py-4 px-5 rounded-2xl border"
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {userData?.followersCount ?? userData?.followers?.length ?? 0}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Followers
                </span>
              </div>
              <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" />
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {userData?.followingCount ?? userData?.following?.length ?? 0}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Following
                </span>
              </div>
              <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {userData?.bookmarksCount ?? userData?.bookmarks?.length ?? 0}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Bookmarks
                </span>
              </div>
            </div>

            {/* Stats Badges Grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {[
                {
                  label: "Community Status",
                  value: "Active",
                  icon: <Shield className="w-4 h-4 text-emerald-500" />,
                },
                {
                  label: "Gender",
                  value:
                    userData?.gender?.toLowerCase() === "female"
                      ? "Female"
                      : userData?.gender?.toLowerCase() === "male"
                      ? "Male"
                      : "Not specified",
                  icon: <User className="w-4 h-4 text-purple-500" />,
                },
                {
                  label: "Date of Birth",
                  value: birthDate || userData?.dateOfBirth?.slice(0, 10) || "Not provided",
                  icon: <Calendar className="w-4 h-4 text-pink-500" />,
                },
                {
                  label: "Member Since",
                  value: memberSince,
                  icon: <Calendar className="w-4 h-4 text-cyan-500" />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface-subtle)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div
                    className="flex items-center gap-2 text-xs mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                  <div
                    className="text-base font-bold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Create Post on Profile ── */}
        <div className="mt-8">
          <CreatePost className="w-full" />
        </div>

        {/* ── My Posts Section ── */}
        <div className="mt-10">
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2
                    className="text-xl sm:text-2xl font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    My Posts
                  </h2>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                    style={{
                      backgroundColor: "var(--accent-purple-bg)",
                      borderColor: "var(--accent-purple-border)",
                      color: "var(--accent-purple-text)",
                    }}
                  >
                    {myPosts.length}
                  </span>
                </div>
                <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Everything you've posted and shared
                </p>
              </div>
            </div>

            <button
              onClick={() => refetchPosts()}
              disabled={isPostsLoading || isPostsFetching}
              type="button"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer disabled:opacity-50 hover:opacity-90 shadow-sm"
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${
                  isPostsLoading || isPostsFetching ? "animate-spin text-purple-500" : ""
                }`}
              />
              <span>Refresh Posts</span>
            </button>
          </div>

          {/* Posts Content */}
          {isPostsLoading ? (
            <div className="py-12">
              <Loading text="Loading your posts..." />
            </div>
          ) : isPostsError ? (
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-sm flex items-center justify-between">
              <span>
                {(postsError as any)?.response?.data?.message ||
                  postsError?.message ||
                  "Failed to load your posts"}
              </span>
              <button
                onClick={() => refetchPosts()}
                className="underline font-semibold hover:opacity-80 cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : myPosts.length > 0 ? (
            <div className="flex flex-col gap-6">
              {myPosts.map((post: PostType) => (
                <Posts key={post._id || post.id} post={post} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 px-6 border rounded-3xl"
              style={{
                backgroundColor: "var(--surface-card)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 text-2xl">
                ✍️
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                No posts published yet
              </h3>
              <p
                className="text-xs sm:text-sm max-w-sm mx-auto mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                You haven't shared any posts yet. Write your thoughts above and share them with everyone!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

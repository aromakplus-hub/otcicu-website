import Image from "next/image";
import { Quote } from "lucide-react";

export type Profile = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
};

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-ink-100 p-6">
      <div className="flex items-center gap-4">
        {profile.photo ? (
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-emerald-100">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </span>
        ) : (
          <span
            aria-hidden
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 font-display text-lg font-semibold text-white"
          >
            {profile.initials}
          </span>
        )}
        <div>
          <p className="font-display text-base font-semibold text-ink-900">{profile.name}</p>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">
            {profile.role}
          </p>
        </div>
      </div>
      <p className="relative text-sm leading-relaxed text-ink-500">
        <Quote size={14} className="mb-1 inline-block text-emerald-200" aria-hidden />
        {" "}
        {profile.bio}
      </p>
    </div>
  );
}

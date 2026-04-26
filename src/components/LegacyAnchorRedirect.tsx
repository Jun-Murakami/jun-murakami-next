'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

interface LegacyAnchorRedirectProps {
  // Map of legacy anchor id -> destination slug.
  // The hash on the home URL (e.g. `#zeroLimit`) will be redirected to
  // `/apps/<slug>`. Hashes are not sent to the server, so this redirect
  // has to live on the client.
  anchorToSlug: Record<string, string>;
}

export function LegacyAnchorRedirect({
  anchorToSlug,
}: LegacyAnchorRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;
    const slug = anchorToSlug[hash];
    if (!slug) return;
    router.replace(`/apps/${slug}`);
  }, [anchorToSlug, router]);

  return null;
}

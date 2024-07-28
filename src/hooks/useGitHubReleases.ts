'use client';
import { useState, useEffect } from 'react';

type ReleaseInfo = { version: string; body: string } | null;

const getLatestVersion = async (repoUrl: string): Promise<ReleaseInfo> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoUrl}/releases/latest`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GIT_HUB_PATOKEN}`,
      },
    });
    const data = await response.json();
    return {
      version: data.tag_name.replace('v', ''),
      body: data.body,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useGitHubReleases = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [releases, setReleases] = useState<Record<string, ReleaseInfo>>({});

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const repos = [
          'Jun-Murakami/TaskTrees-Electron',
          'Jun-Murakami/YomiganaConverter',
          'Jun-Murakami/AI-Browser',
          'Jun-Murakami/CubaseDrumMapEditor',
          'Jun-Murakami/dropboxskipper'
        ];

        const results = await Promise.all(repos.map(getLatestVersion));
        const newReleases = Object.fromEntries(
          repos.map((repo, index) => [repo.split('/')[1], results[index]])
        );


        setReleases(newReleases);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVersions();
  }, []);

  return { isLoading, releases };
};
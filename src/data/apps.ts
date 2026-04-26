import type { StaticImageData } from 'next/image';

import * as screenshots from '@/assets/screenshots';
import type { ja } from '@/locales/ja';

// Single source of truth for every app shown on the site.
// The home grid and the /apps/[slug] detail pages both render from this list.

export type AppCategory = 'tools' | 'music';

export type AppPlatform =
  | 'web'
  | 'desktop'
  | 'mobile'
  | 'plugin'
  | 'library';

export type AppLocaleKey = keyof typeof ja.apps;

export interface AppDefinition {
  slug: string;
  legacyAnchor: string;
  category: AppCategory;
  platforms: AppPlatform[];
  localeKey: AppLocaleKey;
  screenshot: StaticImageData;
  thumbnail: StaticImageData;
  /** Original filename inside src/assets/screenshots — used by the OG image generator to read the file from disk. */
  screenshotFile: string;
  noteUrl?: string;
  zennUrl?: string;
  gitHubUrl?: string;
  policyUrl?: string;
  gitHubRepo?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  webAppUrl?: string;
  windowsAppUrl?: string;
  macUniversalAppUrl?: string;
  windowsZipUrl?: string;
  macZipUrl?: string;
  linuxZipUrl?: string;
  demoUrl?: string;
  manualDownloadUrl?: string;
}

export const APPS: AppDefinition[] = [
  {
    slug: 'wlsib',
    legacyAnchor: 'wlsib',
    category: 'tools',
    platforms: ['web', 'mobile'],
    localeKey: 'wlsib',
    screenshot: screenshots.wlsib,
    thumbnail: screenshots.wlsib_s,
    screenshotFile: 'sc_wlsib.jpg',
    noteUrl: 'https://note.com/junmurakami/n/n36b1e198f287',
    gitHubUrl: 'https://github.com/Jun-Murakami/wlsib',
    policyUrl: '/privacy-policy-wlsib',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E3%83%AC%E3%83%B3%E3%82%BA%E4%BD%95%E6%8C%81%E3%81%A3%E3%81%A6%E3%81%8F/id6480391376',
    googlePlayUrl:
      'https://play.google.com/store/apps/details?id=com.wlsib.app',
    webAppUrl: 'https://lensdore-c55ce.web.app/',
  },
  {
    slug: 'ai-browser',
    legacyAnchor: 'aiBrowser',
    category: 'tools',
    platforms: ['desktop'],
    localeKey: 'aiBrowser',
    screenshot: screenshots.aiBrowser,
    thumbnail: screenshots.aiBrowser_s,
    screenshotFile: 'sc_ai_browser.jpg',
    gitHubRepo: 'Jun-Murakami/AI-Browser',
    noteUrl: 'https://note.com/junmurakami/n/n5d674f5977e6',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/3a885d936e8937',
    gitHubUrl: 'https://github.com/Jun-Murakami/AI-Browser',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/AI-Browser/releases/download/v{{version}}/AI-Browser-{{version}}-setup_win_x64.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/AI-Browser/releases/download/v{{version}}/AI-Browser-{{version}}_mac_universal.dmg',
  },
  {
    slug: 'lightroom-to-resolve',
    legacyAnchor: 'lightroom2Resolve',
    category: 'tools',
    platforms: ['desktop'],
    localeKey: 'lightroom2Resolve',
    screenshot: screenshots.lightroom2Resolve,
    thumbnail: screenshots.lightroom2Resolve_s,
    screenshotFile: 'sc_lightroom2resolve.jpg',
    gitHubRepo: 'Jun-Murakami/LightroomToResolve',
    noteUrl: 'https://note.com/junmurakami/n/n2737001eaf88',
    gitHubUrl: 'https://github.com/Jun-Murakami/LightroomToResolve',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/LightroomToResolve/releases/download/v{{version}}/LightroomToResolve_{{version}}_windows.zip',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/LightroomToResolve/releases/download/v{{version}}/LightroomToResolve_{{version}}_macOS.pkg',
  },
  {
    slug: 'keyfit',
    legacyAnchor: 'keyfit',
    category: 'tools',
    platforms: ['desktop'],
    localeKey: 'keyfit',
    screenshot: screenshots.keyfit,
    thumbnail: screenshots.keyfit_s,
    screenshotFile: 'sc_keyfit.jpg',
    gitHubRepo: 'Jun-Murakami/KeyFit',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/b7502bd19a97db',
    gitHubUrl: 'https://github.com/Jun-Murakami/KeyFit',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/KeyFit/releases/download/v{{version}}/KeyFit_{{version}}_x64_en-US.msi',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/KeyFit/releases/download/v{{version}}/KeyFit_{{version}}_universal.dmg',
  },
  {
    slug: 'tasktrees',
    legacyAnchor: 'tasktrees',
    category: 'tools',
    platforms: ['web', 'mobile', 'desktop'],
    localeKey: 'taskTrees',
    screenshot: screenshots.taskTrees,
    thumbnail: screenshots.taskTrees_s,
    screenshotFile: 'sc_tasktrees.jpg',
    gitHubRepo: 'Jun-Murakami/TaskTrees',
    noteUrl: 'https://note.com/junmurakami/n/n651efffaf343',
    gitHubUrl: 'https://github.com/Jun-Murakami/TaskTrees',
    policyUrl: '/privacy-policy-tasktrees',
    webAppUrl: 'https://tasktree-s.web.app/',
    appStoreUrl: 'https://apps.apple.com/jp/app/tasktrees/id6482979857',
    googlePlayUrl:
      'https://play.google.com/store/apps/details?id=com.tasktrees.app',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/TaskTrees/releases/download/v{{version}}/TaskTrees-{{version}}-setup_win_x64.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/TaskTrees/releases/download/v{{version}}/TaskTrees-{{version}}_mac_universal.dmg',
  },
  {
    slug: 'monaco-notepad',
    legacyAnchor: 'monacoNotepad',
    category: 'tools',
    platforms: ['desktop'],
    localeKey: 'monacoNotepad',
    screenshot: screenshots.monacoNotepad,
    thumbnail: screenshots.monacoNotepad_s,
    screenshotFile: 'sc_monaco_notepad.jpg',
    gitHubRepo: 'Jun-Murakami/monaco-notepad',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/e80016061b4df5',
    gitHubUrl: 'https://github.com/Jun-Murakami/monaco-notepad',
    policyUrl: '/privacy-policy-monaco-notepad',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/monaco-notepad/releases/download/v{{version}}/MonacoNotepad-win64-installer-{{version}}.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/monaco-notepad/releases/download/v{{version}}/MonacoNotepad-mac-universal-{{version}}.dmg',
  },
  {
    slug: 'dropbox-skipper',
    legacyAnchor: 'dropbox-skipper',
    category: 'tools',
    platforms: ['desktop'],
    localeKey: 'dropboxSkipper',
    screenshot: screenshots.dropboxSkipper,
    thumbnail: screenshots.dropboxSkipper_s,
    screenshotFile: 'sc_dropbox_skipper.jpg',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/1dc9d0a2ffa3d6',
    noteUrl: 'https://note.com/junmurakami/n/n0911c5853082',
    gitHubUrl: 'https://github.com/Jun-Murakami/dropboxskipper',
    gitHubRepo: 'Jun-Murakami/dropboxskipper',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/dropboxskipper/releases/download/v{{version}}/DropboxSkipper-win64-installer-{{version}}.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/dropboxskipper/releases/download/v{{version}}/DropboxSkipper-macOS-universal-{{version}}.dmg',
  },
  {
    slug: 'mixcompare',
    legacyAnchor: 'mixCompare',
    category: 'music',
    platforms: ['plugin', 'desktop'],
    localeKey: 'mixCompare',
    screenshot: screenshots.mixCompare,
    thumbnail: screenshots.mixCompare_s,
    screenshotFile: 'sc_mix_compare.jpg',
    gitHubRepo: 'Jun-Murakami/MixCompare',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/f9b3227fadfe7e',
    gitHubUrl: 'https://github.com/Jun-Murakami/MixCompare',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/MixCompare/releases/download/v{{version}}/MixCompare_{{version}}_Windows_Setup.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/MixCompare/releases/download/v{{version}}/MixCompare_{{version}}_macOS.pkg',
    windowsZipUrl:
      'https://github.com/Jun-Murakami/MixCompare/releases/download/v{{version}}/MixCompare_{{version}}_Windows_VST3_AAX_Standalone.zip',
    macZipUrl:
      'https://github.com/Jun-Murakami/MixCompare/releases/download/v{{version}}/MixCompare_{{version}}_macOS_VST3_AU_AAX_Standalone.zip',
    linuxZipUrl:
      'https://github.com/Jun-Murakami/MixCompare/releases/download/v{{version}}/MixCompare_{{version}}_Linux_VST3_LV2_CLAP_Standalone.zip',
    demoUrl: 'https://mixcompare-demo.web.app/',
  },
  {
    slug: 'zerolimit',
    legacyAnchor: 'zeroLimit',
    category: 'music',
    platforms: ['plugin', 'desktop'],
    localeKey: 'zeroLimit',
    screenshot: screenshots.zerolimit,
    thumbnail: screenshots.zerolimit_s,
    screenshotFile: 'sc_zerolimit.jpg',
    gitHubRepo: 'Jun-Murakami/ZeroLimit',
    gitHubUrl: 'https://github.com/Jun-Murakami/ZeroLimit',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/36ab3674237622',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/ZeroLimit/releases/download/v{{version}}/ZeroLimit_{{version}}_Windows_Setup.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/ZeroLimit/releases/download/v{{version}}/ZeroLimit_{{version}}_macOS.pkg',
    windowsZipUrl:
      'https://github.com/Jun-Murakami/ZeroLimit/releases/download/v{{version}}/ZeroLimit_{{version}}_Windows_VST3_AAX_Standalone.zip',
    macZipUrl:
      'https://github.com/Jun-Murakami/ZeroLimit/releases/download/v{{version}}/ZeroLimit_{{version}}_macOS_VST3_AU_AAX_Standalone.zip',
    linuxZipUrl:
      'https://github.com/Jun-Murakami/ZeroLimit/releases/download/v{{version}}/ZeroLimit_{{version}}_Linux_VST3_LV2_CLAP_Standalone.zip',
    demoUrl: 'https://zerolimit-demo.web.app/',
  },
  {
    slug: 'zerocomp',
    legacyAnchor: 'zeroComp',
    category: 'music',
    platforms: ['plugin', 'desktop'],
    localeKey: 'zeroComp',
    screenshot: screenshots.zerocomp,
    thumbnail: screenshots.zerocomp_s,
    screenshotFile: 'sc_zerocomp.jpg',
    gitHubRepo: 'Jun-Murakami/ZeroComp',
    gitHubUrl: 'https://github.com/Jun-Murakami/ZeroComp',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/36ab3674237622',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/ZeroComp/releases/download/v{{version}}/ZeroComp_{{version}}_Windows_Setup.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/ZeroComp/releases/download/v{{version}}/ZeroComp_{{version}}_macOS.pkg',
    windowsZipUrl:
      'https://github.com/Jun-Murakami/ZeroComp/releases/download/v{{version}}/ZeroComp_{{version}}_Windows_VST3_AAX_Standalone.zip',
    macZipUrl:
      'https://github.com/Jun-Murakami/ZeroComp/releases/download/v{{version}}/ZeroComp_{{version}}_macOS_VST3_AU_AAX_Standalone.zip',
    linuxZipUrl:
      'https://github.com/Jun-Murakami/ZeroComp/releases/download/v{{version}}/ZeroComp_{{version}}_Linux_VST3_LV2_CLAP_Standalone.zip',
    demoUrl: 'https://zerocomp-demo.web.app/',
  },
  {
    slug: 'zeroeq',
    legacyAnchor: 'zeroEq',
    category: 'music',
    platforms: ['plugin', 'desktop'],
    localeKey: 'zeroEq',
    screenshot: screenshots.zeroeq,
    thumbnail: screenshots.zeroeq_s,
    screenshotFile: 'sc_zeroeq.jpg',
    gitHubRepo: 'Jun-Murakami/ZeroEQ',
    gitHubUrl: 'https://github.com/Jun-Murakami/ZeroEQ',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/36ab3674237622',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/ZeroEQ/releases/download/v{{version}}/ZeroEQ_{{version}}_Windows_Setup.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/ZeroEQ/releases/download/v{{version}}/ZeroEQ_{{version}}_macOS.pkg',
    windowsZipUrl:
      'https://github.com/Jun-Murakami/ZeroEQ/releases/download/v{{version}}/ZeroEQ_{{version}}_Windows_VST3_AAX_Standalone.zip',
    macZipUrl:
      'https://github.com/Jun-Murakami/ZeroEQ/releases/download/v{{version}}/ZeroEQ_{{version}}_macOS_VST3_AU_AAX_Standalone.zip',
    linuxZipUrl:
      'https://github.com/Jun-Murakami/ZeroEQ/releases/download/v{{version}}/ZeroEQ_{{version}}_Linux_VST3_LV2_CLAP_Standalone.zip',
    demoUrl: 'https://zeroeq-demo.web.app/',
  },
  {
    slug: 'tinyvu',
    legacyAnchor: 'tinyVu',
    category: 'music',
    platforms: ['plugin', 'desktop'],
    localeKey: 'tinyVu',
    screenshot: screenshots.tinyvu,
    thumbnail: screenshots.tinyvu_s,
    screenshotFile: 'sc_tinyvu.jpg',
    gitHubRepo: 'Jun-Murakami/TinyVU',
    gitHubUrl: 'https://github.com/Jun-Murakami/TinyVU',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/TinyVU/releases/download/v{{version}}/TinyVU_{{version}}_Windows_Setup.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/TinyVU/releases/download/v{{version}}/TinyVU_{{version}}_macOS.pkg',
    windowsZipUrl:
      'https://github.com/Jun-Murakami/TinyVU/releases/download/v{{version}}/TinyVU_{{version}}_Windows_VST3_AAX_Standalone.zip',
    macZipUrl:
      'https://github.com/Jun-Murakami/TinyVU/releases/download/v{{version}}/TinyVU_{{version}}_macOS_VST3_AU_AAX_Standalone.zip',
    linuxZipUrl:
      'https://github.com/Jun-Murakami/TinyVU/releases/download/v{{version}}/TinyVU_{{version}}_Linux_VST3_LV2_CLAP_Standalone.zip',
    demoUrl: 'https://tinyvu-demo.web.app/',
  },
  {
    slug: 'testtone',
    legacyAnchor: 'testTone',
    category: 'music',
    platforms: ['plugin', 'desktop'],
    localeKey: 'testTone',
    screenshot: screenshots.testtone,
    thumbnail: screenshots.testtone_s,
    screenshotFile: 'sc_testtone.jpg',
    gitHubRepo: 'Jun-Murakami/TestTone',
    gitHubUrl: 'https://github.com/Jun-Murakami/TestTone',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/TestTone/releases/download/v{{version}}/TestTone_{{version}}_Windows_Setup.exe',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/TestTone/releases/download/v{{version}}/TestTone_{{version}}_macOS.pkg',
    windowsZipUrl:
      'https://github.com/Jun-Murakami/TestTone/releases/download/v{{version}}/TestTone_{{version}}_Windows_VST3_AAX_Standalone.zip',
    macZipUrl:
      'https://github.com/Jun-Murakami/TestTone/releases/download/v{{version}}/TestTone_{{version}}_macOS_VST3_AU_AAX_Standalone.zip',
    linuxZipUrl:
      'https://github.com/Jun-Murakami/TestTone/releases/download/v{{version}}/TestTone_{{version}}_Linux_VST3_LV2_CLAP_Standalone.zip',
    demoUrl: 'https://testtone-demo.web.app/',
  },
  {
    slug: 'vocal-take-manager',
    legacyAnchor: 'vocal-take-manager',
    category: 'music',
    platforms: ['web'],
    localeKey: 'vtm',
    screenshot: screenshots.vtm,
    thumbnail: screenshots.vtm_s,
    screenshotFile: 'sc_vtm.jpg',
    noteUrl: 'https://note.com/junmurakami/n/ndd161a2d0bd4',
    zennUrl: 'https://zenn.dev/jun_murakami/articles/2f11d63cf9bf9d',
    gitHubUrl: 'https://github.com/Jun-Murakami/vocal-take-manager',
    webAppUrl: 'https://vocal-take-manager.web.app/',
  },
  {
    slug: 'yomigana',
    legacyAnchor: 'yomigana',
    category: 'music',
    platforms: ['web'],
    localeKey: 'yomigana',
    screenshot: screenshots.yomigana,
    thumbnail: screenshots.yomigana_s,
    screenshotFile: 'sc_yomigana.jpg',
    noteUrl: 'https://note.com/junmurakami/n/n35cd70b8dc12',
    gitHubUrl: 'https://github.com/Jun-Murakami/yomigana3',
    webAppUrl: 'https://yomiganaconverterreact.web.app/',
  },
  {
    slug: 'cubase-drum-map-editor',
    legacyAnchor: 'cubaseDMEditor',
    category: 'music',
    platforms: ['desktop'],
    localeKey: 'cubaseDMEditor',
    screenshot: screenshots.cubaseDMEditor,
    thumbnail: screenshots.cubaseDMEditor_s,
    screenshotFile: 'sc_cubase_dm_editor.jpg',
    gitHubRepo: 'Jun-Murakami/CubaseDrumMapEditor',
    noteUrl: 'https://note.com/junmurakami/n/n13650982fc7f',
    gitHubUrl: 'https://github.com/Jun-Murakami/CubaseDrumMapEditor',
    windowsAppUrl:
      'https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v{{version}}/CubaseDrumMapEditor_v{{version}}_win.zip',
    macUniversalAppUrl:
      'https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v{{version}}/CubaseDrumMapEditor_v{{version}}_mac.dmg',
    manualDownloadUrl:
      'https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v1.0/DrumMaps20230810.zip',
  },
  {
    slug: 'famitone',
    legacyAnchor: 'famitone',
    category: 'music',
    platforms: ['library'],
    localeKey: 'famitone',
    screenshot: screenshots.famitone,
    thumbnail: screenshots.famitone_s,
    screenshotFile: 'sc_famitone.jpg',
    noteUrl: 'https://note.com/junmurakami/n/n1e525af59ada',
    manualDownloadUrl:
      'https://github.com/Jun-Murakami/Famitone/releases/download/v1.0/Famitone2A03_v1.0.zip',
  },
];

export const APP_BY_SLUG: Record<string, AppDefinition> = Object.fromEntries(
  APPS.map((app) => [app.slug, app]),
);

export const APP_BY_LEGACY_ANCHOR: Record<string, AppDefinition> =
  Object.fromEntries(APPS.map((app) => [app.legacyAnchor, app]));

export const APPS_BY_CATEGORY: Record<AppCategory, AppDefinition[]> = {
  tools: APPS.filter((app) => app.category === 'tools'),
  music: APPS.filter((app) => app.category === 'music'),
};

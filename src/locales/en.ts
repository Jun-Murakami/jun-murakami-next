export const en = {
  meta: {
    description:
      'Jun Murakami (Jun Takahashi) is a music director/producer. This site distributes applications and music production  libraries I have developed.',
  },
  intro: {
    text: 'Jun Murakami (Jun Takahashi) is a music director/producer. This site distributes applications and music production libraries I have developed.',
  },
  introPortfolio: {
    text: 'My portfolio site is',
  },
  introLink: {
    text: 'here.',
    url: 'https://jun-murakami.com',
  },
  appCategories: {
    tools: 'Tools',
    music: 'Music Production',
  },
  social: {
    note: 'note (Blog posts)',
    zenn: 'Zenn (Program-related articles)',
    twitter: 'X (Twitter)',
    instagram: 'Instagram',
    github: 'GitHub',
    imdb: 'IMDb (Film works)',
    vgmdb: 'VGMdb (Game/Anime music)',
    wikipedia: 'Wikipedia',
  },
  apps: {
    wlsib: {
      title: 'Which Lens Should I Bring?',
      description:
        'A helpful app for deciding which lenses to take when shooting, traveling, or attending events.',
      longDescription:
        'A helpful app for deciding which lenses to take when shooting, traveling, or attending events. You can visually simulate how shooting results will change by setting various shooting conditions. iOS and Android versions are also available.',
    },
    aiBrowser: {
      title: 'AI-Browser',
      description:
        'A dedicated chat AI browser supporting ChatGPT, Google Gemini, Claude, and more.',
      longDescription:
        "A dedicated chat AI browser supporting ChatGPT, Gemini, Google AI Studio, Claude, DeepSeek, Grok, Nani !?, Phind, Perplexity, Genspark, Felo, JENOVA, and Cody. You can cut and paste text in a wide editor that can be split up to 5 vertically and send prompts directly to each service. You can recall the same prompts from the sending history and send them in bulk. It integrates Terminal and Monaco Editor, so it's also suitable for programmers.",
    },
    lightroom2Resolve: {
      title: 'Lightroom To Resolve',
      description:
        'A one-click app that sends selected photos from Lightroom to DaVinci Resolve',
      longDescription:
        'A one-click app that sends selected photos from Lightroom to DaVinci Resolve and automatically creates a timeline with the correct resolution. It supports vertical orientation, multiple resolutions, RAW, and TIFF. Adobe DNG Converter is required.*When running install_windows.bat, you may see a security warning, but it simply copies the script to the designated location. If you are concerned, you can open the .bat file with Notepad or another text editor and copy it manually yourself. The macOS version is an app with Apple\'s certificate and signature.',
    },
    keyfit: {
      title: 'KeyFit',
      description:
        'A keyboard logger that visualizes frequently used keys and supports keyboard selection and customization.',
      longDescription:
        "A keyboard logger that visualizes frequently used keys and supports keyboard selection and customization. The date is recorded in one day units, so it's difficult to restore passwords, but it's a keyboard logger, so please handle it with care.",
    },
    taskTrees: {
      title: 'TaskTrees',
      description:
        'An app where you can freely create and organize tasks and memos in a tree format.',
      longDescription:
        'An app where you can freely create and organize tasks and memos in a tree format. You can also share trees with others. iOS and Android versions have been released.',
    },
    monacoNotepad: {
      title: 'Monaco Notepad',
      description:
        "An app that's like Evernote, VSCode, and Notepad combined and divided by about 10.",
      longDescription:
        "An app that's like Evernote, VSCode, and Notepad combined and divided by about 10. Designed for programmers. The editor part uses Monaco Editor (the same editor engine as VSCode). You can open and edit files directly, or convert them into notes that can be cloud-synced with Google Drive. Google Drive uses a dedicated folder in the user's Google account. (This app only accesses the dedicated folder)",
    },
    yomigana: {
      title: 'Yomigana Converter',
      description:
        'A lyrics input support tool for vocalist melody scores (so-called "melo-fu").',
      longDescription:
        'A lyrics input support tool for vocalist melody scores (so-called "melo-fu") that can be surprisingly time-consuming when done carefully. It\'s designed to convert existing kanji-mixed lyric cards into hiragana & katakana suitable for melody scores, which can then be imported into score creation software like Sibelius, Finale, and MuseScore. It\'s particularly useful with software that has continuous lyric input functionality with space separation. We\'ve also added features like "は"↔"わ" conversion, which is useful for Vocaloid and AI singer production.',
    },
    dropboxSkipper: {
      title: 'Dropbox Sync Skipper',
      description:
        'An app that allows you to set bulk exclusions for Dropbox with specified conditions.',
      longDescription:
        "An app that allows you to set bulk exclusions when you want to sync source code etc. with Dropbox but want to exclude specific files and folders (like node_modules, dist folder, etc.). Following Dropbox specifications, it modifies NTFS alternate file streams on Windows and extended attributes on MacOS/Linux. The file contents themselves are not changed, but please use at your own risk. Also, while the source code supports Linux, Dropbox testing has been minimal, so Linux users should build it themselves. (It's a very simple Wails app)",
    },
    cubaseDMEditor: {
      title: 'Cubase DrumMap Editor',
      description: 'A simple drum map editor for Cubase.',
      longDescription:
        "A simple drum map editor for Cubase. It supports .csv import and export, allowing editing in other software (like Excel). It's also suitable for sound source developers. As a bonus, I've created a variety of sound source drum maps that can be used by switching between multiple sound sources in one map.",
    },
    mixCompare: {
      title: 'MixCompare',
      description:
        'A VST3/AU/AAX plugin that lets you compare your DAW mix with reference tracks.',
      longDescription:
        "A VST3/AU/AAX plugin that loads audio files so you can compare them against the mix you're working on in your DAW. With host-synced playback you can perform precise A/B checks between different mix versions. It's useful for recording engineers and music directors, and especially for composers who manage many tracks, such as scoring, game soundtrack, and competition writers.",
    },
    famitone: {
      title: 'Famitone 2A03',
      description:
        'A KONTAKT sound library sampled from actual Famicom hardware.',
      longDescription:
        'A KONTAKT sound library sampled from actual Famicom hardware.',
    },
  },
  common: {
    download: 'here',
    downloadText: 'You can download it from',
    contact: 'Contact',
    noteArticle: 'Article on note',
    zennArticle: 'Article on Zenn',
    sourceCode: 'Source code',
    privacyPolicy: 'Privacy policy',
    windowsSecurityWarning: 'About Windows Security Warning',
    windowsSecurityWarningTitle: 'Windows Security Warning',
    windowsSecurityWarningDescription:
      'For Windows, a security warning will appear during installation. In that case, click "More info" and select "Run anyway".',
    windowsSecurityWarningNote:
      'This is a warning because the program is unsigned. Since the source code is public, if you have concerns, please check the code yourself and build it. (The macOS version is signed)',
  },
};

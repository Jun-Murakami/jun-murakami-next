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
  appPage: {
    backToTop: 'Back to all apps',
    openDemo: 'Open web demo in new tab',
    relatedTitle: 'More apps',
    demoTitle: 'Try in browser (web demo)',
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
    contact: 'Contact',
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
        "A dedicated chat AI browser supporting ChatGPT, Gemini, Claude, DeepSeek, Kimi, Grok, Nani !?, Perplexity, Genspark and Sakana Chat. You can cut and paste text in a wide editor that can be split up to 5 vertically and send prompts directly to each service. You can recall the same prompts from the sending history and send them in bulk. It integrates Terminal and Monaco Editor, so it's also suitable for programmers.",
    },
    lightroom2Resolve: {
      title: 'Lightroom To Resolve',
      description:
        'A one-click app that sends selected photos from Lightroom to DaVinci Resolve',
      longDescription:
        "A one-click app that sends selected photos from Lightroom to DaVinci Resolve and automatically creates a timeline with the correct resolution. It supports vertical orientation, multiple resolutions, RAW, and TIFF. Adobe DNG Converter is required.*When running install_windows.bat, you may see a security warning, but it simply copies the script to the designated location. If you are concerned, you can open the .bat file with Notepad or another text editor and copy it manually yourself. The macOS version is an app with Apple's certificate and signature.",
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
        "Notepad × VS Code × Evernote, divided by 10. iOS and Android versions are also available.",
      longDescription:
        "Notepad × VS Code × Evernote, divided by 10. Designed for programmers. The editor part uses Monaco Editor (the same editor engine as VS Code). You can open and edit local files directly, or convert them into notes that sync via Google Drive. Features include syntax highlighting for over 50 languages, Markdown preview with GitHub Flavored Markdown (GFM) and Mermaid diagram support, full-text search, and a side-by-side editing mode. iOS and Android companion apps are also available — they share the same Google Drive dedicated folder as the desktop version, so notes stay in sync across all your devices. Google Drive uses a dedicated folder in the user's Google account. (This app only accesses that dedicated folder.)",
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
        'A VST3/AU/AAX/LV2/CLAP plugin that lets you compare your DAW mix with reference tracks.',
      longDescription:
        "A VST3/AU/AAX/LV2/CLAP plugin that loads audio files so you can compare them against the mix you're working on in your DAW. Runs on macOS, Windows, and Linux. With host-synced playback you can perform precise A/B checks between different mix versions. It's useful for recording engineers and music directors, and especially for composers who manage many tracks, such as scoring, game soundtrack, and competition writers.",
      demoSiteText:
        'A web app demo is now available — give it a try in your browser.',
    },
    zeroLimit: {
      title: 'ZeroLimit',
      description:
        'A simple zero-latency limiter VST3/AU/AAX/LV2/CLAP plugin for broadcast and in-arrangement mastering.',
      longDescription:
        'A simple zero-latency limiter plugin ideal for streaming/broadcast and for masters used while arranging. Supports VST3/AU/AAX/LV2/CLAP and runs on macOS, Windows, and Linux. Despite running with zero latency, it also includes a multiband limit mode with a configurable number of bands.',
      demoSiteText:
        'A web app demo is now available — give it a try in your browser.',
    },
    zeroComp: {
      title: 'ZeroComp',
      description:
        'A simple zero-latency compressor VST3/AU/AAX/LV2/CLAP plugin.',
      longDescription:
        'A simple zero-latency compressor plugin. Supports VST3/AU/AAX/LV2/CLAP and runs on macOS, Windows, and Linux. Includes four different operating modes: VCA, Opt, FET, and Vari-Mu.',
      demoSiteText:
        'A web app demo is now available — give it a try in your browser.',
    },
    zeroEq: {
      title: 'ZeroEQ',
      description:
        'A simple zero-latency equalizer VST3/AU/AAX/LV2/CLAP plugin.',
      longDescription:
        'A simple yet carefully designed 11-band equalizer with a built-in spectrum analyzer. Supports VST3/AU/AAX/LV2/CLAP and runs on macOS, Windows, and Linux. Runs lightly with zero latency.',
      demoSiteText:
        'A web app demo is now available — give it a try in your browser.',
    },
    tinyVu: {
      title: 'TinyVU',
      description:
        "The world's smallest VU meter VST3/AU/AAX/LV2/CLAP plugin.",
      longDescription:
        "A VU meter plugin that can be shrunk down to a very small size. It's useful for event sound and live streaming on a laptop where every bit of screen space matters while still keeping an eye on levels. The meter behavior is modeled on the Waves VU meter and tracks it very closely. Supports VST3/AU/AAX/LV2/CLAP and runs on macOS, Windows, and Linux.",
      demoSiteText:
        'A web app demo is now available — give it a try in your browser.',
    },
    testTone: {
      title: 'TestTone',
      description:
        'A simple test signal generator VST3/AU/AAX/LV2/CLAP plugin.',
      longDescription:
        'A very simple test signal generator that lets you send the signal you need right away. Useful for setting up gear and various checks. Supports VST3/AU/AAX/LV2/CLAP and runs on macOS, Windows, and Linux.',
      demoSiteText:
        'A web app demo is now available — give it a try in your browser.',
    },
    vtm: {
      title: 'Vocal Take Manager',
      description:
        'A tool for vocal recording directors to manage vocal takes.',
      longDescription:
        "A tool for vocal recording directors to manage vocal takes. It marks evaluation scores for each lyric phrase and outputs the final OK take sheet. It's a web app, but all input data is processed on the user's device.",
    },
    famitone: {
      title: 'Famitone 2A03',
      description:
        'A KONTAKT sound library sampled from actual Famicom hardware.',
      longDescription:
        'A KONTAKT sound library sampled from actual Famicom hardware.',
    },
  },
  contact: {
    title: 'Contact Form',
    subject: 'Subject',
    name: 'Your Name',
    email: 'Email Address',
    body: 'Message',
    send: 'Send',
    back: 'Back',
    validationError: 'Please fill in all fields.',
    success: 'Your message has been sent.',
    error: 'Failed to send the message. Please try again later.',
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

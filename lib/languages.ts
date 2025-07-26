export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
]

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    news: 'News',
    transfers: 'Transfers',
    matches: 'Matches',
    analysis: 'Analysis',
    
    // Common
    readMore: 'Read More',
    loadMore: 'Load More',
    viewAll: 'View All',
    search: 'Search',
    
    // Homepage
    latestNews: 'Latest Football News',
    featuredStories: 'Featured Stories',
    recentTransfers: 'Recent Transfers',
    upcomingMatches: 'Upcoming Matches',
    
    // Categories
    confirmed: 'Confirmed',
    rumors: 'Rumors',
    previews: 'Previews',
    reports: 'Reports',
    tactical: 'Tactical',
    opinion: 'Opinion',
    
    // Time
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
  },
  ms: {
    // Navigation
    home: 'Utama',
    news: 'Berita',
    transfers: 'Pemindahan',
    matches: 'Perlawanan',
    analysis: 'Analisis',
    
    // Common
    readMore: 'Baca Selanjutnya',
    loadMore: 'Muat Lagi',
    viewAll: 'Lihat Semua',
    search: 'Cari',
    
    // Homepage
    latestNews: 'Berita Bola Sepak Terkini',
    featuredStories: 'Cerita Pilihan',
    recentTransfers: 'Pemindahan Terkini',
    upcomingMatches: 'Perlawanan Akan Datang',
    
    // Categories
    confirmed: 'Disahkan',
    rumors: 'Khabar Angin',
    previews: 'Pratonton',
    reports: 'Laporan',
    tactical: 'Taktikal',
    opinion: 'Pendapat',
    
    // Time
    minutesAgo: 'minit yang lalu',
    hoursAgo: 'jam yang lalu',
    daysAgo: 'hari yang lalu',
  },
  zh: {
    // Navigation
    home: '首页',
    news: '新闻',
    transfers: '转会',
    matches: '比赛',
    analysis: '分析',
    
    // Common
    readMore: '阅读更多',
    loadMore: '加载更多',
    viewAll: '查看全部',
    search: '搜索',
    
    // Homepage
    latestNews: '最新足球新闻',
    featuredStories: '精选故事',
    recentTransfers: '最新转会',
    upcomingMatches: '即将到来的比赛',
    
    // Categories
    confirmed: '已确认',
    rumors: '传言',
    previews: '预览',
    reports: '报告',
    tactical: '战术',
    opinion: '观点',
    
    // Time
    minutesAgo: '分钟前',
    hoursAgo: '小时前',
    daysAgo: '天前',
  }
}

export type TranslationKey = keyof typeof translations.en
export type SupportedLanguage = keyof typeof translations

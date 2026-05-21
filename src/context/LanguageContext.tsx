"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  id: {
    // Header
    "nav.about": "Tentang",
    "nav.howItWorks": "Cara Kerja",
    "nav.advantages": "Keunggulan",
    "nav.pools": "Pools",
    "nav.faq": "FAQ",
    "nav.connectWallet": "Connect Wallet",

    // Hero Section
    "hero.preTitle1": "Jutaan Orang Indonesia Sudah Paham DeFi",
    "hero.preTitle2": "Mereka Menyebutnya",
    "hero.title": "Arisan",
    "hero.description": "Selama puluhan tahun, arisan membuktikan bahwa kepercayaan bisa dibangun tanpa bank. Sekarang, kami membawanya ke level berikutnya dengan AI yang mengoptimalkan yield dan smart contract yang tidak bisa berbohong.",
    "hero.techLabel": "Powered by AI & Blockchain",
    "hero.scroll": "Scroll",

    // About Section
    "about.badge": "Apa itu Archa?",
    "about.title": "Arisan On-Chain dengan",
    "about.titleHighlight": "AI Yield Optimizer",
    "about.description": "<strong>Archa</strong> adalah protokol arisan terdesentralisasi yang dibangun di atas <strong>Mantle Network</strong>. Setiap peserta menyetorkan <strong>USDC</strong> secara berkala, dan giliran penerima ditentukan secara adil melalui smart contract. Yang membuat Archa berbeda: <strong>AI Yield Optimizer</strong> secara otomatis memutar dana ke protokol DeFi terbaik untuk menghasilkan yield optimal. Di akhir arisan, <strong>semua peserta dapat bonus dari yield yang dihasilkan!</strong>",
    "about.problemTitle": "Masalah Arisan Tradisional",
    "about.problemSubtitle": "Kendala yang sering terjadi",
    "about.solutionTitle": "Solusi dari Archa",
    "about.solutionSubtitle": "AI + Blockchain untuk arisan",
    "about.problem1.title": "Risiko Kabur",
    "about.problem1.desc": "Peserta kabur setelah dapat giliran pertama",
    "about.problem2.title": "Uang Nganggur",
    "about.problem2.desc": "Dana terkumpul tidak menghasilkan apa-apa",
    "about.problem3.title": "Catatan Manual",
    "about.problem3.desc": "Mudah dimanipulasi dan tidak transparan",
    "about.problem4.title": "Skala Terbatas",
    "about.problem4.desc": "Hanya bisa dengan keluarga atau teman dekat",
    "about.solution1.title": "Sistem Collateral",
    "about.solution1.desc": "Setor jaminan di awal, dikembalikan + yield jika konsisten",
    "about.solution2.title": "AI Yield Optimizer",
    "about.solution2.desc": "AI otomatis pilih protokol DeFi terbaik untuk yield maksimal",
    "about.solution3.title": "100% On-Chain",
    "about.solution3.desc": "Semua tercatat di blockchain, tidak bisa dimanipulasi",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan dengan siapa saja, dimana saja di dunia",
    "about.quote": "Gotong royong menghasilkan tradisi arisan, yang sudah mengalir dalam darah Indonesia.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "hadir untuk membuatnya lebih menguntungkan dengan AI.",
    "about.cta": "Lihat Cara Kerja",

    // How It Works Section
    "howItWorks.badge": "Cara Kerja",
    "howItWorks.title": "Semudah",
    "howItWorks.titleHighlight": "5 Langkah",
    "howItWorks.description": "Dari gabung hingga dapat bonus yield, semuanya otomatis dengan AI dan transparan di blockchain",
    "howItWorks.step1.title": "Pilih Pool Arisan",
    "howItWorks.step1.desc": "Pilih pool sesuai jumlah setoran (10/50/100 USDC) dan jumlah peserta (5/10/20 orang)",
    "howItWorks.step2.title": "Setor Collateral",
    "howItWorks.step2.desc": "Setor jaminan USDC. Collateral juga generate yield selama arisan berlangsung!",
    "howItWorks.step3.title": "Setoran Bulanan",
    "howItWorks.step3.desc": "Setor USDC tiap bulan. AI otomatis putar dana ke protokol DeFi dengan APY terbaik",
    "howItWorks.step4.title": "Dapat Giliran",
    "howItWorks.step4.desc": "Giliran random by smart contract. Dapat giliran = terima setoran bulan itu + accumulated yield",
    "howItWorks.step5.title": "Bonus Yield di Akhir",
    "howItWorks.step5.desc": "Arisan selesai: collateral kembali + yield dari collateral + share yield pool untuk semua!",
    "howItWorks.bottomText": "Siap untuk arisan yang lebih menguntungkan?",
    "howItWorks.cta": "Lihat Keunggulan",

    // Advantages Section
    "advantages.badge": "Keunggulan",
    "advantages.title": "Mengapa Memilih",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "AI + Blockchain membuat arisan lebih aman, transparan, dan menguntungkan",
    "advantages.adv1.title": "AI Yield Optimizer",
    "advantages.adv1.desc": "AI analisis real-time dan otomatis pilih protokol DeFi terbaik untuk yield maksimal.",
    "advantages.adv2.title": "Double Yield",
    "advantages.adv2.desc": "Yield dari pool fund + yield dari collateral. Dua sumber passive income!",
    "advantages.adv3.title": "Anti Kabur",
    "advantages.adv3.desc": "Sistem collateral menjamin komitmen. Kabur = kehilangan jaminan + yield.",
    "advantages.adv4.title": "100% Transparan",
    "advantages.adv4.desc": "Semua transaksi dan yield tercatat di blockchain, dapat diverifikasi siapa saja.",
    "advantages.adv5.title": "Stablecoin USDC",
    "advantages.adv5.desc": "Pakai USDC yang nilainya stabil, yield dalam stablecoin juga.",
    "advantages.adv6.title": "Biaya Murah",
    "advantages.adv6.desc": "Dibangun di Mantle Network dengan biaya transaksi sangat rendah.",
    "advantages.stat1.value": "AI",
    "advantages.stat1.label": "Powered",
    "advantages.stat2.value": "2x",
    "advantages.stat2.label": "Yield Source",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Auto-Optimize",
    "advantages.stat4.value": "∞",
    "advantages.stat4.label": "Tanpa Batas",

    // Pools Page
    "pools.title": "Jelajahi Pool Arisan",
    "pools.subtitle": "Pilih pool yang sesuai dengan kemampuan dan tujuan finansialmu",
    "pools.filter.all": "Semua",
    "pools.filter.active": "Aktif",
    "pools.filter.pending": "Menunggu",
    "pools.filter.completed": "Selesai",
    "pools.createPool": "Buat Pool Baru",
    "pools.participants": "peserta",
    "pools.monthly": "setoran bulanan",
    "pools.collateral": "jaminan",
    "pools.status.active": "Aktif",
    "pools.status.pending": "Menunggu",
    "pools.status.completed": "Selesai",
    "pools.joinPool": "Gabung Pool",
    "pools.viewDetails": "Lihat Detail",
    "pools.noPoolsFound": "Tidak ada pool ditemukan",
    "pools.noPoolsDesc": "Belum ada pool yang tersedia. Jadilah yang pertama membuat pool!",

    // Pool Detail Page
    "poolDetail.back": "Kembali ke Pools",
    "poolDetail.poolInfo": "Informasi Pool",
    "poolDetail.participants": "Peserta",
    "poolDetail.analytics": "Analitik",
    "poolDetail.joinPool": "Gabung Pool Ini",
    "poolDetail.deposit": "Setor Bulanan",
    "poolDetail.share": "Bagikan",
    "poolDetail.monthlyDeposit": "Setoran Bulanan",
    "poolDetail.collateralRequired": "Jaminan Diperlukan",
    "poolDetail.currentParticipants": "Peserta Saat Ini",
    "poolDetail.maxParticipants": "Maks Peserta",
    "poolDetail.totalDeposited": "Total Disetor",
    "poolDetail.currentYield": "Yield Saat Ini",
    "poolDetail.status": "Status",
    "poolDetail.approving": "Menyetujui...",
    "poolDetail.approve": "Setujui USDC",
    "poolDetail.joining": "Bergabung...",
    "poolDetail.join": "Gabung Pool",
    "poolDetail.depositing": "Menyetor...",
    "poolDetail.makeDeposit": "Setor",
    "poolDetail.connectWallet": "Hubungkan Wallet",
    "poolDetail.noParticipants": "Belum ada peserta",
    "poolDetail.beFirst": "Jadilah yang pertama bergabung!",

    // AI Optimizer Page
    "ai.title": "AI Yield Optimizer",
    "ai.subtitle": "Analisis real-time dan rekomendasi alokasi optimal dari AI",
    "ai.liveData": "Data Live DeFiLlama",
    "ai.currentMarket": "Kondisi Pasar Saat Ini",
    "ai.marketSentiment": "Sentimen Pasar",
    "ai.avgApy": "APY Rata-rata",
    "ai.volatility": "Volatilitas",
    "ai.recommendation": "Rekomendasi",
    "ai.protocols": "Protokol Yield Teratas di Mantle",
    "ai.apy": "APY",
    "ai.tvl": "TVL",
    "ai.risk": "Risiko",
    "ai.riskLow": "Rendah",
    "ai.riskMedium": "Sedang",
    "ai.riskHigh": "Tinggi",
    "ai.allocation": "Alokasi AI yang Direkomendasikan",
    "ai.allocationDesc": "Berdasarkan kondisi pasar saat ini, berikut adalah alokasi yang direkomendasikan AI",
    "ai.expectedApy": "APY yang Diharapkan",
    "ai.riskLevel": "Tingkat Risiko",
    "ai.diversification": "Diversifikasi",
    "ai.protocols_count": "protokol",
    "ai.loading": "Menganalisis kondisi pasar...",
    "ai.error": "Gagal memuat data. Silakan coba lagi.",

    // Leaderboard Page
    "leaderboard.title": "Leaderboard Komunitas",
    "leaderboard.subtitle": "Lihat top earners dan kontributor di ekosistem Archa",
    "leaderboard.topEarners": "Top 10 Earners",
    "leaderboard.rank": "Peringkat",
    "leaderboard.address": "Alamat",
    "leaderboard.poolsJoined": "Pool Diikuti",
    "leaderboard.totalEarned": "Total Diperoleh",
    "leaderboard.yourRank": "Peringkat Kamu",
    "leaderboard.notRanked": "Belum Masuk Peringkat",
    "leaderboard.joinPool": "Gabung pool untuk mulai menghasilkan!",
    "leaderboard.platformStats": "Statistik Platform",
    "leaderboard.totalPools": "Total Pool",
    "leaderboard.activeParticipants": "Peserta Aktif",
    "leaderboard.totalYield": "Total Yield Dihasilkan",

    // Common
    "common.loading": "Memuat...",
    "common.error": "Terjadi kesalahan",
    "common.retry": "Coba Lagi",
    "common.cancel": "Batal",
    "common.confirm": "Konfirmasi",
    "common.success": "Berhasil!",
    "common.share": "Bagikan",
    "common.copy": "Salin",
    "common.copied": "Tersalin!",

    // FAQ Page
    "faq.badge": "Pertanyaan Umum",
    "faq.title": "FAQ",
    "faq.subtitle": "Jawaban untuk pertanyaan yang sering diajukan tentang Archa",
    "faq.q1": "Apa itu Archa?",
    "faq.a1": "Archa adalah platform arisan terdesentralisasi yang dibangun di Mantle Network. Kami menggabungkan tradisi arisan Indonesia dengan teknologi blockchain dan AI untuk menciptakan sistem tabungan bergilir yang lebih aman, transparan, dan menguntungkan.",
    "faq.q2": "Bagaimana cara kerja sistem collateral?",
    "faq.a2": "Setiap peserta harus menyetor jaminan (collateral) di awal untuk bergabung dengan pool. Jaminan ini memastikan komitmen peserta. Jika Anda konsisten menyelesaikan arisan, jaminan akan dikembalikan beserta yield yang dihasilkan. Jika kabur, jaminan akan hangus.",
    "faq.q3": "Apa itu AI Yield Optimizer?",
    "faq.a3": "AI Yield Optimizer adalah sistem AI kami yang secara otomatis menganalisis dan mengalokasikan dana pool ke protokol DeFi terbaik di Mantle Network. AI mempertimbangkan APY, risiko, dan TVL untuk memaksimalkan yield sambil menjaga keamanan dana.",
    "faq.q4": "Apakah dana saya aman?",
    "faq.a4": "Ya, semua dana dikelola oleh smart contract yang sudah diaudit. Tidak ada pihak yang bisa mengakses dana Anda kecuali sesuai aturan yang terprogram di blockchain. Semua transaksi transparan dan dapat diverifikasi.",
    "faq.q5": "Berapa biaya untuk menggunakan Archa?",
    "faq.a5": "Archa tidak memungut biaya platform. Anda hanya perlu membayar gas fee Mantle Network yang sangat rendah (biasanya kurang dari $0.05 per transaksi). Ini 99% lebih murah dibanding Ethereum mainnet!",
    "faq.q6": "Bagaimana cara mendapatkan USDC untuk bergabung?",
    "faq.a6": "Anda bisa mendapatkan USDC dari exchange seperti Binance atau Coinbase, lalu bridge ke Mantle Network. Untuk testnet, Anda bisa menggunakan faucet yang tersedia di website kami untuk mendapatkan test USDC gratis.",
    "faq.q7": "Bagaimana giliran penerima ditentukan?",
    "faq.a7": "Giliran penerima ditentukan secara acak oleh smart contract menggunakan algoritma yang adil dan tidak bisa dimanipulasi. Setiap peserta memiliki kesempatan yang sama untuk mendapat giliran.",
    "faq.q8": "Apa yang terjadi jika ada peserta yang tidak membayar?",
    "faq.a8": "Jika peserta tidak membayar setoran bulanan, mereka akan kehilangan jaminan (collateral) yang sudah disetor. Jaminan ini akan didistribusikan ke peserta lain sebagai kompensasi.",
    "faq.contactTitle": "Masih Punya Pertanyaan?",
    "faq.contactDesc": "Tim kami siap membantu! Hubungi kami melalui channel komunitas berikut.",

    // Footer
    "footer.description": "Platform arisan terdesentralisasi dengan AI Yield Optimizer di Mantle Network. Tradisi keuangan komunal Indonesia, dibawa ke era blockchain dengan teknologi modern.",
    "footer.quickLinks": "Link Cepat",
    "footer.resources": "Sumber Daya",
    "footer.explorePools": "Jelajahi Pool",
  },
  en: {
    // Header
    "nav.about": "About",
    "nav.howItWorks": "How It Works",
    "nav.advantages": "Advantages",
    "nav.pools": "Pools",
    "nav.faq": "FAQ",
    "nav.connectWallet": "Connect Wallet",

    // Hero Section
    "hero.preTitle1": "Millions of Indonesians Already Understand DeFi",
    "hero.preTitle2": "They Call It",
    "hero.title": "Arisan",
    "hero.description": "For decades, arisan has proven that trust can be built without banks. Now, we're taking it to the next level with AI that optimizes yield and smart contracts that cannot lie.",
    "hero.techLabel": "Powered by AI & Blockchain",
    "hero.scroll": "Scroll",

    // About Section
    "about.badge": "What is Archa?",
    "about.title": "On-Chain Arisan with",
    "about.titleHighlight": "AI Yield Optimizer",
    "about.description": "<strong>Archa</strong> is a decentralized arisan (rotating savings) protocol built on <strong>Mantle Network</strong>. Each participant deposits <strong>USDC</strong> periodically, and the recipient's turn is determined fairly through smart contracts. What makes Archa different: <strong>AI Yield Optimizer</strong> automatically invests funds into the best DeFi protocols for optimal yield. At the end of the arisan, <strong>all participants receive bonus from the generated yield!</strong>",
    "about.problemTitle": "Traditional Arisan Problems",
    "about.problemSubtitle": "Common issues that occur",
    "about.solutionTitle": "Archa's Solution",
    "about.solutionSubtitle": "AI + Blockchain for arisan",
    "about.problem1.title": "Run-away Risk",
    "about.problem1.desc": "Participants flee after getting the first turn",
    "about.problem2.title": "Idle Money",
    "about.problem2.desc": "Collected funds don't generate anything",
    "about.problem3.title": "Manual Records",
    "about.problem3.desc": "Easy to manipulate and not transparent",
    "about.problem4.title": "Limited Scale",
    "about.problem4.desc": "Only possible with family or close friends",
    "about.solution1.title": "Collateral System",
    "about.solution1.desc": "Deposit collateral upfront, returned + yield if consistent",
    "about.solution2.title": "AI Yield Optimizer",
    "about.solution2.desc": "AI automatically selects best DeFi protocols for maximum yield",
    "about.solution3.title": "100% On-Chain",
    "about.solution3.desc": "Everything recorded on blockchain, cannot be manipulated",
    "about.solution4.title": "Global Scale",
    "about.solution4.desc": "Arisan with anyone, anywhere in the world",
    "about.quote": "Gotong royong (mutual cooperation) created the arisan tradition, which flows in the blood of Indonesians.",
    "about.quoteBrand": "Archa",
    "about.quoteEnd": "is here to make it more profitable with AI.",
    "about.cta": "See How It Works",

    // How It Works Section
    "howItWorks.badge": "How It Works",
    "howItWorks.title": "As Easy as",
    "howItWorks.titleHighlight": "5 Steps",
    "howItWorks.description": "From joining to earning yield bonus, everything is automatic with AI and transparent on blockchain",
    "howItWorks.step1.title": "Choose Arisan Pool",
    "howItWorks.step1.desc": "Select a pool based on deposit amount (10/50/100 USDC) and participants (5/10/20 people)",
    "howItWorks.step2.title": "Deposit Collateral",
    "howItWorks.step2.desc": "Deposit USDC collateral. Your collateral also generates yield during the arisan!",
    "howItWorks.step3.title": "Monthly Deposits",
    "howItWorks.step3.desc": "Deposit USDC monthly. AI automatically invests funds to DeFi protocols with best APY",
    "howItWorks.step4.title": "Get Your Turn",
    "howItWorks.step4.desc": "Turn randomly by smart contract. Your turn = receive that month's deposits + accumulated yield",
    "howItWorks.step5.title": "Yield Bonus at End",
    "howItWorks.step5.desc": "Arisan complete: collateral back + collateral yield + pool yield share for everyone!",
    "howItWorks.bottomText": "Ready for a more profitable arisan?",
    "howItWorks.cta": "See Advantages",

    // Advantages Section
    "advantages.badge": "Advantages",
    "advantages.title": "Why Choose",
    "advantages.titleHighlight": "Archa?",
    "advantages.description": "AI + Blockchain makes arisan safer, more transparent, and more profitable",
    "advantages.adv1.title": "AI Yield Optimizer",
    "advantages.adv1.desc": "AI analyzes real-time and automatically selects best DeFi protocols for maximum yield.",
    "advantages.adv2.title": "Double Yield",
    "advantages.adv2.desc": "Yield from pool fund + yield from collateral. Two sources of passive income!",
    "advantages.adv3.title": "Anti Run-away",
    "advantages.adv3.desc": "Collateral system guarantees commitment. Run away = lose collateral + yield.",
    "advantages.adv4.title": "100% Transparent",
    "advantages.adv4.desc": "All transactions and yield recorded on blockchain, verifiable by anyone.",
    "advantages.adv5.title": "USDC Stablecoin",
    "advantages.adv5.desc": "Use USDC with stable value, yield in stablecoin too.",
    "advantages.adv6.title": "Low Fees",
    "advantages.adv6.desc": "Built on Mantle Network with very low transaction fees.",
    "advantages.stat1.value": "AI",
    "advantages.stat1.label": "Powered",
    "advantages.stat2.value": "2x",
    "advantages.stat2.label": "Yield Source",
    "advantages.stat3.value": "24/7",
    "advantages.stat3.label": "Auto-Optimize",
    "advantages.stat4.value": "∞",
    "advantages.stat4.label": "Borderless",

    // Pools Page
    "pools.title": "Explore Arisan Pools",
    "pools.subtitle": "Choose a pool that fits your budget and financial goals",
    "pools.filter.all": "All",
    "pools.filter.active": "Active",
    "pools.filter.pending": "Pending",
    "pools.filter.completed": "Completed",
    "pools.createPool": "Create New Pool",
    "pools.participants": "participants",
    "pools.monthly": "monthly deposit",
    "pools.collateral": "collateral",
    "pools.status.active": "Active",
    "pools.status.pending": "Pending",
    "pools.status.completed": "Completed",
    "pools.joinPool": "Join Pool",
    "pools.viewDetails": "View Details",
    "pools.noPoolsFound": "No pools found",
    "pools.noPoolsDesc": "No pools available yet. Be the first to create one!",

    // Pool Detail Page
    "poolDetail.back": "Back to Pools",
    "poolDetail.poolInfo": "Pool Information",
    "poolDetail.participants": "Participants",
    "poolDetail.analytics": "Analytics",
    "poolDetail.joinPool": "Join This Pool",
    "poolDetail.deposit": "Monthly Deposit",
    "poolDetail.share": "Share",
    "poolDetail.monthlyDeposit": "Monthly Deposit",
    "poolDetail.collateralRequired": "Collateral Required",
    "poolDetail.currentParticipants": "Current Participants",
    "poolDetail.maxParticipants": "Max Participants",
    "poolDetail.totalDeposited": "Total Deposited",
    "poolDetail.currentYield": "Current Yield",
    "poolDetail.status": "Status",
    "poolDetail.approving": "Approving...",
    "poolDetail.approve": "Approve USDC",
    "poolDetail.joining": "Joining...",
    "poolDetail.join": "Join Pool",
    "poolDetail.depositing": "Depositing...",
    "poolDetail.makeDeposit": "Deposit",
    "poolDetail.connectWallet": "Connect Wallet",
    "poolDetail.noParticipants": "No participants yet",
    "poolDetail.beFirst": "Be the first to join!",

    // AI Optimizer Page
    "ai.title": "AI Yield Optimizer",
    "ai.subtitle": "Real-time analysis and optimal allocation recommendations from AI",
    "ai.liveData": "DeFiLlama Live Data",
    "ai.currentMarket": "Current Market Conditions",
    "ai.marketSentiment": "Market Sentiment",
    "ai.avgApy": "Average APY",
    "ai.volatility": "Volatility",
    "ai.recommendation": "Recommendation",
    "ai.protocols": "Top Yield Protocols on Mantle",
    "ai.apy": "APY",
    "ai.tvl": "TVL",
    "ai.risk": "Risk",
    "ai.riskLow": "Low",
    "ai.riskMedium": "Medium",
    "ai.riskHigh": "High",
    "ai.allocation": "AI Recommended Allocation",
    "ai.allocationDesc": "Based on current market conditions, here is the AI-recommended allocation",
    "ai.expectedApy": "Expected APY",
    "ai.riskLevel": "Risk Level",
    "ai.diversification": "Diversification",
    "ai.protocols_count": "protocols",
    "ai.loading": "Analyzing market conditions...",
    "ai.error": "Failed to load data. Please try again.",

    // Leaderboard Page
    "leaderboard.title": "Community Leaderboard",
    "leaderboard.subtitle": "See top earners and contributors in the Archa ecosystem",
    "leaderboard.topEarners": "Top 10 Earners",
    "leaderboard.rank": "Rank",
    "leaderboard.address": "Address",
    "leaderboard.poolsJoined": "Pools Joined",
    "leaderboard.totalEarned": "Total Earned",
    "leaderboard.yourRank": "Your Rank",
    "leaderboard.notRanked": "Not Ranked Yet",
    "leaderboard.joinPool": "Join a pool to start earning!",
    "leaderboard.platformStats": "Platform Statistics",
    "leaderboard.totalPools": "Total Pools",
    "leaderboard.activeParticipants": "Active Participants",
    "leaderboard.totalYield": "Total Yield Generated",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.retry": "Retry",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.success": "Success!",
    "common.share": "Share",
    "common.copy": "Copy",
    "common.copied": "Copied!",

    // FAQ Page
    "faq.badge": "Frequently Asked Questions",
    "faq.title": "FAQ",
    "faq.subtitle": "Answers to commonly asked questions about Archa",
    "faq.q1": "What is Archa?",
    "faq.a1": "Archa is a decentralized arisan (rotating savings) platform built on Mantle Network. We combine the Indonesian arisan tradition with blockchain technology and AI to create a safer, more transparent, and more profitable rotating savings system.",
    "faq.q2": "How does the collateral system work?",
    "faq.a2": "Every participant must deposit collateral upfront to join a pool. This collateral ensures participant commitment. If you consistently complete the arisan, your collateral will be returned along with the generated yield. If you run away, the collateral is forfeited.",
    "faq.q3": "What is the AI Yield Optimizer?",
    "faq.a3": "The AI Yield Optimizer is our AI system that automatically analyzes and allocates pool funds to the best DeFi protocols on Mantle Network. The AI considers APY, risk, and TVL to maximize yield while maintaining fund security.",
    "faq.q4": "Are my funds safe?",
    "faq.a4": "Yes, all funds are managed by audited smart contracts. No party can access your funds except according to rules programmed in the blockchain. All transactions are transparent and verifiable.",
    "faq.q5": "What are the fees for using Archa?",
    "faq.a5": "Archa charges no platform fees. You only need to pay Mantle Network gas fees which are very low (usually less than $0.05 per transaction). This is 99% cheaper than Ethereum mainnet!",
    "faq.q6": "How do I get USDC to join?",
    "faq.a6": "You can get USDC from exchanges like Binance or Coinbase, then bridge to Mantle Network. For testnet, you can use the faucet available on our website to get free test USDC.",
    "faq.q7": "How is the recipient turn determined?",
    "faq.a7": "The recipient turn is determined randomly by the smart contract using a fair algorithm that cannot be manipulated. Every participant has an equal chance of getting their turn.",
    "faq.q8": "What happens if a participant doesn't pay?",
    "faq.a8": "If a participant doesn't make their monthly deposit, they will lose the collateral they deposited. This collateral will be distributed to other participants as compensation.",
    "faq.contactTitle": "Still Have Questions?",
    "faq.contactDesc": "Our team is ready to help! Contact us through the following community channels.",

    // Footer
    "footer.description": "Decentralized arisan platform with AI Yield Optimizer on Mantle Network. Indonesian communal finance tradition, brought to blockchain era with modern technology.",
    "footer.quickLinks": "Quick Links",
    "footer.resources": "Resources",
    "footer.explorePools": "Explore Pools",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("archa-language") as Language;
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("archa-language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

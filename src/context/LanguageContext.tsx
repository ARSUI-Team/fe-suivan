"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, string> = {
  "nav.about": "ROSCA",
  "nav.howItWorks": "How It Works",
  "nav.advantages": "Why Sui",
  "nav.pools": "Pools",
  "nav.faq": "FAQ",
  "nav.connectWallet": "Connect Wallet",

  "about.badge": "What is Suivan?",
  "about.title": "Community savings, rebuilt for",
  "about.titleHighlight": "Sui",
  "about.problemTitle": "Traditional ROSCA Gaps",
  "about.problemSubtitle": "Trust and coordination issues",
  "about.problem1.title": "Commitment risk",
  "about.problem1.desc": "Members need clear incentives to complete every cycle.",
  "about.problem2.title": "Idle funds",
  "about.problem2.desc": "Capital can sit unused between contributions and payouts.",
  "about.problem3.title": "Manual records",
  "about.problem3.desc": "Status, turns, and payments are hard to verify at scale.",
  "about.problem4.title": "Limited reach",
  "about.problem4.desc": "Local groups need infrastructure to coordinate globally.",
  "about.solutionTitle": "Suivan Direction",
  "about.solutionSubtitle": "Composable frontend for Sui ROSCA pools",
  "about.solution1.title": "Collateral visibility",
  "about.solution1.desc": "Surface commitment state without hardcoding old contract logic.",
  "about.solution2.title": "Yield signals",
  "about.solution2.desc": "Show APY and idle-fund opportunities through modular data boundaries.",
  "about.solution3.title": "Transparent cycle state",
  "about.solution3.desc": "Expose participant progress, payouts, and contribution status clearly.",
  "about.solution4.title": "Global pool UX",
  "about.solution4.desc": "Explain Arisan as a local ROSCA expression while keeping the product global.",
  "about.quote": "Community wealth works when rules are visible, cycles are clear, and members can coordinate across borders.",
  "about.quoteBrand": "Suivan",
  "about.quoteEnd": "makes that interface legible.",
  "about.cta": "See How It Works",

  "faq.badge": "FAQ",
  "faq.title": "Frequently Asked Questions",
  "faq.subtitle": "Answers about Suivan, ROSCA pools, Sui-native settlement, and the current frontend migration.",
  "faq.q1": "What is Suivan?",
  "faq.a1": "Suivan is a frontend direction for a global ROSCA protocol built around Sui-native community finance. The frontend is designed to connect cleanly to new contracts and backend APIs.",
  "faq.q2": "What is ROSCA?",
  "faq.a2": "ROSCA stands for Rotating Savings and Credit Association. Members contribute on a recurring cycle, and one member receives the pooled payout each round until everyone has received a turn.",
  "faq.q3": "How does Arisan relate to ROSCA?",
  "faq.a3": "Arisan is a local Indonesian expression of the broader ROSCA model. Suivan explains that cultural familiarity while keeping the product language accessible for a global audience.",
  "faq.q4": "Why build this on Sui?",
  "faq.a4": "Sui gives Suivan a strong direction for fast settlement, low fees, transparent object-oriented state, and scalable community finance experiences.",
  "faq.q5": "Are the contracts and API final?",
  "faq.a5": "No. The smart contract and backend layers are developed separately. The current frontend keeps Sui adapters modular and avoids locking into inherited address or response-shape assumptions.",
  "faq.q6": "What pool data will the frontend show?",
  "faq.a6": "The frontend is prepared for pool lists, pool detail, join flow, contribution flow, participant status, cycle progress, APY signals, and yield summaries.",
  "faq.q7": "Is Suivan custodial?",
  "faq.a7": "The product direction is non-custodial. Final security, custody, and transaction details should follow the new Sui contract architecture once available.",
  "faq.q8": "How can I follow the project?",
  "faq.a8": "You can follow the Suivan community through Telegram and Discord while the protocol and frontend continue to evolve.",
  "faq.contactTitle": "Still have questions?",
  "faq.contactDesc": "Join the Suivan community channels for updates, feedback, and collaboration.",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    localStorage.setItem("suivan-language", "en");
  }, []);

  const setLanguage = (lang: Language) => {
    void lang;
    setLanguageState("en");
    localStorage.setItem("suivan-language", "en");
  };

  const t = (key: string) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

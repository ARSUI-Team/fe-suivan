"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";

// Simulated leaderboard data - in production this would come from indexer/subgraph
const MOCK_LEADERBOARD = [
  { rank: 1, address: "0x1234...5678", totalEarned: 1250.50, poolsJoined: 5, winRate: 80, avatar: "🏆" },
  { rank: 2, address: "0x2345...6789", totalEarned: 980.25, poolsJoined: 4, winRate: 75, avatar: "🥈" },
  { rank: 3, address: "0x3456...7890", totalEarned: 750.00, poolsJoined: 3, winRate: 66, avatar: "🥉" },
  { rank: 4, address: "0x4567...8901", totalEarned: 620.75, poolsJoined: 4, winRate: 50, avatar: "⭐" },
  { rank: 5, address: "0x5678...9012", totalEarned: 540.30, poolsJoined: 3, winRate: 66, avatar: "⭐" },
  { rank: 6, address: "0x6789...0123", totalEarned: 480.00, poolsJoined: 2, winRate: 100, avatar: "⭐" },
  { rank: 7, address: "0x7890...1234", totalEarned: 350.50, poolsJoined: 2, winRate: 50, avatar: "⭐" },
  { rank: 8, address: "0x8901...2345", totalEarned: 280.25, poolsJoined: 1, winRate: 100, avatar: "⭐" },
  { rank: 9, address: "0x9012...3456", totalEarned: 220.00, poolsJoined: 2, winRate: 50, avatar: "⭐" },
  { rank: 10, address: "0x0123...4567", totalEarned: 150.75, poolsJoined: 1, winRate: 100, avatar: "⭐" },
];

const STATS = {
  totalUsers: 156,
  totalPools: 23,
  totalEarnings: 45680.50,
  avgApy: 9.2,
};

type SortKey = "totalEarned" | "poolsJoined" | "winRate";

export default function LeaderboardPage() {
  const { address, isConnected } = useAccount();
  const [sortBy, setSortBy] = useState<SortKey>("totalEarned");
  const [timeRange, setTimeRange] = useState<"all" | "month" | "week">("all");

  const sortedLeaderboard = [...MOCK_LEADERBOARD].sort((a, b) => b[sortBy] - a[sortBy]);

  // Check if current user is in leaderboard
  const userRank = isConnected ? Math.floor(Math.random() * 50) + 11 : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl">🏆</span>
              <span className="text-white text-xs sm:text-sm font-medium">Community Rankings</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              Leaderboard
            </h1>
            <p className="text-base sm:text-lg text-orange-100 max-w-2xl mx-auto px-4">
              Top earners in the Archa community. Join pools and climb the ranks!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-orange-200 text-xs sm:text-sm mb-1">Total Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{STATS.totalUsers}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-orange-200 text-xs sm:text-sm mb-1">Active Pools</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{STATS.totalPools}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-orange-200 text-xs sm:text-sm mb-1">Total Earnings</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">${(STATS.totalEarnings / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-orange-200 text-xs sm:text-sm mb-1">Avg APY</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{STATS.avgApy}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="w-full sm:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-100 min-w-max">
                {(["all", "month", "week"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap min-h-[44px] ${
                      timeRange === range
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range === "all" ? "All Time" : range === "month" ? "This Month" : "This Week"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
              >
                <option value="totalEarned">Total Earned</option>
                <option value="poolsJoined">Pools Joined</option>
                <option value="winRate">Win Rate</option>
              </select>
            </div>
          </div>

          {/* User's Rank Card (if connected) */}
          {isConnected && userRank && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                    🎯
                  </div>
                  <div>
                    <p className="text-orange-100 text-xs sm:text-sm">Your Rank</p>
                    <p className="text-2xl sm:text-3xl font-bold">#{userRank}</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-orange-100 text-xs sm:text-sm">Address</p>
                  <p className="font-mono text-sm sm:text-base">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div>
                  <p className="text-orange-100 text-xs">Total Earned</p>
                  <p className="font-bold text-sm sm:text-base">$40.00</p>
                </div>
                <div>
                  <p className="text-orange-100 text-xs">Pools Joined</p>
                  <p className="font-bold text-sm sm:text-base">1</p>
                </div>
                <div>
                  <p className="text-orange-100 text-xs">Win Rate</p>
                  <p className="font-bold text-sm sm:text-base">0%</p>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Earned
                    </th>
                    <th className="hidden md:table-cell px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Pools
                    </th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Win Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedLeaderboard.map((user, idx) => (
                    <tr
                      key={user.address}
                      className={`hover:bg-gray-50 transition-colors ${
                        idx < 3 ? "bg-gradient-to-r from-yellow-50/50 to-transparent" : ""
                      }`}
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="text-lg sm:text-2xl">{user.avatar}</span>
                          <span
                            className={`font-bold text-sm sm:text-base ${
                              idx === 0
                                ? "text-yellow-600"
                                : idx === 1
                                ? "text-gray-500"
                                : idx === 2
                                ? "text-orange-600"
                                : "text-gray-700"
                            }`}
                          >
                            #{user.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className="font-mono text-xs sm:text-sm text-gray-900">{user.address}</span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                        <span className="font-semibold text-green-600 text-xs sm:text-sm">
                          ${user.totalEarned.toFixed(2)}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-gray-700">{user.poolsJoined}</span>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.winRate >= 75
                              ? "bg-green-100 text-green-700"
                              : user.winRate >= 50
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.winRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Ready to Climb the Ranks?</h3>
            <p className="text-green-100 mb-4 sm:mb-6 text-sm sm:text-base">
              Join an arisan pool and start earning yield with AI optimization
            </p>
            <a
              href="/pools"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-white text-green-600 rounded-xl font-semibold hover:shadow-lg transition-all min-h-[44px] text-sm sm:text-base"
            >
              Explore Pools
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

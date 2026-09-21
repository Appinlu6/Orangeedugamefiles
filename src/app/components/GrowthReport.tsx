import {
  ArrowLeft,
  TrendingUp,
  Award,
  Brain,
  Star,
  Target,
  Zap,
  Calendar,
  Menu,
  Share2,
  Download,
  Link2,
  Image,
} from "lucide-react";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  getPersonalityTypeData,
  personalityTypeNames,
} from "../data/personalityTypes";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface GrowthReportProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  personalityType?: string;
}

export function GrowthReport({
  onBack,
  onNavigate,
  personalityType = "科技创新型",
}: GrowthReportProps) {
  const { t } = useLanguage();
  const [showReportHistory, setShowReportHistory] =
    useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const typeData = getPersonalityTypeData(personalityType);
  const data =
    typeData || getPersonalityTypeData("科技创新型")!;

  const handleExportPDF = async () => {
    console.log("导出PDF功能");
    if (!reportRef.current) {
      alert("无法获取报告内容，请稍后重试");
      return;
    }
    try {
      alert("正在生成PDF，请稍候...");
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#fff",
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement("style");
          style.textContent = `
            * { color: rgb(0, 0, 0) !important; }
            .text-orange-900 { color: rgb(124, 45, 18) !important; }
            .text-orange-800 { color: rgb(154, 52, 18) !important; }
            .text-orange-700 { color: rgb(194, 65, 12) !important; }
            .text-orange-600 { color: rgb(234, 88, 12) !important; }
            .text-blue-900 { color: rgb(30, 58, 138) !important; }
            .text-purple-900 { color: rgb(88, 28, 135) !important; }
            .text-green-900 { color: rgb(20, 83, 45) !important; }
            .text-amber-900 { color: rgb(120, 53, 15) !important; }
            .text-gray-800 { color: rgb(31, 41, 55) !important; }
            .text-white { color: rgb(255, 255, 255) !important; }
            .bg-orange-600 { background-color: rgb(234, 88, 12) !important; }
            .bg-orange-500 { background-color: rgb(249, 115, 22) !important; }
            .bg-blue-500 { background-color: rgb(59, 130, 246) !important; }
            .bg-purple-500 { background-color: rgb(168, 85, 247) !important; }
            .bg-green-500 { background-color: rgb(34, 197, 94) !important; }
            .bg-white { background-color: rgb(255, 255, 255) !important; }
          `;
          clonedDoc.head.appendChild(style);
        },
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgWidth = 210;
      const imgHeight =
        (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(
        `橘小橘成长报告_${data.name}_${new Date().toLocaleDateString()}.pdf`,
      );
      alert("PDF导出成功！");
    } catch (error) {
      console.error("PDF导出失败:", error);
      alert(
        `PDF导出失败: ${error instanceof Error ? error.message : "未知错误"}`,
      );
    }
    setShowShareMenu(false);
  };

  const handleShareLink = () => {
    console.log("分享链接功能");
    const link = window.location.href;
    try {
      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        navigator.clipboard
          .writeText(link)
          .then(() => alert("链接已复制到剪贴板！"));
      } else {
        prompt("请手动复制以下链接:", link);
      }
    } catch (err) {
      prompt("请手动复制以下链接:", link);
    }
    setShowShareMenu(false);
  };

  const handleSaveImage = async () => {
    console.log("保存长图功能");
    if (!reportRef.current) return;
    try {
      alert("正在生成长图，请稍候...");
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#fff",
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `橘小橘成长报告_${data.name}_${new Date().toLocaleDateString()}.png`;
      link.click();
      alert("长图保存成功！");
    } catch (error) {
      console.error("长图保存失败:", error);
      alert(
        `长图保存失败: ${error instanceof Error ? error.message : "未知错误"}`,
      );
    }
    setShowShareMenu(false);
  };

  const generateTrendData = (currentScore: number) => {
    const startScore = Math.max(60, currentScore - 20);
    const increment = (currentScore - startScore) / 5;
    return [
      { week: "第1周", score: Math.round(startScore) },
      {
        week: "第2周",
        score: Math.round(startScore + increment),
      },
      {
        week: "第3周",
        score: Math.round(startScore + increment * 2),
      },
      {
        week: "第4周",
        score: Math.round(startScore + increment * 3),
      },
      {
        week: "第5周",
        score: Math.round(startScore + increment * 4),
      },
      { week: "第6周", score: Math.round(currentScore) },
    ];
  };
  const trendData = generateTrendData(data.stemScore);

  return (
    <div className="size-full relative overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50 to-orange-100">
      {/* 侧边栏 - 历史报告 */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl border-r-4 border-orange-500 z-50 transition-transform duration-300 ${showReportHistory ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-orange-900">
              历史报告
            </h3>
            <button
              onClick={() => setShowReportHistory(false)}
              className="text-orange-600 hover:text-orange-800"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-orange-100 p-3 rounded-lg border-2 border-orange-500">
              <div className="text-sm font-bold text-orange-900">
                2026年4月报告
              </div>
              <div className="text-xs text-orange-700">
                当前查看
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer">
              <div className="text-sm font-bold text-gray-700">
                2026年3月报告
              </div>
              <div className="text-xs text-gray-500">
                点击查看
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="size-full overflow-y-auto">
        <div
          ref={reportRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3"
        >
          {/* 模块1: 封面 */}
          <section className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 py-6">
            {/* 顶部导航 */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="size-4" />
                <span className="text-xs font-medium">
                  返回
                </span>
              </button>
              <button
                onClick={() => setShowReportHistory(true)}
                className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-orange-700 px-3 py-1.5 rounded-lg shadow-lg border-2 border-orange-300 transition-all hover:scale-105"
              >
                <Menu className="size-4" />
                <span className="text-xs font-medium">
                  历史报告
                </span>
              </button>
            </div>
            {/* 主标题 */}
            <div className="space-y-2 text-center">
              <div className="inline-block">
                <div className="text-4xl sm:text-5xl mb-1">
                  🍊
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-orange-900">
                【橘小橘】STEM-A
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-orange-800">
                儿童素养成长报告
              </h2>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl px-6 py-2 shadow-xl border-2 border-orange-500">
              <p className="text-sm sm:text-base text-orange-700 font-medium">
                橘 STEM-A 官方评估体系 · 2026 年 4 月
              </p>
            </div>
            <div className="w-full max-w-4xl bg-white/95 backdrop-blur rounded-2xl shadow-2xl border-3 border-orange-500 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-4 rounded-xl shadow-lg border-2 border-orange-700">
                    <div className="text-xs opacity-90 mb-1">
                      您的人格类型
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mb-0.5">
                      {data.name}
                    </div>
                    <div className="text-sm font-medium mb-1">
                      {data.englishName
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                    </div>
                    <div className="text-sm font-medium">
                      {data.englishName
                        .split(" ")
                        .slice(2)
                        .join(" ")}
                    </div>
                    <div className="text-xs opacity-90 mt-2 pt-2 border-t border-white/30">
                      15种人才类型之一
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-2">
                    {data.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    本报告由橘小橘 STEM-A 评估体系生成
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 模块2: 总体表现画像 */}
          <section className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border-3 border-orange-500 p-4 sm:p-5">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-900 mb-1 flex items-center gap-2">
              <TrendingUp className="size-6 text-orange-600" />
              总体表现画像
            </h3>
            <p className="text-xs text-orange-700 mb-3">
              基于《橘小橘》角色扮演决策行为评估 · 橘 STEM-A
              官方体系
            </p>
            <div className="text-center mb-4 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl py-4 border-2 border-orange-400">
              <div className="text-xs text-orange-700 mb-1">
                STEM-A 综合素养指数
              </div>
              <div className="text-5xl sm:text-6xl font-black text-orange-600 mb-1">
                {data.stemScore}
              </div>
              <div className="text-sm text-orange-800 font-medium">
                0-100 指数 · {data.level}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="size-6" />
                  <span className="text-sm opacity-90">
                    完成决策任务
                  </span>
                </div>
                <div className="text-4xl font-black">
                  {data.tasksCompleted}
                </div>
                <div className="text-xs opacity-90">个</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="size-6" />
                  <span className="text-sm opacity-90">
                    成长天数
                  </span>
                </div>
                <div className="text-4xl font-black">
                  {data.growthDays}
                </div>
                <div className="text-xs opacity-90">天</div>
              </div>
            </div>
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-3">
              <p className="text-xs text-amber-900 leading-relaxed">
                💡 <strong>评估说明：</strong>本报告基于 20
                道角色扮演决策题的表现生成。这些题目无标准答案，我们仅根据
                <strong>决策质量</strong>、
                <strong>自主优化程度</strong>、
                <strong>行为坚持度</strong>等维度进行综合评估。
              </p>
            </div>
          </section>

          {/* 模块3: 专家解读 */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-100 backdrop-blur rounded-2xl shadow-xl border-3 border-amber-600 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-lg">
                <Brain className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900">
                  橘 STEM-A 专家解读
                </h3>
                <p className="text-xs text-amber-700">
                  基于儿童发展心理学理论
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white/80 rounded-lg p-3 border-2 border-green-300">
                <h4 className="text-base font-bold text-green-800 mb-2 flex items-center gap-1.5">
                  <span className="text-xl">✨</span>
                  <span>优势领域</span>
                </h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  孩子在
                  <strong className="text-green-700">
                    {data.strengths[0].name}
                  </strong>
                  （{data.strengths[0].score}分）和
                  <strong className="text-blue-700">
                    {data.strengths[1].name}
                  </strong>
                  （{data.strengths[1].score}
                  分）方面表现优异，同时在
                  <strong className="text-purple-700">
                    {data.strengths[2].name}
                  </strong>
                  （{data.strengths[2].score}
                  分）维度达到优秀水平。
                </p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 border-2 border-blue-300">
                <h4 className="text-base font-bold text-blue-800 mb-2 flex items-center gap-1.5">
                  <span className="text-xl">🎯</span>
                  <span>成长建议</span>
                </h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {data.growthAdvice.weakness}。
                  {data.growthAdvice.suggestion}
                </p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 border-2 border-purple-300">
                <h4 className="text-base font-bold text-purple-800 mb-2 flex items-center gap-1.5">
                  <span className="text-xl">💡</span>
                  <span>专家小贴士</span>
                </h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {data.expertTip}
                </p>
              </div>
            </div>
          </section>

          {/* 模块4: 雷达图（已修复） */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 六维雷达图 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border-3 border-purple-500 p-4 sm:p-5">
              <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-1 flex items-center gap-2">
                <Star className="size-6 text-purple-600" />
                六维核心能力雷达图
              </h3>
              <p className="text-xs text-purple-700 mb-3">
                基于专家心理学评估
              </p>
              <div className="h-72 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data.coreAbilityData}>
                    <PolarGrid
                      stroke="#a855f7"
                      strokeWidth={1}
                    />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: "#581c87",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#7c3aed", fontSize: 10 }}
                    />
                    <Radar
                      name="同龄平均"
                      dataKey="average"
                      stroke="#fb923c"
                      fill="#fed7aa"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Radar
                      name="我的得分"
                      dataKey="myScore"
                      stroke="#9333ea"
                      fill="#c084fc"
                      fillOpacity={0.6}
                      strokeWidth={3}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 八维雷达图 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border-3 border-blue-500 p-4 sm:p-5">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 flex items-center gap-2">
                <Zap className="size-6 text-blue-600" />
                八维 STEM-A 潜能雷达图
              </h3>
              <p className="text-xs text-blue-700 mb-3">
                双色重叠 · 孩子得分 vs 同龄平均
              </p>
              <div className="h-72 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data.potentialRadarData}>
                    <PolarGrid
                      stroke="#d1d5db"
                      strokeWidth={1}
                    />
                    <PolarAngleAxis
                      dataKey="dimension"
                      tick={{
                        fill: "#374151",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#6b7280", fontSize: 9 }}
                    />
                    <Radar
                      name="同龄平均"
                      dataKey="average"
                      stroke="#fb923c"
                      fill="#fed7aa"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Radar
                      name="我的得分"
                      dataKey="myScore"
                      stroke="#10b981"
                      fill="#34d399"
                      fillOpacity={0.5}
                      strokeWidth={3}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* 模块5: 饼图 + 折线图（已修复 key） */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 饼图 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border-3 border-orange-500 p-4">
              <h3 className="text-lg sm:text-xl font-bold text-orange-900 mb-3 flex items-center gap-1.5">
                <div className="size-2 bg-orange-600 rounded-full animate-pulse" />
                学习类型分布
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props) => {
                        const {
                          cx,
                          cy,
                          midAngle,
                          outerRadius,
                          name,
                          percent,
                        } = props;
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 25;
                        const x =
                          cx +
                          radius * Math.cos(-midAngle * RADIAN);
                        const y =
                          cy +
                          radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#1f2937"
                            textAnchor={
                              x > cx ? "start" : "end"
                            }
                            dominantBaseline="central"
                            fontSize="11"
                            fontWeight="700"
                          >
                            {name} {(percent * 100).toFixed(0)}%
                          </text>
                        );
                      }}
                      outerRadius={75}
                      dataKey="value"
                    >
                      {data.pieData.map((entry, index) => (
                        <Cell
                          key={`pie-cell-${entry.name || index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 折线图 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border-3 border-blue-500 p-4">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 flex items-center gap-1.5">
                <div className="size-2 bg-blue-600 rounded-full animate-pulse" />
                成长趋势
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#cbd5e1"
                    />
                    <XAxis
                      dataKey="week"
                      tick={{ fill: "#1e3a8a", fontSize: 11 }}
                    />
                    <YAxis
                      domain={[60, 100]}
                      tick={{ fill: "#1e3a8a", fontSize: 11 }}
                    />
                    <Tooltip />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <Line
                      key="line-score"
                      type="monotone"
                      dataKey="score"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      name="综合指数"
                      dot={{ fill: "#2563eb", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* 模块6: 潜能标签（已修复 key） */}
          <section className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border-3 border-green-500 p-4 sm:p-5">
            <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-3 flex items-center gap-2">
              <Award className="size-6 text-green-600" />
              我的潜能模型与标签
            </h3>
            <div className="mb-4">
              <h4 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <span className="text-xl">🏆</span>
                <span>我的潜能标签</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.badges.map((badge, index) => {
                  const colors = [
                    {
                      from: "from-green-500",
                      to: "to-emerald-600",
                      border: "border-green-700",
                    },
                    {
                      from: "from-blue-500",
                      to: "to-cyan-600",
                      border: "border-blue-700",
                    },
                    {
                      from: "from-orange-500",
                      to: "to-amber-600",
                      border: "border-orange-700",
                    },
                    {
                      from: "from-purple-500",
                      to: "to-pink-600",
                      border: "border-purple-700",
                    },
                  ];
                  const color = colors[index % colors.length];
                  return (
                    <div
                      key={`badge-${badge.name || index}`}
                      className={`bg-gradient-to-br ${color.from} ${color.to} text-white px-4 py-2 rounded-lg shadow-lg border-2 ${color.border}`}
                    >
                      <div className="text-lg mb-0.5">
                        {badge.emoji}
                      </div>
                      <div className="text-sm font-bold">
                        {badge.name}
                      </div>
                      <div className="text-xs opacity-90 mt-0.5">
                        {badge.metric} ({badge.score}分)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* 潜能概述（柱状图 + 文字）保持原样 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-300">
              <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <span className="text-xl">📊</span>
                <span>八维潜能评分详解</span>
              </h4>
              <div className="h-80 mb-4 bg-white rounded-lg p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.potentialRadarData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fill: "#374151", fontSize: 11 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="dimension"
                      tick={{
                        fill: "#1f2937",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                      width={75}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <Bar
                      key="bar-average"
                      dataKey="average"
                      fill="#fb923c"
                      name="同龄平均"
                      radius={[0, 4, 4, 0]}
                      barSize={12}
                    />
                    <Bar
                      key="bar-myScore"
                      dataKey="myScore"
                      fill="#10b981"
                      name="我的得分"
                      radius={[0, 4, 4, 0]}
                      barSize={12}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="border-t-2 border-amber-200 pt-3">
                <h4 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <span className="text-xl">📝</span>
                  <span>潜能概述</span>
                </h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {data.potentialSummary}
                </p>
              </div>
            </div>
          </section>

          {/* 模块7: 行动号召区 */}
          <section className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl shadow-xl border-3 border-purple-700 p-4 sm:p-5 text-center">
            <div className="mb-4">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                解锁完整个性化报告
              </h3>
              <p className="text-sm opacity-90 mb-4">
                获取更深入的成长分析和专业指导
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4 text-left">
              <h4 className="text-base font-bold mb-3 text-center">
                🎁 解锁后您将获得：
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <div className="text-sm font-bold">
                      个性化成长计划
                    </div>
                    <div className="text-xs opacity-90">
                      针对孩子的特点定制的3个月成长路径
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <div className="text-sm font-bold">
                      专家视频讲解
                    </div>
                    <div className="text-xs opacity-90">
                      儿童心理学专家深度解读报告内容
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <div className="text-sm font-bold">
                      每月进度跟踪
                    </div>
                    <div className="text-xs opacity-90">
                      持续记录孩子的成长轨迹和变化
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <div className="text-sm font-bold">
                      家长指导手册
                    </div>
                    <div className="text-xs opacity-90">
                      详细的家庭教育建议和互动游戏
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate?.("iceberg-model")}
              className="bg-white text-purple-700 px-8 py-3 rounded-xl text-base font-bold hover:bg-purple-50 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              立即解锁完整报告 →
            </button>
          </section>

          {/* 隐私声明 */}
          <div className="text-center text-xs text-orange-700 pb-4">
            <p className="mb-0.5">🔒 隐私保护承诺</p>
            <p className="opacity-80">
              您的数据受到严格保护，仅用于生成个性化报告，不会与第三方分享
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
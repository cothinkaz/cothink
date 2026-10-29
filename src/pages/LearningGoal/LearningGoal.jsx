import { useSearchParams } from "react-router-dom";
import { PageHeader, SegmentedTabs } from "../../components/LearningGoal/shared";
import TodayTab from "./TodayTab";
import WeekTab from "./WeekTab";

const TABS = [
  { key: "today", label: "Bu gün" },
  { key: "week", label: "Bu həftə" },
];

/* /learning-goal           → Bu gün
   /learning-goal?tab=week  → Bu həftə */
const LearningGoal = () => {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "week" ? "week" : "today";

  const changeTab = (key) => setParams(key === "week" ? { tab: "week" } : {}, { replace: true });

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Öyrənmə hədəfi və ardıcıllıq"
        subtitle="Planınızı izləyin, ardıcıl öyrənin və inkişaf edin."
      />

      <div className="mt-4 sm:mt-5">
        <SegmentedTabs tabs={TABS} value={tab} onChange={changeTab} />
      </div>

      <div className="mt-5 sm:mt-6">{tab === "week" ? <WeekTab /> : <TodayTab />}</div>
    </div>
  );
};

export default LearningGoal;
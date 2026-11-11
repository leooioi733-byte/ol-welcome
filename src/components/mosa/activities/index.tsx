import type { Activity } from "@/content/types";

import { ChoiceActivity } from "./ChoiceActivity";
import { HotspotActivity } from "./HotspotActivity";
import { MatchActivity } from "./MatchActivity";
import { MixActivity } from "./MixActivity";
import { OrderActivity } from "./OrderActivity";
import { PracticeActivity } from "./PracticeActivity";
import { RhythmActivity } from "./RhythmActivity";
import type { ResolvedPayload } from "./shared";
import { SketchActivity } from "./SketchActivity";

/** Renders any activity by type. New activity types are registered here. */
export function ActivityView({ activity, onResolve }: { activity: Activity; onResolve: (r: ResolvedPayload) => void }) {
  switch (activity.type) {
    case "choice":
      return <ChoiceActivity activity={activity} onResolve={onResolve} />;
    case "order":
      return <OrderActivity activity={activity} onResolve={onResolve} />;
    case "match":
      return <MatchActivity activity={activity} onResolve={onResolve} />;
    case "mix":
      return <MixActivity activity={activity} onResolve={onResolve} />;
    case "hotspot":
      return <HotspotActivity activity={activity} onResolve={onResolve} />;
    case "rhythm":
      return <RhythmActivity activity={activity} onResolve={onResolve} />;
    case "sketch":
      return <SketchActivity activity={activity} onResolve={onResolve} />;
    case "practice":
      return <PracticeActivity activity={activity} onResolve={onResolve} />;
  }
}

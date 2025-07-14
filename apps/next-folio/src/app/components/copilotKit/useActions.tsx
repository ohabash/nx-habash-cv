import { useIdontKnowAction } from "./IdontKnow.action.hook";
import { ReferenceIndicatorActions } from "./ReferenceIndicator.action.hook";
import { useSkillsPosterAction } from "./skills-poster.action.hook";

export const useCopilotActions = () => {
  ReferenceIndicatorActions();
  useIdontKnowAction();
  useSkillsPosterAction({ detailsMode: false }); // Context-aware: auto-detects single vs multiple skills
  // Add other actions here
  return {};
}

import { useIdontKnowAction } from "./IdontKnow.action.hook";
import { ReferenceIndicatorActions } from "./ReferenceIndicator.action.hook";
import { useSkillsListAction } from "./skills-list.action.hook";
import { useSkillsPosterAction } from "./skills-poster.action.hook";

export const useCopilotActions = () => {

  // actions listed here will be registered when this hook mounts
  ReferenceIndicatorActions();
  useIdontKnowAction();
  useSkillsPosterAction({ detailsMode: false }); // Context-aware: auto-detects single vs multiple skills
  useSkillsListAction()

  // nothing to return at the moment
  return {};
  
}

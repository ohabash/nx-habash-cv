import { useIdontKnowAction } from "./actions/IdontKnow.action.hook";
import { ReferenceIndicatorActions } from "./actions/ReferenceIndicator.action.hook";
import { useSkillsListAction } from "./actions/skills-list.action.hook";
import { useSkillsPosterAction } from "./actions/skills-poster.action.hook";

export const useCopilotActions = () => {

  // actions listed here will be registered when this hook mounts
  ReferenceIndicatorActions();
  useIdontKnowAction();
  useSkillsPosterAction({ detailsMode: false }); // Context-aware: auto-detects single vs multiple skills
  useSkillsListAction()

  // nothing to return at the moment
  return {};

}

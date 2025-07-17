import { useIdontKnowAction } from "./actions/IdontKnow.action.hook";
import { ReferenceIndicatorActions } from "./actions/ReferenceIndicator.action.hook";
import { useSkillsListAction } from "./actions/skills-list.action.hook";
import { useSkillsPosterAction } from "./actions/skills-poster.action.hook";
import { useBusinessCardAction } from "./actions/business-card.action.hook";
import { useContactFormAction } from "./actions/contact-form.action.hook";
import { useProjectPosterAction } from "./actions/project-poster.action.hook";

export const useCopilotActions = () => {

  // actions listed here will be registered when this hook mounts
  ReferenceIndicatorActions();
  useIdontKnowAction();
  useSkillsPosterAction({ detailsMode: false }); // Context-aware: auto-detects single vs multiple skills
  useSkillsListAction();
  useBusinessCardAction(); // Business card for contact information
  useContactFormAction(); // Detailed contact form for inquiries
  useProjectPosterAction({ detailsMode: false }); // Context-aware: auto-detects project details mode

  // nothing to return at the moment
  return {};

}

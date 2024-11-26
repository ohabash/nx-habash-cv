import { FadeIn } from "../animation/FadeIn";
import { Container } from "../layout/Container";

const copy = [
  "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
];

export const VerticalList = () => {
  return (
    <div className="py-[15vh]">
      <Container className="text-3xl font-semibold space-y-12 relative z-10">
        {copy.map((text, index) => (
          <FadeIn key={index}>
            <p> {text} </p>
          </FadeIn>
        ))}
      </Container>
    </div>
  );
};
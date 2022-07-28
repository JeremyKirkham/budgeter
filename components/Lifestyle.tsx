import { Category } from "./Category";

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Lifestyle: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Eating out and takeaway",
    "Alcohol",
    "Holidays",
    "Streaming services",
    "Gaming and consoles",
    "Music, audio and photography",
    "Live entertainment",
    "Attractions",
    "Hobbies",
    "Gifts",
    "Toys",
  ];

  return (
    <>
      <Category
        name="Lifestyle"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#A4C2F4"
      />
    </>
  );
};

import { Category } from "./Category";

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Household: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Furniture",
    "Decor",
    "Appliances",
    "Home maintenance and repairs",
    "Cleaning",
    "Hygeine",
    "Garden",
    "Rates",
    "Home insurance",
    "Household services",
  ];

  return (
    <>
      <Category
        name="Household"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#FFE599"
      />
    </>
  );
};

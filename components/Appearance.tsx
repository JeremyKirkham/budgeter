import { Category } from "./Category";

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Appearance: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Clothes and shoes",
    "Accessories",
    "Hairdressing",
    "Beauty products",
    "Beauty treatments",
  ];

  return (
    <>
      <Category
        name="Appearance"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#F9CB9C"
      />
    </>
  );
};

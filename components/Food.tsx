import { Category } from "./Category";

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Food: React.FC<Props> = ({ onChange }) => {
  const subCategories = ["Supermarket shop"];

  return (
    <>
      <Category
        name="Food"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#D5A6BD"
      />
    </>
  );
};

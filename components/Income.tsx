import { Category } from "./Category";
interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Income: React.FC<Props> = ({ onChange }) => {
  const subCategories = ["Wage"];

  return (
    <>
      <Category
        name="Income"
        type="income"
        subCategories={subCategories}
        onChange={onChange}
        color="#B4C4DD"
      />
    </>
  );
};

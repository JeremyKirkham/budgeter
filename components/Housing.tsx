import { Category } from "./Category";

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Housing: React.FC<Props> = ({ onChange }) => {
  const subCategories = ["Mortgage", "Rent"];

  return (
    <>
      <Category
        name="Housing"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#B6D7A8"
      />
    </>
  );
};

import dynamic from "next/dynamic";

const Category = dynamic(() => import("./Category"), {
  ssr: false,
});

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Education: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Books, newspapers and magazines",
    "Stationary",
    "Home computer equipment",
    "Childcare",
    "School",
    "Higher education",
  ];

  return (
    <>
      <Category
        name="Education"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#DD7F6B"
      />
    </>
  );
};

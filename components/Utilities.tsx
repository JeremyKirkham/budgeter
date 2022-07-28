import dynamic from "next/dynamic";

const Category = dynamic(() => import("./Category"), {
  ssr: false,
});

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Utilities: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Electricity",
    "Gas",
    "Water and sewerage",
    "Internet",
    "Phone",
    "Postal services",
  ];

  return (
    <>
      <Category
        name="Utilities"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#9FC5E8"
      />
    </>
  );
};

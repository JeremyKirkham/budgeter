import dynamic from "next/dynamic";

const Category = dynamic(() => import("./Category"), {
  ssr: false,
});

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const ProfessionalFees: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Credit cards",
    "Other loans",
    "Bank fees",
    "Life / trauma / TPD insurance",
    "Income protection insurance",
    "Financial advisor services",
    "Accountant / tax agent",
    "Legal fees",
    "Union / professional association fees",
    "Charity donations",
  ];

  return (
    <>
      <Category
        name="Professional Fees"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#B6D7A8"
      />
    </>
  );
};

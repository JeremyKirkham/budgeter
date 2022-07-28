import { Category } from "./Category";
interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Health: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Health insurance",
    "Doctors and specialists",
    "Dental",
    "Optical",
    "Hospital and ambulance",
    "Medicines",
    "Medical equipment",
    "Sport and fitness",
  ];

  return (
    <>
      <Category
        name="Health"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#EA9999"
      />
    </>
  );
};

import dynamic from "next/dynamic";

const Category = dynamic(() => import("./Category"), {
  ssr: false,
});

interface Props {
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
}

export const Transport: React.FC<Props> = ({ onChange }) => {
  const subCategories = [
    "Vehicle purchase",
    "Vehicle loans",
    "Registration",
    "Drivers license",
    "Vehicle insurance",
    "Vehicle services and repairs",
    "Roadside assistance",
    "Fuel",
    "Tolls",
    "Parking",
    "Public transport",
    "Vehicle hire, taxis and ride share",
  ];

  return (
    <>
      <Category
        name="Transport"
        type="expense"
        subCategories={subCategories}
        onChange={onChange}
        color="#B4A7D6"
      />
    </>
  );
};

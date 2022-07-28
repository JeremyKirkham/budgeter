import { useState } from "react";
import { Table } from "react-bootstrap";
import { currencyFormat } from "../lib/currencyFormat";
import { SubCategory, Frequency } from "./LineItem";
import dynamic from "next/dynamic";

const DynamicLineItem = dynamic(() => import("./LineItem"), {
  ssr: false,
});

interface Props {
  name: string;
  type: "income" | "expense";
  subCategories?: string[];
  onChange: (name: string, amount: number, type: "income" | "expense") => void;
  color?: string;
}

export const Category: React.FC<Props> = ({
  name,
  type,
  onChange,
  color,
  subCategories = [],
}) => {
  const [sum, setSum] = useState(0);
  const [localSubcategories, setLocalSubcategories] = useState<SubCategory[]>(
    subCategories.map((sc) => ({
      name: sc,
      amount: 0,
      frequency: Frequency.weekly,
      annualAmount: 0,
    }))
  );

  const onLocalChange = (
    name: string,
    frequency: Frequency,
    amount: number,
    annualAmount: number
  ) => {
    const newSubs = localSubcategories.map((sc) => {
      if (sc.name === name) {
        return {
          ...sc,
          frequency,
          amount,
          annualAmount,
        };
      } else {
        return sc;
      }
    });

    const total = newSubs
      .map((sc) => sc?.annualAmount)
      .reduce((prev, val) => prev! + val!);

    onChange(name, total, type);
    setSum(total);
    setLocalSubcategories(newSubs);
  };

  const addSubcategory = (name: string) => {
    setLocalSubcategories((prev) => [
      ...prev,
      { name, amount: 0, annualAmount: 0, frequency: Frequency.weekly },
    ]);
  };

  return (
    <>
      <Table responsive>
        <thead>
          <tr className="headertr">
            <th>{name}</th>
            <th>Sub category</th>
            <th>Frequency</th>
            <th>Amount</th>
            <th>Annual: {currencyFormat(sum)}</th>
          </tr>
        </thead>
        <tbody>
          {localSubcategories.map((sc, i) => (
            <DynamicLineItem
              subCategory={sc}
              key={i}
              onChange={onLocalChange}
            />
          ))}
        </tbody>
      </Table>
      <style jsx>{`
        .headertr {
          background: ${color ?? "default"};
        }
        th {
          width: 20%;
        }
      `}</style>
    </>
  );
};

import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { currencyFormat } from "../lib/currencyFormat";

export enum Frequency {
  daily = "daily",
  weekly = "weekly",
  fortnightly = "fortnightly",
  monthly = "monthly",
  quarterly = "quarterly",
  annually = "annually",
}

export interface SubCategory {
  name: string;
  frequency: Frequency;
  amount: number;
  annualAmount: number;
}

export interface Props {
  subCategory: SubCategory;
  onChange: (
    name: string,
    frequency: Frequency,
    amount: number,
    annualAmount: number
  ) => void;
}

export const LineItem: React.FC<Props> = ({ subCategory, onChange }) => {
  const [amount, _setAmount] = useState(subCategory.amount);
  const [annualAmount, _setAnnualAmount] = useState(subCategory.annualAmount);
  const [freq, setFreq] = useState(Frequency.daily);

  const setAmount = (newVal?: string) => {
    if (newVal != null) {
      const numVal = parseFloat(newVal);
      _setAmount(numVal);
    } else {
      _setAmount(0);
    }
  };

  useEffect(() => {
    let newAnnual;
    switch (freq) {
      case Frequency.daily:
        newAnnual = amount * 365;
        break;
      case Frequency.weekly:
        newAnnual = amount * 52;
        break;
      case Frequency.fortnightly:
        newAnnual = amount * 26;
        break;
      case Frequency.monthly:
        newAnnual = amount * 12;
        break;
      case Frequency.quarterly:
        newAnnual = amount * 4;
        break;
      case Frequency.annually:
        newAnnual = amount;
        break;
    }
    const diff = newAnnual - annualAmount;
    if (diff !== 0) {
      _setAnnualAmount(newAnnual);
      onChange(subCategory.name, freq, amount, newAnnual);
    }
  }, [subCategory.name, amount, annualAmount, freq, onChange]);

  return (
    <tr>
      <td></td>
      <td>{subCategory.name}</td>
      <td>
        <Form.Select onChange={(e) => setFreq(e.target.value as Frequency)}>
          {Object.keys(Frequency).map((freq, i) => (
            <option key={i} value={freq}>
              {freq}
            </option>
          ))}
        </Form.Select>
      </td>
      <td>
        <CurrencyInput
          className="form-control"
          prefix="$"
          defaultValue={0}
          decimalsLimit={2}
          value={amount}
          onValueChange={(value) => setAmount(value)}
        />
      </td>
      <td>{currencyFormat(annualAmount)}</td>
      <style jsx>{`
        td {
          vertical-align: middle;
        }
      `}</style>
    </tr>
  );
};

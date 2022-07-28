import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { currencyFormat } from "../lib/currencyFormat";
import { useLocalState } from "../lib/useLocalState";

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

const LineItem: React.FC<Props> = ({ subCategory, onChange }) => {
  const [rawAmount, setRawAmount] = useLocalState<string>(
    `${subCategory.name}-lineitem-raw`,
    subCategory.amount
  );
  const [annualAmount, _setAnnualAmount] = useState(subCategory.annualAmount);
  const [freq, setFreq] = useLocalState<Frequency>(
    `${subCategory.name}-lineitem-freq`,
    Frequency.daily
  );

  useEffect(() => {
    let newAnnual;
    switch (freq) {
      case Frequency.daily:
        newAnnual = parseFloat(rawAmount) * 365;
        break;
      case Frequency.weekly:
        newAnnual = parseFloat(rawAmount) * 52;
        break;
      case Frequency.fortnightly:
        newAnnual = parseFloat(rawAmount) * 26;
        break;
      case Frequency.monthly:
        newAnnual = parseFloat(rawAmount) * 12;
        break;
      case Frequency.quarterly:
        newAnnual = parseFloat(rawAmount) * 4;
        break;
      case Frequency.annually:
        newAnnual = parseFloat(rawAmount);
        break;
    }
    const diff = newAnnual - annualAmount;
    if (diff !== 0) {
      _setAnnualAmount(newAnnual);
      onChange(subCategory.name, freq, parseFloat(rawAmount), newAnnual);
    }
  }, [subCategory.name, rawAmount, annualAmount, freq, onChange]);

  return (
    <tr>
      <td></td>
      <td>{subCategory.name}</td>
      <td>
        <Form.Select
          value={freq}
          onChange={(e) => setFreq(e.target.value as Frequency)}
        >
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
          value={rawAmount}
          onValueChange={(value) => setRawAmount(value ?? "")}
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

export default LineItem;

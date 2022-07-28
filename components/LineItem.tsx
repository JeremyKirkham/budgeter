import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { currencyFormat } from "../lib/currencyFormat";
import { useLocalState } from "../lib/useLocalState";

export enum Frequency {
  Daily = "Daily",
  Weekly = "Weekly",
  Fortnightly = "Fortnightly",
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
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
    subCategory.frequency
  );

  useEffect(() => {
    let newAnnual;
    if (rawAmount == "") {
      newAnnual = 0;
    } else {
      switch (freq) {
        case Frequency.Daily:
          newAnnual = parseFloat(rawAmount) * 365;
          break;
        case Frequency.Weekly:
          newAnnual = parseFloat(rawAmount) * 52;
          break;
        case Frequency.Fortnightly:
          newAnnual = parseFloat(rawAmount) * 26;
          break;
        case Frequency.Monthly:
          newAnnual = parseFloat(rawAmount) * 12;
          break;
        case Frequency.Quarterly:
          newAnnual = parseFloat(rawAmount) * 4;
          break;
        case Frequency.Annually:
          newAnnual = parseFloat(rawAmount);
          break;
      }
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
          placeholder="$0.00"
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

import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { currencyFormat } from "../lib/currencyFormat";
import { LineItem, SubCategory, Frequency } from "./LineItem";
import { useLocalState } from "../lib/useLocalState";
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
  const [show, setShow] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [localSubcategories, setLocalSubcategories] = useLocalState<
    SubCategory[]
  >(
    `${name}-cat`,
    subCategories.map((sc) => ({
      name: sc,
      amount: 0,
      frequency: Frequency.Weekly,
      annualAmount: 0,
    }))
  );

  useEffect(() => {
    const total = localSubcategories
      .map((sc) => sc?.annualAmount)
      .reduce((prev, val) => prev! + val!);

    if (total !== sum) {
      onChange(name, total, type);
      setSum(total);
    }
  }, [name, onChange, type, sum, localSubcategories]);

  const handleClose = () => {
    setShow(false);
    setNewCat("");
  };
  const handleShow = () => setShow(true);

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
    setLocalSubcategories(newSubs);
  };

  const addCategory = () => {
    if (newCat.length > 0) {
      const newCategories: SubCategory[] = [
        ...localSubcategories,
        {
          name: newCat,
          frequency: Frequency.Weekly,
          amount: 0,
          annualAmount: 0,
        },
      ];

      setLocalSubcategories(newCategories);
    }
    handleClose();
  };

  const removeCategory = (name: string) => {
    const newCategories = localSubcategories.filter((sc) => sc.name !== name);

    setLocalSubcategories(newCategories);
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
            <LineItem subCategory={sc} key={i} onChange={onLocalChange} />
          ))}
          <tr>
            <td></td>
            <td>
              <Button variant="outline-primary" onClick={handleShow}>
                Add line item
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New sub category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Sub category name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={addCategory}
            disabled={newCat.length < 3}
          >
            Save Sub category
          </Button>
        </Modal.Footer>
      </Modal>
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

import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { Appearance } from "../components/Appearance";
import { Education } from "../components/Education";
import { Food } from "../components/Food";
import { Health } from "../components/Health";
import { Household } from "../components/Household";
import { Housing } from "../components/Housing";
import { Income } from "../components/Income";
import { Lifestyle } from "../components/Lifestyle";
import { ProfessionalFees } from "../components/ProfessionalFees";
import { Transport } from "../components/Transport";
import { Utilities } from "../components/Utilities";
import { currencyFormat } from "../lib/currencyFormat";
import { useLocalState } from "../lib/useLocalState";
import { BsInfoCircle } from "react-icons/bs";

const Home: NextPage = () => {
  const [showIntro, setShowIntro] = useLocalState<boolean>("showintro", true);
  const [totals, setTotals] = useState<
    {
      name: string;
      amount: number;
      type: "income" | "expense";
    }[]
  >([]);

  const handleClose = () => {
    setShowIntro(false);
  };
  const handleOpen = () => {
    setShowIntro(true);
  };

  const totalIncome = totals
    .filter((t) => t.type === "income")
    .map((t) => t.amount)
    .reduce((prev, am) => prev + am, 0);
  const totalExpenses = totals
    .filter((t) => t.type === "expense")
    .map((t) => t.amount)
    .reduce((prev, am) => prev + am, 0);
  const diff = totalIncome - totalExpenses;

  const updateAmount = (
    name: string,
    amount: number,
    type: "income" | "expense"
  ) => {
    setTotals((prev) => {
      const existing = prev.find((t) => t.name === name);
      if (existing) {
        return prev.map((t) => {
          if (t.name === name) {
            return {
              ...t,
              amount,
            };
          } else {
            return t;
          }
        });
      } else {
        return [
          ...prev,
          {
            name,
            amount,
            type,
          },
        ];
      }
    });
  };

  return (
    <>
      <Head>
        <title>Budget Better - A budgeting tool for everyone!</title>
      </Head>
      <Container className="mt-3 py-3">
        <Modal show={showIntro} onHide={handleClose} size="lg">
          <Modal.Body>
            <h1 className="text-center mb-3 title">
              Getting started with Budget Better
            </h1>
            <p>
              Budget Better is a simple app for calculating your yearly (annual)
              budget.
            </p>
            <p>
              Fill out the relavant sections for each of the Income and Expenses
              categories to see how your budget stacks up.
            </p>
            <p>
              Make sure you enter your income after tax to get a true reflection
              of what your budget is!
            </p>
            <p>
              You can add new sub categories to each category if you feel the
              need, as well as deleting ones that aren&apos;t relevant to you.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={handleClose}>
              Get started
            </Button>
          </Modal.Footer>
        </Modal>
        <h1 className="text-center my-3 title">
          Budget Better - A budgeting tool for everyone!
        </h1>
        <div className="cont">
          <h2 className="income-h1">INCOME</h2>
          <Income onChange={updateAmount} />
          <h2 className="expenses-h1">EXPENSES</h2>
          <Housing onChange={updateAmount} />
          <Household onChange={updateAmount} />
          <Utilities onChange={updateAmount} />
          <Transport onChange={updateAmount} />
          <Food onChange={updateAmount} />
          <Health onChange={updateAmount} />
          <Education onChange={updateAmount} />
          <Appearance onChange={updateAmount} />
          <Lifestyle onChange={updateAmount} />
          <ProfessionalFees onChange={updateAmount} />
        </div>
      </Container>
      <div className="footer">
        <h3 className="mb-3">
          Annual totals{" "}
          <span className="info">
            <BsInfoCircle size="16" onClick={handleOpen} />
          </span>
        </h3>

        <div className="d-flex justify-content-around">
          <p className="income">TOTAL INCOME: {currencyFormat(totalIncome)}</p>
          <p className="expense">
            TOTAL EXPENSES: {currencyFormat(totalExpenses)}
          </p>
          <p className="surplus">
            {diff >= 0 ? "SURPLUS" : "DEFECIT"}: {currencyFormat(diff)}
          </p>
        </div>
      </div>
      <style jsx>{`
        .title {
          color: #4b86e8;
        }
        .info {
          cursor: pointer;
          color: #4b86e8;
        }
        .footer {
          position: fixed;
          bottom: 0;
          text-align: center;
          background: white;
          padding: 10px 30px 30px;
          z-index: 999;
          width: 100%;
          font-size: 20px;
          font-weight: bold;
          box-shadow: var(--shadow-elevation-medium);
        }
        .cont {
          padding-bottom: 150px !important;
        }
        .income-h1 {
          color: #4b86e8;
        }
        .expenses-h1 {
          color: #ff9900;
        }
        .income {
          color: #2a8947;
        }
        .expense {
          color: #bb2e3e;
        }
        .surplus {
          color: ${diff > 0 ? "#2A8947" : "#BB2E3E"};
        }
      `}</style>
    </>
  );
};

export default Home;

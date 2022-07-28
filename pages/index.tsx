import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Container } from "react-bootstrap";
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

const Home: NextPage = () => {
  const [totals, setTotals] = useState<
    {
      name: string;
      amount: number;
      type: "income" | "expense";
    }[]
  >([]);

  const totalIncome = totals
    .filter((t) => t.type === "income")
    .map((t) => t.amount)
    .reduce((prev, am) => prev + am, 0);
  const totalExpenses = totals
    .filter((t) => t.type === "expense")
    .map((t) => t.amount)
    .reduce((prev, am) => prev + am, 0);

  const updateAmount = (
    name: string,
    amount: number,
    type: "income" | "expense"
  ) => {
    const existing = totals.find((t) => t.name === name);
    if (existing) {
      setTotals((prev) =>
        prev.map((t) => {
          if (t.name === name) {
            return {
              ...t,
              amount,
            };
          } else {
            return t;
          }
        })
      );
    } else {
      setTotals((prev) => [
        ...prev,
        {
          name,
          amount,
          type,
        },
      ]);
    }
  };

  return (
    <>
      <Head>
        <title>Budgeter | A budgeting tool for everyone!</title>
      </Head>
      <Container className="mt-3 py-3">
        <h1 className="text-center my-3">
          Budgeter - A budgeting tool for everyone!
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
        <h3 className="mb-3">Annual totals</h3>
        <div className="d-flex justify-content-around">
          <p className="income">TOTAL INCOME: {currencyFormat(totalIncome)}</p>
          <p className="expense">
            TOTAL EXPENSES: {currencyFormat(totalExpenses)}
          </p>
          <p className="surplus">
            SURPLUS: {currencyFormat(totalIncome - totalExpenses)}
          </p>
        </div>
      </div>
      <style jsx>{`
        .footer {
          position: fixed;
          bottom: 0;
          text-align: center;
          background: white;
          padding: 30px;
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
          color: ${totalIncome - totalExpenses > 0 ? "#2A8947" : "#BB2E3E"};
        }
      `}</style>
    </>
  );
};

export default Home;

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const initialAmounts = {
  cola: 0,
  dornaMinerala: 0,
  dornaPlata: 0,
  fanta: 0,
  ursusFA: 0,
  ursus: 0,
  mici: 0,
  pizza: 0,
  hotDog: 0,
  covrigei: 0,
};

const unitPrices = {
  cola: 9,
  dornaMinerala: 5.5,
  dornaPlata: 5.5,
  fanta: 9,
  ursusFA: 7.5,
  ursus: 7.5,
  mici: 5,
  pizza: 7.5,
  hotDog: 7.5,
  covrigei: 5,
};

export default function Home() {
  const [amounts, setAmounts] = useState(initialAmounts);
  const [totalPrices, setTotalPrices] = useState(initialAmounts);

  const basePath = process.env.NODE_ENV === "production" ? "/prodCount" : "";

  useEffect(() => {
    const restoredAmounts = { ...initialAmounts };
    const restoredPrices = { ...initialAmounts };

    Object.keys(initialAmounts).forEach((product) => {
      const stored = localStorage.getItem(product);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          restoredAmounts[product] = parsed.amount;
          restoredPrices[product] = parsed.price;
        } catch (e) {
          console.error("Eroare la parsare pentru:", product, e);
        }
      }
    });

    setAmounts(restoredAmounts);
    setTotalPrices(restoredPrices);
  }, []);

  const updateLocalStorage = (product, amount, price) => {
    localStorage.setItem(product, JSON.stringify({ amount, price }));
  };

  const increaseAmount = (product) => {
    const newAmount = amounts[product] + 1;
    const newPrice = unitPrices[product] * newAmount;

    const updatedAmounts = { ...amounts, [product]: newAmount };
    const updatedPrices = { ...totalPrices, [product]: newPrice };

    setAmounts(updatedAmounts);
    setTotalPrices(updatedPrices);
    updateLocalStorage(product, newAmount, newPrice);
  };

  const decreaseAmount = (product) => {
    const newAmount = Math.max(amounts[product] - 1, 0);
    const newPrice = unitPrices[product] * newAmount;

    const updatedAmounts = { ...amounts, [product]: newAmount };
    const updatedPrices = { ...totalPrices, [product]: newPrice };

    setAmounts(updatedAmounts);
    setTotalPrices(updatedPrices);
    updateLocalStorage(product, newAmount, newPrice);
  };

  const allProducts = [
    {
      name: "Cola Zero 0.5",
      key: "cola",
      prodImg: `${basePath}/assets/cola-removebg.png`,
    },
    {
      name: "Dorna Minerala 0.5",
      key: "dornaMinerala",
      prodImg: `${basePath}/assets/dornaMinerala-removebg.png`,
    },
    {
      name: "Dorna Plata 0.5",
      key: "dornaPlata",
      prodImg: `${basePath}/assets/dornaPlata-removebg.png`,
    },
    {
      name: "Fanta 0.5",
      key: "fanta",
      prodImg: `${basePath}/assets/fanta-removebg.png`,
    },
    {
      name: "Ursus F.A 0.5",
      key: "ursusFA",
      prodImg: `${basePath}/assets/ursusFA-removebg.png`,
    },
    {
      name: "Ursus",
      key: "ursus",
      prodImg: `${basePath}/assets/ursusA-removebg.png`,
    },
    {
      name: "Mici",
      key: "mici",
      prodImg: `${basePath}/assets/mici-removebg.png`,
    },
    {
      name: "Pizza",
      key: "pizza",
      prodImg: `${basePath}/assets/pizza-removebg.png`,
    },
    {
      name: "Hot-Dog",
      key: "hotDog",
      prodImg: `${basePath}/assets/hotDog-removebg.png`,
    },
    {
      name: "Covrigei",
      key: "covrigei",
      prodImg: `${basePath}/assets/covrigei-removebg.png`,
    },
  ];

  const total = Object.values(totalPrices).reduce(
    (sum, price) => sum + price,
    0
  );

  return (
    <div>
      <main className="mainScreen">
        {allProducts.map((p) => (
          <Product
            key={p.key}
            name={p.name}
            img={p.prodImg}
            amount={amounts[p.key]}
            price={totalPrices[p.key]}
            onIncrease={() => increaseAmount(p.key)}
            onDecrease={() => decreaseAmount(p.key)}
          />
        ))}
      </main>

      <hr />
      <h2>Total: {total.toFixed(2)} lei</h2>
    </div>
  );
}

function Product({ name, amount, price, onIncrease, onDecrease, img }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div className="infoProd">
        {img && <Image src={img} alt={name} width={100} height={100} />}
        {name}
      </div>
      <div className="amount_container">
        <button onClick={onDecrease}>-</button>
        {amount} buc
        <button onClick={onIncrease}>+</button>
      </div>
      {price.toFixed(2)} lei
    </div>
  );
}

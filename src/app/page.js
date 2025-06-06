"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./globals.css";

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
    { name: "Cola Zero 0.5", key: "cola", img: "/assets/cola-removebg.png" },
    {
      name: "Dorna Minerala 0.5",
      key: "dornaMinerala",
      img: "/assets/dornaMinerala-removebg.png",
    },
    {
      name: "Dorna Plata 0.5",
      key: "dornaPlata",
      img: "/assets/dornaPlata-removebg.png",
    },
    { name: "Fanta 0.5", key: "fanta", img: "/assets/fanta-removebg.png" },
    {
      name: "Ursus F.A 0.5",
      key: "ursusFA",
      img: "/assets/ursusFA-removebg.png",
    },
    { name: "Ursus", key: "ursus", img: "/assets/ursusA-removebg.png" },
    { name: "Mici", key: "mici", img: "/assets/mici-removebg.png" },
    { name: "Pizza", key: "pizza", img: "/assets/pizza-removebg.png" },
    { name: "Hot-Dog", key: "hotDog", img: "/assets/hotDog-removebg.png" },
    { name: "Covrigei", key: "covrigei", img: "/assets/covrigei-removebg.png" },
  ];

  const total = Object.values(totalPrices).reduce((sum, p) => sum + p, 0);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Product Counter</h1>

      <div className="mainScreen">
        {allProducts.map((p) => (
          <div key={p.key} className="product">
            <Image src={p.img} alt={p.name} width={100} height={100} />
            <div className="infoProd">
              <strong>{p.name}</strong>
              <p>
                {amounts[p.key]} × {unitPrices[p.key]} lei ={" "}
                {totalPrices[p.key].toFixed(2)} lei
              </p>
              <div className="amount_container">
                <button onClick={() => decreaseAmount(p.key)}>-</button>
                {amounts[p.key]} buc
                <button onClick={() => increaseAmount(p.key)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <h2>Total: {total.toFixed(2)} lei</h2>
    </div>
  );
}

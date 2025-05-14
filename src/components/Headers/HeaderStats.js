import React, { useEffect, useState } from "react";
import CardStats from "../Cards/CardStats.js";

function getWeekRange(offset = 0) {
  const now = new Date();
  const start = new Date(now.setDate(now.getDate() - now.getDay() + offset * 7));
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return { start, end };
}

function countItemsInRange(items, range) {
  return items.filter((item) => {
    const date = new Date(item.createdAt);
    return date >= range.start && date < range.end;
  }).length;
}

function getTrendStats(current, previous) {
  if (previous === 0) return { percent: 100, direction: "up" };
  const change = current - previous;
  const percent = Math.abs((change / previous) * 100).toFixed(1);
  return {
    percent,
    direction: change >= 0 ? "up" : "down",
  };
}

export default function HeaderStats() {
  const [stats, setStats] = useState({
    users: { count: 0, percent: 0, direction: "up" },
    cars: { count: 0, percent: 0, direction: "up" },
    orders: { count: 0, percent: 0, direction: "up" },
    contacts: { count: 0, percent: 0, direction: "up" },
  });

  useEffect(() => {
    const data = {
      users: JSON.parse(localStorage.getItem("registeredUsers")) || [],
      cars: JSON.parse(localStorage.getItem("cars")) || [],
      orders: JSON.parse(localStorage.getItem("orders")) || [],
      contacts: JSON.parse(localStorage.getItem("contacts")) || [],
    };

    const currentWeek = getWeekRange(0);
    const lastWeek = getWeekRange(-1);

    const result = {};

    for (const [key, items] of Object.entries(data)) {
      const current = countItemsInRange(items, currentWeek);
      const previous = countItemsInRange(items, lastWeek);
      const { percent, direction } = getTrendStats(current, previous);
      result[key] = { count: items.length, percent, direction };
    }

    setStats(result);
  }, []);

  return (
    <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="flex flex-wrap gap-x-2">
          <CardStats
            statSubtitle="USERS"
            statTitle={stats.users.count.toString()}
            statArrow={stats.users.direction}
            statPercent={stats.users.percent}
            statPercentColor={stats.users.direction === "up" ? "text-emerald-500" : "text-red-500"}
            statDescripiron="Compared to last week"
            statIconName="fas fa-user"
            statIconColor="bg-blue-500"
          />
          <CardStats
            statSubtitle="CARS"
            statTitle={stats.cars.count.toString()}
            statArrow={stats.cars.direction}
            statPercent={stats.cars.percent}
            statPercentColor={stats.cars.direction === "up" ? "text-emerald-500" : "text-red-500"}
            statDescripiron="Compared to last week"
            statIconName="fas fa-car"
            statIconColor="bg-green-500"
          />
          <CardStats
            statSubtitle="ORDERS"
            statTitle={stats.orders.count.toString()}
            statArrow={stats.orders.direction}
            statPercent={stats.orders.percent}
            statPercentColor={stats.orders.direction === "up" ? "text-emerald-500" : "text-red-500"}
            statDescripiron="Compared to last week"
            statIconName="fas fa-shopping-cart"
            statIconColor="bg-red-500"
          />
          <CardStats
            statSubtitle="CONTACTS"
            statTitle={stats.contacts.count.toString()}
            statArrow={stats.contacts.direction}
            statPercent={stats.contacts.percent}
            statPercentColor={stats.contacts.direction === "up" ? "text-emerald-500" : "text-red-500"}
            statDescripiron="Compared to last week"
            statIconName="fas fa-envelope"
            statIconColor="bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";

const DayCard = ({ day, date, selected, onClick }) => {
  const cardClassName = `card rounded text-center py-2 px-1 mx-1 lh-1 fw-bold ${selected ? "border selected-card" : ""}`;
  const dayColor = `fw-bold py-1 ${day === "Sun" && !selected ? "text-danger" : ""}`;
  const [dayPart, datePart] = date.split(' ');

  return (
    <div
      className={cardClassName}
      style={{ cursor: "pointer", minWidth: "4.5rem" }}
      onClick={onClick}
    >
      <span className={dayColor}>{day}</span>
      <div>
        <span>{dayPart}</span>
        <span style={{ marginLeft: "0.1rem" }}>{datePart}</span>
      </div>
    </div>
  );
};

export default DayCard;

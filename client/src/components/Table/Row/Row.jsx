import React, { useState } from "react";
import "./Row.scss";

const Row = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [arrow, setArrow] = useState("add");  
  const isOpen = (arrow) =>
    arrow.includes("add") ? setArrow("close") : setArrow("add");
  let rel = "Baja";
  if (product.relevance && product.relevance > 2) {
    rel = "Alta";
  } else if (product.relevance && product.relevance > 1) {
    rel = "Media";
  } else if (product.relevance) {
    rel = "Baja";
  }

  return (
    <>
      <tr className="Row">
        <td colSpan="0.1" ></td>
        <td>
          <button
            onClick={()=> {
              setOpen(!open);
              isOpen(arrow);
            }}
          >
            <span className="material-icons">{arrow}</span>
            {product.name}
          </button>
        </td>
        <td>{product.price}€</td>
        <td>{rel}</td>
      </tr>
      {open ? (
        <>
          <tr className="collapse">
            <th></th>
            <th>Fabricante</th>
            <th>CIF</th>
            <th>Dirección</th>
          </tr>
          <tr className="collapse">
            <td></td>
            <td>{product.manuName}</td>
            <td>{product.cif}</td>
            <td>{product.address}</td>
          </tr>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Row;

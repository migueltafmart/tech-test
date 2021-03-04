import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./Row/Row";
import "./Table.scss";
import SearchBar from "./SearchBar/SearchBar";
const Table = () => {
  const [products, setProducts] = useState([]);
  const [arrow, setArrow] = useState("keyboard_arrow_up");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState({ is: false, bias: "" });
  const [query, setQuery] = useState({ is: false, key: "" });
  const pageSize = 10;
  if (page < 0) {
    setPage(0);
  } else if (page * pageSize > products.length) {
    setPage(page - 1);
  }
  const isOrdered = (arrow, bias) => {
    if (arrow.includes("down")) {
      setArrow("keyboard_arrow_up");
      if (bias === "name") {
        setProducts(
          [...products]
            .sort((a, b) =>
              a[bias].toLowerCase() < b[bias].toLowerCase()
                ? -1
                : a[bias].toLowerCase() > b[bias].toLowerCase()
                ? 1
                : 0
            )
            .reverse()
        );
      } else {
        setProducts([...products].sort((a, b) => a[bias] - b[bias]).reverse());
      }
      setOrder({ is: true, bias: bias });
    } else {
      setArrow("keyboard_arrow_down");
      if (bias === "name") {
        setProducts(
          [...products].sort((a, b) =>
            a[bias].toLowerCase() < b[bias].toLowerCase()
              ? -1
              : a[bias].toLowerCase() > b[bias].toLowerCase()
              ? 1
              : 0
          )
        );
      } else {
        setProducts([...products].sort((a, b) => a[bias] - b[bias]));
      }
      setOrder({ is: true, bias: bias });
    }
  };

  useEffect(() => {
    //*Query principal a la BBDD
    axios
      .get("http://localhost:5000")
      .then((products) => {
        setProducts([...products.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSearch = () => {
    setQuery({ is: !query.is, key: query.key });
    setPage(0);
  };
  const onReset = () => {
    axios
      .get("http://localhost:5000")
      .then((products) => {
        setProducts([...products.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <table
      autoFocus
      onBlur={() => setOrder({ is: false, bias: "" })}
      className="Table"
    >
      <thead>
        <tr>
          <th>
            <button onClick={onSearch}>
              <span className="material-icons">search</span>
            </button>
          </th>
          <th>
            <button onClick={() => isOrdered(arrow, "name")}>
              {order.is && order.bias === "name" ? (
                <span className="material-icons">{arrow}</span>
              ) : (
                <></>
              )}
              Name
            </button>
          </th>
          <th>
            <button onClick={() => isOrdered(arrow, "price")}>
              {order.is && order.bias === "price" ? (
                <span className="material-icons">{arrow}</span>
              ) : (
                <></>
              )}
              Price
            </button>
          </th>
          <th>
            <button onClick={() => isOrdered(arrow, "relevance")}>
              {order.is && order.bias === "relevance" ? (
                <span className="material-icons">{arrow}</span>
              ) : (
                <></>
              )}
              Relevance
            </button>
          </th>
        </tr>
        {query.is ? (
          <SearchBar
            key="1"
            query={query}
            setQuery={setQuery}
            setProducts={setProducts}
          />
        ) : (
          <></>
        )}
      </thead>
      <tbody>
        {products.length > 0 ? (
          products
            .slice(page * 10, pageSize + page * 10)
            .sort()
            .map((product) => <Row product={product} key={product.productId} />)
        ) : query.is ? (
          <tr>
            <td className="mssg" colSpan="4">
              Buscando productos...
            </td>
          </tr>
        ) : query.key.lenght > 6 ? (
          <tr>
            <td className="mssg" colSpan="4">
              Cargando productos...
            </td>
          </tr>
        ) : (
          
          <tr>
            <td autoFocus className="mssg" colSpan="4">
              No se ha encontrado ningún producto
            </td> 
          </tr>
        )}
        <tr>
          <td colSpan="4">
            <div className="wrapper">
              <div>
                <button
                  onClick={() => setPage(page - 1)}
                  className="material-icons"
                >
                  keyboard_arrow_left
                </button>
                <span>{page + 1}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  className="material-icons"
                >
                  keyboard_arrow_right
                </button>
              </div>
              <span onClick={onReset} className="material-icons">
                restart_alt
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;

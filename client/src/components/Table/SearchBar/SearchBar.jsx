import React, {useState,useEffect} from "react";
import axios from "axios";
import "./SearchBar.scss";
const SearchBar = ({query, setQuery,setProducts}) => {
  
  const [keyword, setKeyword] = useState("");
  const onSearch = (e) => {
      e.preventDefault();
      setQuery({is:!query.is, key:keyword});
  }
  const write = () => {
    let userInput = document.querySelector("input[type=text]");
      setKeyword(userInput.value);
  }
  useEffect(() => {
    
    return () => {
      axios
      .get(`http://localhost:5000/search?q=${keyword}`)
      .then((products) => {
        setProducts([...products.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    }
}, [keyword, setProducts])

  return (
    <tr className="SearchBar">
      <td colSpan="4">
        <form onSubmit={(e)=>onSearch(e)} action="http://localhost:5000/search" method="GET">
        <input
          onChange={write}
          autoComplete="off"
          type="text"
          name="q"
          id="_q"
          placeholder="Encuentra un producto..."
        />
       {keyword.length > 0 ? <input className="material-icons" type="submit" value="send"/>:<></>}
        </form>
      </td>
    </tr>
  );
};

export default SearchBar;

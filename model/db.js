const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER,
  password: "Hola1234$",
  connectionLimit: 5,
  database: "tech-test",
});
exports.getProducts = async () => {
  let conn;
  let payload;
  try {
    conn = await pool.getConnection();
    let res = await conn.query(
      "SELECT * FROM products LEFT JOIN manufacturers ON manufacturerId=id;"
    );
    payload = res.filter((a) => typeof a === "object");
  } catch (err) {
    console.log(err);
    payload = [];
  } finally {
    if (conn) conn.end();
    return payload;
  }
};
exports.findProducts = async (query) => {
  query = query+"%";
  if (query) {
    let conn;
    let payload;
    try {
      conn = await pool.getConnection();
      let res = await conn.query(
        "SELECT * FROM products LEFT JOIN manufacturers ON manufacturerId=id WHERE name LIKE ? OR manuName LIKE ?;",
        [query, query]
      );
      payload = res.filter((a) => typeof a === "object");
    } catch (err) {
      console.log(err);
      payload = null;
    } finally {
      if (conn) conn.end();
      console.log(payload);
      return payload;
    }
  } else {
    return [];
  }
};

import "./index.css";

const ProductItems = ({ product }) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td className="desc">{product.description}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td className={product.sold ? "sold-color": "not-sold"}>{product.sold ? "Yes" : "No"}</td>
      <td>
        <img src={product.image} alt={product.title} />
      </td>
    </tr>
  );
};

export default ProductItems;

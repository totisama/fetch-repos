interface Product {
  id: number
  title: string
  thumbnail: string
  description: string
}

export const Product = ({ product }: { product: Product }) => {
  const { id, title, thumbnail, description } = product

  const onClick = (title: string) => {
    alert(title)
  }

  return (
    <li
      className="product"
      key={id}
      onClick={() => {
        onClick(title)
      }}
    >
      <h2>{title}</h2>
      <img className="image" src={thumbnail} alt={title} />
      <p>{description}</p>
    </li>
  )
}



import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useProducts } from "../hook/useApi";
import Form from 'react-bootstrap/Form';
import { FormCheck } from "react-bootstrap";
import { useState } from "react";


export default function CardProduct() {
  const {products, deleteElement, addElement, updateElement } = useProducts();

  const [checked, setChecked] = useState(false);

  const [input, setInput] = useState({
      title: '',
      price: '',
      description: '',
      id: 0
    })

  function handleAddElement(){
    addElement(objProduct);
    setInput({ title: '', price: '', description: '', id: 0 })
  }
  
  function handleCheckedUpdate(){
    	setInput({ ...input, id: input.id });
      updateElement(input.id, objProduct);
      setInput({ title: '', price: '', description: '', id: 0 })
  }

    const objProduct = {
      title: input.title,
      price: input.price,
      description: input.description
    }

  return (
    <div className="d-flex flex-column">
        <h1>Products</h1>
      <div className="mb-5 col-12 d-flex justify-content-center">
        <Form className="col-8 flex-column mt-5 mr-5">
        	<Form.Control className="mt-2" type="text" placeholder="Title" value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} />
          <Form.Control className="mt-2" type="text" placeholder="Price" value={input.price} onChange={(e) => setInput({ ...input, price: e.target.value })} />
          <Form.Control className="mt-2" type="text" placeholder="Description" value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} />
          {!checked && <Form.Control className="mt-2" type="number" placeholder="ID Prodotto" value={input.id === 0 ? '' : input.id.toString() } onChange={(e) => setInput({ ...input, id: Number(e.target.value) })} />}
          <FormCheck type="switch" label="Add product" className="d-flex mt-1" onClick={() => setChecked(!checked)} />
          {checked && <Button variant="primary" onClick={handleAddElement}>Add Product</Button>}
          {!checked && <Button variant="primary" onClick={handleCheckedUpdate}>Update Product</Button>}
        </Form>
      </div>
      <section className="col-12 d-flex justify-content-center flex-wrap gap-3">
        {products &&
          products.map((item, ind) => {
            return (
              <Card key={ind} style={{ width: "19rem" }} className="d-flex flex-column">
                <Card.Img variant="top" src={item.images && item.images[0]} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>${item.price}</Card.Text>
                  <div className="d-flex justify-content-center">
                    <Button variant="danger" onClick={() => deleteElement(item?.id || input.id)}>Delete Product</Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </section>
    </div>
  );
}

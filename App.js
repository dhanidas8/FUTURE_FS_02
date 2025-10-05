import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const products = [
    { id: 1, name: "T-shirt", price: 499 },
    { id: 2, name: "Jeans", price: 999 },
    { id: 3, name: "Sneakers", price: 1599 },
    { id: 4, name: "Hoodie", price: 1299 },
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const changeQty = (id, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + amount) }
          : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill all details!");
      return;
    }
    alert("Checkout successful! Thank you for your order ❤️");
    setCart([]);
    setCheckout(false);
    setName("");
    setEmail("");
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🛍️ Mini E-Commerce Storefront</h2>

      {!checkout && (
        <>
          <input
            type="text"
            placeholder="Search products..."
            className="form-control mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="row">
            {filtered.map((p) => (
              <div className="col-md-3 mb-4" key={p.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <h5>{p.name}</h5>
                    <p>₹{p.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="mt-4">🛒 Cart</h4>
          {cart.length === 0 ? (
            <p>No items added.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  <span>
                    {item.name} (₹{item.price}) × {item.qty}
                  </span>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary me-1"
                      onClick={() => changeQty(item.id, -1)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => changeQty(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <h5 className="mt-3">Total: ₹{total}</h5>
              <button
                className="btn btn-success mt-2"
                onClick={() => setCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      )}

      {checkout && (
        <form onSubmit={handleCheckout} className="mt-4">
          <h4>Checkout</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Submit Order
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setCheckout(false)}
          >
            Back
          </button>
        </form>
      )}
    </div>
  );
}

export default App;

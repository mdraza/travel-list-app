import React, { useEffect, useState } from "react";

const Prac = () => {
  const [items, setItems] = useState(() => {
    const storedItem = localStorage.getItem("items");
    return storedItem ? JSON.parse(storedItem) : [];
  });

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div style={{ padding: "50px" }}>
      <Form onAddItem={handleAddItem} />
      <ListItem
        items={items}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    </div>
  );
};

const Form = ({ onAddItem }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuentity] = useState(1);

  const handleForm = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItems = { id: Date.now(), description, quantity, packed: false };
    console.log(newItems);
    onAddItem(newItems);
    setDescription("");
    setQuentity(1);
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <select
          value={quantity}
          onChange={(e) => setQuentity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={description}
          placeholder="Enter description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add Items</button>
      </form>
    </div>
  );
};

const ListItem = ({ items, onDeleteItem, onUpdateItem }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div>
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
      <div style={{ marginTop: "200px" }}>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed</option>
        </select>
      </div>
    </div>
  );
};

const Item = ({ item, onDeleteItem, onUpdateItem }) => {
  return (
    <li style={{ listStyleType: "none" }}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        &nbsp;{item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

export default Prac;

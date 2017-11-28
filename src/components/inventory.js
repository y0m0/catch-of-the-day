import React from 'react';
import AddFishForm from './addfishform'

class Inventory extends React.Component {
  constructor() {
    super();

    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, key) {
    const fish = this.props.fishes[key];
    // take a cojpy of that fish and update with the new data
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]

    return (
      <div className="fish-edit" key={key}>
        <input value={fish.name} type="text" name="name" placeholder="Fish Name" onChange={(event) => this.handleChange(event, key)}/>
        <input value={fish.price} type="text" name="price" placeholder="Fish Price" onChange={(event) => this.handleChange(event, key)}/>
        <select value={fish.status} type="text" name="status" placeholder="Fish Status" onChange={(event) => this.handleChange(event, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea value={fish.desc} name="desc" placeholder="Fish Desc" onChange={(event) => this.handleChange(event, key)}></textarea>
        <input value={fish.image} name="image" type="text" placeholder="Fish Image" onChange={(event) => this.handleChange(event, key)}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;

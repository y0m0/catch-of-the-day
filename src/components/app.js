import React from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';
import sampleFishes from '../sample-fishes';
import Fish from './fish'
import base from '../base'


class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // this run right before the <App /> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      });

    // check if there is an order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // update the state
    const fishes = {...this.state.fishes};
    // add our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // make a copy of the current state
    const order = {...this.state.order};
    // update or add the number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  }

  render() {
    return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="list-of-fishes">
          {
            Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
          }
        </ul>
      </div>
      <Order
        fishes={this.state.fishes}
        order={this.state.order}
        params={this.props.params}
      />
      <Inventory
        addFish={this.addFish}
        loadSamples={this.loadSamples}
        fishes={this.state.fishes}
        updateFish={this.updateFish}
      />
    </div>
    )
  }
}

export default App;

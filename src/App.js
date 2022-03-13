import React, { Component } from 'react';
import Car from './Car/Car';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Counter from './Counter/Counter';
import './App.scss';

export const clickedContext = React.createContext(false);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
			cars: [
				{ name: 'Ford', year: 2016 },
				{ name: 'Mazda', year: 2018 },
				{ name: 'Audi', year: 2013 },
			],
			pageTitle: 'Hello',
			showCars: true,
		};
	}

	toggleCarsHandler = () => {
		this.setState({
			showCars: !this.state.showCars,
		});
	};

	handleInput = (event) => {
		this.setState({
			pageTitle: event.target.value,
		});
	};

	onChangeName(name, index) {
		const car = this.state.cars[index];
		car.name = name;
		const cars = [...this.state.cars];
		cars[index] = car;
		this.setState({ cars });
	}

	deleteHandler(index) {
		const cars = this.state.cars.concat();
		cars.splice(index, 1);
		this.setState({ cars });
	}

	render() {
		const divStyle = {
			textAlign: 'center',
		};
		let cars = null;
		if (this.state.showCars) {
			cars = this.state.cars.map((item, index) => {
				return (
					<ErrorBoundary key={index}>
						<Car
							index={index}
							name={item.name}
							year={item.year}
							onDelete={this.deleteHandler.bind(this, index)}
							onChangeName={(event) => this.onChangeName(event.target.value, index)}
						/>
					</ErrorBoundary>
				);
			});
		}
		return (
			<div style={divStyle} className="App">
				<h1 style={{ color: 'red' }}>{this.props.title}</h1>
				<clickedContext.Provider value = { this.state.clicked}>
					<Counter />
				</clickedContext.Provider>
				<hr />
				<button className={'AppButton'} style={{ marginTop: 20 }} onClick={this.toggleCarsHandler}>
					Toggle cars
				</button>
				<button onClick={() => this.setState({ clicked: true })}>Change clicked</button>
				<div
					style={{
						width: 400,
						margin: 'auto',
						paddingTop: '20px',
					}}
				>
					{cars}
				</div>
			</div>
		);
	}
}
export default App;


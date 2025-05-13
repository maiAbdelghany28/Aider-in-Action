import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    history: [],
    isDarkMode: localStorage.getItem("theme") === "dark" || false,
    isScientificMode: false,
  };

  toggleTheme = () => {
    const newTheme = this.state.isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  toggleScientificMode = () => {
    this.setState({ isScientificMode: !this.state.isScientificMode });
  };

  handleClick = (buttonName) => {
    const result = calculate(this.state, buttonName);
    const isEqualsPressed = buttonName === "=";
    const scientificOps = ["sin", "cos", "tan", "log", "√"];

    if (isEqualsPressed && this.state.next && this.state.operation && this.state.total) {
      const equation = `${this.state.total} ${this.state.operation} ${this.state.next} = ${result.total}`;
      this.setState({
        ...result,
        history: [equation, ...this.state.history],
      });
    } else if (scientificOps.includes(buttonName)) {
      const input = this.state.next || this.state.total || "0";
      const equation = `${buttonName}(${input}) = ${result.total}`;
      this.setState({
        ...result,
        history: [equation, ...this.state.history],
      });
    } else {
      this.setState(result);
    }
  };

  clearHistory = () => {
    this.setState({ history: [] });
  };

  render() {
    const themeClass = this.state.isDarkMode ? "dark-theme" : "light-theme";

    return (
      <div className={`component-app ${themeClass}`}>
        <div className="top-bar">
          <button onClick={this.toggleScientificMode} className="scientific-toggle">
            Scientific Mode: {this.state.isScientificMode ? "ON" : "OFF"}
          </button>
          <button onClick={this.toggleTheme} className="theme-toggle">
            Toggle Theme
          </button>
        </div>

        <Display value={this.state.next || this.state.total || "0"} />

        <ButtonPanel
          clickHandler={this.handleClick}
          isScientificMode={this.state.isScientificMode}
        />

        <div className="history">
          <h2>Calculation History</h2>
          <ul>
            {this.state.history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button onClick={this.clearHistory}>Clear History</button>
        </div>
      </div>
    );
  }
}
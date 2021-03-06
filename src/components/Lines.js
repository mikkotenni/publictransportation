import React, { Component } from "react";
import GetLines from "../services/GetLines";
import GetFilteredLines from '../services/GetFilteredLines';
import Line from './Line';
import Spinner from './Spinner';

/*
* This component manages lines list and filtering of it.
*/
class Lines extends Component {
  constructor() {
    super();
    this.state = { lines: null, filterStr: '' };
  }

  async componentDidMount() {
    try {
      const lines = await GetLines;
      this.setState({ lines });
      this.filterInput.focus();
    } catch (e) {
      console.error(e);
    }
  }

  onChangeHandler(e) {
    this.setState({ filterStr: e.target.value });
  }

  render() {
    if (!this.state.lines) {
      return (
        <Spinner />
      )
    }

    const filteredLines = GetFilteredLines(this.state.filterStr, this.state.lines);
    return (
      <section>
        <input type="text"
          value={this.state.filterStr}
          onChange={this.onChangeHandler.bind(this)}
          placeholder="Name of line, stop or station"
          className="pa3 w-100 ba br1 b--gray"
          ref={input => { this.filterInput = input; }}
          aria-label="Filter lines by the name of line, stop or station"></input>
        <div className="flex flex-column flex-row-ns flex-wrap-ns">
          {filteredLines.map((l, index) => <Line data={l} key={`${index}${l.id}`} />)}
        </div>
      </section>
    )
  }
}

export default Lines;
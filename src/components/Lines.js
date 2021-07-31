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
    this.state = { lines: [], filterStr: '' };
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
    const filteredLines = GetFilteredLines(this.state.filterStr, this.state.lines);
    if (this.state.lines.length === 0) {
      return (
        <Spinner />
      )
    }

    return (
      <section>
        <input type="text"
          value={this.state.filterStr}
          onChange={this.onChangeHandler.bind(this)}
          placeholder="Filter by names..."
          className="pa3 w-100 ba br1 b--gray"
          ref={input => { this.filterInput = input; }}></input>
        <div className="flex flex-wrap">
          {filteredLines.map((l, index) => <Line data={l} key={`${index}${l.id}`} />)}
        </div>
      </section>
    )
  }
}

export default Lines;
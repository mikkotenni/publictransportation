import React, { Component } from "react";
import GetLines from "../services/GetLines";
import GetFilteredLines from '../services/GetFilteredLines';
import Line from './Line';

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
    } catch (e) {
      // TODO: Proper error handling if data fetching goes south.
    }
  }

  onChangeHandler(e) {
    this.setState({ filterStr: e.target.value });
  }

  render() {
    const filteredLines = GetFilteredLines(this.state.filterStr, this.state.lines);
    return (
      <section>
        <input type="text" value={this.state.filterStr} onChange={this.onChangeHandler.bind(this)}
          placeholder="Filter by names..." className="pa3 w-100 ba br2 b--light-purple"></input>
        {filteredLines.map((line, index) => <Line data={line} key={index + '_' + line.id} />)}
      </section>
    )
  }
}

export default Lines;
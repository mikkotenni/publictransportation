import React, { Component } from "react";
import GetLines from "../services/GetLines";
import GetFilteredLines from '../services/GetFilteredLines';
import Line from './Line';

/*
* This component manages lines list and filtering of it.
* FIXME: Make filter input component in case stops or stations need to be
* filtered. Or follow the rule of three. Lines view bonus section in challenge states "This list
* should be filtered by line or station name too." but I'm not entirely sure how that works
* as lines are filtered already here.
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
      <div>
        <input type="text" className="filter" value={this.state.filterStr} onChange={this.onChangeHandler.bind(this)} placeholder="Filter by names..."></input>
        <div className="line-cards">
          {filteredLines.map((line, index) => <Line data={line} key={index + '_' + line.id} />)}
        </div>
      </div>
    )
  }
}

export default Lines;
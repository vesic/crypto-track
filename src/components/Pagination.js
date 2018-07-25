import React, { Component } from 'react';

class Pagination extends Component {
  state = { page: 0 };

  toggle = (e, forward) => {
    e.preventDefault();
    forward ? this.up() : this.down()
  };

  up = () => {
    const { page } = this.state
    const { load } = this.props
    if (page < 4) {
      this.setState({ page: page + 1 }, () => load(this.state.page))
    }
  }

  down = () => {
    const { page } = this.state
    const { load } = this.props
    if (page > 0) {
      this.setState({ page: page - 1 }, () => load(this.state.page))
    }
  }

  render() {
    const { page } = this.state;
    return (
      <div style={style.div}>
        <button style={style.button} disabled={page === 0} onClick={e => this.toggle(e, false)}>&laquo;</button>
        <button style={style.button} disabled={page === 4} onClick={e => this.toggle(e, true)}>&raquo;</button>
        <div style={style.fromTo}>{page * 10 + 1} - {(page + 1) * 10}</div>
      </div>
    );
  }
}

const style = {
  div: {
    marginBottom: 5,
  },
  button: {
    fontSize: '1.2em'
  },
  fromTo: {
    fontSize: '1.1em',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}

export default Pagination;

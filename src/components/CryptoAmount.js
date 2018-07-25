import React, { Component } from 'react';
import { isValidInput } from '../crypto-helpers'
import LocalStorage from '../LocalStorage'
import PropTypes from 'prop-types';
import './CryptoAmount.css'

const KEY = 'cryptos'

class CryptoAmount extends Component {
  state = { value: '' }

  componentDidMount() {
    this.getValue()
  }

  getValue = () => {
    const { name } = this.props
    let coin = LocalStorage.get(KEY, {})[name]
    if (coin) {
      this.setState({ value: coin.ammount })
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = e => {
    const { value } = this.state
    const { onCryptoSubmit } = this.props
    e.preventDefault();
    if (isValidInput(this.state.value)) {
      onCryptoSubmit(value)
    } else {
      alert('Not a valid input', value)
      this.getValue()
    }
  }

  render() {
    const { value } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          // type="number" // ? num
          step="0.001"
          style={width100}
          value={value}
          onChange={this.handleChange} />
        <input
          disabled={!value.length}
          style={Object.assign({}, width100, marginTop1)}
          type="submit"
          value="Submit"
        />
      </form>
    )
  }
}

const width100 = {
  width: '100%'
}

const marginTop1 = {
  marginTop: 1
}

CryptoAmount.propTypes = {
  onCryptoSubmit: PropTypes.func.isRequired
};

export default CryptoAmount;

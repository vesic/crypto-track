import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CryptoAmount from './CryptoAmount'
import CryptoValue from './CryptoValue'
import { isPositive as positive } from '../crypto-helpers'
import LocalStorage from '../LocalStorage'
import PropTypes from 'prop-types';

const KEY = 'cryptos'

class CryptoRow extends Component {
  state = { coin: {} }

  componentDidMount() {
    const { name } = this.props.item
    let cached = LocalStorage.get(KEY, {})
    if (cached[name]) {
      this.setState({ coin: cached[name] })
    }
  }

  handleCryptoSubmit = money => {
    const { name, quotes } = this.props.item
    let cached = LocalStorage.get(KEY, {})
    cached[name] = { price: quotes.USD.price, ammount: money }
    LocalStorage.set(KEY, cached)
    this.setState({ coin: cached[name], old: this.state.coin })
  }

  render() {
    const { id, name, symbol, quotes } = this.props.item
    const { coin, old } = this.state
    return (
      <tr>
        <td><Link to={`crypto/${id}`}>{name}</Link></td>
        <td>{symbol}</td>
        <td>$ {quotes.USD.price}</td>
        <td style={isPositive(quotes.USD.percent_change_24h)}>{quotes.USD.percent_change_24h}</td>
        <td><CryptoAmount name={name} onCryptoSubmit={this.handleCryptoSubmit} /></td>
        <td><CryptoValue coin={coin} old={old}/></td>
      </tr>
    )
  }
}

const isPositive = change => positive(change) ? { color: 'green' } : { color: 'red' }

CryptoRow.propTypes = {
  item: PropTypes.object.isRequired
};

export default CryptoRow

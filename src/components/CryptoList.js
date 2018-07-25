import React, { Component } from 'react'
import axios from 'axios'
import Loader from './Loader'
import Pagination from './Pagination'
import CryptoRow from './CryptoRow'
import { sortCryptos, toTitleCase } from '../crypto-helpers'
import { chunk } from 'lodash'
import './Crypto.css'

const NAME = 'name'
const SHORT_NAME = 'short name'
const VALUE = 'value'
const LAST24 = 'last 24'
const AMOUNT = 'amount you own'
const YOUR_COIN_VALUE = 'value of your coin'
const API = 'https://api.coinmarketcap.com/v2/ticker/?limit=100&structure=array'

const RATE = 60000

class CryptoList extends Component {
  state = { cryptos: [], paginated: [], loading: true, page: 0 }

  componentDidMount() {
    this.callApi();
    this.interval = setInterval(() => {
      this.callApi()
    }, RATE);
  }

  callApi = async () => {
    const { page } = this.state
    let cryptos = await axios.get(API)
    cryptos = sortCryptos(cryptos.data.data).slice(0, 50) // sort by $ and take 50
    cryptos = chunk(cryptos, 10)
    this.setState({ cryptos, paginated: cryptos[page], loading: false })
  }

  renderItems = () => (
    <React.Fragment>
      <Pagination load={this.handleLoad} />
      <table>
        <thead>
          <tr>
            <th>{toTitleCase(NAME)}</th>
            <th>{toTitleCase(SHORT_NAME)}</th>
            <th>$ {toTitleCase(VALUE)}</th>
            <th>{toTitleCase(LAST24)}</th>
            <th>{toTitleCase(AMOUNT)}</th>
            <th>$ {toTitleCase(YOUR_COIN_VALUE)}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.paginated.map(item => <CryptoRow key={item.id} item={item} />)}
        </tbody>
      </table>
    </React.Fragment>
  )

  handleLoad = page => {
    this.setState({ page, paginated: this.state.cryptos[page] })
  }

  render() {
    const { paginated } = this.state
    return paginated.length // if > 0
      ? this.renderItems()
      : <Loader />
  }

  componentWillUnmount() {
    // invalidating timers
    clearInterval(this.interval)
  }
}

export default CryptoList

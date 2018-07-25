import React, { Component } from "react"
import axios from 'axios'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Loader from './Loader'

const API = 'https://api.coinmarketcap.com/v2/ticker/'

const Details = ({ match, item }) => (
  <React.Fragment>
    <div className="card">
      <div className="container">
        <h2>{item.name}</h2>
        <h3>{item.symbol}</h3>
        <h4>${item.quotes.USD.price}</h4>
      </div>
    </div>
    <Link to="/" style={style.button}>
      <button>Back</button>
    </Link>
  </React.Fragment>
)

Details.propTypes = {
  match: PropTypes.object.isRequired,
  item: PropTypes.object
};

class Crypto extends Component {
  state = { item: {}, loading: true }

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    const res = await axios.get(`${API}${this.props.match.params.id}/`)
    this.setState({ item: res.data.data, loading: false })
  }

  render() {
    const { item } = this.state
    return (
      this.state.loading ? (
        <Loader />
      ) : (
        <Details {...this.props} item={item} />
      )
    )
  }
}

const style = {
  button: {
    marginTop: 10,
    display: 'inline-block'
  }
}

export default Crypto

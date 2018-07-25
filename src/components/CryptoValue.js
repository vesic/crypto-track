import React, { Component } from 'react'
import { formatCoinValue } from '../crypto-helpers'

class CryptoValue extends Component {
  renderDiff = () => {
    const {old, coin} = this.props
    if (old && Object.keys(old).length) {
        let before = old.price * parseFloat(old.ammount)
        let after = coin.price * parseFloat(coin.ammount)
        let diff = (after - before).toFixed(3)
        if (diff > 0) {
          return <div style={{color:'green'}}>{diff}</div>
        } else {
          return <div style={{color:'red'}}>${-diff}</div>
        }
    }
  }

  render() {
    const { ammount, price } = this.props.coin
    return (
      <div>
        <h3>${formatCoinValue(ammount, price)}</h3>
        {this.renderDiff()}
      </div>
    );
  }
}

export default CryptoValue;

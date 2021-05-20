import react, { Component } from 'react'

interface CurSelProps {
  currency: string,
  selectCurrencyHandler: (currency: string) => void
}

class CurrencySelector extends Component<CurSelProps> {

  render() {
    const currencies = ['usd', 'jpy', 'eur']
    const { currency, selectCurrencyHandler } = this.props
      return (
        <form>
          <select id="currencySelect" name="currency" value={currency} onChange={(e) => selectCurrencyHandler(e.target.value)}>
            {currencies.map((x, i) => {
              return <option key={i} value={x}>{x}</option>
            })}
          </select>
        </form>
      )
  }
}

export default CurrencySelector
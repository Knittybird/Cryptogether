import React, { Component } from 'react'
import logo from './images/logo.png'
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import CurrencySelector from './components/CurrencySelector'
import { BrowserRouter, Redirect, Switch, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Coins from './components/Coins'
import CoinOHLC from './components/CandleStick'
// import Exchanges from './components/Exchanges'


interface AppProps {
}

interface AppState {
  currency: string
}

class App extends Component<AppProps, AppState> {
  constructor(props){
    super(props)
    this.state = {
      currency: "usd"
    }
  }

  selectCurrencyHandler = (currency: string) => {
    this.setState({
      currency: currency
    })
    console.log("Set currency to", currency)
  }

  render() {
    const { currency } = this.state
    return (
      <main className="cryptogether">
        <BrowserRouter>
          <header className="pl-10">
            <Navbar bg="dark" variant="dark" expand="sm">
              <Navbar.Brand className="ml-10" as={Link} to="/home">
                <img className="d-inline-block align-top" width={30} height={30} src={logo} alt="Cryptogether" /> Cryptogether</Navbar.Brand>
              <CurrencySelector currency={currency} selectCurrencyHandler={this.selectCurrencyHandler}/>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="w-100 justify-content-end">
                  <Link className="nav-link" to="/home">Dashboard</Link>
                  <Link className="nav-link" to="/coins">Coins</Link>
                  <Link className="nav-link" to="/exchanges">Exchanges</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <Switch>
            <Redirect exact from ="/" to="/home" />
            <Route path="/home">
              <Dashboard currency={currency}/>
            </Route>
            <Route path="/coins">
              <Coins currency={currency}/>
            </Route>
            <Route path="/exchanges">
              <CoinOHLC />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App

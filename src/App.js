import React, { Component } from 'react'
import logo from './logo.svg'
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import CurrencySelector from './components/CurrencySelector'
import { BrowserRouter, Redirect, Switch, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Coins from './components/Coins'
import Exchanges from './components/Exchanges'

class App extends Component {
  constructor(){
    super()
    this.state = {
      currency: "usd"
    }
  }

  selectCurrencyHandler = (currency) => {
    this.setState({
      currency: currency
    })
    console.log("Set currency to", currency)
  }

  render() {
    const { currency } = this.state
    return (
      <main className="cloudly">
        <header className="pl-10">
          <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand className="ml-10" href="/home">Cloudly</Navbar.Brand>
            <CurrencySelector currency={currency} selectCurrencyHandler={this.selectCurrencyHandler}/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="w-100 justify-content-end">
                <Nav.Link href="/home">Dashboard</Nav.Link>
                <Nav.Link href="/coins" to="/coins">Coins</Nav.Link>
                <Nav.Link href="/exchanges">Exchanges</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <BrowserRouter>
          <Switch>
            <Redirect exact from ="/" to="/home" />
            <Route path="/home">
              <Dashboard currency={currency}/>
            </Route>
            <Route path="/coins">
              <Coins />
            </Route>
            <Route path="/exchanges">
              <Exchanges />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App
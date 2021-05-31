import React, { Component } from 'react'
import logo from './images/logo.png'
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import CurrencySelector from './components/CurrencySelector'
import { BrowserRouter, Redirect, Switch, Route, Link } from 'react-router-dom'
import Coins from './components/Coins'
import Exchanges from './components/Exchanges'
import Coin from './components/Coin';
import Exchange from './components/Exchange'

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
  }

  render() {
    const { currency } = this.state
    return (
      <main className="cryptogether">
        <BrowserRouter>
          <header className="pl-10">
            <Navbar variant="dark" className="navbar-custom" expand="sm">
              <Navbar.Brand className="ml-10" as={Link} to="/coins">
                <img className="d-inline-block align-top" width={30} height={30} src={logo} alt="Cryptogether" /> Cryptogether</Navbar.Brand>
              <CurrencySelector currency={currency} selectCurrencyHandler={this.selectCurrencyHandler}/>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="w-100 justify-content-end">
                  <Link className="nav-link" to="/coins">Coins</Link>
                  <Link className="nav-link" to="/exchanges">Exchanges</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <Switch>
            <Redirect exact from ="/" to="/coins" />
            <Route path="/coins">
              <Coins currency={currency}/>
            </Route>
            <Route path="/exchanges">
              <Exchanges />
            </Route>
            <Route path="/coin/:id" component={Coin} >
              <Coin currency={currency} />
            </Route>
            <Route path="/exchange/:id" component={Exchange} >
              <Exchange currency={currency} />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App

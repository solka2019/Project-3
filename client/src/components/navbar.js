import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import logo from '../chorezlogo.png';
import '../App.css';
import axios from 'axios';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        console.log('logging out');
        axios.post('/parent/logout').then(response => {
          console.log(response.data);
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null,
              user: null,
              children: null,
              tasks: null
            });
            
            // since the parent logged off, we need to re-load the 
            // lists for children
            this.props.appState.refreshListsForChildScreen();
          }
        }).catch(error => {
            console.log('Logout error:' + error);
        });
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ');
        console.log(this.props);
        
        // https://reactjs.org/docs/conditional-rendering.html
        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-12" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">Logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary">Parent Login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">Registration</span>
				</Link>
                                </section>
                            )}
                    </div>

                    <div className="col-12 col-lg-auto">
                    {/* <div id="top-filler"></div> */}
                        <img src={logo} classId="App-logo" alt="logo" style={{width: '230px', height: '230px'}} />
                        {/* <h1 className="App-title">Child Chores</h1> */}
                    </div>
                </header>
            </div>

        );

    }
}

export default Navbar;
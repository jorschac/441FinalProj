import React, { Component } from 'react';
import './index.css';
import { NavBar, MobileNav } from './common/navigate.js';
import { Explore } from './explore/explore.js';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { Create } from './create/create.js';
//import { FrontPage } from './home/front.js';

// main component
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {mobileMenuOn: false, selected: false, 
        selectedPalette: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'], currentTheme: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326']
        , UserImg: "http://localhost:3000/img/userimg.png", currUsrFollowingNum: 777, currUsrFollowersNum: 666, currUsrName: "SampleName", currUsrDesc: "this is a sample description"}; //UserImg will use picture sent from go later
    }

    // selecte a palette
    handleSelectPalette = (palette) => {
        if (!this.state.selected) {
            this.setState({selected: true});
        }
        this.setState({ selectedPalette: palette });
    }

    // apply selected theme when apply tab is clicked
    handleApplyClick = () => {
        if (this.state.selected) {
            this.setState({ currentTheme: this.state.selectedPalette, selected: false });
        }
    }

    // functionality for mobile menu (hamburger menu)
    handleMobileMenu = () => {
        let status = !this.state.mobileMenuOn;
        this.setState({ mobileMenuOn: status });
    }

    handleCreateChange = (color, index) => {
        let newSelectedPalette = this.state.selectedPalette;
        newSelectedPalette[index] = color;
        this.setState({selectedPalette: newSelectedPalette, selected: true});
    }

    render() {
        let style = { '--lightShade': this.state.currentTheme[0], '--lightAccent': this.state.currentTheme[1], 
        '--mainColor': this.state.currentTheme[2], '--darkAccent': this.state.currentTheme[3], 
        '--darkShade': this.state.currentTheme[4]};
    
        let mobileNavProp = {handleApply: this.handleApplyClick, mobileMenuOn: this.state.mobileMenuOn, handleMobileMenu: this.handleMobileMenu}
        
        let exploreProp = {handleSelectPalette: this.handleSelectPalette, handleApplyClick: this.handleApplyClick, selectedPalette: this.state.selectedPalette,
            currentTheme: this.state.currentTheme, selected: this.state.selected, UserImg: this.state.UserImg,
            currUsrFollowingNum: this.state.currUsrFollowingNum, currUsrFollowersNum: this.state.currUsrFollowersNum, 
            currUsrName: this.state.currUsrName, currUsrDesc: this.state.currUsrDesc};
        return (

            <div className='appContainer' style={style}>
                <header>
                    <Link exact to='/'><h1>acryline</h1></Link>
                </header>
                <NavBar handleApply={this.handleApplyClick} handleMobileMenu={this.handleMobileMenu}/>
                <MobileNav propList={mobileNavProp} />
                <Switch>
                    <Route exact path='/' render={() => <Explore propList={exploreProp}/>}/>
                    <Route path='/create' render={() => <Create selectedPalette={this.state.selectedPalette} handleCreateChange={this.handleCreateChange}/>}/>
                    <Route path='/explore' render={() => <Explore propList={exploreProp}/>}/>
                    <Redirect to='/'></Redirect>
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;

class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Powered by <a href='https://casesandberg.github.io/react-color/'>React Color</a> | <a href='https://github.com/Qix-/color-convert#readme'>Color-Convert</a></p>
                <p>© 2019 Gunhyung Cho  |  Jiuzhou Zhao</p>
                <address>Contact: <a href='mailto:ghcho@uw.edu'>ghcho@uw.edu</a> |  <a href='mailto:jz73@uw.edu'>jz73@uw.edu</a></address>
            </footer>
        );
    }
}
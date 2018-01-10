import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Spinner from '../components/common/Spinner';
import HandleAuthModal from '../containers/HandleAuthModal';
import Main from './Main';

class App extends Component {
    componentDidMount() {
        this.props.getPages();
    }

    render() {
        return (
            <div>
                <Navbar pages={this.props.pages} />
                <Main />
                { this.props.openSignInModal || this.props.openSignUpModal ? <HandleAuthModal /> : null}                  
                <Spinner loaded={this.props.toSpin}/>
            </div>
        )
    }
}

App.propTypes = {
    openSignInModal : PropTypes.bool,
    openSignUpModal : PropTypes.bool,
    toSpin:PropTypes.bool
};

export default App;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Spinner from '../components/common/Spinner';
import HandleAuthModal from '../containers/HandleAuthModal';


class App extends Component {
    componentDidMount() {
        this.props.getPages();
    }

    render() {
        return (
            <div>
                <Navbar pages={this.props.pages} />
                { this.props.openSignInModal || this.props.openSignUpModal ? <HandleAuthModal /> : null}
                {this.props.children}
                <Spinner loaded={this.props.toSpin}/>
            </div>
        )
    }
}

App.propTypes = {
    openSignInModal : PropTypes.bool,
    openSignUpModal : PropTypes.bool,
    children : PropTypes.any,
    toSpin:PropTypes.bool
};

export default App;
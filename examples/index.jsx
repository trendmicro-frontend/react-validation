import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-modal/dist/react-modal.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import UpdateAccount from './UpdateAccount';

class App extends React.Component {
    render() {
        const name = 'React Validation';
        const url = 'https://github.com/trendmicro-frontend/react-validation';

        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ padding: '0 20px' }}>
                    <div className="row">
                        <div className="col-xs-6">
                            <UpdateAccount />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('container')
);

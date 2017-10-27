import { Button } from '@trendmicro/react-buttons';
import Modal from '@trendmicro/react-modal';
import cx from 'classnames';
import React, { PureComponent } from 'react';
import { Form, Input } from '../src';
import portal from './portal';
import * as validations from './validations';

export default class extends PureComponent {
    state = {
        changePassword: false,
        hasErrors: false
    };

    validate = () => {
        this.form.validate(err => {
            if (err) {
                return;
            }

            const data = JSON.stringify(this.form.getValues(), null, 4);

            portal(({ onClose }) => (
                <Modal onClose={onClose}>
                    <Modal.Header>
                        <Modal.Title>
                            {'Update Account'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{'Your account information has been saved successfully.'}</p>
                        <pre>{data}</pre>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={onClose}
                        >
                            {'Close'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            ));
        });
    };

    render() {
        const { changePassword, hasErrors } = this.state;

        return (
            <Form
                ref={node => {
                    this.form = node;
                }}
                onSubmit={(event) => {
                    event.preventDefault();
                }}
                onValidate={(err) => {
                    this.setState({ hasErrors: !!err });
                }}
            >
                <h1>Update Account</h1>
                <div className="form-group">
                    <Button
                        btnStyle="flat"
                        onClick={() => {
                            this.validate();
                        }}
                    >
                        <i className="fa fa-check" />
                        Validate All
                    </Button>
                </div>
                <div className="form-group">
                    <label>{'Name'}</label>
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        className="form-control input-width-default"
                        placeholder="Enter Your Name"
                        validations={[validations.required]}
                    />
                </div>
                <div className="form-group">
                    <label>{changePassword ? 'Old Password' : 'Password'}</label>
                    <div className="clearfix">
                        <Input
                            type="password"
                            name="oldPassword"
                            placeholder={changePassword ? 'Password' : ''}
                            className={cx(
                                { 'pull-left': !changePassword },
                                'form-control',
                                'input-width-default'
                            )}
                            validations={changePassword ? [validations.required] : []}
                            disabled={!changePassword}
                        />
                        {!changePassword &&
                        <Button
                            btnStyle="flat"
                            className="btn btn-default pull-left"
                            style={{ marginLeft: 16 }}
                            onClick={() => {
                                this.setState({ changePassword: true });
                            }}
                        >
                            {'Change Password'}
                        </Button>
                        }
                    </div>
                </div>
                {changePassword &&
                <div className="form-group">
                    <label>{'New Password'}</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control input-width-default"
                        validations={[validations.required, validations.password]}
                    />
                </div>
                }
                {changePassword &&
                <div className="form-group">
                    <label>{'Confirm Password'}</label>
                    <Input
                        type="password"
                        name="confirm"
                        value=""
                        placeholder="Confirm password"
                        className="form-control input-width-default"
                        validations={[validations.required]}
                    />
                </div>
                }
                <div className="form-group" style={{ marginTop: 24 }}>
                    <Button
                        btnStyle="primary"
                        disabled={hasErrors}
                        onClick={() => {
                            this.validate();
                        }}
                    >
                        <i className="fa fa-download" />
                        Save Changes
                    </Button>
                </div>
            </Form>
        );
    }
}

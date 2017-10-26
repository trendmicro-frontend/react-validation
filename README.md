# react-validation [![build status](https://travis-ci.org/trendmicro-frontend/react-validation.svg?branch=master)](https://travis-ci.org/trendmicro-frontend/react-validation) [![Coverage Status](https://coveralls.io/repos/github/trendmicro-frontend/react-validation/badge.svg?branch=master)](https://coveralls.io/github/trendmicro-frontend/react-validation?branch=master)

[![NPM](https://nodei.co/npm/@trendmicro/react-validation.png?downloads=true&stars=true)](https://nodei.co/npm/@trendmicro/react-validation/)

React Validation

Demo: https://trendmicro-frontend.github.io/react-validation

## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-validation](https://github.com/trendmicro-frontend/react-validation):

  ```
  npm install --save react @trendmicro/react-validation
  ```

2. Install [react-validation](https://github.com/trendmicro-frontend/react-validation)` with <b>@trendmicro</b> scope:

  ```js
  import { createForm, createFormControl } from '@trendmicro/react-validation';
  import Form from '@trendmicro/react-validation/components/form';
  import Input from '@trendmicro/react-validation/components/input';
  import Select from '@trendmicro/react-validation/components/select';
  import Textarea from '@trendmicro/react-validation/components/texarea';
  ```

## Usage

### Validations

First, you need to define some validation functions, like so:

```js
import isEmail from 'validator/lib/isEmail';

const Error = (props) => (
    <div {...props} style={{ color: '#A94442' }} />
);

export const email = (value, props, components) => {
    if (!isEmail(value)) {
        return (
            <Error>{`${value} is not a valid email.`}</Error>
        );
    }
};

export const required = (value, props, components) => {
    value = ('' + value).trim();
    if (!value) {
        return (
            <Error>{'This field is required.'}</Error>
        );
    }
};
```

To validate an Input component, pass an array of validation functions with the `validations` prop:

```js
<Input type="text" name="email" validations={[required, email]} />
<Input type="password" name="password" validations={[required]} />
```

### Sign-In Example

```js
import Form from '@trendmicro/react-validation/components/form';
import Input from '@trendmicro/react-validation/components/input';
import React, { Component } from 'react';
import * as validations from './validations';

export default class SignIn extends Component {
    render() {
        return (
            <Form
                ref={node => {
                    this.form = node;
                }}
                onSubmit{event => {
                    event.preventDefault();
                }}
                onValidate={err => {
                    if (err) {
                        // You can disable button on validation error
                        return;
                    }
                }}
            >
                <div className="form-group">
                    <label>{'E-mail*'}</label>
                    <Input
                        type="text"
                        name="email"
                        className="form-control"
                        validations={[validations.required, validations.email]}
                    />
                </div>
                <div className="form-group">
                    <label>{'Password*'}</label>
                    <Input
                        type="password"
                        name="password"
                        className="form-control"
                        validations={[validations.required]}
                    />
                </div>
                <div className="form-group">
                    <Button
                        btnStyle="flat"
                        onClick={() => {
                            this.form.validate(err => {
                                if (err) {
                                    return;
                                }

                                const values = this.form.getValues();
                                // -> { email: "somebody@example.com", password: "xxxxxx" }
                            });
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        );
    }
}
```

## Built-in Components

### Form Component

### Input Component

### Select Component

### Textarea Component

## Creating Custom Components

```js
import { createForm, createFormControl } from '@trendmicro/react-validation';

// Form component
const Form = (props) => (
    <form {...props} />
);

// Input component
const Input = ({ error, isChanged, isUsed, ...props }) => (
    <div>
        <input {...props} />
        {isChanged && isUsed && error}
    </div>
);

const MyForm = createForm()(Form);
const MyInput = createFormControl()(Input);
```

## License

MIT

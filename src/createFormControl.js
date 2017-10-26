import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqualArrays from './utils/shallow-equal-arrays';
import shallowEqualObjects from './utils/shallow-equal-objects';

const createFormControl = (options) => (WrappedComponent) => class FormControl extends Component {
    static displayName = `FormControl(${WrappedComponent.name})`;

    static contextTypes = {
        $validation: PropTypes.shape({
            register: PropTypes.func.isRequired,
            unregister: PropTypes.func.isRequired,
            setProps: PropTypes.func.isRequired,
            getProps: PropTypes.func.isRequired
        })
    };

    static propTypes = {
        validations: PropTypes.arrayOf(PropTypes.func),
        onChange: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
        validations: []
    };

    get checked() {
        const { checked } = { ...this.context.$validation.getProps(this) };
        return !!checked;
    }
    get value() {
        const { value } = { ...this.context.$validation.getProps(this) };
        return value || '';
    }
    get error() {
        const { error } = { ...this.context.$validation.getProps(this) };
        return error;
    }
    get isChanged() {
        const { isChanged } = { ...this.context.$validation.getProps(this) };
        return !!isChanged;
    }
    get isUsed() {
        const { isUsed } = { ...this.context.$validation.getProps(this) };
        return !!isUsed;
    }

    componentDidMount() {
        this.context.$validation.register(this);
    }

    componentWillUnmount() {
        this.context.$validation.unregister(this);
    }

    componentWillReceiveProps(nextProps) {
        const { validations, ...props } = this.props;
        const { validations: nextValidations, ...otherProps } = nextProps;

        if (!shallowEqualObjects(props, otherProps) || !shallowEqualArrays(validations, nextValidations)) {
            this.context.$validation.setProps(this, nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return nextContent !== this.context;
    }

    handleChange = (event) => {
        event.persist();

        this.props.onChange && this.props.onChange(event);

        this.context.$validation.setProps(this, {
            checked: event.target.checked,
            value: event.target.value,
            isChanged: true
        });
    };

    handleBlur = (event) => {
        event.persist();

        this.props.onBlur && this.props.onBlur(event);

        this.context.$validation.setProps(this, {
            value: event.target.value,
            isUsed: true
        });
    };

    render() {
        let props = this.context.$validation.getProps(this);

        if (!props) {
            return null;
        }

        props = { ...props };
        delete props.validations;

        return (
            <WrappedComponent
                {...props}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            />
        );
    }
};

export default createFormControl;

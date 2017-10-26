import React from 'react';

const Error = (props) => (
    <div {...props} style={{ color: '#A94442' }} />
);

export const required = (value, props, components) => {
    if (props.type === 'radio') {
        const name = props.name;

        components = components[name] || [];
        if (components.length === 0) {
            return null;
        }

        // Controls the placement of the error message for radio buttons
        if (components[components.length - 1] !== props) {
            return null;
        }

        const checked = components.reduce((checked, props) => {
            return checked || props.checked;
        }, false);

        if (checked) {
            return null;
        }

        return (
            <Error>{'This field is required.'}</Error>
        );
    }

    if (props.type === 'checkbox') {
        if (props.checked) {
            return null;
        }

        return (
            <Error>{'This field is required.'}</Error>
        );
    }

    value = ('' + value).trim();
    if (!value) {
        return (
            <Error>{'This field is required.'}</Error>
        );
    }

    return null;
};

export const password = (value, props, components) => {
    const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
    const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

    if (bothUsed && bothChanged && components.password[0].value !== components.confirm[0].value) {
        return (
            <Error>{'Passwords should be equal.'}</Error>
        );
    }

    return null;
};

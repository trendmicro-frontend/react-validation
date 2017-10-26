import React from 'react';
import PropTypes from 'prop-types';
import { createFormControl } from '../..';

const Input = ({ error, isChanged, isUsed, ...props }) => (
    <div>
        <input {...props} />
        {isChanged && isUsed && error}
    </div>
);

Input.propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default createFormControl()(Input);

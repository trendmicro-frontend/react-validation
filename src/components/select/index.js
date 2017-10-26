import React from 'react';
import PropTypes from 'prop-types';
import { createFormControl } from '../..';

const Select = ({ error, isChanged, isUsed, ...props }) => (
    <div>
        <select {...props} />
        {isChanged && isUsed && error}
    </div>
);

Select.propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default createFormControl()(Select);

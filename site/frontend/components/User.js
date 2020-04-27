import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { CURRENT_USER } from '../lib/queries';

const User = (props) => (
	<Query {...props} query={CURRENT_USER}>
		{(payload) => props.children(payload)}
	</Query>
);

User.propTypes = {
	children: PropTypes.func.isRequired,
};

export default User;

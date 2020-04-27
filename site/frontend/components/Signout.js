import React from 'react';
import { Mutation } from 'react-apollo';

import { CURRENT_USER, SIGNOUT_MUTATION } from '../lib/queries';

const Signout = (props) => {
	return (
		<Mutation
			mutation={SIGNOUT_MUTATION}
			refetchQueries={[{ query: CURRENT_USER }]}
		>
			{(signout) => <button onClick={signout}>Sign Out</button>}
		</Mutation>
	);
};

export default Signout;

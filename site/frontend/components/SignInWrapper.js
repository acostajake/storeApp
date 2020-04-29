import { Query } from 'react-apollo';

import { CURRENT_USER } from '../lib/queries';
import Signin from './Signin';

const SignInWrapper = (props) => (
	<Query query={CURRENT_USER}>
		{({ data, loading }) => {
			if (loading) return <p>Loading...</p>;
			if (!data.me) {
				return (
					<div>
						<p>Please sign in to continue</p>
						<Signin />
					</div>
				);
			}
			return props.children;
		}}
	</Query>
);

export default SignInWrapper;

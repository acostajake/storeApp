import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Form from './styles/Form';
import Error from './ErrorMessage';

import { REQUEST_RESET_MUTATION } from '../lib/queries';

const RequestReset = () => {
	const [email, setEmail] = useState('');

	return (
		<Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
			{(requestReset, { called, error, loading }) => {
				return (
					<Form
						data-test='form'
						method='POST'
						onSubmit={async (e) => {
							e.preventDefault();
							await requestReset();
							setEmail('');
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Request password reset</h2>
							<Error error={error} />
							{!error && !loading && called && (
								<p>Success! Use the link sent to your email to reset.</p>
							)}
							<label htmlFor='email'>
								Email
								<input
									type='email'
									name='email'
									placeholder='myname@something.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</label>
							<button type='submit'>Request reset</button>
						</fieldset>
					</Form>
				);
			}}
		</Mutation>
	);
};

export default RequestReset;

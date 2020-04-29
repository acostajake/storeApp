import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Form from './styles/Form';
import Error from './ErrorMessage';

import { CURRENT_USER, SIGNIN_MUTATION } from '../lib/queries';

const Signin = () => {
	const [signinVals, setVals] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVals({ ...signinVals, [name]: value });
	};

	const { email, password } = signinVals;

	return (
		<Mutation
			mutation={SIGNIN_MUTATION}
			variables={signinVals}
			refetchQueries={[{ query: CURRENT_USER }]}
		>
			{(signin, { error, loading }) => {
				return (
					<Form
						method='POST'
						onSubmit={async (e) => {
							e.preventDefault();
							await signin();
							setVals({ email: '', password: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Sign In</h2>
							<Error error={error} />
							<label htmlFor='email'>
								Email
								<input
									type='email'
									name='email'
									placeholder='myname@something.com'
									value={email}
									onChange={(e) => handleChange(e)}
								/>
							</label>
							<label htmlFor='password'>
								Password
								<input
									type='password'
									name='password'
									placeholder='Enter a password'
									value={password}
									onChange={(e) => handleChange(e)}
								/>
							</label>
							<button type='submit'>Log in</button>
						</fieldset>
					</Form>
				);
			}}
		</Mutation>
	);
};

export default Signin;

import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Form from './styles/Form';
import Error from './ErrorMessage';

import { CURRENT_USER, SIGNUP_MUTATION } from '../lib/queries';

const Signup = () => {
	const [signupVals, setVals] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVals({ ...signupVals, [name]: value });
	};

	const { name, email, password } = signupVals;

	return (
		<Mutation
			mutation={SIGNUP_MUTATION}
			variables={signupVals}
			refetchQueries={[{ query: CURRENT_USER }]}
		>
			{(signup, { error, loading }) => {
				return (
					<Form
						method='POST'
						onSubmit={async (e) => {
							e.preventDefault();
							await signup();
							setVals({ name: '', email: '', password: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Create an account</h2>
							<Error error={error} />
							<label htmlFor='name'>
								Username
								<input
									type='text'
									name='name'
									placeholder='Jakey-Baby'
									value={name}
									onChange={(e) => handleChange(e)}
								/>
							</label>
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
							<button type='submit'>Sign up</button>
						</fieldset>
					</Form>
				);
			}}
		</Mutation>
	);
};

export default Signup;

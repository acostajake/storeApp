import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Form from './styles/Form';

import { CURRENT_USER, RESET_MUTATION } from '../lib/queries';

const Reset = (props) => {
	console.log(props.resetToken);
	const [resetInfo, setResetInfo] = useState({
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setResetInfo({ ...resetInfo, [name]: value });
	};

	const { password, confirmPassword } = resetInfo;

	return (
		<Mutation
			mutation={RESET_MUTATION}
			variables={{ ...resetInfo, resetToken: props.resetToken }}
			refetchQueries={[{ query: CURRENT_USER }]}
		>
			{(resetPassword, { called, error, loading }) => {
				return (
					<Form
						method='POST'
						onSubmit={async (e) => {
							e.preventDefault();
							await resetPassword();
							setResetInfo({ password: '', confirmPassword: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Reset your password</h2>
							{!error && !loading && called && (
								<p>Success! Use the link sent to your email to reset.</p>
							)}
							<label htmlFor='password'>
								Password
								<input
									type='text'
									name='password'
									placeholder='Enter a password'
									value={password}
									onChange={(e) => handleChange(e)}
								/>
							</label>
							<label htmlFor='confirmPassword'>
								Confirm Password
								<input
									type='text'
									name='confirmPassword'
									placeholder='Confirm password'
									value={confirmPassword}
									onChange={(e) => handleChange(e)}
								/>
							</label>
							<button type='submit'>Reset</button>
						</fieldset>
					</Form>
				);
			}}
		</Mutation>
	);
};

Reset.propTypes = {
	resetToken: PropTypes.string.isRequired,
};

export default Reset;

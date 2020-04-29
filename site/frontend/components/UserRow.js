import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';

import { UPDATE_PERMISSIONS_MUTATION } from '../lib/queries';
import Error from './ErrorMessage';

const UserRow = (props) => {
	const [permissionState, setPermissions] = useState([]);

	useEffect(() => {
		setPermissions([...props.user.permissions]);
	}, [props.user.permissions]);

	const updatePermission = (e) => {
		const { checked, value } = e.target;
		let updatedPermissions = [...permissionState];
		if (checked) {
			updatedPermissions.push(value);
			setPermissions([...updatedPermissions]);
		} else {
			updatedPermissions = updatedPermissions.filter((each) => each !== value);
			setPermissions([...updatedPermissions]);
		}
	};

	const {
		permissions,
		user: { email, id, name },
	} = props;

	return (
		<Mutation
			mutation={UPDATE_PERMISSIONS_MUTATION}
			variables={{
				permissions: permissionState,
				userId: id,
			}}
		>
			{(updatePermissions, { loading, error }) => (
				<>
					{error && <Error error={error} />}
					<tr>
						<td>{name}</td>
						<td>{email}</td>
						{permissions.map((each) => (
							<td key={each}>
								<label htmlFor={`${id}-permission-${each}`}>
									<input
										id={`${id}-permission-${each}`}
										type='checkbox'
										checked={permissionState.includes(each)}
										value={each}
										onChange={(e) => updatePermission(e)}
									/>
								</label>
							</td>
						))}
						<td>
							<button
								type='button'
								disabled={loading}
								onClick={updatePermissions}
							>
								Updat{loading ? 'ing' : 'e'}
							</button>
						</td>
					</tr>
				</>
			)}
		</Mutation>
	);
};

UserRow.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string,
		email: PropTypes.string,
		name: PropTypes.string,
		permissions: PropTypes.array,
	}).isRequired,
};

export default UserRow;

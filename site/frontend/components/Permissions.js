import { Query } from 'react-apollo';

import { GET_ALL_USERS } from '../lib/queries';
import Error from './ErrorMessage';
import UserRow from './UserRow';
import Table from './styles/Table';

const permissions = [
	'ADMIN',
	'USER',
	'SELLER',
	'ITEMCREATE',
	'ITEMUPDATE',
	'ITEMDELETE',
	'PERMISSIONUPDATE',
];

const Permissions = () => (
	<Query query={GET_ALL_USERS}>
		{({ data, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			return (
				<div>
					<Error error={error} />
					<div>
						<h2>Manage permissions</h2>
						<Table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									{permissions.map((each) => (
										<th key={each}>{each}</th>
									))}
									<th>Click button!</th>
								</tr>
							</thead>
							<tbody>
								{data.users.map((user) => (
									<UserRow
										key={user.id}
										user={user}
										permissions={permissions}
									/>
								))}
							</tbody>
						</Table>
					</div>
				</div>
			);
		}}
	</Query>
);

export default Permissions;

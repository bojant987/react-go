import React from 'react';
import { shallow } from 'enzyme';

import Login from '../src/Components/Auth/Login';

describe('Login', () => {
	test('sanity check', () => {
		const component = shallow(<Login />);

		expect(true).toBe(true);

		component.unmount();
	});
});

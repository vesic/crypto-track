import React from 'react'
import { shallow } from 'enzyme'
import Loader from './Loader'

it('renders welcome message', () => {
  const wrapper = shallow(<Loader />);
});

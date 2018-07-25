import React from 'react'
import { shallow } from 'enzyme'
import App from './App';

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Header').length).toEqual(1)
  expect(wrapper.find('Route').length).toEqual(2)
});
import React from 'react'
import { shallow } from 'enzyme'
import Crypto from './Crypto';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it('renders Crypto', () => {
  const mock = new MockAdapter(axios);
  const props = {
    match: { params: { id: 1 } }
  }
  mock.onGet('https://api.coinmarketcap.com/v2/ticker/1/')
    .reply(200, { coin: {} });
  const wrapper = shallow(<Crypto {...props} />);
  wrapper.setState({ loading: true });
  expect(wrapper.find('Loader').length).toEqual(1);
  expect(wrapper.find('Details').length).toEqual(0);
  wrapper.setState({ loading: false });
  expect(wrapper.find('Loader').length).toEqual(0);
  expect(wrapper.find('Details').length).toEqual(1);
});
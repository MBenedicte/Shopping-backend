import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('user')
  .sequence('id')
  .attr('firstName', chance.first())
  .attr('lastName', chance.last())
  .attr('username', chance.word({ length: 5 }))
  .attr('phone', chance.phone({ formatted: false }))
  .attr('password', 'Password09');

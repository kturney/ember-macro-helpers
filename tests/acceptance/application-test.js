import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('double render failing test', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.computed').text(), 'test val 1');
  });

  click('.button');

  andThen(function() {
    assert.equal(find('.computed').text(), 'test val 2');
  });
});

test('class computed array macro inside a normal array macro, handles pushes', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.computed2').text(), '1');
  });

  click('.button2');

  andThen(function() {
    assert.equal(find('.computed2').text(), '3');
  });
});

import Controller from '@ember/controller';
import EmberObject, { get, set } from '@ember/object';
import { A as emberA } from '@ember/array';
import { readOnly } from '@ember/object/computed';
import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import raw from 'ember-macro-helpers/raw';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

const getBy = createClassComputed(
  [false, true],
  (obj, key) => readOnly(`${obj}.${key}`)
);

const filterBy = createClassComputed(
  [false, true],
  (arr, key, val) => computed(normalizeArrayKey(arr, [key]), val, (arr, val) => arr.filterBy(key, val))
);

export default Controller.extend({
  array: emberA([
    EmberObject.create({
      testProp: 'test val 1',
      testProp2: 1
    }),
    EmberObject.create({
      testProp: 'test val 2',
      testProp2: 2
    })
  ]),
  index: 0,
  testProp: 'testProp',

  computed: getBy(
    computed('array', 'index', (array, index) => array.objectAt(index)),
    'testProp'
  ),

  computed2: computed(
    filterBy('array', 'testProp', raw('test val 1')),
    array => get(array[array.length - 1], 'testProp2')
  ),

  actions: {
    update() {
      set(this, 'index', 1);
    },
    update2() {
      get(this, 'array').pushObject(EmberObject.create({
        testProp: 'test val 1',
        testProp2: 3
      }));
    }
  }
});

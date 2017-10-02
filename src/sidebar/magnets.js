'use strict';

/**
 * @typedef Magnet
 * @property {string} text - The label of the magnet
 * @property {number} count - The number of times this magnet has been used.
 * @property {number} updated - The timestamp when this magnet was last used.
 */

 // @ngInject
function magnets(localStorage) {
  var MAGNETS_LIST_KEY = 'hypothesis.user.magnets.list';
  var MAGNETS_MAP_KEY = 'hypothesis.user.magnets.map';

  function filter(query) {
    var savedMagnets = localStorage.getObject(MAGNETS_LIST_KEY) || [];

    return savedMagnets.filter((e) => {
      return e.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  function store(magnets) {
    var savedMagnets = localStorage.getObject(MAGNETS_MAP_KEY) || {};
    magnets.forEach((magnet) => {
      if (savedMagnets[magnet.text]) {
        savedMagnets[magnet.text].count += 1;
        savedMagnets[magnet.text].updated = Date.now();
      } else {
        //TODO: error handling here??
        savedMagnets[magnet.text] = {
          text: magnet.text,
          count: 1,
          updated: Date.now(),
        };
      }
    });
    localStorage.setObject(MAGNETS_MAP_KEY, savedMagnets);

    var magnetsList = Object.keys(savedMagnets).sort((t1, t2) => {
      if (savedMagnets[t1].count !== savedMagnets[t2].count) {
        return savedMagnets[t2].count - savedMagnets[t1].count;
      }
      return t1.localeCompare(t2);
    });
    localStorage.setObject(MAGNETS_LIST_KEY, magnetsList);
  }

  return {
    filter,
    store,
  };
}

module.exports = magnets;

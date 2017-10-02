'use strict';

// @ngInject
function MagnetEditorController(magnets) {
  this.onMagnetsChanged = function () {
    magnets.store(this.magnetList);

    var newMagnets = this.magnetList.map(function (item) { return item.text; });
    this.onEditMagnets({magnets: newMagnets});
  };

  this.autocomplete = function (query) {
    return Promise.resolve(magnets.filter(query));
  };

  this.$onChanges = function (changes) {
    if (changes.magnets) {
      this.magnetList = changes.magnets.currentValue.map(function (magnets) {
        return {text: magnets};
      });
    }
  };
}

module.exports = {
  controller: MagnetEditorController,
  controllerAs: 'vm',
  bindings: {
    magnets: '<',
    onEditMagnets: '&',
  },
  template: require('../templates/magnet-editor.html'),
};

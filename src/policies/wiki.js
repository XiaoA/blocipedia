const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  constructor(user, record, collaborators) {
    this.user = user;
    this.record = record;
    this.collaborators = collaborators;
  }

  show() {
    if (this._isAdmin() || this._isPremium() || this._isStandard())
      return true;
    for (const collaborator in collaborators) {
      if (collaborator.id == user.id)
        return true;
    }
  }

  // show() {
  //     return (this._isAdmin() || this._isPremium() || this._isStandard());
  // }

  new() {
    return (this._isAdmin() || this._isPremium() || this._isStandard());
  }

  create() {
    return this.new();
  }

  edit() {
    return (this._isAdmin() || this._isPremium() || this._isStandard());
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }


}

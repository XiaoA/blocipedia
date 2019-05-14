const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

    // show() {
    //     return (this._isAdmin() || this._isPremium() || this._isStandard());
    // }

    // new() {
    //     return (this._isAdmin() || this._isPremium() || this._isStandard());
    // }

    // create() {
    //     return this.new();
    // }

    // edit() {
    //     return (this._isAdmin() || this._isPremium() || this._isStandard());
    // }

    // update() {
    //     return this.edit();
    // }

    // destroy() {
    //     return this.update();
    // }
    create() {
      return this.new();
    }
  
    update() {
      return this.edit();
    }
  
    destroy() {
      return this.update();
    }
    
}

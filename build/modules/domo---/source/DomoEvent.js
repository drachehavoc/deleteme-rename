export class DomoEvent {
    constructor(_eventname, _callback, captureOrOptions = false) {
        this._eventname = _eventname;
        this._callback = _callback;
        this.captureOrOptions = captureOrOptions;
    }
    get name() {
        return this._eventname;
    }
    get callback() {
        return this._callback;
    }
    get capturing() {
        return this.captureOrOptions;
    }
    cloneNode() {
        return this;
    }
}
//# sourceMappingURL=DomoEvent.js.map
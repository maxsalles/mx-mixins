import apply from './apply'

class Given {
  constructor (Class) {
    this._Class = Class
  }

  mix (...mixins) {
    return mixins.reduce(
      (Class, mixin) => apply(mixin, Class),
      this._Class
    )
  }
}

export default function given (Class) {
  return new Given(Class || class {})
}

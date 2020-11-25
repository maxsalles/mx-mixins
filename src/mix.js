import apply from './apply'

export default function mix (...mixins) {
  return mixins.reduce((Class, mixin) => apply(mixin, Class), class {})
}

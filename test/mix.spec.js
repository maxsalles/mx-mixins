jest.mock('../src/apply')

import mix from '../src/mix'
import apply from '../src/apply'

describe('mix', () => {
  it('applies mixins to a generic class', () => {
    const MixinMixed = class {}
    const OtherMixinMixed = class {}

    apply
      .mockReturnValueOnce(MixinMixed)
      .mockReturnValue(OtherMixinMixed)

    const Mixin = Class => class extends Class {}
    const OtherMixin = Class => class extends Class {}

    expect(mix(Mixin, OtherMixin)).toBe(OtherMixinMixed)
    expect(apply.mock.calls).toEqual([[Mixin, expect.any(Function)], [OtherMixin, MixinMixed]])
  })
})

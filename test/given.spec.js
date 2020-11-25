jest.mock('../src/apply')

import given from '../src/given'
import apply from '../src/apply'

describe('mix', () => {
  afterEach(() => apply.mockClear())

  it('applies mixins to "Class"', () => {
    const MixinMixed = class {}
    const OtherMixinMixed = class {}

    apply
      .mockReturnValueOnce(MixinMixed)
      .mockReturnValue(OtherMixinMixed)

    const Class = class {}
    const Mixin = Class => class extends Class {}
    const OtherMixin = Class => class extends Class {}

    expect(given(Class).mix(Mixin, OtherMixin)).toBe(OtherMixinMixed)
    expect(apply.mock.calls).toEqual([[Mixin, Class], [OtherMixin, MixinMixed]])
  })

  it('applies mixins to a generic class when called without parameter', () => {
    const Mixed = class {}
    apply.mockReturnValue(Mixed)

    const Mixin = Class => class extends Class {}

    expect(given().mix(Mixin)).toBe(Mixed)
    expect(apply).toBeCalledWith(Mixin, expect.any(Function))
  })
})

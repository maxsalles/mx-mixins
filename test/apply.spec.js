jest.mock('../src/hasMixin')

import apply from '../src/apply'
import { APPLIED_MIXIN_PROPERTY } from '../src/constants'
import hasMixin from '../src/hasMixin'

describe('apply', () => {
  const mixed = {}
  const mixin = jest.fn().mockReturnValueOnce(mixed)

  describe('when "mixin" has not been applied to "Class"', () => {
    beforeEach(() => {
      hasMixin.mockClear().mockReturnValue(false)
      mixin.mockClear()
    })

    it('returns the result of applying "mixin" to "Class"', () => {
      class Class {}

      expect(apply(mixin, Class)).toBe(mixed)
      expect(mixin).toBeCalledWith(Class)
      expect(Object.getOwnPropertyDescriptor(mixed, APPLIED_MIXIN_PROPERTY)).toEqual({
        value: mixin,
        writable: true,
        configurable: false,
        enumerable: false
      })
    })
  })

  describe('when "mixin" has been applied to "Class"', () => {
    beforeEach(() => {
      hasMixin.mockClear().mockReturnValue(true)
      mixin.mockClear()
    })

    it('returns "Class"', () => {
      class Class {}

      expect(apply(mixin, Class)).toBe(Class)
      expect(mixin).not.toBeCalled()
    })
  })
})

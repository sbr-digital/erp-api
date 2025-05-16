import { Entity } from './entity'

describe('Entity', () => {
  let entity: Entity<unknown>

  beforeEach(() => {
    entity = new Entity({})
  })

  it('should return undefined if the id does not exist', () => {
    expect(entity.id).toBeUndefined()
  })

  it('should set the id if it is not already set', () => {
    entity.setId(1)
    expect(entity.id).toEqual(1)
  })

  it('should throw an error if the id is already set', () => {
    entity.setId(1)
    expect(() => entity.setId(2)).toThrow('ID already set')
  })

  it('should set _id to undefined after calling deleteId method', () => {
    const entity = new Entity({})

    entity.setId(4)
    entity.deleteId()

    const result = entity.id

    expect(result).toBeUndefined()
  })
})

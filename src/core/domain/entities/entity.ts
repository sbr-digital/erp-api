export class Entity<Props> {
  private _id: number | undefined
  protected props: Props

  get id() {
    return this._id
  }

  setId(newId: number) {
    if (this._id !== undefined) {
      throw new Error('ID already set')
    }
    this._id = newId
  }

  deleteId() {
    this._id = undefined
  }

  constructor(props: Props, id?: number) {
    this.props = props
    this._id = id!
  }
}

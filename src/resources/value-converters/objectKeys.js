export class ObjectKeysValueConverter {
  toView(value) {
    return !!value ? Object.keys(value) : []
  }
}

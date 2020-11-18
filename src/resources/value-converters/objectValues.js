export class ObjectValuesValueConverter {
  toView(value) {
    return !!value ? Object.values(value) : []
  }
}

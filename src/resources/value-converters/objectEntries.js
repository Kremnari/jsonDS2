export class ObjectEntriesValueConverter {
  toView(value) {
    return !!value ? Object.entries(value) : []
  }
}

export class StripNullsValueConverter {
  toView(values) {
    return values.filter(item => item!=null)
  }
}

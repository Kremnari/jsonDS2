//Ref: https://gist.github.com/jdanyow/6545b3e4fbf6c30f767e
export class SorterValueConverter {
  toView(array, propertyName, direction){
    var factor = direction == 'ascending' ? 1 : -1;
    return array.slice(0).sort((a,b) => {
      return (a[propertyName] - b[propertyName]) * factor;
    })
  }
}

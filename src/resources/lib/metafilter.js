function MetaFilter(obj) {
  return Object.keys(obj).filter( (key) => key.indexOf("$")==-1 )
}

export { MetaFilter }

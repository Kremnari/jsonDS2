export function configure(config) {
  config.globalResources([
     PLATFORM.moduleName('resources/value-converters/objectEntries')
    ,PLATFORM.moduleName('resources/value-converters/objectValues')
    ,PLATFORM.moduleName('resources/value-converters/objectKeys')
    ,PLATFORM.moduleName('resources/value-converters/stripNulls')
    ,PLATFORM.moduleName('resources/value-converters/sorter')
  ]);
}

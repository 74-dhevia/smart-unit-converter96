// Every category (except temperature) stores a factor that converts
// 1 unit → the category's base unit. Conversion between any two units
// in a category is: value_in_base = value * factorA; result = value_in_base / factorB

export const categories = [
  {
    key: 'length',
    label: 'Length',
    glyph: 'L',
    base: 'meter',
    units: {
      millimeter: { label: 'Millimeter', symbol: 'mm', factor: 0.001 },
      centimeter: { label: 'Centimeter', symbol: 'cm', factor: 0.01 },
      meter: { label: 'Meter', symbol: 'm', factor: 1 },
      kilometer: { label: 'Kilometer', symbol: 'km', factor: 1000 },
      inch: { label: 'Inch', symbol: 'in', factor: 0.0254 },
      foot: { label: 'Foot', symbol: 'ft', factor: 0.3048 },
      yard: { label: 'Yard', symbol: 'yd', factor: 0.9144 },
      mile: { label: 'Mile', symbol: 'mi', factor: 1609.344 },
      nauticalMile: { label: 'Nautical mile', symbol: 'nmi', factor: 1852 },
    },
    default: { from: 'kilometer', to: 'mile' },
  },
  {
    key: 'mass',
    label: 'Mass',
    glyph: 'M',
    base: 'kilogram',
    units: {
      milligram: { label: 'Milligram', symbol: 'mg', factor: 0.000001 },
      gram: { label: 'Gram', symbol: 'g', factor: 0.001 },
      kilogram: { label: 'Kilogram', symbol: 'kg', factor: 1 },
      tonne: { label: 'Tonne', symbol: 't', factor: 1000 },
      ounce: { label: 'Ounce', symbol: 'oz', factor: 0.028349523125 },
      pound: { label: 'Pound', symbol: 'lb', factor: 0.45359237 },
      stone: { label: 'Stone', symbol: 'st', factor: 6.35029318 },
    },
    default: { from: 'kilogram', to: 'pound' },
  },
  {
    key: 'temperature',
    label: 'Temperature',
    glyph: 'T',
    base: 'celsius',
    units: {
      celsius: { label: 'Celsius', symbol: '°C' },
      fahrenheit: { label: 'Fahrenheit', symbol: '°F' },
      kelvin: { label: 'Kelvin', symbol: 'K' },
    },
    default: { from: 'celsius', to: 'fahrenheit' },
  },
  {
    key: 'volume',
    label: 'Volume',
    glyph: 'V',
    base: 'liter',
    units: {
      milliliter: { label: 'Milliliter', symbol: 'mL', factor: 0.001 },
      liter: { label: 'Liter', symbol: 'L', factor: 1 },
      cubicMeter: { label: 'Cubic meter', symbol: 'm³', factor: 1000 },
      teaspoon: { label: 'Teaspoon', symbol: 'tsp', factor: 0.00492892 },
      tablespoon: { label: 'Tablespoon', symbol: 'tbsp', factor: 0.0147868 },
      cup: { label: 'Cup', symbol: 'cup', factor: 0.24 },
      pint: { label: 'Pint (US)', symbol: 'pt', factor: 0.473176 },
      gallon: { label: 'Gallon (US)', symbol: 'gal', factor: 3.78541 },
    },
    default: { from: 'liter', to: 'gallon' },
  },
  {
    key: 'area',
    label: 'Area',
    glyph: 'A',
    base: 'squareMeter',
    units: {
      squareMeter: { label: 'Square meter', symbol: 'm²', factor: 1 },
      squareKilometer: { label: 'Square kilometer', symbol: 'km²', factor: 1000000 },
      squareFoot: { label: 'Square foot', symbol: 'ft²', factor: 0.092903 },
      acre: { label: 'Acre', symbol: 'ac', factor: 4046.8564224 },
      hectare: { label: 'Hectare', symbol: 'ha', factor: 10000 },
      squareMile: { label: 'Square mile', symbol: 'mi²', factor: 2589988.110336 },
    },
    default: { from: 'squareMeter', to: 'squareFoot' },
  },
  {
    key: 'speed',
    label: 'Speed',
    glyph: 'S',
    base: 'meterPerSecond',
    units: {
      meterPerSecond: { label: 'Meter/second', symbol: 'm/s', factor: 1 },
      kilometerPerHour: { label: 'Kilometer/hour', symbol: 'km/h', factor: 0.277778 },
      milePerHour: { label: 'Mile/hour', symbol: 'mph', factor: 0.44704 },
      knot: { label: 'Knot', symbol: 'kn', factor: 0.514444 },
    },
    default: { from: 'kilometerPerHour', to: 'milePerHour' },
  },
  {
    key: 'time',
    label: 'Time',
    glyph: 'Ti',
    base: 'second',
    units: {
      millisecond: { label: 'Millisecond', symbol: 'ms', factor: 0.001 },
      second: { label: 'Second', symbol: 's', factor: 1 },
      minute: { label: 'Minute', symbol: 'min', factor: 60 },
      hour: { label: 'Hour', symbol: 'hr', factor: 3600 },
      day: { label: 'Day', symbol: 'd', factor: 86400 },
      week: { label: 'Week', symbol: 'wk', factor: 604800 },
    },
    default: { from: 'hour', to: 'minute' },
  },
  {
    key: 'data',
    label: 'Data',
    glyph: 'D',
    base: 'byte',
    units: {
      bit: { label: 'Bit', symbol: 'b', factor: 0.125 },
      byte: { label: 'Byte', symbol: 'B', factor: 1 },
      kilobyte: { label: 'Kilobyte', symbol: 'KB', factor: 1024 },
      megabyte: { label: 'Megabyte', symbol: 'MB', factor: 1048576 },
      gigabyte: { label: 'Gigabyte', symbol: 'GB', factor: 1073741824 },
      terabyte: { label: 'Terabyte', symbol: 'TB', factor: 1099511627776 },
    },
    default: { from: 'gigabyte', to: 'megabyte' },
  },
]

// --- Temperature needs its own conversion (non-linear offsets) ---
function toCelsius(value, unit) {
  switch (unit) {
    case 'celsius':
      return value
    case 'fahrenheit':
      return ((value - 32) * 5) / 9
    case 'kelvin':
      return value - 273.15
    default:
      return value
  }
}

function fromCelsius(value, unit) {
  switch (unit) {
    case 'celsius':
      return value
    case 'fahrenheit':
      return (value * 9) / 5 + 32
    case 'kelvin':
      return value + 273.15
    default:
      return value
  }
}

export function convert(categoryKey, fromUnit, toUnit, value) {
  const category = categories.find((c) => c.key === categoryKey)
  if (!category) return null
  if (Number.isNaN(value)) return null

  if (categoryKey === 'temperature') {
    const celsius = toCelsius(value, fromUnit)
    return fromCelsius(celsius, toUnit)
  }

  const fromFactor = category.units[fromUnit]?.factor
  const toFactor = category.units[toUnit]?.factor
  if (fromFactor === undefined || toFactor === undefined) return null

  const base = value * fromFactor
  return base / toFactor
}

// --- Smart parser: "10 km to miles", "5 ft in cm", "98.6 f to c" ---
const aliasMap = buildAliasMap()

function buildAliasMap() {
  const map = {}
  categories.forEach((category) => {
    Object.entries(category.units).forEach(([unitKey, unit]) => {
      const aliases = new Set([
        unitKey.toLowerCase(),
        unit.label.toLowerCase(),
        unit.symbol.toLowerCase(),
      ])
      // add a few common shorthand variants
      aliases.add(unit.label.toLowerCase().replace(/\s+/g, ''))
      aliases.forEach((alias) => {
        map[alias] = { categoryKey: category.key, unitKey }
      })
    })
  })
  // handy extra aliases people actually type
  const extra = {
    km: 'kilometer',
    kms: 'kilometer',
    m: 'meter',
    mtr: 'meter',
    cm: 'centimeter',
    mm: 'millimeter',
    mi: 'mile',
    miles: 'mile',
    ft: 'foot',
    feet: 'foot',
    in: 'inch',
    inches: 'inch',
    yd: 'yard',
    yards: 'yard',
    kg: 'kilogram',
    kgs: 'kilogram',
    g: 'gram',
    grams: 'gram',
    lb: 'pound',
    lbs: 'pound',
    pounds: 'pound',
    oz: 'ounce',
    ounces: 'ounce',
    c: 'celsius',
    f: 'fahrenheit',
    k: 'kelvin',
    l: 'liter',
    liters: 'liter',
    litre: 'liter',
    litres: 'liter',
    ml: 'milliliter',
    gal: 'gallon',
    gallons: 'gallon',
    cup: 'cup',
    cups: 'cup',
    mph: 'milePerHour',
    kmh: 'kilometerPerHour',
    'km/h': 'kilometerPerHour',
    kmph: 'kilometerPerHour',
    hr: 'hour',
    hrs: 'hour',
    hour: 'hour',
    hours: 'hour',
    min: 'minute',
    mins: 'minute',
    sec: 'second',
    secs: 'second',
    gb: 'gigabyte',
    mb: 'megabyte',
    kb: 'kilobyte',
    tb: 'terabyte',
  }
  Object.entries(extra).forEach(([alias, unitKey]) => {
    const category = categories.find((c) => c.units[unitKey])
    if (category) {
      map[alias] = { categoryKey: category.key, unitKey }
    }
  })
  return map
}

export function parseSmartQuery(query) {
  if (!query || !query.trim()) return null
  const cleaned = query.trim().toLowerCase()
  const match = cleaned.match(
    /^(-?\d+(?:\.\d+)?)\s*([a-z°/²³\s]+?)\s*(?:to|in|→|->)\s*([a-z°/²³\s]+)$/
  )
  if (!match) return null

  const [, rawValue, rawFrom, rawTo] = match
  const value = parseFloat(rawValue)
  const fromKey = rawFrom.trim().replace(/\s+/g, '')
  const toKey = rawTo.trim().replace(/\s+/g, '')

  const from = aliasMap[fromKey]
  const to = aliasMap[toKey]

  if (!from || !to || from.categoryKey !== to.categoryKey) return null

  const result = convert(from.categoryKey, from.unitKey, to.unitKey, value)
  if (result === null) return null

  return {
    categoryKey: from.categoryKey,
    fromUnit: from.unitKey,
    toUnit: to.unitKey,
    value,
    result,
  }
}

import { useMemo, useState } from 'react'
import { categories, convert, parseSmartQuery } from './data/units.js'
import './App.css'

function formatNumber(num) {
  if (num === null || num === undefined || Number.isNaN(num)) return '—'
  if (num === 0) return '0'
  const abs = Math.abs(num)
  if (abs >= 1e9 || abs < 1e-6) return num.toExponential(4)

  const decimals = abs >= 1000 ? 2 : abs >= 1 ? 4 : 6
  let str = num.toFixed(decimals)
  // trim trailing zeros but keep at least one decimal digit removed cleanly
  str = str.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
  return str
}

export default function App() {
  const [activeKey, setActiveKey] = useState(categories[0].key)
  const [unitState, setUnitState] = useState(() => {
    const initial = {}
    categories.forEach((c) => {
      initial[c.key] = { from: c.default.from, to: c.default.to }
    })
    return initial
  })
  const [inputValue, setInputValue] = useState('1')
  const [smartQuery, setSmartQuery] = useState('')
  const [smartResult, setSmartResult] = useState(null)
  const [smartError, setSmartError] = useState(false)

  const activeCategory = categories.find((c) => c.key === activeKey)
  const { from: fromUnit, to: toUnit } = unitState[activeKey]

  const numericInput = parseFloat(inputValue)
  const result = useMemo(() => {
    if (Number.isNaN(numericInput)) return null
    return convert(activeKey, fromUnit, toUnit, numericInput)
  }, [activeKey, fromUnit, toUnit, numericInput])

  function selectCategory(key) {
    setActiveKey(key)
    setSmartQuery('')
    setSmartResult(null)
    setSmartError(false)
  }

  function setUnit(which, unitKey) {
    setUnitState((prev) => ({
      ...prev,
      [activeKey]: { ...prev[activeKey], [which]: unitKey },
    }))
  }

  function swapUnits() {
    setUnitState((prev) => ({
      ...prev,
      [activeKey]: { from: prev[activeKey].to, to: prev[activeKey].from },
    }))
  }

  function handleSmartSubmit(e) {
    e.preventDefault()
    const parsed = parseSmartQuery(smartQuery)
    if (!parsed) {
      setSmartResult(null)
      setSmartError(true)
      return
    }
    setSmartError(false)
    setSmartResult(parsed)
    setActiveKey(parsed.categoryKey)
    setUnitState((prev) => ({
      ...prev,
      [parsed.categoryKey]: { from: parsed.fromUnit, to: parsed.toUnit },
    }))
    setInputValue(String(parsed.value))
  }

  const units = Object.entries(activeCategory.units)

  return (
    <div className="app">
      <aside className="rail">
        <div className="rail-brand">
          <span className="rail-brand-mark">⟐</span>
          <span className="rail-brand-text">Vernier</span>
        </div>
        <nav className="rail-nav">
          {categories.map((c, i) => (
            <button
              key={c.key}
              className={`rail-tab ${c.key === activeKey ? 'is-active' : ''}`}
              onClick={() => selectCategory(c.key)}
            >
              <span className="rail-tab-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="rail-tab-label">{c.label}</span>
              <span className="rail-tab-glyph">{c.glyph}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="stage">
        <header className="stage-header">
          <p className="eyebrow">Smart Unit Converter</p>
          <h1>Measure anything, precisely.</h1>
        </header>

        <form className="smart-bar" onSubmit={handleSmartSubmit}>
          <input
            type="text"
            placeholder='Type a query — e.g. "10 km to miles"'
            value={smartQuery}
            onChange={(e) => {
              setSmartQuery(e.target.value)
              setSmartError(false)
            }}
          />
          <button type="submit">Convert</button>
        </form>
        {smartError && (
          <p className="smart-bar-error">
            Couldn't parse that. Try a format like "10 km to miles" or "98.6 f to c".
          </p>
        )}
        {smartResult && !smartError && (
          <p className="smart-bar-result">
            {formatNumber(smartResult.value)} {smartResult.fromUnit} ={' '}
            <strong>{formatNumber(smartResult.result)} {smartResult.toUnit}</strong>
          </p>
        )}

        <section className="caliper">
          <div className="caliper-ticks" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className={i % 5 === 0 ? 'tick tick-major' : 'tick'} />
            ))}
          </div>

          <div className="caliper-glyph">{activeCategory.glyph}</div>

          <div className="jaws">
            <div className="jaw">
              <label className="jaw-label">From</label>
              <select value={fromUnit} onChange={(e) => setUnit('from', e.target.value)}>
                {units.map(([key, u]) => (
                  <option key={key} value={key}>
                    {u.label} ({u.symbol})
                  </option>
                ))}
              </select>
              <input
                className="readout"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                inputMode="decimal"
              />
            </div>

            <button className="swap" onClick={swapUnits} type="button" aria-label="Swap units">
              ⇄
            </button>

            <div className="jaw">
              <label className="jaw-label">To</label>
              <select value={toUnit} onChange={(e) => setUnit('to', e.target.value)}>
                {units.map(([key, u]) => (
                  <option key={key} value={key}>
                    {u.label} ({u.symbol})
                  </option>
                ))}
              </select>
              <div className="readout readout-result">{formatNumber(result)}</div>
            </div>
          </div>
        </section>

        <footer className="stage-footer">
          <p>
            {activeCategory.units[fromUnit]?.symbol ?? ''} → {activeCategory.units[toUnit]?.symbol ?? ''} · base
            unit: {activeCategory.base}
          </p>
        </footer>
      </main>
    </div>
  )
}

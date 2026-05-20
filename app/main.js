import React, { useCallback, useEffect, useMemo, useRef, useState } from 'https://esm.sh/react@18.2.0'
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import htm from 'https://esm.sh/htm@3.1.1'

const html = htm.bind(React.createElement)

const RISK_BUCKETS = [
  { id: 'stable', label: 'Stable' },
  { id: 'bluechip', label: 'Blue-Chip' },
  { id: 'higher', label: 'Higher-Risk' },
]

const STRATEGY_TYPES = [
  { id: 'simple', label: 'Simple' },
  { id: 'optimized', label: 'Optimized' },
  { id: 'leveraged', label: 'Leveraged', comingSoon: true },
]

const MOCK_OPPORTUNITIES = [
  { id: 'aave-usdc-base', source: 'LI.FI Earn', chain: 'Base', protocol: 'Aave', name: 'USDC Lending Pool', tokens: ['USDC'], bucket: 'stable', strategy: 'simple', apy: 5.4, baseApy: 3.9, rewardApy: 1.5, tvlUsd: 63000000, riskScore: 1.2, lockupDays: 0, risks: ['Smart contract risk', 'Protocol insolvency risk'], why: 'Battle-tested stablecoin lending with deep liquidity on Base.', historyApy: Array.from({ length: 30 }, (_, i) => 4.8 + (i % 5) * 0.2), historyTvl: Array.from({ length: 30 }, (_, i) => 58000000 + i * 120000) },
  { id: 'morpho-usds-eth', source: 'Yield.xyz', chain: 'Ethereum', protocol: 'Morpho', name: 'USDS Curated Vault', tokens: ['USDS'], bucket: 'stable', strategy: 'optimized', apy: 8.2, baseApy: 5.1, rewardApy: 3.1, tvlUsd: 18200000, riskScore: 2.4, lockupDays: 0, risks: ['Reward-token sustainability risk', 'Liquidity risk'], why: 'Multi-layer curated vault with high combined APY and optimized strategy construction.', historyApy: Array.from({ length: 30 }, (_, i) => 7 + ((i + 2) % 7) * 0.3), historyTvl: Array.from({ length: 30 }, (_, i) => 15000000 + i * 90000) },
  { id: 'lido-wsteth-mainnet', source: 'Yield.xyz', chain: 'Ethereum', protocol: 'Lido', name: 'wstETH Native Staking Yield', tokens: ['wstETH'], bucket: 'bluechip', strategy: 'simple', apy: 3.6, baseApy: 3.4, rewardApy: 0.2, tvlUsd: 9100000000, riskScore: 1.4, lockupDays: 0, risks: ['Liquid staking risk', 'Smart contract risk'], why: 'Largest blue-chip LST by TVL with consistent staking yield. Lower complexity option.', historyApy: Array.from({ length: 30 }, (_, i) => 3.1 + (i % 4) * 0.15), historyTvl: Array.from({ length: 30 }, (_, i) => 9000000000 + i * 18000000) },
  { id: 'etherfi-weeth-eigen', source: 'LI.FI Earn', chain: 'Ethereum', protocol: 'EtherFi', name: 'weETH Restaking Vault', tokens: ['weETH'], bucket: 'bluechip', strategy: 'optimized', apy: 7.5, baseApy: 3.2, rewardApy: 4.3, tvlUsd: 740000000, riskScore: 3.2, lockupDays: 2, risks: ['Restaking risk', 'Points program uncertainty', 'Smart contract risk'], why: 'High combined APY, eligible bucket/complexity, and TVL well above your minimum filter.', historyApy: Array.from({ length: 30 }, (_, i) => 6.7 + (i % 6) * 0.2), historyTvl: Array.from({ length: 30 }, (_, i) => 700000000 + i * 1500000) },
  { id: 'jito-sol-vault', source: 'Yield.xyz', chain: 'Solana', protocol: 'Jito', name: 'JitoSOL Strategy Vault', tokens: ['SOL', 'JitoSOL'], bucket: 'higher', strategy: 'optimized', apy: 10.9, baseApy: 7.1, rewardApy: 3.8, tvlUsd: 42000000, riskScore: 6.8, lockupDays: 1, risks: ['Volatility risk', 'Reward token risk', 'Smart contract risk'], why: 'High-yield SOL vault on Solana with multi-layer strategy and strong APY.', historyApy: Array.from({ length: 30 }, (_, i) => 9.5 + (i % 8) * 0.28), historyTvl: Array.from({ length: 30 }, (_, i) => 38500000 + i * 80000) },
]

// --- Helpers ---

const fmtUSD = (n) => {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

const fmtUSDFull = (n) => '$' + Math.round(n).toLocaleString('en-US')
const fmtPct = (n) => n.toFixed(2) + '%'

const sliderToTvl = (v) => {
  if (v === 0) return 0
  return Math.round(Math.pow(10, 3 + (v / 100) * 6))
}

const tvlToSlider = (t) => {
  if (t <= 1000) return 0
  return Math.round((Math.log10(t) - 3) / 6 * 100)
}

const calculateIncome = (amount, apy) => (Number(amount || 0) * (apy / 100)) / 12
const calculateAnnualIncome = (amount, apy) => Number(amount || 0) * (apy / 100)

const makeSpark = (seed, trend) => {
  const bars = []
  let v = 0.5 + (seed % 30) / 100
  for (let i = 0; i < 24; i++) {
    v += (Math.sin(i * (seed % 7 + 1) * 0.3) * 0.08) + trend * 0.01
    v = Math.max(0.2, Math.min(0.95, v))
    bars.push(v)
  }
  return bars
}

// --- Components ---

function App() {
  const [amountUsd, setAmountUsd] = useState(10000)
  const [bucket, setBucket] = useState('bluechip')
  const [strategy, setStrategy] = useState('optimized')
  const [minTvl, setMinTvl] = useState(10000000)
  const [selected, setSelected] = useState(null)
  const [highlighted, setHighlighted] = useState(null)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const isEligible = useCallback((op) => {
    if (op.bucket !== bucket) return false
    if (strategy === 'simple' && op.strategy === 'optimized') return false
    if (op.tvlUsd < minTvl) return false
    return true
  }, [bucket, strategy, minTvl])

  const eligible = useMemo(() => {
    return MOCK_OPPORTUNITIES
      .filter(isEligible)
      .sort((a, b) => b.apy - a.apy)
  }, [isEligible])

  const filtered = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((op) => !isEligible(op))
  }, [isEligible])

  const bestApy = eligible.length > 0 ? eligible[0].apy : null
  const bestAnnual = eligible.length > 0 ? calculateAnnualIncome(amountUsd, eligible[0].apy) : null
  const avgApy = eligible.length > 0 ? eligible.reduce((s, o) => s + o.apy, 0) / eligible.length : null

  const onHover = useCallback((id) => setHighlighted(id), [])
  const onLeave = useCallback(() => setHighlighted(null), [])

  return html`
    <div className="shell">
      <${Header} theme=${theme} onThemeChange=${setTheme} />
      <${ControlStrip}
        amount=${amountUsd} onAmountChange=${setAmountUsd}
        bucket=${bucket} onBucketChange=${setBucket}
        strategy=${strategy} onStrategyChange=${setStrategy}
        minTvl=${minTvl} onMinTvlChange=${setMinTvl}
      />
      <div className="main-grid">
        <div>
          <div className="list-head">
            <div className="label">#</div>
            <div className="label">Opportunity</div>
            <div className="label">APY</div>
            <div className="label col-tvl">TVL</div>
            <div className="label">Est. Monthly</div>
            <div className="label col-action"></div>
          </div>
          <div className="rows">
            ${eligible.length === 0
              ? html`<div className="empty">NO ELIGIBLE OPPORTUNITIES · Loosen filters to see more</div>`
              : eligible.map((op, i) => html`
                <${OpportunityRow}
                  key=${op.id} op=${op} index=${i}
                  amount=${amountUsd}
                  highlighted=${highlighted === op.id}
                  onSelect=${() => setSelected(op)}
                  onHover=${() => onHover(op.id)}
                  onLeave=${onLeave}
                />
              `)
            }
            ${filtered.slice(0, 4).map((op) => html`
              <${FilteredRow} key=${op.id} op=${op} amount=${amountUsd} bucket=${bucket} strategy=${strategy} />
            `)}
          </div>
          <div className="footer-bar">
            <span>${eligible.length} / ${MOCK_OPPORTUNITIES.length} eligible · sorted by APY</span>
            <span>SYNC · live</span>
          </div>
        </div>
        <div className="side-col">
          <${ScatterPlot}
            opportunities=${MOCK_OPPORTUNITIES}
            isEligible=${isEligible}
            highlighted=${highlighted}
            onDotHover=${onHover}
            onDotLeave=${onLeave}
            onDotClick=${(id) => { const op = MOCK_OPPORTUNITIES.find((o) => o.id === id); if (op) setSelected(op) }}
          />
          <${SummaryPanel} bestApy=${bestApy} bestAnnual=${bestAnnual} avgApy=${avgApy} />
        </div>
      </div>
    </div>
    ${selected ? html`<${DetailDrawer} opportunity=${selected} amount=${amountUsd} onClose=${() => setSelected(null)} />` : null}
  `
}

function Header({ theme, onThemeChange }) {
  return html`
    <header className="site-header">
      <div>
        <div className="h-title">YIELD MONITOR</div>
        <div className="h-sub">Read-only DeFi Yield Discovery · v0.1</div>
      </div>
      <div className="theme-toggle">
        <button className=${`theme-btn${theme === 'light' ? ' active' : ''}`} onClick=${() => onThemeChange('light')}>LIGHT</button>
        <button className=${`theme-btn${theme === 'dark' ? ' active' : ''}`} onClick=${() => onThemeChange('dark')}>DARK</button>
      </div>
    </header>
  `
}

function ControlStrip({ amount, onAmountChange, bucket, onBucketChange, strategy, onStrategyChange, minTvl, onMinTvlChange }) {
  const [sliderVal, setSliderVal] = useState(tvlToSlider(minTvl))
  const [editingTvl, setEditingTvl] = useState(false)
  const [tvlInput, setTvlInput] = useState('')
  const tvlInputRef = useRef(null)

  const handleSlider = (e) => {
    const v = parseInt(e.target.value)
    setSliderVal(v)
    onMinTvlChange(sliderToTvl(v))
  }

  const startTvlEdit = () => {
    setTvlInput(String(minTvl))
    setEditingTvl(true)
  }

  useEffect(() => {
    if (editingTvl && tvlInputRef.current) {
      tvlInputRef.current.focus()
      tvlInputRef.current.select()
    }
  }, [editingTvl])

  const finishTvlEdit = () => {
    const v = parseFloat(tvlInput.replace(/[^0-9.]/g, ''))
    if (!isNaN(v)) {
      onMinTvlChange(v)
      setSliderVal(tvlToSlider(v))
    }
    setEditingTvl(false)
  }

  const handleAmountBlur = (e) => {
    e.target.value = amount.toLocaleString('en-US')
  }

  const handleAmountFocus = (e) => {
    e.target.value = amount.toString()
  }

  return html`
    <div className="control-strip brackets">
      <div className="ctrl-group">
        <div className="label">Amount (USD)</div>
        <input className="input-thin mono" type="text"
          defaultValue=${amount.toLocaleString('en-US')}
          onInput=${(e) => { const v = parseFloat(e.target.value.replace(/[^0-9.]/g, '')); onAmountChange(isNaN(v) ? 0 : v) }}
          onBlur=${handleAmountBlur}
          onFocus=${handleAmountFocus}
        />
      </div>
      <div className="ctrl-group">
        <div className="label">Risk Bucket</div>
        <div className="pill-row">
          ${RISK_BUCKETS.map((b) => html`
            <button key=${b.id} className=${`pill${bucket === b.id ? ' active' : ''}`} onClick=${() => onBucketChange(b.id)}>${b.label}</button>
          `)}
        </div>
      </div>
      <div className="ctrl-group">
        <div className="label">Complexity</div>
        <div className="pill-row">
          ${STRATEGY_TYPES.map((s) => html`
            <button key=${s.id}
              className=${`pill${strategy === s.id ? ' active-em' : ''}${s.comingSoon ? ' disabled' : ''}`}
              onClick=${s.comingSoon ? undefined : () => onStrategyChange(s.id)}
            >${s.label}${s.comingSoon ? html`<span className="soon-tag">SOON</span>` : null}</button>
          `)}
        </div>
      </div>
      <div className="ctrl-group">
        <div className="slider-wrap">
          <div className="slider-head">
            <div className="label">Minimum TVL</div>
            ${editingTvl
              ? html`<input ref=${tvlInputRef} className="slider-val-input" type="text" value=${tvlInput}
                  onInput=${(e) => setTvlInput(e.target.value)}
                  onBlur=${finishTvlEdit}
                  onKeyDown=${(e) => { if (e.key === 'Enter') e.target.blur() }}
                />`
              : html`<span className="slider-val" onClick=${startTvlEdit}>${fmtUSDFull(minTvl)}</span>`
            }
          </div>
          <input type="range" min="0" max="100" step="1" value=${sliderVal} onInput=${handleSlider} />
          <div className="slider-meta">
            <span>$0</span>
            <span>$1B</span>
          </div>
        </div>
      </div>
    </div>
  `
}

function OpportunityRow({ op, index, amount, highlighted, onSelect, onHover, onLeave }) {
  const monthly = calculateIncome(amount, op.apy)
  return html`
    <div className=${`row${highlighted ? ' hl' : ''}`}
      onMouseEnter=${onHover} onMouseLeave=${onLeave} onClick=${onSelect}
    >
      <div className="rank">${String(index + 1).padStart(2, '0')}</div>
      <div>
        <div className="name">${op.name}</div>
        <div className="meta">${op.source} · ${op.chain}</div>
      </div>
      <div>
        <div className="apy-main">${fmtPct(op.apy)}</div>
        <div className="apy-split">${op.baseApy.toFixed(2)} + ${op.rewardApy.toFixed(2)}</div>
      </div>
      <div className="col-tvl">${fmtUSD(op.tvlUsd)}</div>
      <div><span className="income">${fmtUSDFull(monthly)}</span></div>
      <div className="col-action" style=${{ textAlign: 'right' }}>
        <button className="detail-btn" onClick=${(e) => { e.stopPropagation(); onSelect() }}>Detail →</button>
      </div>
    </div>
  `
}

function FilteredRow({ op, amount, bucket, strategy }) {
  const monthly = calculateIncome(amount, op.apy)
  const reason = op.bucket !== bucket
    ? 'bucket: ' + op.bucket
    : (strategy === 'simple' && op.strategy === 'optimized')
      ? 'optimized only'
      : 'TVL ' + fmtUSD(op.tvlUsd) + ' below filter'

  return html`
    <div className="row dim">
      <div className="rank">—</div>
      <div>
        <div className="name">${op.name}</div>
        <div className="meta">FILTERED · ${reason}</div>
      </div>
      <div>${fmtPct(op.apy)}</div>
      <div className="col-tvl">${fmtUSD(op.tvlUsd)}</div>
      <div>${fmtUSDFull(monthly)}</div>
      <div className="col-action" style=${{ textAlign: 'right' }}><span className="muted mono" style=${{ fontSize: '9px' }}>—</span></div>
    </div>
  `
}

function ScatterPlot({ opportunities, isEligible, highlighted, onDotHover, onDotLeave, onDotClick }) {
  const maxApy = 28
  const maxRisk = 10
  let eligibleCount = 0

  const dots = opportunities.map((o) => {
    const elig = isEligible(o)
    if (elig) eligibleCount++
    const x = (o.riskScore / maxRisk) * 100
    const y = 100 - (o.apy / maxApy) * 100
    const tvlLog = Math.log10(Math.max(o.tvlUsd, 1e6))
    const size = 8 + Math.min(20, (tvlLog - 6) * 4)
    return { ...o, elig, x, y, size }
  })

  return html`
    <div className="panel brackets">
      <div className="panel-head">
        <div className="label">Risk × Yield Map</div>
        <div className="mono" style=${{ fontSize: '9px', color: 'var(--text-dim)' }}>${eligibleCount} / ${opportunities.length}</div>
      </div>
      <div className="scatter">
        <div className="scatter-bg"></div>
        <div className="axis-label-y">APY ↑</div>
        <div className="axis-label-x">RISK →</div>
        <div className="axis-y">
          <div>10%</div>
          <div>5%</div>
          <div>0%</div>
        </div>
        <div className="axis-x">
          <div>LOW</div>
          <div>MED</div>
          <div>HIGH</div>
        </div>
        <div className="plot-area">
          ${dots.map((d) => html`
            <div key=${d.id}
              className=${`dot ${d.elig ? 'eligible' : 'filtered'}${highlighted === d.id ? ' hl' : ''}`}
              style=${{ left: d.x + '%', top: d.y + '%', width: d.size + 'px', height: d.size + 'px' }}
              title=${d.name + ' · APY ' + fmtPct(d.apy) + ' · Risk ' + d.riskScore.toFixed(1)}
              onMouseEnter=${() => onDotHover(d.id)}
              onMouseLeave=${onDotLeave}
              onClick=${() => onDotClick(d.id)}
            />
          `)}
        </div>
      </div>
      <div className="scatter-legend">● eligible · ◯ filtered · size = TVL</div>
    </div>
  `
}

function SummaryPanel({ bestApy, bestAnnual, avgApy }) {
  return html`
    <div className="panel brackets">
      <div className="panel-head">
        <div className="label">Live Summary</div>
      </div>
      <div className="summary-stat">
        <div className="label">Best APY</div>
        <div className="val val-em mono">${bestApy !== null ? fmtPct(bestApy) : '—'}</div>
      </div>
      <div className="summary-stat">
        <div className="label">Top Pick Est. / Year</div>
        <div className="val mono">${bestAnnual !== null ? fmtUSDFull(bestAnnual) : '—'}</div>
      </div>
      <div className="summary-stat">
        <div className="label">Avg APY across eligible</div>
        <div className="val mono">${avgApy !== null ? fmtPct(avgApy) : '—'}</div>
      </div>
    </div>
  `
}

function DetailDrawer({ opportunity, amount, onClose }) {
  const op = opportunity
  const monthly = calculateIncome(amount, op.apy)
  const annual = calculateAnnualIncome(amount, op.apy)
  const seed = op.id.split('').reduce((s, c) => s + c.charCodeAt(0), 0)
  const apySpark = makeSpark(seed, 0.3)
  const tvlSpark = makeSpark(seed + 7, 0.5)

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return html`
    <div className="drawer-backdrop open" onClick=${onClose}></div>
    <div className="drawer open">
      <div className="drawer-head">
        <div>
          <h2 className="drawer-title">${op.name}</h2>
          <div className="drawer-sub">${op.source} · ${op.chain}</div>
        </div>
        <button className="drawer-close" onClick=${onClose}>CLOSE</button>
      </div>
      <div className="drawer-stat-grid">
        <div className="drawer-stat">
          <div className="label">Base APY</div>
          <div className="val mono">${fmtPct(op.baseApy)}</div>
        </div>
        <div className="drawer-stat">
          <div className="label">Reward APY</div>
          <div className="val mono">${fmtPct(op.rewardApy)}</div>
        </div>
        <div className="drawer-stat">
          <div className="label">TVL</div>
          <div className="val mono">${fmtUSD(op.tvlUsd)}</div>
        </div>
        <div className="drawer-stat">
          <div className="label">Risk Score</div>
          <div className="val mono">${op.riskScore.toFixed(1)} / 10</div>
        </div>
      </div>
      <div className="drawer-section">
        <h3>Why this result</h3>
        <p>${op.why}</p>
      </div>
      <div className="drawer-section">
        <h3>Risk notes</h3>
        <div>${op.risks.map((r, i) => html`<span key=${i} className="risk-chip">${r}</span>`)}</div>
      </div>
      <div className="drawer-section">
        <h3>30-day APY trend</h3>
        <div className="sparkline">
          ${apySpark.map((v, i) => html`<div key=${i} style=${{ height: (v * 100) + '%' }} />`)}
        </div>
      </div>
      <div className="drawer-section">
        <h3>30-day TVL trend</h3>
        <div className="sparkline">
          ${tvlSpark.map((v, i) => html`<div key=${i} style=${{ height: (v * 100) + '%' }} />`)}
        </div>
      </div>
      <div className="drawer-section">
        <h3>Projected income</h3>
        <p>
          Monthly: <span className="accent mono">${fmtUSDFull(monthly)}</span><br />
          Annually: <span className="accent mono">${fmtUSDFull(annual)}</span>
        </p>
      </div>
    </div>
  `
}

const rootElement = document.getElementById('app')
const root = createRoot(rootElement)
root.render(html`<${App} />`)

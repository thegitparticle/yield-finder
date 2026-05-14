import React, { useMemo, useState } from 'https://esm.sh/react@18.2.0'
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import htm from 'https://esm.sh/htm@3.1.1'

const html = htm.bind(React.createElement)

const RISK_BUCKETS = [
  { id: 'stable', label: 'Stablecoin Yield', description: 'Dollar/fiat-pegged assets with lower price volatility.' },
  { id: 'bluechip', label: 'Blue-Chip Asset Yield', description: 'Established majors like ETH/BTC/SOL with base-asset exposure.' },
  { id: 'higher', label: 'Higher-Risk Asset Yield', description: 'Incentive-heavy and volatile opportunities for DeFi-native users.' },
]

const STRATEGY_TYPES = [
  { id: 'simple', label: 'Simple Yield', description: 'Single-step lending/staking/vault strategies.' },
  { id: 'optimized', label: 'Optimized Yield', description: 'Multi-layer non-leveraged strategy construction.' },
]

const MOCK_OPPORTUNITIES = [
  { id: 'aave-usdc-base', source: 'LI.FI Earn', chain: 'Base', protocol: 'Aave', name: 'USDC Lending Pool', tokens: ['USDC'], bucket: 'stable', strategy: 'simple', apy: 5.4, baseApy: 3.9, rewardApy: 1.5, tvlUsd: 63000000, lockupDays: 0, risks: ['Smart contract risk', 'Protocol insolvency risk'], historyApy: Array.from({ length: 30 }, (_, i) => 4.8 + (i % 5) * 0.2), historyTvl: Array.from({ length: 30 }, (_, i) => 58000000 + i * 120000), },
  { id: 'morpho-usds-eth', source: 'Yield.xyz', chain: 'Ethereum', protocol: 'Morpho', name: 'USDS Curated Vault', tokens: ['USDS'], bucket: 'stable', strategy: 'optimized', apy: 8.2, baseApy: 5.1, rewardApy: 3.1, tvlUsd: 18200000, lockupDays: 0, risks: ['Reward-token sustainability risk', 'Liquidity risk'], historyApy: Array.from({ length: 30 }, (_, i) => 7 + ((i + 2) % 7) * 0.3), historyTvl: Array.from({ length: 30 }, (_, i) => 15000000 + i * 90000), },
  { id: 'lido-wsteth-mainnet', source: 'Yield.xyz', chain: 'Ethereum', protocol: 'Lido', name: 'wstETH Native Staking Yield', tokens: ['wstETH'], bucket: 'bluechip', strategy: 'simple', apy: 3.6, baseApy: 3.4, rewardApy: 0.2, tvlUsd: 9100000000, lockupDays: 0, risks: ['Liquid staking risk', 'Smart contract risk'], historyApy: Array.from({ length: 30 }, (_, i) => 3.1 + (i % 4) * 0.15), historyTvl: Array.from({ length: 30 }, (_, i) => 9000000000 + i * 18000000), },
  { id: 'etherfi-weeth-eigen', source: 'LI.FI Earn', chain: 'Ethereum', protocol: 'EtherFi', name: 'weETH Restaking Vault', tokens: ['weETH'], bucket: 'bluechip', strategy: 'optimized', apy: 7.5, baseApy: 3.2, rewardApy: 4.3, tvlUsd: 740000000, lockupDays: 2, risks: ['Restaking risk', 'Points program uncertainty'], historyApy: Array.from({ length: 30 }, (_, i) => 6.7 + (i % 6) * 0.2), historyTvl: Array.from({ length: 30 }, (_, i) => 700000000 + i * 1500000), },
  { id: 'jito-sol-vault', source: 'Yield.xyz', chain: 'Solana', protocol: 'Jito', name: 'JitoSOL Strategy Vault', tokens: ['SOL', 'JitoSOL'], bucket: 'higher', strategy: 'optimized', apy: 10.9, baseApy: 7.1, rewardApy: 3.8, tvlUsd: 42000000, lockupDays: 1, risks: ['Volatility risk', 'Reward token risk'], historyApy: Array.from({ length: 30 }, (_, i) => 9.5 + (i % 8) * 0.28), historyTvl: Array.from({ length: 30 }, (_, i) => 38500000 + i * 80000), },
]

const calculateIncome = (amount, apy) => (Number(amount || 0) * (apy / 100)) / 12

function App() {
  const [amountUsd, setAmountUsd] = useState(10000)
  const [bucket, setBucket] = useState('stable')
  const [strategy, setStrategy] = useState('simple')
  const [minTvl, setMinTvl] = useState(10000000)
  const [selected, setSelected] = useState(null)
  const [theme, setTheme] = useState('light')

  const results = useMemo(() => {
    const filtered = MOCK_OPPORTUNITIES.filter((op) => op.bucket === bucket && op.strategy === strategy && op.tvlUsd >= minTvl)
    return filtered
      .map((op) => {
        const estimatedMonthlyIncome = calculateIncome(amountUsd, op.apy)
        const score = (op.apy * 0.45 + Math.log10(op.tvlUsd) * 0.3 + (op.strategy === 'simple' ? 0.15 : 0.08) + (op.rewardApy > 0 ? 0.04 : 0))
        return { ...op, estimatedMonthlyIncome, score }
      })
      .sort((a, b) => b.score - a.score)
  }, [amountUsd, bucket, strategy, minTvl])

  return html`<div className=${`page theme-${theme}`}><${Header} theme=${theme} onThemeChange=${setTheme} />
  <main className="container">
    <section className="grid two-col">
      <div className="card">
        <div className="card-label mono">Input Configurator</div>
        <label className="field mono">Amount (USD)
          <input type="number" className="input" value=${amountUsd} onChange=${(e) => setAmountUsd(Number(e.target.value))} min="0" />
        </label>
        <div className="field mono">Asset / Risk Bucket</div>
        <div className="pill-row">${RISK_BUCKETS.map((item) => html`<button className=${`button ${bucket === item.id ? 'button-orange' : ''}`} onClick=${() => setBucket(item.id)}>${item.label}</button>`)}</div>
        <div className="field mono">Strategy Complexity</div>
        <div className="pill-row">${STRATEGY_TYPES.map((item) => html`<button className=${`button ${strategy === item.id ? 'button-green' : ''}`} onClick=${() => setStrategy(item.id)}>${item.label}</button>`)}</div>
        <label className="field mono">Minimum TVL (USD)
          <input type="range" min="1000000" max="50000000" step="1000000" value=${minTvl} onChange=${(e) => setMinTvl(Number(e.target.value))} />
          <span className="muted">${formatCurrency(minTvl)}</span>
        </label>
      </div>
      <div className="card">
        <div className="card-label mono">Result Summary</div>
        <div className="card-value">${results.length}</div>
        <p className="muted mono">opportunities found</p>
        <p className="muted mono">Risk bucket: ${RISK_BUCKETS.find((r) => r.id === bucket)?.label}</p>
        <p className="muted mono">Complexity: ${STRATEGY_TYPES.find((s) => s.id === strategy)?.label}</p>
        <p className="muted mono">Data sources: LI.FI Earn + Yield.xyz (provider adapter scaffold)</p>
      </div>
    </section>

    <section className="grid">${results.length === 0 ? html`<div className="card">No opportunities match current filters.</div>` : results.map((op, index) => html`<${OpportunityCard} key=${op.id} op=${op} index=${index} onSelect=${setSelected} />`)}</section>
  </main>
  <${Footer} />
  ${selected ? html`<${DetailDrawer} opportunity=${selected} onClose=${() => setSelected(null)} />` : ''}
  </div>`
}

function OpportunityCard({ op, index, onSelect }) { return html`<div className="card"><div className="card-label mono">Rank #${index + 1} · ${op.chain} · ${op.protocol}</div><div className="card-value">${op.name}</div><p className="muted mono">APY ${op.apy.toFixed(2)}% • TVL ${formatCurrency(op.tvlUsd)}</p><p className="muted mono">Est. monthly income: <strong>${formatCurrency(op.estimatedMonthlyIncome)}</strong></p><button className="button button-orange" onClick=${() => onSelect(op)}>View Details</button></div>` }

function DetailDrawer({ opportunity, onClose }) { return html`<aside className="drawer"><div className="card"><div className="card-actions"><div className="card-label mono">Opportunity Detail</div><button className="button" onClick=${onClose}>Close</button></div><h3>${opportunity.name}</h3><p className="muted mono">Source: ${opportunity.source} · ${opportunity.chain}</p><p className="muted mono">Base APY: ${opportunity.baseApy.toFixed(2)}% | Reward APY: ${opportunity.rewardApy.toFixed(2)}%</p><p className="muted mono">Why this result: high APY, eligible bucket/complexity, and TVL above your minimum filter.</p><p className="muted mono">Risk notes: ${opportunity.risks.join(' • ')}</p><div className="mini-chart">30d APY: ${sparkline(opportunity.historyApy)}</div><div className="mini-chart">30d TVL: ${sparkline(opportunity.historyTvl.map((v) => v / 1000000))}M</div></div></aside>` }

function Header({ theme, onThemeChange }) { return html`<header className="header"><div className="container header-inner"><div className="brand"><h1>Yield Monitor</h1><span className="muted mono">Read-only DeFi Yield Discovery</span></div><div className="theme-switch"><button className=${`button ${theme === 'light' ? 'button-orange' : ''}`} onClick=${() => onThemeChange('light')}>Light</button><button className=${`button ${theme === 'dark' ? 'button-green' : ''}`} onClick=${() => onThemeChange('dark')}>Dark</button></div></div></header>` }
function Footer() { return html`<footer className="footer"><div className="container"></div></footer>` }

const formatCurrency = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0)
function sparkline(values) { const ticks = '▁▂▃▄▅▆▇█'; const min = Math.min(...values); const max = Math.max(...values); return values.map((v) => ticks[Math.min(ticks.length - 1, Math.floor(((v - min) / (max - min || 1)) * (ticks.length - 1)))]).join('') }

const rootElement = document.getElementById('app')
const root = createRoot(rootElement)
root.render(html`<${App} />`)

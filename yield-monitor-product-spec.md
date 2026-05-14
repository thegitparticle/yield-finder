# Yield Monitor Tool — Product Spec

## 1. Product Summary

The Yield Monitor Tool is a read-only DeFi yield discovery and income estimation tool.

It helps users answer:

> Given my risk profile, token bucket, and preferred yield complexity, what kind of yield opportunities exist, and how much income could I expect from them?

The tool is not a portfolio manager, execution interface, or automated strategy builder. It is a discovery and comparison product.

Users enter an amount in USD, choose an asset/risk bucket, choose a strategy complexity level, and then receive ranked yield opportunities with income estimates, APY/TVL context, and risk explanations.

---

## 2. Product Positioning

The product should be positioned as:

> A read-only yield monitor that helps users compare stablecoin, blue-chip, and higher-risk DeFi yield opportunities across simple and optimized non-leveraged strategies, with income estimates, risk labels, and 30-day APY/TVL context.

Version 1 should feel like a complete product for normal yield discovery.

Only Pendle, leveraged yield, looping, liquidation-risk strategies, and advanced fixed/variable yield strategies should be separated into a future Advanced Yield module.

---

## 3. Version 1 Scope

### Version 1 Includes

Version 1 includes:

1. Stablecoin yield opportunities
2. Blue-chip asset yield opportunities
3. Higher-risk volatile asset yield opportunities
4. Simple yield strategies
5. Optimized / multi-layer yield strategies
6. LI.FI Earn data
7. Yield.xyz data
8. Opportunity ranking
9. Income estimates
10. APY breakdown
11. TVL display
12. Last 30 days APY history
13. Last 30 days TVL history
14. Risk notes
15. Filters
16. Opportunity detail page
17. Optional wallet address input for viewing current positions, if provider data supports it

### Version 1 Excludes

Version 1 excludes the following from main results:

1. Pendle PT/YT strategies
2. Leveraged yield
3. Looping strategies
4. Borrow-to-farm strategies
5. Liquidation-risk strategies
6. Strategies requiring advanced fixed-yield / variable-yield education before use

These should live in a separate module:

> Advanced Yield — Coming Soon

or:

> Pendle / Leveraged Yield — Separate Module

---

## 4. Core User Problem

DeFi yield is fragmented across chains, protocols, vaults, staking, lending, restaking, incentives, and points programs.

Users want a simple answer to:

> Where can I earn yield based on the amount I have, the type of assets I am comfortable with, and the level of strategy complexity I am willing to accept?

The tool simplifies yield discovery into three choices:

1. How much do you want to put in?
2. What risk/asset bucket do you want?
3. How complex should the yield strategy be?

---

## 5. Product Goals

The product should:

1. Make DeFi yield discovery easy to understand.
2. Let users compare yield opportunities across protocols and chains.
3. Translate APY into simple income estimates.
4. Separate low-complexity yield from optimized/multi-layer yield.
5. Clearly explain risk without overwhelming the user.
6. Use real provider data rather than static lists.
7. Give users recent 30-day APY and TVL context.
8. Avoid mixing leveraged/Pendle strategies into normal yield results.

---

## 6. Non-Goals

The product should not:

1. Execute deposits or withdrawals.
2. Require wallet connection for basic discovery.
3. Make personalized financial recommendations.
4. Auto-allocate funds.
5. Rebalance portfolios.
6. Support leveraged yield in the main result feed.
7. Present APY as guaranteed income.
8. Hide risk behind overly simplified labels.

---

## 7. User Personas

### Persona 1: Stable Yield Seeker

Wants lower volatility and is mostly interested in stablecoins.

Primary question:

> Where can I park stablecoins and earn without taking too much price risk?

Typical assets:

- USDC
- USDT
- DAI
- USDS
- PYUSD
- FRAX
- EURC

---

### Persona 2: Blue-Chip Crypto Holder

Already holds major crypto assets and wants to earn yield while staying in relatively established assets.

Primary question:

> What can I earn on ETH, BTC, SOL, or other major assets I already hold?

Typical assets:

- ETH
- WETH
- stETH
- wstETH
- WBTC
- cbBTC
- SOL
- JitoSOL
- BNB
- AVAX
- POL

---

### Persona 3: DeFi-Native Yield Hunter

Comfortable with more volatile assets, incentives, vaults, restaking, and points.

Primary question:

> Where is the highest reasonable yield, and what risks come with it?

Typical opportunities:

- Incentivized lending markets
- Reward-heavy vaults
- Restaking vaults
- Higher APY volatile assets
- Points-driven opportunities
- Strategy-managed vaults

---

## 8. Asset / Risk Buckets

The product should present three user-facing buckets.

---

### 8.1 Stablecoin Yield

User-facing label:

> Stablecoin Yield

Description:

> For users who want yield on dollar-pegged or fiat-pegged assets.

Example assets:

- USDC
- USDT
- DAI
- USDS
- PYUSD
- FRAX
- crvUSD
- GHO
- EURC

Typical strategies:

- Aave lending
- Morpho vaults
- Compound lending
- Spark lending
- Euler lending
- Yearn stablecoin vaults
- Stablecoin RWA yield vaults, if supported

Primary risks:

- Smart contract risk
- Stablecoin depeg risk
- Protocol insolvency risk
- Lending market risk
- Liquidity risk
- Reward-token sustainability risk

---

### 8.2 Blue-Chip Asset Yield

User-facing label:

> Blue-Chip Asset Yield

Description:

> For users holding major crypto assets who want yield while staying in relatively established tokens.

Example assets:

- ETH
- WETH
- stETH
- wstETH
- rETH
- cbETH
- WBTC
- cbBTC
- tBTC
- SOL
- JitoSOL
- mSOL
- BNB
- AVAX
- MATIC / POL

Typical strategies:

- ETH staking
- Liquid staking
- Liquid restaking
- Lending
- Blue-chip collateral vaults
- BTC lending vaults
- SOL staking / liquid staking

Primary risks:

- Asset price volatility
- Slashing risk for staking
- Liquid staking token depeg risk
- Restaking risk
- Bridge / wrapped asset risk
- Smart contract risk

---

### 8.3 Higher-Risk Asset Yield

User-facing label:

> Higher-Risk Yield

Description:

> For users comfortable with volatile tokens, incentives, newer protocols, and potentially higher APY.

Example assets:

- Governance tokens
- Long-tail DeFi tokens
- Smaller L1 / L2 assets
- Incentivized DeFi assets
- LP vault assets
- Reward-token-heavy opportunities
- Newer ecosystem tokens

Typical strategies:

- Vaults with rewards
- Incentivized lending markets
- LP vaults
- New protocol campaigns
- Points-driven opportunities
- Higher APY pools with lower TVL

Primary risks:

- High price volatility
- Liquidity risk
- Incentive APY decay
- Reward token sell pressure
- New protocol risk
- Impermanent loss, if LP strategies are included

---

## 9. Strategy Complexity Levels

The main product should have two active strategy complexity levels.

Pendle / leveraged yield is separate and not part of the normal result feed.

---

### 9.1 Simple Yield

User-facing label:

> Simple Yield

Description:

> Straightforward strategies where the yield source is easy to understand.

Examples:

- USDC lending
- USDT lending
- ETH staking
- ETH liquid staking
- BTC lending
- SOL staking
- Basic single-asset vaults

Product rule:

A strategy qualifies as Simple Yield if:

1. It accepts one primary token.
2. Yield source is understandable: lending, staking, liquid staking, or simple vault.
3. It does not involve leverage.
4. It does not involve looping.
5. It does not involve Pendle PT/YT mechanics.
6. It does not involve complex fixed/variable yield mechanics.
7. It has no or low lockup.
8. It is redeemable, where data is available.
9. It has relatively clear risk exposure.

Suggested tags:

- lending
- staking
- liquid-staking
- stablecoin
- single-asset
- simple-vault

User-facing explanation:

> Simple yield strategies usually involve lending, staking, or depositing one asset into a straightforward vault. These are easier to understand but still carry protocol, liquidity, and asset risks.

---

### 9.2 Optimized Yield

User-facing label:

> Optimized Yield

Description:

> More advanced but still non-leveraged strategies that may use vaults, restaking, reward tokens, incentives, points, or protocol-level aggregation to increase yield.

Examples:

- Yield aggregator vaults
- Restaking
- Incentivized lending markets
- Reward-based vaults
- Points-based opportunities
- Multi-protocol strategies
- Strategy-managed vaults
- Morpho optimizer vaults
- Yearn vaults
- EtherFi / Renzo / Kelp restaking
- Ethena-style opportunities, if classified as non-leveraged

Product rule:

A strategy qualifies as Optimized Yield if:

1. Yield comes from more than one source, or
2. A vault manages allocation behind the scenes, or
3. APY includes reward tokens / incentives / points-like components, or
4. It uses restaking, vault aggregation, or strategy automation, or
5. It has higher risk/complexity than direct lending or direct staking.

Suggested tags:

- vault
- restaking
- rewards
- incentives
- points
- strategy
- aggregator
- managed-vault

User-facing explanation:

> Optimized yield strategies may combine vault management, rewards, incentives, restaking, or points programs to increase yield. These can offer higher APY but usually have more moving parts and more risk.

---

### 9.3 Pendle / Leveraged Yield

User-facing label:

> Pendle / Leveraged Yield

Status:

> Coming Soon

This section should be separate from the main yield monitor.

Description:

> Pendle and leveraged yield strategies are advanced products involving fixed/variable yield exposure, yield tokens, looping, or borrowed capital. These will be handled in a separate advanced module.

Exclude from normal result feeds any strategy tagged with:

- pendle
- principal-token
- yield-token
- fixed-yield
- variable-yield
- leverage
- looping
- borrow
- liquidation
- leveraged-staking
- borrow-to-farm

Risk warning:

> Leveraged and Pendle-style strategies may involve liquidation risk, liquidity risk, fixed/variable yield risk, smart contract risk, and active management assumptions.

---

## 10. Data Providers

Version 1 should use both LI.FI Earn and Yield.xyz.

The product should normalize, deduplicate, classify, and rank opportunities from both sources.

---

## 10.1 LI.FI Earn

Use LI.FI Earn as the clean normalized vault source.

Base URL:

```text
https://earn.li.fi
```

All Earn endpoints are prefixed with:

```text
/v1/
```

### LI.FI Earn Use Cases

Use LI.FI Earn for:

1. Vault discovery
2. Protocol vaults
3. APY
4. TVL
5. Token data
6. Chain data
7. Protocol data
8. Redeemability
9. Timelock
10. KYC flag
11. Reward tokens
12. Underlying tokens
13. Vault tags
14. Portfolio positions, if wallet address support is added

### Main LI.FI Earn Endpoints

```text
GET /v1/vaults
GET /v1/vaults/:chainId/:address
GET /v1/chains
GET /v1/protocols
GET /v1/portfolio/:userAddress/positions
```

---

### 10.1.1 List Vaults

Endpoint:

```text
GET /v1/vaults
```

Use for the main results feed.

Important query parameters:

- chainId
- asset
- protocol
- minTvlUsd
- isTransactional
- isRedeemable
- isComposerSupported
- sortBy
- limit
- cursor

Product uses:

| Product Need | API Usage |
|---|---|
| Stablecoin results | Filter by stablecoin asset addresses/symbols |
| Blue-chip results | Filter by ETH/BTC/SOL/etc. assets |
| Chain filter | Use chainId |
| Minimum liquidity | Use minTvlUsd |
| Highest APY sort | Use sortBy=apy if available |
| Highest TVL sort | Use sortBy=tvl if available |
| Only withdrawable opportunities | Use isRedeemable=true if applicable |
| Pagination | Use cursor / nextCursor |

---

### 10.1.2 Get Vault Detail

Endpoint:

```text
GET /v1/vaults/:chainId/:address
```

Use when the user opens an opportunity detail page.

Product uses:

- Show full vault metadata
- Confirm APY and TVL
- Show reward tokens
- Show underlying tokens
- Show timelock
- Show redeemability
- Show KYC requirement
- Show source-level updated timestamp

---

### 10.1.3 List Supported Chains

Endpoint:

```text
GET /v1/chains
```

Use for:

- Chain filter dropdown
- Chain metadata
- Available chain list for Earn opportunities

Important product note:

> Supported chains should be treated as chains with indexed Earn opportunities, not necessarily every chain supported by LI.FI broadly.

---

### 10.1.4 List Supported Protocols

Endpoint:

```text
GET /v1/protocols
```

Use for:

- Protocol filter dropdown
- Protocol logos
- Protocol names
- Protocol-level grouping

---

### 10.1.5 Portfolio Positions

Endpoint:

```text
GET /v1/portfolio/:userAddress/positions
```

Optional V1 feature.

Use only if the product supports wallet address input.

Product uses:

- Show current supported positions
- Estimate current yield
- Compare current positions vs available opportunities

Important product rule:

> Wallet input should be optional. The core product should work without a wallet.

---

## 10.2 Yield.xyz

Use Yield.xyz as the broader yield discovery and enrichment source.

Use it for opportunities that may not be covered cleanly by LI.FI vaults, especially staking, liquid staking, restaking, broader network support, risk scores, reward-rate history, and TVL history.

### Yield.xyz Use Cases

Use Yield.xyz for:

1. Broader yield discovery
2. Staking
3. Liquid staking
4. Restaking
5. Non-vault yield opportunities
6. Risk scores, if available
7. Reward-rate history for last 30 days
8. TVL history for last 30 days
9. Provider metadata
10. Network metadata
11. Wallet balances / positions, if needed
12. Validator metadata, where relevant

### Main Yield.xyz Endpoints / Tools

```text
GET /v1/yields
GET /v1/yields/{id}
GET /v1/networks
GET /v1/providers
GET /v1/yields/{id}/validators
POST /v1/yields/balances
POST /v1/yields/{id}/balances
Risk rating tool / endpoint
Reward-rate history tool / endpoint
TVL history tool / endpoint
```

---

### 10.2.1 Discover Yields

Endpoint:

```text
GET /v1/yields
```

Use for:

- Main discovery feed from Yield.xyz
- ETH staking opportunities
- SOL staking opportunities
- Restaking opportunities
- Lending opportunities
- RWA yield opportunities, if desired
- Provider-specific opportunities
- Network-specific opportunities

Product uses:

| Product Need | Yield.xyz Usage |
|---|---|
| ETH staking yield | Filter by ETH / network / provider |
| SOL staking yield | Filter by SOL / network / provider |
| Restaking opportunities | Filter by restaking providers or tags |
| Lending opportunities | Filter by provider/token |
| Broader opportunity feed | Use GET /v1/yields |
| Detail page | Use GET /v1/yields/{id} |

---

### 10.2.2 Get Single Yield

Endpoint:

```text
GET /v1/yields/{id}
```

Use when the user opens an opportunity detail page.

Product uses:

- Full metadata
- Yield mechanics
- Supported actions, if present
- Entry limits
- Fees
- Lockups
- Tags
- Token definitions
- Provider details

---

### 10.2.3 Get Validators

Endpoint:

```text
GET /v1/yields/{id}/validators
```

Use only for validator-based opportunities.

Product uses:

- ETH staking validators, if relevant
- Cosmos-like staking, if relevant
- Validator commission
- Voting power
- Reward rates
- Validator-level comparison

This should not appear for normal lending/vault results.

---

### 10.2.4 Get Networks

Endpoint:

```text
GET /v1/networks
```

Use for:

- Network support
- Network filter options
- Normalizing Yield.xyz networks to product chain names

---

### 10.2.5 Get Providers

Endpoint:

```text
GET /v1/providers
```

Use for:

- Protocol/provider filters
- Provider metadata
- Provider logos
- Grouping opportunities by protocol

---

### 10.2.6 Balances / Positions

Endpoints:

```text
POST /v1/yields/balances
POST /v1/yields/{id}/balances
```

Optional V1 feature if wallet address support is included.

Product uses:

- Read a user’s existing yield positions
- Estimate current yield
- Compare current holdings to available opportunities

Important product rule:

> This remains read-only. No enter/exit/manage actions should be included in the product scope.

---

### 10.2.7 Risk Rating

Use if available in your API access.

Product uses:

- Opportunity risk grade
- Ranking score
- Risk explanation
- Filtering out extreme-risk opportunities

Suggested display:

```text
Risk Rating: B
Risk Score: 72 / 100
Risk Label: Moderate
```

If unavailable:

```text
Risk Rating: Not available
```

---

### 10.2.8 Reward-Rate History

Use for last 30 days only.

Product uses:

- 30-day APY trend
- 30-day average APY
- 30-day high APY
- 30-day low APY
- APY stability label

Do not show longer time windows in V1.

---

### 10.2.9 TVL History

Use for last 30 days only.

Product uses:

- 30-day TVL trend
- Starting TVL 30 days ago
- Current TVL
- 30-day TVL change percentage
- TVL trend label

Do not show longer time windows in V1.

---

## 11. Data Normalization

Because the product uses both LI.FI Earn and Yield.xyz, all opportunities should be normalized into one product-level object.

### Normalized Opportunity Object

```text
opportunity_id
source
sources
provider_opportunity_id
name
protocol
protocol_logo
chain
chain_id
network
asset_symbols
asset_addresses
asset_bucket
strategy_type
apy_total
apy_base
apy_reward
apy_display
reward_tokens
underlying_tokens
tvl_usd
tags
is_redeemable
has_timelock
timelock_value
requires_kyc
risk_score
risk_label
risk_notes
apy_30d_average
apy_30d_high
apy_30d_low
apy_30d_trend_label
tvl_30d_start
tvl_30d_current
tvl_30d_change_percent
tvl_30d_trend_label
last_updated
details_url
raw_source_reference
```

---

## 12. Deduplication Rules

LI.FI and Yield.xyz may return the same or similar strategies.

Deduplicate by checking:

1. Same chain
2. Same protocol
3. Same vault / contract address
4. Same underlying asset
5. Similar strategy name
6. Same receipt token, if applicable

### Duplicate Handling

If a duplicate exists:

1. Prefer LI.FI for normalized vault fields.
2. Use Yield.xyz for enrichment if it has risk/history data.
3. Merge source attribution.
4. Display both sources in the detail page.

Display source as:

```text
Sources: LI.FI Earn, Yield.xyz
```

If only one provider has the opportunity:

```text
Source: LI.FI Earn
```

or:

```text
Source: Yield.xyz
```

---

## 13. Classification Rules

The product needs its own classification layer because provider data will not perfectly match internal product categories.

---

### 13.1 Stablecoin Bucket Classification

Classify as Stablecoin Yield if:

1. Primary underlying token is in the stablecoin allowlist, or
2. Tags include stablecoin, or
3. The asset is a fiat-pegged token.

Suggested allowlist:

```text
USDC
USDT
DAI
USDS
sDAI
PYUSD
FRAX
crvUSD
GHO
EURC
USDe
sUSDe
```

Note:

USDe and sUSDe may need a separate risk note because they are not traditional fiat-backed stablecoins.

---

### 13.2 Blue-Chip Bucket Classification

Classify as Blue-Chip Asset Yield if:

1. Primary token is in the blue-chip allowlist, or
2. It is a staking / liquid staking yield for a major L1 asset, or
3. It is a lending/vault opportunity for ETH, BTC wrappers, SOL, BNB, AVAX, or POL.

Suggested allowlist:

```text
ETH
WETH
stETH
wstETH
rETH
cbETH
WBTC
cbBTC
tBTC
SOL
mSOL
JitoSOL
BNB
AVAX
MATIC
POL
```

---

### 13.3 Higher-Risk Bucket Classification

Classify as Higher-Risk Yield if:

1. Token is not stablecoin or blue-chip, or
2. Strategy includes LP exposure, or
3. Strategy has reward-heavy APY, or
4. TVL is below configured threshold, or
5. Token is newer / long-tail, or
6. Tags indicate incentives, points, farming, LP, or experimental vault.

---

## 14. Strategy Type Classification

---

### 14.1 Simple Yield Classification

Classify as Simple Yield if:

1. Tags include lending, staking, or liquid-staking.
2. Opportunity has a single main underlying token.
3. It does not use leverage.
4. It does not use looping.
5. It does not use Pendle mechanics.
6. It does not have LP / impermanent loss exposure.
7. It is redeemable or has a clearly stated low-friction exit.
8. Reward APY is not the dominant part of total APY.

Examples:

- Aave USDC
- Compound USDC
- Lido ETH staking
- Simple Morpho USDC lending vault
- SOL staking

---

### 14.2 Optimized Yield Classification

Classify as Optimized Yield if:

1. Tags include vault, restaking, rewards, incentives, strategy, points, or aggregator.
2. Reward APY is a meaningful portion of total APY.
3. There are multiple yield sources.
4. The protocol manages allocation behind the scenes.
5. The strategy has lockup/cooldown.
6. The strategy has non-trivial mechanics.

Examples:

- Yearn vaults
- Morpho optimizer vaults
- EtherFi restaking
- Renzo restaking
- Kelp restaking
- Incentivized lending markets
- Points-based vaults

---

### 14.3 Excluded Advanced Yield Classification

Exclude from normal results if strategy includes:

1. Pendle PT/YT mechanics
2. Fixed/variable yield split
3. Leverage
4. Borrowing to increase yield
5. Looping
6. Liquidation risk
7. Leveraged restaking
8. Advanced options-like yield mechanics

Route these to:

> Pendle / Leveraged Yield — Coming Soon

---

## 15. Last 30 Days History Requirement

For every opportunity where history is available, show only:

1. 30-day APY trend
2. 30-day TVL trend

Do not show:

- 90-day history
- 180-day history
- 1-year history
- All-time history

The goal is simple recent context, not deep analytics.

---

### 15.1 30-Day APY History

Purpose:

> Help users understand whether the displayed APY is stable, rising, falling, or just a temporary spike.

Show:

- Current APY
- 30-day average APY
- 30-day high APY
- 30-day low APY
- Mini chart
- Trend label

Trend labels:

```text
Stable
Rising
Falling
Spiky
Insufficient Data
```

Example:

```text
Current APY: 8.4%
30D Average: 5.9%
30D High: 12.2%
30D Low: 3.8%
APY Stability: Spiky
```

---

### 15.2 30-Day TVL History

Purpose:

> Help users understand whether liquidity is healthy, growing, or leaving the strategy.

Show:

- Current TVL
- TVL 30 days ago
- 30-day TVL change percentage
- Mini chart
- Trend label

Trend labels:

```text
Growing
Flat
Declining
Volatile
Insufficient Data
```

Example:

```text
Current TVL: $18.4M
30D Start TVL: $14.1M
30D Change: +30.5%
TVL Trend: Growing
```

---

### 15.3 Card-Level History Display

On result cards, keep history compact.

Example:

```text
30D APY: Spiky
30D TVL: Growing
```

Full charts should only appear in the detail view.

---

## 16. User Flow

---

### Step 1: Landing / Input Screen

User sees:

> Find yield opportunities based on your risk profile.

Inputs:

1. Amount in USD
2. Asset bucket
3. Strategy type
4. Chain filter, optional
5. Protocol filter, optional
6. Advanced filters, optional

Primary CTA:

> Show Yield Opportunities

Default values:

```text
Amount: $1,000
Asset Bucket: Stablecoin Yield
Strategy Type: Simple Yield
Chain: All supported chains
```

---

### Step 2: Select Asset Bucket

Show three cards:

1. Stablecoin Yield
2. Blue-Chip Asset Yield
3. Higher-Risk Yield

Each card should show:

- Short description
- Example assets
- Typical strategy types
- Main risks

---

### Step 3: Select Strategy Type

Show two active cards:

1. Simple Yield
2. Optimized Yield

Show one separate disabled/coming-soon card:

3. Pendle / Leveraged Yield

Important rule:

> Pendle / Leveraged Yield should not be mixed into the active strategy selector results.

---

### Step 4: Fetch Opportunities

The product fetches from both providers.

From LI.FI:

- Vaults
- Chains
- Protocols
- Vault details

From Yield.xyz:

- Yields
- Networks
- Providers
- Risk data, if available
- 30-day APY history
- 30-day TVL history

---

### Step 5: Normalize, Deduplicate, Classify

The system should:

1. Normalize provider responses.
2. Deduplicate overlapping opportunities.
3. Classify by asset bucket.
4. Classify by strategy type.
5. Exclude Pendle/leveraged strategies from normal results.
6. Calculate income estimates.
7. Rank opportunities.
8. Display results.

---

### Step 6: Results Screen

Show ranked opportunities with filters and sorting.

Summary bar example:

```text
Showing 18 stablecoin simple yield opportunities for $1,000.
Estimated APY range: 3.2%–8.1%.
Highest TVL: $420M.
```

---

### Step 7: Detail Page / Drawer

When a user clicks a result, show:

1. Opportunity overview
2. Income estimate
3. APY breakdown
4. 30-day APY history
5. 30-day TVL history
6. Strategy explanation
7. Risk notes
8. Access / liquidity details
9. Data source attribution
10. Similar opportunities

---

## 17. Main Screens

---

### 17.1 Input / Configurator Screen

Components:

- Amount input
- Asset bucket cards
- Strategy type cards
- Chain dropdown
- Protocol dropdown
- Advanced filters collapsed
- CTA button
- General risk disclaimer

CTA:

```text
Show Yield Opportunities
```

---

### 17.2 Results Screen

Components:

- Results summary bar
- Opportunity cards
- Sort menu
- Filter sidebar / drawer
- Hidden result count
- Risk disclaimer
- Data freshness indicator

Example hidden result message:

```text
14 opportunities hidden due to low TVL, missing APY, unsupported token, or high complexity.
```

---

### 17.3 Opportunity Detail Page / Drawer

Components:

1. Header
2. Estimated income
3. APY breakdown
4. 30-day APY chart
5. 30-day TVL chart
6. Strategy explanation
7. Risk notes
8. Liquidity/access information
9. Source attribution
10. Similar opportunities

---

### 17.4 Advanced Yield Coming Soon Screen

Components:

- Pendle / Leveraged Yield title
- Coming soon status
- Explanation of advanced strategies
- Risk warning
- Optional “Notify me” CTA, if the product supports notifications

Copy:

```text
Pendle / Leveraged Yield
Coming Soon

Advanced strategies involving fixed yield, variable yield, yield tokens, looping, or borrowed capital will be handled separately. These strategies can involve liquidation risk, liquidity risk, and active management assumptions.
```

---

## 18. Opportunity Card

Each result card should include:

1. Strategy name
2. Protocol name
3. Chain
4. Asset
5. APY
6. TVL
7. Estimated income
8. Strategy type
9. Asset bucket
10. 30-day APY trend label
11. 30-day TVL trend label
12. Risk summary
13. Data sources
14. Last updated timestamp

Example:

```text
Morpho USDC Vault
Morpho · Base · USDC

APY: 7.4%
TVL: $22.8M

Estimated income on $1,000:
Daily: $0.20
Monthly: $6.17
Yearly: $74.00

Strategy: Optimized Yield
Bucket: Stablecoin
30D APY: Stable
30D TVL: Growing

Risk: Reward-based, smart contract risk, stablecoin risk
Sources: LI.FI Earn, Yield.xyz
Updated: 15 mins ago
```

---

## 19. Opportunity Detail Page

---

### 19.1 Overview

Show:

- Strategy name
- Protocol
- Chain
- Asset
- APY
- TVL
- Asset bucket
- Strategy type
- Sources
- Last updated

---

### 19.2 Income Estimate

For the user-entered amount, show:

- Daily estimated income
- Weekly estimated income
- Monthly estimated income
- Yearly estimated income

Example:

```text
Amount: $1,000
APY: 7.4%

Daily: $0.20
Weekly: $1.42
Monthly: $6.17
Yearly: $74.00
```

---

### 19.3 APY Breakdown

Show when available:

- Total APY
- Base APY
- Reward APY
- Reward token symbols
- Reward dependency label

Reward dependency labels:

```text
Low Reward Dependency
Medium Reward Dependency
High Reward Dependency
Unknown
```

Example:

```text
Total APY: 7.4%
Base APY: 4.9%
Reward APY: 2.5%
Rewards: OP
Reward Dependency: Medium
```

---

### 19.4 30-Day APY History

Show:

- Current APY
- 30-day average
- 30-day high
- 30-day low
- Trend label
- Mini chart

Example:

```text
Current APY: 7.4%
30D Average: 6.8%
30D High: 8.1%
30D Low: 5.9%
Trend: Stable
```

---

### 19.5 30-Day TVL History

Show:

- Current TVL
- TVL 30 days ago
- 30-day change percentage
- Trend label
- Mini chart

Example:

```text
Current TVL: $22.8M
30D Start TVL: $19.4M
30D Change: +17.5%
Trend: Growing
```

---

### 19.6 Strategy Explanation

Use plain English.

Example for lending:

```text
This strategy lends USDC into a lending market. Yield comes from borrower interest and may change based on market utilization.
```

Example for vault:

```text
This strategy deposits assets into a vault that manages allocation across one or more yield sources. Yield may come from base returns, protocol incentives, or reward tokens.
```

Example for restaking:

```text
This strategy earns yield from restaking-related rewards or incentives. Restaking can introduce additional protocol and slashing assumptions beyond normal staking.
```

---

### 19.7 Risk Notes

Risk notes should be dynamic based on strategy and asset type.

Potential risk notes:

#### Stablecoin Risk

```text
This strategy uses stablecoins. You are exposed to stablecoin depeg risk in addition to protocol and smart contract risk.
```

#### Lending Risk

```text
Lending yield depends on borrower demand, market utilization, collateral quality, and protocol solvency.
```

#### Staking Risk

```text
Staking strategies can involve validator performance risk, slashing risk, and unstaking delays.
```

#### Liquid Staking Risk

```text
Liquid staking tokens can trade below the value of the underlying staked asset during periods of stress or low liquidity.
```

#### Restaking Risk

```text
Restaking adds additional protocol assumptions and may introduce slashing or dependency risks beyond normal staking.
```

#### Reward Token Risk

```text
A portion of the APY may come from reward tokens. Reward value can change quickly and may not be sustainable.
```

#### Points Risk

```text
This strategy may include points or incentive expectations. Points are speculative and may not convert into monetary value.
```

#### LP / Impermanent Loss Risk

```text
LP strategies can involve impermanent loss if the relative prices of pooled assets change.
```

#### Timelock Risk

```text
This strategy may have a withdrawal delay or timelock. Funds may not be immediately available.
```

---

### 19.8 Access / Liquidity

Show:

- Redeemable status
- Timelock
- Caps
- Current TVL
- KYC requirement
- Deposit/redeem support if data is available
- Last updated timestamp

Example:

```text
Redeemable: Yes
Timelock: None
KYC Required: No
TVL: $22.8M
Last Updated: 15 mins ago
```

---

## 20. Income Calculation

The product should show simple non-compounded estimates by default.

### Inputs

- User amount in USD
- APY
- Time horizon

### Formula

If APY is represented as decimal:

```text
yearly_income = amount_usd * apy
monthly_income = yearly_income / 12
weekly_income = yearly_income / 52
daily_income = yearly_income / 365
```

If APY is represented as percentage, convert first:

```text
apy_decimal = apy_percent / 100
```

Example for $1,000 at 7.4% APY:

```text
yearly_income = 1000 * 0.074 = $74.00
monthly_income = 74 / 12 = $6.17
weekly_income = 74 / 52 = $1.42
daily_income = 74 / 365 = $0.20
```

### Display Copy

Always show:

```text
Estimated income. APY is variable and not guaranteed.
```

For reward-heavy strategies:

```text
A portion of this APY may come from reward tokens or incentives that can change quickly.
```

For points-heavy strategies:

```text
Points are speculative and may not convert into monetary value.
```

---

## 21. Ranking Logic

The product should not rank purely by APY.

A stable 5.5% APY with high TVL may rank above a 19% APY that appeared recently, has low TVL, and is mostly reward-token-based.

### Recommended Ranking Weights

| Factor | Weight |
|---|---:|
| APY attractiveness | 25% |
| TVL / liquidity | 20% |
| Asset bucket match | 15% |
| Strategy type match | 10% |
| 30D APY stability | 10% |
| 30D TVL trend | 10% |
| Redeemability / lockup | 5% |
| Data freshness | 5% |

### Ranking Output

Default sort should be:

```text
Recommended
```

Other sort options:

```text
Highest APY
Highest TVL
Best 30D APY Stability
Best 30D TVL Growth
Lowest Complexity
Highest Base APY
Lowest Reward Dependency
```

---

## 22. Hard Filters

Before ranking, remove opportunities that fail basic rules.

Default hard filters:

1. Missing APY
2. Missing or extremely low TVL
3. Unsupported asset bucket
4. Unsupported strategy type
5. Pendle / leveraged strategy
6. Liquidation-risk strategy
7. KYC required, unless user allows it
8. Non-redeemable, unless user allows locked strategies
9. Suspiciously high APY, unless user enables high-risk results

### Default Minimum TVL Suggestions

| Bucket / Strategy | Suggested Minimum TVL |
|---|---:|
| Stablecoin Simple Yield | $1M |
| Blue-Chip Simple Yield | $1M |
| Stablecoin Optimized Yield | $500K |
| Blue-Chip Optimized Yield | $500K |
| Higher-Risk Yield | $250K |

These should be configurable.

---

## 23. Filters

### Basic Filters

- Asset bucket
- Strategy type
- Chain
- Protocol
- Token
- Minimum APY
- Minimum TVL
- Sort by

### Advanced Filters

- Only redeemable
- Hide KYC required
- Hide reward-heavy APY
- Hide points-based strategies
- Hide LP exposure
- Hide restaking
- Hide low TVL
- Hide missing 30-day history
- Maximum lockup
- Minimum base APY
- Maximum reward APY dependency

---

## 24. “Why This Result?” Explanation

Every result should explain why it appears.

### Stablecoin + Simple Example

```text
Shown because this is a stablecoin lending opportunity with sufficient TVL, available APY, and no detected leverage or complex strategy tags.
```

### Blue-Chip + Simple Example

```text
Shown because this opportunity earns yield on a major asset through staking or lending without requiring LP exposure or leverage.
```

### Optimized Example

```text
Shown because this vault may improve yield through strategy management, rewards, or restaking. It has more moving parts than direct lending or staking.
```

### Hidden Result Example

```text
Hidden because this opportunity appears to involve leverage, looping, Pendle-style yield tokens, missing APY, or insufficient TVL.
```

---

## 25. Empty States

### No Results

Message:

```text
No matching yield opportunities found for this bucket and strategy type.
```

Suggestions:

- Lower minimum TVL
- Include optimized strategies
- Try another chain
- Try another asset bucket
- Allow reward-based APY

---

### API Failure

Message:

```text
Yield data could not be loaded right now. Please try again later.
```

If cached data is used:

```text
Showing cached yield data. APY and TVL may be outdated.
```

---

### Missing APY

Message:

```text
APY is currently unavailable for this opportunity, so income estimates cannot be calculated.
```

---

### Missing TVL

Message:

```text
TVL is unavailable. Treat this opportunity as higher risk.
```

---

### Missing 30-Day History

Message:

```text
30-day history is unavailable for this opportunity.
```

---

## 26. Risk Disclaimer Copy

Use this in the product:

```text
This tool is for informational purposes only. Yield is variable and not guaranteed. Strategies may involve smart contract risk, market risk, liquidity risk, stablecoin depeg risk, validator/slashing risk, reward-token volatility, and loss of principal.
```

For high APY opportunities:

```text
High APY may be temporary, incentive-driven, or paid in volatile reward tokens.
```

For optimized strategies:

```text
Optimized strategies can include additional layers of protocol, vault, reward, and liquidity risk.
```

For Pendle / leveraged coming soon:

```text
Leveraged and Pendle-style strategies may involve liquidation risk, fixed/variable yield risk, liquidity risk, and active management assumptions.
```

---

## 27. Product Metrics

Track:

1. Searches started
2. Searches completed
3. Most selected asset bucket
4. Most selected strategy type
5. Average deposit amount entered
6. Chain filter usage
7. Protocol filter usage
8. Result card clicks
9. Detail page opens
10. Advanced Yield coming-soon clicks
11. No-results rate
12. API error rate
13. Top protocols viewed
14. Top chains viewed
15. Number of hidden/excluded opportunities
16. Most common exclusion reason
17. Wallet address input usage, if supported
18. 30-day APY history view rate
19. 30-day TVL history view rate

---

## 28. Product Questions To Confirm

### Product Scope

1. Should wallet input be included in V1 or kept optional behind a toggle?
2. Should users be able to paste a wallet address to see current yield positions?
3. Should results include only EVM chains at first, or should Yield.xyz-supported non-EVM chains also be included?
4. Should the product support geo-restrictions or jurisdiction warnings?

### Risk Model

5. What should the default minimum TVL be?
6. Should high-risk results be hidden by default or shown with strong warnings?
7. Should reward-token APY be discounted in ranking?
8. Should points-based strategies appear by default or require an advanced filter?
9. Should USDe / sUSDe be treated as stablecoins or as a special “synthetic dollar” category?

### Data Providers

10. Do we have access to all needed Yield.xyz endpoints, especially risk, reward-rate history, and TVL history?
11. If provider data conflicts, should LI.FI APY or Yield.xyz APY be preferred?
12. Should opportunities from LI.FI and Yield.xyz be merged into one list or source-separated?

### Pendle / Leveraged Yield

13. Should the Advanced Yield module be a disabled card, separate tab, or separate route?
14. Should it include educational content even before live data is supported?
15. Should leveraged strategies ever appear in the same table as normal yield, or always stay separate?

---

## 29. Final Scope Statement

Version 1 of the Yield Monitor Tool will include stablecoin, blue-chip, and higher-risk yield discovery across both simple and optimized non-leveraged strategies. It will use LI.FI Earn and Yield.xyz as data sources, normalize and deduplicate opportunities, estimate income based on user-entered capital, and show 30-day APY and TVL context for each opportunity where available.

Pendle, leveraged yield, looping, and liquidation-risk strategies are excluded from the main results and will live in a separate Advanced Yield module marked as Coming Soon.

---

## 30. One-Line Product Summary

> A read-only yield discovery and income estimation tool that turns fragmented DeFi yield data into simple, risk-profile-based yield opportunities.

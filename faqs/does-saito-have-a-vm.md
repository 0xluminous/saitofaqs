---
title: Does Saito have an EVM equivalent?
source: https://t.me/SaitoIO/157247
priority: 0
tags:
- developer
---

Saito doesn't have an EVM or OP_CODES. Apps are like Bitcoin OP_RETURN. Put data in a tx and send it to an address. Everyone can see the TX, so you can all use it as input for an application if you want. This is an incredibly powerful model for dapps, but not necessarily smart contracts.

Saito has excellent interoperability with other blockchains through [Polkadot](https://polkadot.network/), can leverage the best of other chains, and even create native Saito layer-2 implementations. Also, OP_CODES and/or EVM can be added in the future, enabling more functionality in layer-1.

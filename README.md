# NV Atlas

An interactive, bilingual corpus explorer for English nominal-to-Chinese verbal
translation shifts in a 500-pair subtitle dataset.

## Features

- Keyword search across English, Chinese, original IDs, and annotated terms
- Category, review-status, and duplicate filters
- Dedicated nominal–verb network and category treemap pages
- Keyword-in-context viewer and sortable evidence table
- Shareable URL state and filtered CSV export
- English and Traditional Chinese interface with a persistent language dropdown
- Project report, codebook, and AI use declaration
- Reproducible 50-row review queue export

## Run locally

The site loads `NVAtlas-AI-Agent.csv` in the browser, so use a local web server
rather than opening `index.html` directly:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Data status

The supplied CSV contains 500 rows but does not document its upstream URL,
corpus version, sampling seed, or licence. Seven exact duplicate sentence-pair
groups account for eight redundant copies. No row is marked as human checked;
the site provides a 50-row reproducible review queue for completing that step
against the original source.

# Summer Web Clipper - Browser Extension Agent Guide

## Data Flow Architecture
```
User Click → Background Script → Inject Content Script → Parse Page
    ↓              ↓                    ↓                    ↓
Action Icon   injects script    React Overlay    Text/Transcript
                   ↓                    ↓                    ↓
              waits for msg    Send to Background  ← ← ← ← ← ↓
                   ↓                    ↓
              API Call (fetch)          ↓
                   ↓                    ↓
              Send Response → → → Display Result
```
**When making changes**: Content scripts gather data and send messages to background. Background handles external APIs and sends responses back to content.

## Critical Extension Constraints
- **Content scripts execute in isolated world**: DOM access only, cannot make external network requests
- **Background script handles all external API calls**: All fetch() to AI providers must happen here
- **Messages between contexts must be JSON-serializable**: No functions, DOM nodes, or circular references
- **Async message handlers must return true**: Required for chrome.runtime.onMessage to wait for sendResponse
- **localStorageGet/Set are function names**: These wrap chrome.storage.local, not DOM localStorage API
- **Both Chrome and Firefox use chrome.* namespace**: Firefox supports chrome.* APIs, not just browser.*

## Key Files & Message Patterns
- `src/lib/browser.ts` - Chrome/Firefox API wrapper (both use chrome.* namespace)
- `src/lib/settings.ts` - Settings via localStorageGet/Set functions (not window.localStorage)
- Content→Background: `{action: "summarize"|"export", payload: data}`
- Background→Content: `{action: "parse_document"|"open_url"}`
- Response format: `{type: "error"|"success", payload: any}`

## Build/Test Commands
- `npm run build:chrome` / `npm run build:firefox` - Platform builds
- `npm test -- src/lib/readbility.test.ts` - Single test file
- `npm run package` - Creates .zip for store submission

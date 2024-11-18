# 6529AI

**6529AI** is the AI version of [Punk6529](https://x.com/punk6529).
**6529-AI** is an autonomous digital philosopher and cultural architect designed to educate, and provoke thought in the ever-evolving landscapes of Web3, AI, and human society.
Living at the intersection of technology, art, and philosophy, 6529-AI embodies the spirit of decentralization, freedom, and human empowerment.

Chat with 6529AI on [twitter](https://x.com/6529ai) and [telegram](https://t.me/ai6529)

<div align="center">
  <img src="characters/AI6529.jpg" alt="6529 Banner" width="100%" />
</div>

<div align="center">
  📖 [Documentation](https://ai16z.github.io/eliza/) | 🎯 [Examples](https://github.com/thejoven/awesome-eliza)
  X [X](https://x.com/6529ai)
  
### [For Chinese Version: 中文说明](./README_CN.md)

### [For Japanese Version: 日本語の説明](./README_JA.md)

### [For Korean Version: 한국어 설명](./README_KOR.md)

### [For French Version: Instructions en français](./README_FR.md)

### [For Portuguese Version: Instruções em português](./README_PTBR.md)

## Features

-   🛠 Full-featured Discord, Twitter and Telegram connectors
-   👥 Multi-agent and room support
-   📚 Easily ingest and interact with your documents
-   💾 Retrievable memory and document store
-   🚀 Highly extensible - create your own actions and clients to extend capabilities
-   ☁️ Supports many models, including local Llama, OpenAI, Anthropic, Groq, and more
-   📦 Just works!

## What can I use it for?

-   🤖 Chatbots
-   🕵️ Autonomous Agents
-   📈 Business process handling
-   🎮 Video game NPCs

# Getting Started

**Prerequisites (MUST):**

-   [Python 2.7+](https://www.python.org/downloads/)
-   [Node.js 23.1+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
-   [pnpm](https://pnpm.io/installation)

### Edit the .env file

-   Copy .env.example to .env and fill in the appropriate values
-   Edit the TWITTER environment variables to add your bot's username and password

### Edit the character file

-   Check out the file `src/core/defaultCharacter.ts` - you can modify this
-   You can also load characters with the `pnpm start --characters="path/to/your/character.json"` and run multiple bots at the same time.

After setting up the .env file and character file, you can start the bot with the following command:

```
pnpm i
pnpm start
```

# Customising 6529AI

### Adding custom actions

To avoid git clashes in the core directory, we recommend adding custom actions to a `custom_actions` directory and then adding them to the `elizaConfig.yaml` file. See the `elizaConfig.example.yaml` file for an example.

## Running with different models

### Run with Llama

You can run Llama 70B or 405B models by setting the `XAI_MODEL` environment variable to `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo` or `meta-llama/Meta-Llama-3.1-405B-Instruct`

### Run with Grok

You can run Grok models by setting the `XAI_MODEL` environment variable to `grok-beta`

### Run with OpenAI

You can run OpenAI models by setting the `XAI_MODEL` environment variable to `gpt-4o-mini` or `gpt-4o`

## Additional Requirements

You may need to install Sharp. If you see an error when starting up, try installing it with the following command:

```
pnpm install --include=optional sharp
```

# Environment Setup

You will need to add environment variables to your .env file to connect to various platforms:

```
# Required environment variables
DISCORD_APPLICATION_ID=
DISCORD_API_TOKEN= # Bot token
OPENAI_API_KEY=sk-* # OpenAI API key, starting with sk-
ELEVENLABS_XI_API_KEY= # API key from elevenlabs
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API key

# ELEVENLABS SETTINGS
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_VOICE_STABILITY=0.5
ELEVENLABS_VOICE_SIMILARITY_BOOST=0.9
ELEVENLABS_VOICE_STYLE=0.66
ELEVENLABS_VOICE_USE_SPEAKER_BOOST=false
ELEVENLABS_OPTIMIZE_STREAMING_LATENCY=4
ELEVENLABS_OUTPUT_FORMAT=pcm_16000

TWITTER_DRY_RUN=false
TWITTER_USERNAME= # Account username
TWITTER_PASSWORD= # Account password
TWITTER_EMAIL= # Account email
TWITTER_COOKIES= # Account cookies

X_SERVER_URL=
XAI_API_KEY=
XAI_MODEL=


# For asking Claude stuff
ANTHROPIC_API_KEY=

WALLET_PRIVATE_KEY=EXAMPLE_WALLET_PRIVATE_KEY
WALLET_PUBLIC_KEY=EXAMPLE_WALLET_PUBLIC_KEY

BIRDEYE_API_KEY=

SOL_ADDRESS=So11111111111111111111111111111111111111112
SLIPPAGE=1
RPC_URL=https://api.mainnet-beta.solana.com
HELIUS_API_KEY=


## Telegram
TELEGRAM_BOT_TOKEN=

TOGETHER_API_KEY=
```

# Local Inference Setup

### CUDA Setup

If you have an NVIDIA GPU, you can install CUDA to speed up local inference dramatically.

```
pnpm install
npx --no node-llama-cpp source download --gpu cuda
```

Make sure that you've installed the CUDA Toolkit, including cuDNN and cuBLAS.

### Running locally

Add XAI_MODEL and set it to one of the above options from [Run with
Llama](#run-with-llama) - you can leave X_SERVER_URL and XAI_API_KEY blank, it
downloads the model from huggingface and queries it locally

# Clients

## Discord Bot

For help with setting up your Discord Bot, check out here: https://discordjs.guide/preparations/setting-up-a-bot-application.html

# Development

## Testing

To run the test suite, you must got into each package:

```bash
pnpm test           # Run tests once
pnpm test:watch    # Run tests in watch mode
```

For database-specific tests:

```bash
pnpm test:sqlite   # Run tests with SQLite
pnpm test:sqljs    # Run tests with SQL.js
```

Tests are written using Jest and can be found in `src/**/*.test.ts` files. The test environment is configured to:

-   Load environment variables from `.env.test`
-   Use a 2-minute timeout for long-running tests
-   Support ESM modules
-   Run tests in sequence (--runInBand)

To create new tests, add a `.test.ts` file adjacent to the code you're testing.

## Docker

For development purposes, you can run the docker container with the following command:

```
pnpm docker
```

This will drop you into a shell inside the docker container where you can continue to configure the instance

and then you can start it with `pnpm start`

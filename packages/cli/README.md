# Phisherman CLI

A CLI tool that can be used to interact with the API from the command line.

## Installation

Install the CLI tool globally with npm:

```bash
npm install -g @maxijonson/phisherman-cli
```

Or with yarn:

```bash
yarn global add @maxijonson/phisherman-cli
```

## Usage


### 1. Create a new configuration file

```bash
# Creates a phisherman.config.json file in the current directory
phisherman init

# Creates a custom name config file
phisherman init my-config
```

### 2. Edit the configuration file

Edit the configuration file using the instructions in the [configuration](../lib/README.md#configuration) section of the library.

### 3. Run the Spammer

```bash
# Run the spammer with the default config file
phisherman run

# Run the spammer with a custom config file
phisherman run my-config
```
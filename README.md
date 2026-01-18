<div align="center">

# [sutne.github.io](https://sutne.github.io)

[![on-push-main-action-status][on-push-main-action-badge]][on-push-main-action]

</div>

## Development

### Configuration

To setup the dev environment:

1. Install [mise][mise], make sure to also:
   - add auto-activation for your shell
   - add autocompletion (if it wasn't done automatically)
2. Run `mise install`

### Running

Once the dev environment is configured, serve the app with:

```sh
mise serve
```

> To show all available commands write `mise run` and hit **tab**.

[on-push-main-action]: https://github.com/sutne/sutne.github.io/actions/workflows/on-push-main.yaml
[on-push-main-action-badge]: https://github.com/sutne/sutne.github.io/actions/workflows/on-push-main.yaml/badge.svg
[mise]: https://mise.jdx.dev/getting-started.html

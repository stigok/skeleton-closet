# skeleton-closet

a command line utility to initialise new projects with a predefined skeleton.

## Usage

Run `closet` to get a skeleton. Add `--help` to get some help with that.

`closet` is an alias for `skeleton-closet`.

## Installation

    $: npm install skeleton-closet --global

## Example

There is an example skeleton for node projects in [./examples/skeletons/node](./examples/skeletons/node).

Set source folder

    $: closet --source-path ~/home/user/repos/skeletons/node

Create a new project from skeleton

    $: cd /home/user/repos
    $: closet my-new-project
    $: cd my-new-project

## Thoughts

  - Option to include a specific skeleton for a different project type (`closet -t <type>` npm, nodejs, html, etc.)
  - Option to have a default project container directory to always spawn new projects
  - Add a ready with description specified in `-d`
  - Run interactively
  - Automatically cd into new project directory
  - Run npm init / git init automatically

## License

See [./LICENSE](./LICENSE) for license

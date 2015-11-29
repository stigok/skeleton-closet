# skeleton-closet

a command line utility to initialise new projects with a predefined skeleton.

## Usage

Run `closet` to get a skeleton. Add `--help` to get some help with that.

Fill current folder with your favorite skeleton. Expects empty target directory. Use `-f` to ignore.

    $: closet

Create a new project folder containing your skeleton

    $: closet <name>


Use current directory [or specified path] as the source skeleton from now on

    $: closet --source [<path>]

## Installation

    $: npm install skeleton-closet --global

## Example

If you have set your source folder, simply

    cd ~/
    closet my_new_project_name

## Thoughts

  - Option to include a specific skeleton for a different project type (`closet -t <type>` npm, nodejs, html, etc.)
  - Option for default project directory to always spawn new folders
  - Add a ready with description specified in `-d`
  - Run interactively

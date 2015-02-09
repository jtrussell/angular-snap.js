# Contributing to Angular Snap.js

Contributions are more than welcome! Please read through this document and
follow the steps outlined before submitting your pull request.


## Before You Start Working on Your New Feature

Please create aan issue for your  feature request before you start working and
indicate that you'd like to implement the feature.

I'm not looking to add tons of new functionality to this module. Make sure that
new feature will be accepted before investing your time.


## Commit Message Guidelines

Your commit messages should have a short summary line followed by an empty line
and longer description if needed.

Depending on the contents of your commit the summary should being with one of
*feature*/*feat*, *fix*, *peft*, *style*, *test*, *docs*, or *chore* followed by
a colon and the summary. Example:

```
feature: Make the blargus flash and twirl

It wasn't whiz bang enough
```

Try to kepp summary lines short (~60 chars max).

In general I'm more or less following the guidelines from angular itself. You
can read more about those
[here](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit).


## New/Changed Functionality Should Be Tested

Yeah, new code without tests will almost surely not be accepted.


## At Most Two Commits Per Pull Request

Limit your pull requests to at most two commits, one for tests and the other for
new code. A single commit with tests and code together is fine as well.


## Don't Bump the Version Number

By bumping the version number you assume... well... that your changes will be
part of a specific version. If the package version gets bumped between the time
you submit your PR and the time it would be integrated it may no longer be the
correct new number.

# Network Service Mesh Workflow Templates

The Network Service Mesh Organization has a number of *types* of repos:

- cmd-* - repos that build docker containers for a single command

This repo provides reusable [workflow templates](https://docs.github.com/en/actions/learn-github-actions/sharing-workflows-with-your-organization) for them.

# cmd-* Repos

Recommended command flow workflows for cmd-* repos include:
- cmd-ci
- automerge-godeps
- docker-push
- pr-for-updates
- update-deployments-k8s
- codeql-analysis



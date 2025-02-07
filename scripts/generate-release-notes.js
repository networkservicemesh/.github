// ./tools/scripts/generate-release-notes.js

const github = require('@actions/github');

/**
 * Generates the release notes for a github release.
 *
 * Arguments:
 * 1 - github_token
 * 2 - new version
 */
const token = process.argv[2];
const version = process.argv[3];
const repo = process.argv[4];

async function main() {
  const client = github.getOctokit(token);

  const latestReleaseResponse = await client.request(
    'GET /repos/{owner}/{repo}/releases/latest',
    {
      owner: 'networkservicemesh',
      repo: repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );
  const previousTag = latestReleaseResponse.data?.tag_name;

  const response = await client.request(
    'POST /repos/{owner}/{repo}/releases/generate-notes',
    {
      owner: 'networkservicemesh',
      repo: repo,
      tag_name: version,
      previous_tag_name: previousTag,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  const noteSections = response.data.body?.split('\n\n');
  const trimmedSections = [];
  const githubNotesMaxCharLength = 125000;
  const maxSectionLength = githubNotesMaxCharLength / noteSections.length;
  for (let i = 0; i < noteSections.length; i++) {
    if (noteSections[i].length > githubNotesMaxCharLength) {
      const lastLineIndex =
        noteSections[i].substring(0, maxSectionLength).split('\n').length - 1;
      const trimmed =
        noteSections[i]
          .split('\n')
          .slice(0, lastLineIndex - 1)
          .join('\n') +
        `\n... (+${
          noteSections[i].split('\n').length - (lastLineIndex + 1)
        } others)`;
      trimmedSections.push(trimmed);
      continue;
    }

    trimmedSections.push(noteSections[i]);
  }

  console.log(trimmedSections.join('\n\n'));
}

main().catch((e) => {
  console.error(`Failed generating release notes with error: ${e}`);
  process.exit(0);
});

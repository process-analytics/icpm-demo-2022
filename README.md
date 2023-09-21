# The demo presented at ICPM 2022 

## 🎮 The deployed solution

To see the deployed solution: https://process-analytics.github.io/icpm-demo-2022/

## ⚒️ Development Setup

Use node 16

Install dependencies: `npm install`

Start the dev server: `npm start`

The demo is accessible at http://localhost:5173/


## 📃 License

The code of this demo is released under the [Apache 2.0](LICENSE) license.


## 🚀 Release how-to

When all updates have been completed, you are ready to publish a new release.

Create a new GitHub release by following the [GitHub help](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release)
- for `Tag version`, use a value following the **vX.Y.Z** scheme using the [Semantic Versioning](https://semver.org/).
- for `Target`
    - usually, keep the `main` branch except if new commits that you don't want to integrate for the release are already
      available in the branch
    - in that case, choose a dedicated commit
- Description
    - briefly explain the contents of the new version
    - make GitHub generates the [release notes automatically](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)


## ⚡ Powered by

<img src="docs/github-logo.svg" alt="GitHub logo" title="GitHub Pages" width="110"/>

**[GitHub Pages](https://pages.github.com/)** (<kbd>demo</kbd> live environment)

<img src="https://surge.sh/images/logos/svg/surge-logo.svg" alt="surge.sh logo" title="surge.sh" width="110"/>

**[surge.sh](https://surge.sh)** (<kbd>demo</kbd> preview environment)

<p align="center">
  <a href="https://the-algorithms.com">
    <img src="./public/logo_t.svg" height="100">
  </a>
  <h1 align="center"><a href="https://github.com/TheAlgorithms/">The Algorithms</a> official website</h1>
</p>

<p align="center">
  <a href="https://lgtm.com/projects/g/TheAlgorithms/website/context:javascript">
    <img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/TheAlgorithms/website.svg?logo=lgtm&logoWidth=18"/>
  </a>

  <a href="https://github.com/TheAlgorithms/website/actions/workflows/codeql-analysis.yml">
    <img src="https://github.com/TheAlgorithms/website/actions/workflows/codeql-analysis.yml/badge.svg" height="20">
  </a>

  <a href="https://gitter.im/TheAlgorithms">
    <img src="https://img.shields.io/badge/Chat-Gitter-ff69b4.svg?label=Chat&logo=gitter" height="20">
  </a>

  <br />

  <a href="https://liberapay.com/TheAlgorithms">
    <img src="https://img.shields.io/liberapay/receives/TheAlgorithms.svg?logo=liberapay" height="20">
  </a>

  <img src="https://img.shields.io/github/repo-size/TheAlgorithms/website?color=blue" height="20">

  <a href="https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget">
    <img src="https://hosted.weblate.org/widgets/TheAlgorithms/-/svg-badge.svg" height="20">
  </a>
</p>

This is a static [Next.js](https://nextjs.org/) site providing a searchable library of all the algorithms in [The Algorithms](https://github.com/TheAlgorithms). All the data about the algorithms get fetched from the `DIRECTORY.md` files in all the different repositories.


## Translating the website

You can help us translate the [TheAlgorithms](https://the-algorithms.com) website using [Weblate](https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget). If you're not sure about if your translation is OK, better submit a suggestion, and someone else will review it. Here is the list of the current languages:

[![Global translation status](https://hosted.weblate.org/widgets/TheAlgorithms/-/index/287x66-white.png)](https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget)

[![Translation status by language](https://hosted.weblate.org/widgets/TheAlgorithms/-/index/multi-auto.svg)](https://hosted.weblate.org/projects/TheAlgorithms/website/?utm_source=widget)

## Getting Started

If you haven't installed it yet, install [Node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable). Then, install all the dependencies:

```bash
yarn
```

After that, run the script that fetches all the algorithms from GitHub:

```bash
yarn fetch-algorithms
```

Finally, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Contributing

Try to use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) naming convention.

If you want to add a new feature or fix a bug, create a new branch or fork and commit there. Before opening a PR be sure to

- Run `yarn lint` and fix potential errors
- Run `yarn build` to check if everything still builds successfully

Open the pull request against `main`. Vercel will automatically create a preview deployment and the pull request will be squash merged after being reviewed by a member.

If you are a member and just want to add a small fix you can also directly commit to `main` instead of opening a pull request.

## License

The website itself (this repository) is licensed under [MIT](https://github.com/TheAlgorithms/website/blob/main/LICENSE),\
while all the licenses for the code on the website can be found in the respective repositories.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
<br /><br />

<p align="center">
  <a href="https://vercel.com?utm_source=thealgorithms&utm_campaign=oss">
    <img src="./public/powered-by-vercel.svg" height="35px" alt="Powered by Vercel" />
  </a>
</p>

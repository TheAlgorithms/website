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

  <a href="https://lgtm.com/projects/g/TheAlgorithms/website/alerts/">
    <img src="https://img.shields.io/lgtm/alerts/g/TheAlgorithms/website.svg?logo=lgtm&logoWidth=18" height="20">
  </a>

  <a href="https://gitter.im/TheAlgorithms">
    <img src="https://img.shields.io/badge/Chat-Gitter-ff69b4.svg?label=Chat&logo=gitter" height="20">
  </a>
  
  <br />

  <a href="https://liberapay.com/TheAlgorithms">
    <img src="https://img.shields.io/liberapay/receives/TheAlgorithms.svg?logo=liberapay" height="20">
  </a>

  <img src="https://img.shields.io/github/repo-size/TheAlgorithms/website?color=green" height="20">
</p>

This is a static [Next.js](https://nextjs.org/) site providing a searchable library of all the algorithms in [The Algorithms](https://github.com/TheAlgorithms). All the data about the algorithms get fetched from the `DIRECTORY.md` files in all the different repositories.

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

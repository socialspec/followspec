# FollowSpec.org

[FollowSpec.org] is part of the [SocialSpec.org] portfolio of specifications for social engagement on the world wide web.
It is build on open standards.

## The Specification

1. Create an [OPML subscription list]
1. Publish it at `/.well-known/following.opml`
1. Allow CORS requests

Learn more at https://followspec.org

## The Website

This repository contains the source code for https://followspec.org. 
This website is built using the HyperTexting static-site generator. 
Please visit https://hypertexting.dev to learn more.

## Contributing

1.  **GitHub Stars**

    The easiest way to contribute to [followspec.org] is to star the repository:

    https://github.com/socialspec/followspec.org

1.  **Adoption!**

    The best way to help contribute to [followspec.org] is to implement support for the specification. 
    If you do, please let us know: info@socialspec.org

1.  **Comment on the RFC**

    You can also help contribute to [followspec.org] by liking or comment on the RFC:

    https://github.com/socialspec/followspec.org/issues/1 (coming soon)

1.  **Submit PRs**

    Did you notice a typo or have a suggestion for how to improve [followspec.org]? 
    Pull requests from humans are always welcome!

    Download the [HyperTexting CLI] (`hyperctl`), then run: 

    ```
    mkdir followspec.org
    cd followspec.org
    git clone https://github.com/socialspec/followspec.org
    hyperctl server --port 8080
    ```


<!-- Links -->
[socialspec.org]: https://socialspec.org
[followspec.org]: https://followspec.org
[aboutspec.org]: https://aboutspec.org
[contactspec.org]: https://contactspec.org
[OPML subscription list]: https://opml.org/spec2.opml#subscriptionLists
[CORS]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
[HyperTexting CLI]: https://hypertexting.dev

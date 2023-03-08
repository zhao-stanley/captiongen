![Header](https://capsule-render.vercel.app/api?type=rect&color=gradient&text=%20%20captiongen%20%20&fontAlign=50&fontSize=50)

<a href="https://www.producthunt.com/posts/captiongen?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-captiongen" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=382936&theme=light" alt="captiongen - Generate&#0032;the&#0032;perfect&#0032;caption&#0032;for&#0032;your&#0032;social&#0032;media&#0032;post&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

## Getting Started

First, you will need a `OPENAI_API_KEY` in your `.env` file to run this locally.

You can then start a development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

## How does it work?

This app uses OpenAI's `gpt-3.5-turbo` model and Vercel Edge functions with streaming. Captions are then generated based on the user's specifications. The payload is then sent to OpenAI's endpoint using Vercel's Edge function.

#### Credits

- Inspiration + Edge function: [@nutlope](https://github.com/nutlope)
- Continuous Deployment: [@vercel](https://github.com/vercel)
- README Banner: [@capsulerender](https://github.com/kyechan99/capsule-render)

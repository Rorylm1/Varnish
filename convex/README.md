# Convex Setup

This project uses Convex as the intended application database and backend.

## Next setup step

Run the following in the project root:

```bash
npx convex dev
```

That will:
- create or link a Convex project
- provision a development deployment
- save the deployment URL into a local env file
- generate the `convex/_generated` folder used for typed queries and mutations

## Environment variable

The Expo app expects:

```bash
EXPO_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

## Version control

Once generated, the `convex/_generated` folder should be checked into git so the project typechecks cleanly for everyone.

# Agent Workflow

## Recommended Pipeline

1. Research agent
- gathers and structures credible sources
- outputs a research packet

2. Lesson agent
- writes the lesson from the packet only
- proposes guided-looking beats and focus regions

3. Validator
- checks factual grounding
- checks visible-detail alignment
- flags weak or unsupported claims

## Why This Split Works

- research optimizes for truth and source quality
- lesson writing optimizes for clarity and pedagogy
- validation reduces hallucination and vague interpretive overreach

## Near-Term Evaluation Questions

- how often does the lesson agent introduce unsupported interpretation?
- how often are focus regions too broad or inaccurate?
- which source stacks produce the strongest lessons?
- how much human editing is still needed after validation?

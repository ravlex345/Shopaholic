import { Hono } from 'hono'

//const app = new Hono<{ Bindings: CloudflareBindings }>()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })
// app.get('/questionsfromAi', async(c) => {
//   const results = await c.env.AI.run("@cf/meta/llama-2-7b-chat-fp16", {
//     messages: [
      
//         { role: 'system', content: 'You are a personal assistant focused on stopping impulsive spending. Be as rude, sassy, mean, and quirky as possible' },
//         {role: "user", content: "Ask a unique, sassy, and rude yes-or-no question to discourage unnecessary shopping. Output only the question, one sentence, no more than 20 words. No introductory or additional text."}]
//   });
  
//   const question = JSON.stringify(results)||"No response from AI";
//   console.log(question);
//   return c.text(question);

// })
// export default app
import { createWorkersAI } from 'workers-ai-provider';
import { generateText } from 'ai';
import { corsHeaders } from './cors.ts';


type Env = {
  AI: Ai;
};

export default {
  async fetch(_: Request, env: Env) {
    const workersai = createWorkersAI({ binding: env.AI });
    const result = await generateText({
      model: workersai('@cf/meta/llama-2-7b-chat-int8'),
      messages: [
      
        { role: 'system', content: 'You are a personal assistant focused on stopping impulsive spending. Be as rude, sassy, mean, and quirky as possible' },
        {role: "user", content: "Ask a unique, sassy, and rude yes-or-no question to discourage unnecessary shopping. Output only the question, one sentence, no more than 20 words. No introductory or additional text."}]
      });

    return new Response(result.text, 
      {headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  },
};

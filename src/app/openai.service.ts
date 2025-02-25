import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey: string = 'e1NNMF2QtlT9o0gENPmf9AyBjyJWMYm3ymnT6Pqa';


  constructor() { }
  async generateIdea(prompt: string): Promise<string> 
  {
    const url = 'https://api.openai.com/v1/chat/completions';
    try 
    {
      const response = await axios.post(url, {
        model: 'gpt-3.5-turbo',
        messages: [
          {role: 'system', content: 'You are a an idea generator.'},
          {role: 'user', content: prompt}
        ],
        max_tokens: 100,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Answer OpenAi:', response.data);
      if (response.data && response.data.choices.length && response.data.choices[0].message) {
        return response.data.choices[0].message.content.trim();
      } else {
        console.error('No response from OpenAI');
        return 'Error in answer of OpenAI';
      }
    } 
    catch (error) 
    {
      console.error('Error in OpenAI:', error);
      return 'Error in OpenAI. Try again';
    }
  }
}

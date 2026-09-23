export type Quote = {
    id: number;
    quote: string;
    author: string;
  };
  
  type ApiResponse = {
    data: Quote[];
  };
  
  export async function fetchRandomQuote(): Promise<Quote> {
    const response = await fetch(
      'https://www.drivebird.com/api/quotes/random'
    );
  
    if (!response.ok) {
      throw new Error(
        `Failed to fetch quote (${response.status})`
      );
    }
  
    const result: ApiResponse = await response.json();
  
    if (!result.data || result.data.length === 0) {
      throw new Error('No quote was returned by the API.');
    }
  
    return result.data[0];
  }
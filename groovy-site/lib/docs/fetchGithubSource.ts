export async function fetchGithubSource(url: string): Promise<string | null> {
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'text/plain',
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    
    if (!response.ok) {
      console.error(`❌ [fetchGithubSource] Failed to fetch: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('❌ [fetchGithubSource] Error response body:', errorText);
      return null;
    }
    
    const sourceCode = await response.text();
    
    return sourceCode;
  } catch (error) {
    console.error('💥 [fetchGithubSource] Exception caught:', error);
    console.error('💥 [fetchGithubSource] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return null;
  }
}
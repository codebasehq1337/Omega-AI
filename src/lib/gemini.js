export async function generateListing(data, customApiKey) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, customApiKey })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Server error');
  }

  return await response.json();
}

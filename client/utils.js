export async function fetchData(url, contentToStringify) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contentToStringify),
  });

  const data = await response.json();
  return data.trim();
}

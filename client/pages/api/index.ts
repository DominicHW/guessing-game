export async function _submitAnswer(imageUrl: string, answer:string) {
  return await fetch(`/api/submitAnswer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl, answer })
  })
    .then(res => res.json())
    .then(data => data)
    .catch((err) => {
      console.error(err);
    });
}

export async function _getQuestion() {
  return await fetch("/api/fetchQuestion")
    .then(res => res.json())
    .then(data => data)
    .catch((err) => {
      console.error(err);
    })
}
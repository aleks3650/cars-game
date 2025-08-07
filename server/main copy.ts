function createJsonResponse(data: object) {
  const body = JSON.stringify(data);
  const response = new Response(body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", 
    },
  });
  return response;
}

Deno.serve((_req) => {
  return createJsonResponse({ message: 'Wiadomoscc !' });
});


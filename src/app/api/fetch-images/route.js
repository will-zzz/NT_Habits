// Fetch citizen images
export async function GET() {
  const url = `https://raw.seadn.io/files/50fb6747ce9c4f735171282aac19c4fa.svg`;
  // Fetch the citizen image from web, then console log the hrefs embedded in the svg
  const response = await fetch(url);
  const text = await response.text();
  const hrefs = text.match(/href="([^"]*)"/g).map((href) => href.slice(6, -1));
  return Response.json({ hrefs });
}

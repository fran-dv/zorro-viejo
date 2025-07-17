export const shortenLink = async (url: string): Promise<string | null> => {
  const endpoint = "https://is.gd/create.php";
  const params = new URLSearchParams({
    format: "json",
    url: url,
  });

  const res = await fetch(`${endpoint}?${params.toString()}`);
  if (!res.ok) {
    return null;
  }

  const { shorturl, errormessage } = await res.json();
  if (errormessage) {
    return null;
  }

  return shorturl;
};

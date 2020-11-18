let time = "";

export default function handler(req, res) {
  const {
    query: { dateTime }
  } = req;

  if (dateTime !== "get") {
    time = dateTime;
  }

  res.end(time);
}

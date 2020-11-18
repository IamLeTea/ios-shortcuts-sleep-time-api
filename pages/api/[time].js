const faunadb = require("faunadb");

const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  const {
    query: { time }
  } = req;

  try {
    const dbs = await client.query(
      q.Map(q.Paginate(q.Documents(q.Collection("SleepTime"))), (ref) =>
        q.Get(ref)
      )
    );

    const result = await client.query(
      q.Update(q.Ref(q.Collection("SleepTime"), dbs?.data[0]?.ref?.id), {
        data: {
          time
        }
      })
    );

    res.status(200).json(result.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
